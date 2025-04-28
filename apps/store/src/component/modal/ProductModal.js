import useTranslation from "next-translate/useTranslation";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { FiMinus, FiPlus } from "react-icons/fi";

//internal import
import Price from "@component/common/Price";
import Stock from "@component/common/Stock";
import Tags from "@component/common/Tags";
import { notifyError } from "@utils/toast";
import useAddToCart from "@hooks/useAddToCart";
import MainModal from "@component/modal/MainModal";
import Discount from "@component/common/Discount";
import VariantList from "@component/variants/VariantList";
import { SidebarContext } from "@context/SidebarContext";
import useUtilsFunction from "@hooks/useUtilsFunction";
import { handleLogEvent } from "@utils/analytics";

const ProductModal = ({
  modalOpen,
  setModalOpen,
  product,
  attributes,
  currency,
}) => {
  const router = useRouter();
  const { setIsLoading, isLoading } = useContext(SidebarContext);
  const { t } = useTranslation("ns1");

  const { handleAddItem, setItem, item } = useAddToCart();
  const { lang, showingTranslateValue, getNumber, getNumberTwo } =
    useUtilsFunction();

  // react hook
  const [value, setValue] = useState("");
  const [price, setPrice] = useState(0);
  const [img, setImg] = useState("");
  const [originalPrice, setOriginalPrice] = useState(0);
  const [stock, setStock] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [selectVariant, setSelectVariant] = useState({});
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
  // console.log("product", product);

  useEffect(() => {
    const res = Object.keys(Object.assign({}, ...product?.variants));

    const varTitle = attributes?.filter((att) => res.includes(att?._id));

    setVariantTitle(varTitle?.sort());
  }, [variants, attributes]);

  const handleAddToCart = (p) => {
    if (p.variants.length === 1 && p.variants[0].quantity < 1)
      return notifyError("Insufficient stock");

    if (stock <= 0) return notifyError("Insufficient stock");

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
          p?.variants.length <= 0
            ? p._id
            : p._id +
              "-" +
              variantTitle?.map((att) => selectVariant[att._id]).join("-")
        }`,
        title: `${
          p?.variants.length <= 0
            ? showingTranslateValue(p.title)
            : showingTranslateValue(p.title) +
              "-" +
              variantTitle
                ?.map((att) =>
                  att.variants?.find((v) => v._id === selectVariant[att._id])
                )
                .map((el) => showingTranslateValue(el?.name))
        }`,
        image: img,
        variant: selectVariant || {},
        price:
          p.variants.length === 0
            ? getNumber(p.prices.price)
            : getNumber(price),
        originalPrice:
          p.variants.length === 0
            ? getNumber(p.prices.originalPrice)
            : getNumber(originalPrice),
      };

      // console.log("newItem", newItem);

      handleAddItem(newItem);
    } else {
      return notifyError("Please select all variant first!");
    }
  };

  const handleMoreInfo = (slug) => {
    setModalOpen(false);

    router.push(`/product/${slug}`);
    setIsLoading(!isLoading);
    handleLogEvent("product", `opened ${slug} product details`);
  };

  const category_name = showingTranslateValue(product?.category?.name)
    ?.toLowerCase()
    ?.replace(/[^A-Z0-9]+/gi, "-");

  // console.log("product", product, "stock", stock);

  return (
    <>
      <MainModal modalOpen={modalOpen} setModalOpen={setModalOpen}>
        <div className="inline-block h-full transform overflow-y-auto rounded-2xl bg-white align-middle shadow-xl transition-all">
          <div className="flex w-full max-w-4xl flex-col overflow-hidden md:flex-row lg:flex-row">
            <Link href={`/product/${product.slug}`} passHref>
              <div
                onClick={() => setModalOpen(false)}
                className="flex h-auto flex-shrink-0 cursor-pointer items-center justify-center"
              >
                <Discount product={product} discount={discount} modal />
                {product.image[0] ? (
                  <Image
                    src={img || product.image[0]}
                    width={420}
                    height={420}
                    alt="product"
                  />
                ) : (
                  <Image
                    src="https://res.cloudinary.com/ahossain/image/upload/v1655097002/placeholder_kvepfp.png"
                    width={420}
                    height={420}
                    alt="product Image"
                  />
                )}
              </div>
            </Link>

            <div className="flex w-full flex-col p-5 text-left md:p-8">
              <div className="-mt-1.5 mb-2 block md:mb-2.5">
                <Link href={`/product/${product.slug}`} passHref>
                  <h1
                    onClick={() => setModalOpen(false)}
                    className="text-heading cursor-pointer font-serif text-lg font-semibold hover:text-black md:text-xl lg:text-2xl"
                  >
                    {showingTranslateValue(product?.title)}
                  </h1>
                </Link>
                <div
                  className={`${
                    stock <= 0 ? "relative mb-2 py-1" : "relative"
                  }`}
                >
                  <Stock stock={stock} />
                </div>
              </div>
              <p className="text-sm leading-6 text-gray-500 md:leading-6">
                <div
                  dangerouslySetInnerHTML={{
                    __html: showingTranslateValue(product?.description),
                  }}
                />
              </p>
              <div className="my-4 flex items-center">
                <Price
                  product={product}
                  price={price}
                  currency={currency}
                  originalPrice={originalPrice}
                />
              </div>

              <div className="mb-1">
                {variantTitle?.map((a, i) => (
                  <span key={a._id}>
                    <h4 className="py-1 font-serif text-sm font-bold text-gray-700">
                      {showingTranslateValue(a?.name)}:
                    </h4>
                    <div className="mb-3 flex flex-row">
                      <VariantList
                        att={a._id}
                        lang={lang}
                        option={a.option}
                        setValue={setValue}
                        varTitle={variantTitle}
                        variants={product?.variants}
                        setSelectVa={setSelectVa}
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
                      disabled={
                        product.quantity < item || product.quantity === item
                      }
                      className="text-heading flex h-full w-8 flex-shrink-0 items-center justify-center border-s border-gray-300 transition duration-300 ease-in-out hover:text-gray-500 focus:outline-none md:w-12"
                    >
                      <span className="text-dark text-base">
                        <FiPlus />
                      </span>
                    </button>
                  </div>
                  <button
                    onClick={() => handleAddToCart(product)}
                    disabled={product.quantity < 1}
                    className="ml-4 inline-flex h-12 w-full cursor-pointer items-center justify-center rounded-md border-0 border-transparent bg-emerald-500 p-4 text-center font-serif text-sm font-semibold leading-4 text-white transition duration-300 ease-in-out hover:bg-emerald-600 hover:text-white focus:outline-none focus-visible:outline-none md:px-6 md:py-3.5 lg:px-8 lg:py-4"
                  >
                    {t("common:addToCart")}
                  </button>
                </div>
              </div>
              <div className="mt-4 flex items-center">
                <div className="space-s-3 sm:space-s-4 flex w-full items-center justify-between">
                  <div>
                    <span className="d-block py-1 font-serif text-sm font-semibold">
                      <span className="text-gray-700">
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

                  <div>
                    <button
                      onClick={() => handleMoreInfo(product.slug)}
                      className="font-sans text-sm font-medium text-orange-500"
                    >
                      {t("common:moreInfo")}
                    </button>
                  </div>
                </div>
              </div>
              {/* <div className="mt-2 flex justify-end">
                <p className="text-xs text-gray-600 sm:text-sm">
                  Call Us To Order By Mobile Number :{" "}
                  <span className="font-semibold text-emerald-700">
                    +0044235234
                  </span>{" "}
                </p>
              </div> */}
            </div>
          </div>
        </div>
      </MainModal>
    </>
  );
};

export default ProductModal;
