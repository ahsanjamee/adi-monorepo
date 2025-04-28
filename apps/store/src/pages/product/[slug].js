import useTranslation from "next-translate/useTranslation";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { FiChevronRight, FiMinus, FiPlus } from "react-icons/fi";
import {
  FacebookIcon,
  FacebookShareButton,
  LinkedinIcon,
  LinkedinShareButton,
  RedditIcon,
  RedditShareButton,
  TwitterIcon,
  TwitterShareButton,
  WhatsappIcon,
  WhatsappShareButton,
} from "react-share";
import { Tab } from "@headlessui/react";
//internal import

import Price from "@component/common/Price";
import Stock from "@component/common/Stock";
import Tags from "@component/common/Tags";
import Layout from "@layout/Layout";
import { notifyError } from "@utils/toast";
import Card from "@component/slug-card/Card";
import useAddToCart from "@hooks/useAddToCart";
import Loading from "@component/preloader/Loading";
import ProductCard from "@component/product/ProductCard";
import VariantList from "@component/variants/VariantList";
import { SidebarContext } from "@context/SidebarContext";
import AttributeServices from "@services/AttributeServices";
import ProductServices from "@services/ProductServices";
import useUtilsFunction from "@hooks/useUtilsFunction";
import Discount from "@component/common/Discount";
import ImageCarousel from "@component/carousel/ImageCarousel";
import useGetSetting from "@hooks/useGetSetting";
import ProductImageZoom from "@component/product/ProductImageZoom";

const ProductScreen = ({ product, attributes, relatedProducts }) => {
  const router = useRouter();
  const { globalSetting } = useGetSetting();

  console.log(product);

  const { lang, showingTranslateValue, getNumber, currency } =
    useUtilsFunction();

  // console.log('product',product)

  const { isLoading, setIsLoading } = useContext(SidebarContext);
  const { handleAddItem, item, setItem } = useAddToCart();

  // react hook

  const [value, setValue] = useState("");
  const [price, setPrice] = useState(0);
  const [img, setImg] = useState("");
  const [originalPrice, setOriginalPrice] = useState(0);
  const [stock, setStock] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [selectVariant, setSelectVariant] = useState({});
  const [isReadMore, setIsReadMore] = useState(true);
  const [selectVa, setSelectVa] = useState({});
  const [variantTitle, setVariantTitle] = useState([]);
  const [variants, setVariants] = useState([]);

  useEffect(() => {
    // console.log('value', value, product);
    if (value) {
      const result = product?.variants?.filter((variant) =>
        Object.keys(selectVa).every((k) => selectVa[k] === variant[k])
      );

      const res = result?.map(
        ({
          originalPrice,
          price,
          discount,
          quantity,
          barcode,
          sku,
          productId,
          image,
          ...rest
        }) => ({
          ...rest,
        })
      );

      const filterKey = Object.keys(Object.assign({}, ...res));
      const selectVar = filterKey?.reduce(
        (obj, key) => ({ ...obj, [key]: selectVariant[key] }),
        {}
      );
      const newObj = Object.entries(selectVar).reduce(
        (a, [k, v]) => (v ? ((a[k] = v), a) : a),
        {}
      );

      const result2 = result?.find((v) =>
        Object.keys(newObj).every((k) => newObj[k] === v[k])
      );

      // console.log("result2", result2);

      if (result.length <= 0 || result2 === undefined) return setStock(0);

      setVariants(result);
      setSelectVariant(result2);
      setSelectVa(result2);
      setImg(result2?.image);
      setStock(result2?.quantity);
      const price = getNumber(result2?.price);
      const originalPrice = getNumber(result2?.originalPrice);
      const discountPercentage = getNumber(
        ((originalPrice - price) / originalPrice) * 100
      );
      setDiscount(getNumber(discountPercentage));
      setPrice(price);
      setOriginalPrice(originalPrice);
    } else if (product?.variants?.length > 0) {
      const result = product?.variants?.filter((variant) =>
        Object.keys(selectVa).every((k) => selectVa[k] === variant[k])
      );

      setVariants(result);
      setStock(product.variants[0]?.quantity);
      setSelectVariant(product.variants[0]);
      setSelectVa(product.variants[0]);
      setImg(product.variants[0]?.image);
      const price = getNumber(product.variants[0]?.price);
      const originalPrice = getNumber(product.variants[0]?.originalPrice);
      const discountPercentage = getNumber(
        ((originalPrice - price) / originalPrice) * 100
      );
      setDiscount(getNumber(discountPercentage));
      setPrice(price);
      setOriginalPrice(originalPrice);
    } else {
      setStock(product?.stock);
      setImg(product?.image[0]);
      const price = getNumber(product?.prices?.price);
      const originalPrice = getNumber(product?.prices?.originalPrice);
      const discountPercentage = getNumber(
        ((originalPrice - price) / originalPrice) * 100
      );
      setDiscount(getNumber(discountPercentage));
      setPrice(price);
      setOriginalPrice(originalPrice);
    }
  }, [
    product?.prices?.discount,
    product?.prices?.originalPrice,
    product?.prices?.price,
    product?.stock,
    product.variants,
    selectVa,
    selectVariant,
    value,
  ]);

  useEffect(() => {
    const res = Object.keys(Object.assign({}, ...product?.variants));
    const varTitle = attributes?.filter((att) => res.includes(att?._id));

    setVariantTitle(varTitle?.sort());
  }, [variants, attributes]);

  useEffect(() => {
    setIsLoading(false);
  }, [product]);

  const handleAddToCart = (p) => {
    if (p.variants.length === 1 && p.variants[0].quantity < 1)
      return notifyError("Insufficient stock");
    // if (notAvailable) return notifyError('This Variation Not Available Now!');
    if (stock <= 0) return notifyError("Insufficient stock");
    // console.log('selectVariant', selectVariant);

    if (
      product?.variants.map(
        (variant) =>
          Object.entries(variant).sort().toString() ===
          Object.entries(selectVariant).sort().toString()
      )
    ) {
      const { variants, categories, description, ...updatedProduct } = product;
      const newItem = {
        ...updatedProduct,
        id: `${
          p.variants.length <= 1
            ? p._id
            : p._id +
              variantTitle
                ?.map(
                  // (att) => selectVariant[att.title.replace(/[^a-zA-Z0-9]/g, '')]
                  (att) => selectVariant[att._id]
                )
                .join("-")
        }`,

        title: `${
          p.variants.length <= 1
            ? showingTranslateValue(product?.title)
            : showingTranslateValue(product?.title) +
              "-" +
              variantTitle
                ?.map(
                  // (att) => selectVariant[att.title.replace(/[^a-zA-Z0-9]/g, '')]
                  (att) =>
                    att.variants?.find((v) => v._id === selectVariant[att._id])
                )
                .map((el) => showingTranslateValue(el?.name))
        }`,
        image: img,
        variant: selectVariant,
        price: price,
        originalPrice: originalPrice,
      };
      handleAddItem(newItem);
    } else {
      return notifyError("Please select all variant first!");
    }
  };

  const handleChangeImage = (img) => {
    setImg(img);
  };

  const { t } = useTranslation();

  // category name slug
  const category_name = showingTranslateValue(product?.category?.name)
    ?.toLowerCase()
    ?.replace(/[^A-Z0-9]+/gi, "-");

  // console.log("discount", discount);

  return (
    <>
      {isLoading ? (
        <Loading loading={isLoading} />
      ) : (
        <Layout
          title={showingTranslateValue(product?.title)}
          description={showingTranslateValue(product.description)}
        >
          <div className="px-0 py-10 lg:py-10">
            <div className="mx-auto max-w-screen-2xl px-3 lg:px-10">
              <div className="flex items-center pb-4">
                <ol className="flex w-full items-center overflow-hidden font-serif">
                  <li className="cursor-pointer pr-1 text-sm font-semibold transition duration-200 ease-in hover:text-emerald-500">
                    <Link href="/">Home</Link>
                  </li>
                  <li className="mt-px text-sm">
                    {" "}
                    <FiChevronRight />{" "}
                  </li>
                  <li className="cursor-pointer pl-1 text-sm font-semibold transition duration-200 ease-in hover:text-emerald-500 ">
                    <Link
                      href={`/search?category=${category_name}&_id=${product?.category?._id}`}
                    >
                      <button
                        type="button"
                        onClick={() => setIsLoading(!isLoading)}
                      >
                        {category_name}
                      </button>
                    </Link>
                  </li>
                  <li className="mt-px text-sm">
                    {" "}
                    <FiChevronRight />{" "}
                  </li>
                  <li className="px-1 text-sm transition duration-200 ease-in ">
                    {showingTranslateValue(product?.title)}
                  </li>
                </ol>
              </div>

              <div className="w-full rounded-lg bg-white p-3 lg:p-12">
                <div className="flex flex-col xl:flex-row">
                  <div className="mx-auto w-full flex-shrink-0 md:w-6/12 lg:block lg:w-5/12 xl:w-4/12 xl:pr-10">
                    <Discount slug product={product} discount={discount} />

                    {product.image[0] ? (
                      <ProductImageZoom imageUrl={img || product.image[0]} />
                    ) : (
                      <img
                        src="https://res.cloudinary.com/ahossain/image/upload/v1655097002/placeholder_kvepfp.png"
                        width={650}
                        height={650}
                        alt="product Image"
                      />
                    )}

                    {product?.image?.length > 1 && (
                      <div className="mt-4 flex flex-row flex-wrap border-t">
                        <ImageCarousel
                          images={product.image}
                          handleChangeImage={handleChangeImage}
                        />
                      </div>
                    )}
                  </div>

                  <div className="w-full">
                    <div className="flex flex-col md:flex-row lg:flex-row xl:flex-row">
                      <div className=" mob-w-full w-3/5 md:w-2/3  md:pr-6 xl:pr-6">
                        <div className="mb-6">
                          <h1 className="mb-1 font-serif text-lg font-semibold leading-7 text-gray-800 md:text-xl lg:text-2xl">
                            {showingTranslateValue(product?.title)}
                          </h1>

                          <p className="font-serif text-sm font-medium uppercase text-gray-500">
                            SKU :{" "}
                            <span className="font-bold text-gray-600">
                              {product.sku}
                            </span>
                          </p>

                          <div className="relative">
                            <Stock stock={stock} />
                          </div>
                        </div>

                        <div className="">
                          <div className="text-sm leading-6 text-gray-500 md:leading-7">
                            <div
                              className="bullet-points"
                              dangerouslySetInnerHTML={{
                                __html: showingTranslateValue(
                                  product?.description
                                ),
                              }}
                            />
                          </div>

                          <Price
                            price={price}
                            product={product}
                            currency={currency}
                            originalPrice={originalPrice}
                          />

                          <div className="mb-4">
                            {variantTitle?.map((a, i) => (
                              <span key={i + 1}>
                                <h4 className="py-1 text-sm">
                                  {showingTranslateValue(a?.name)}:
                                </h4>
                                <div className="mb-3 flex flex-row">
                                  <VariantList
                                    att={a._id}
                                    lang={lang}
                                    option={a.option}
                                    setValue={setValue}
                                    varTitle={variantTitle}
                                    setSelectVa={setSelectVa}
                                    variants={product.variants}
                                    selectVariant={selectVariant}
                                    setSelectVariant={setSelectVariant}
                                  />
                                </div>
                              </span>
                            ))}
                          </div>

                          <div className="mt-4 flex items-center">
                            <div className="space-s-3 sm:space-s-4 flex w-full items-center justify-between">
                              <div className="group flex h-11 flex-shrink-0 items-center justify-between overflow-hidden rounded-md border border-gray-300 md:h-12">
                                <button
                                  onClick={() => setItem(item - 1)}
                                  disabled={item === 1}
                                  className="text-heading flex h-full w-8 flex-shrink-0 items-center justify-center border-e border-gray-300 transition duration-300 ease-in-out hover:text-gray-500 focus:outline-none md:w-12"
                                >
                                  <span className="text-dark text-base">
                                    <FiMinus />
                                  </span>
                                </button>
                                <p className="duration-250 text-heading flex h-full w-8  flex-shrink-0 cursor-default items-center justify-center text-base font-semibold transition-colors ease-in-out  md:w-20 xl:w-24">
                                  {item}
                                </p>
                                <button
                                  onClick={() => setItem(item + 1)}
                                  disabled={selectVariant?.quantity <= item}
                                  className="text-heading flex h-full w-8 flex-shrink-0 items-center justify-center border-s border-gray-300 transition duration-300 ease-in-out hover:text-gray-500 focus:outline-none md:w-12"
                                >
                                  <span className="text-dark text-base">
                                    <FiPlus />
                                  </span>
                                </button>
                              </div>
                              <button
                                onClick={() => handleAddToCart(product)}
                                className="ml-4 inline-flex h-12 w-full cursor-pointer items-center justify-center rounded-md border-0 border-transparent bg-emerald-500 p-4 text-center font-serif text-sm font-semibold leading-4 text-white transition duration-300 ease-in-out hover:bg-emerald-600 hover:text-white focus:outline-none focus-visible:outline-none md:px-6 md:py-3.5 lg:px-8 lg:py-4"
                              >
                                {t("common:addToCart")}
                              </button>
                            </div>
                          </div>

                          <div className="mt-4 flex flex-col">
                            <span className="d-block py-1 font-serif text-sm font-semibold">
                              <span className="text-gray-800">
                                {t("common:category")}:
                              </span>{" "}
                              <Link
                                href={`/search?category=${category_name}&_id=${product?.category?._id}`}
                              >
                                <button
                                  type="button"
                                  className="ml-2 font-serif font-medium text-gray-600 underline hover:text-teal-600"
                                  onClick={() => setIsLoading(!isLoading)}
                                >
                                  {category_name}
                                </button>
                              </Link>
                            </span>
                            <Tags product={product} />
                          </div>

                          <div className="mt-8">
                            <p className="text-xs font-medium text-gray-700 sm:text-sm">
                              Call Us To Order By Mobile Number :{" "}
                              <span className="font-semibold text-emerald-700">
                                {globalSetting?.contact}
                              </span>{" "}
                            </p>
                          </div>

                          {/* social share */}
                          <div className="mt-2">
                            <h3 className="mb-1 font-serif text-base font-semibold">
                              {t("common:shareYourSocial")}
                            </h3>
                            <p className="font-sans text-sm text-gray-500">
                              {t("common:shareYourSocialText")}
                            </p>
                            <ul className="mt-4 flex">
                              <li className="mr-2 flex items-center rounded-full border border-gray-100 text-center  transition duration-500 ease-in-out hover:bg-emerald-500">
                                <FacebookShareButton
                                  url={`https://auction-pikary.com/product/${router.query.slug}`}
                                  quote=""
                                >
                                  <FacebookIcon size={32} round />
                                </FacebookShareButton>
                              </li>
                              {/* <li className="mr-2 flex items-center rounded-full border border-gray-100 text-center  transition duration-500 ease-in-out hover:bg-emerald-500">
                                <TwitterShareButton
                                  url={`https://auction-pikary.com/product/${router.query.slug}`}
                                  quote=""
                                >
                                  <TwitterIcon size={32} round />
                                </TwitterShareButton>
                              </li>
                              <li className="mr-2 flex items-center rounded-full border border-gray-100 text-center  transition duration-500 ease-in-out hover:bg-emerald-500">
                                <RedditShareButton
                                  url={`https://auction-pikary.com/product/${router.query.slug}`}
                                  quote=""
                                >
                                  <RedditIcon size={32} round />
                                </RedditShareButton>
                              </li> */}
                              <li className="mr-2 flex items-center rounded-full border border-gray-100 text-center  transition duration-500 ease-in-out hover:bg-emerald-500">
                                <WhatsappShareButton
                                  url={`https://auction-pikary.com/product/${router.query.slug}`}
                                  quote=""
                                >
                                  <WhatsappIcon size={32} round />
                                </WhatsappShareButton>
                              </li>
                              {/* <li className="mr-2 flex items-center rounded-full border border-gray-100 text-center  transition duration-500 ease-in-out hover:bg-emerald-500">
                                <LinkedinShareButton
                                  url={`https://auction-pikary.com/product/${router.query.slug}`}
                                  quote=""
                                >
                                  <LinkedinIcon size={32} round />
                                </LinkedinShareButton>
                              </li> */}
                            </ul>
                          </div>
                        </div>
                      </div>
                      {/* shipping description card */}
                      <div className="w-full md:w-5/12 lg:w-6/12 xl:w-5/12">
                        <div className="mt-6 rounded-lg border border-gray-100 bg-gray-50 p-4 md:mt-0 lg:mt-0 lg:p-8">
                          <Card />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Tabs here */}
                <div className="w-full mt-6">
                  <Tab.Group>
                    <Tab.List className="flex flex-col sm:flex-row  w-full border-b-2">
                      {["Features", "Technical Specifications", "Support"].map(
                        (tab) => (
                          <Tab
                            key={tab}
                            className={({ selected }) =>
                              `w-full max-w-[300px] py-2.5 text-lg font-bold 
                ${
                  selected
                    ? "bg-white border-b-2 border-emerald-500 text-emerald-500 focus:outline-none"
                    : "border-b-2 border-transparent hover:bg-emerald-500 rounded-sm hover:text-white"
                } 
                transition-all duration-300 ease-in-out `
                            }
                          >
                            {tab}
                          </Tab>
                        )
                      )}
                    </Tab.List>
                    <Tab.Panels className="mt-2">
                      <Tab.Panel>
                        <div
                          className="bullet-points"
                          dangerouslySetInnerHTML={{
                            __html: product.features,
                          }}
                        />
                      </Tab.Panel>
                      <Tab.Panel>
                        <div
                          className="bullet-points"
                          dangerouslySetInnerHTML={{
                            __html: product.technicalSpecifications,
                          }}
                        />
                      </Tab.Panel>
                      <Tab.Panel>
                        <div
                          className="bullet-points"
                          dangerouslySetInnerHTML={{
                            __html: product.supports,
                          }}
                        />
                      </Tab.Panel>
                    </Tab.Panels>
                  </Tab.Group>
                </div>
              </div>

              {/* related products */}
              {relatedProducts?.length >= 2 && (
                <div className="pt-10 lg:pb-10 lg:pt-20">
                  <h3 className="mb-3 font-serif text-lg font-semibold leading-7 hover:text-gray-600 lg:text-xl">
                    {t("common:relatedProducts")}
                  </h3>
                  <div className="flex">
                    <div className="w-full">
                      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:gap-3 lg:grid-cols-5 lg:gap-3 xl:grid-cols-5 2xl:grid-cols-6">
                        {relatedProducts?.slice(1, 13).map((product, i) => (
                          <ProductCard
                            key={product._id}
                            product={product}
                            attributes={attributes}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </Layout>
      )}
    </>
  );
};

// you can use getServerSideProps alternative for getStaticProps and getStaticPaths

export const getServerSideProps = async (context) => {
  const { slug } = context.params;

  const [data, attributes] = await Promise.all([
    ProductServices.getShowingStoreProducts({
      category: "",
      slug: slug,
    }),

    AttributeServices.getShowingAttributes({}),
  ]);
  let product = {};

  if (slug) {
    product = data?.products?.find((p) => p.slug === slug);
  }

  return {
    props: {
      product,
      relatedProducts: data?.relatedProducts,
      attributes,
    },
  };
};

export default ProductScreen;
