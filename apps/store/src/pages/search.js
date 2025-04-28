import React, { useContext, useEffect, useState } from "react";
import Image from "next/image";
import useTranslation from "next-translate/useTranslation";

//internal import
import Layout from "@layout/Layout";
import useFilter from "@hooks/useFilter";
import Card from "@component/cta-card/Card";
import ProductServices from "@services/ProductServices";
import ProductCard from "@component/product/ProductCard";
import CategoryCarousel from "@component/carousel/CategoryCarousel";
import { SidebarContext } from "@context/SidebarContext";
import Loading from "@component/preloader/Loading";
import AttributeServices from "@services/AttributeServices";

const Search = ({ products, attributes }) => {
  const { t } = useTranslation();
  const { isLoading, setIsLoading } = useContext(SidebarContext);
  const [visibleProduct, setVisibleProduct] = useState(18);

  useEffect(() => {
    setIsLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [products]);

  const { setSortedField, productData } = useFilter(products);

  return (
    <Layout title="Search" description="This is search page">
      <div className="mx-auto max-w-screen-2xl px-3 sm:px-10">
        <div className="flex py-10 lg:py-12">
          <div className="flex w-full">
            <div className="w-full">
              <div className="grid-col grid w-full grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:gap-6">
                {/* <Card /> */}
              </div>
              <div className="relative">
                <CategoryCarousel />
              </div>
              {productData?.length === 0 ? (
                <div className="flex justify-center items-center flex-col my-5 p-5 text-center align-middle">
                  <Image
                    className="my-4"
                    src="/no-result.svg"
                    alt="no-result"
                    width={400}
                    height={380}
                  />
                  <h2 className="mt-2 text-center font-serif text-lg font-medium text-gray-600 md:text-xl lg:text-2xl xl:text-2xl">
                    {t("common:sorryText")} 😞
                  </h2>
                </div>
              ) : (
                <div className="my-3 flex justify-between rounded border border-gray-100 bg-orange-100 p-3">
                  <h6 className="font-serif text-sm">
                    {t("common:totalI")}{" "}
                    <span className="font-bold">{productData?.length}</span>{" "}
                    {t("common:itemsFound")}
                  </h6>
                  <span className="font-serif text-sm">
                    <select
                      onChange={(e) => setSortedField(e.target.value)}
                      className="block w-full cursor-pointer rounded border-0 bg-white py-0 pr-10 font-serif text-sm font-medium focus:ring-0"
                    >
                      <option className="px-3" value="All" defaultValue hidden>
                        {t("common:sortByPrice")}
                      </option>
                      <option className="px-3" value="Low">
                        {t("common:lowToHigh")}
                      </option>
                      <option className="px-3" value="High">
                        {t("common:highToLow")}
                      </option>
                    </select>
                  </span>
                </div>
              )}

              {isLoading ? (
                <Loading loading={isLoading} />
              ) : (
                <>
                  <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:gap-3 lg:grid-cols-5 lg:gap-3 xl:grid-cols-6 2xl:grid-cols-6">
                    {productData?.slice(0, visibleProduct).map((product, i) => (
                      <ProductCard
                        key={i + 1}
                        product={product}
                        attributes={attributes}
                      />
                    ))}
                  </div>

                  {productData?.length > visibleProduct && (
                    <button
                      onClick={() => setVisibleProduct((pre) => pre + 10)}
                      className="mx-auto mt-6 flex h-12 w-auto items-center justify-center rounded-md border-0 border-transparent bg-indigo-100 px-5 py-2 text-center text-sm font-medium leading-5 text-gray-700 transition duration-300 ease-in-out hover:bg-emerald-600 hover:text-white focus:outline-none focus-visible:outline-none md:px-6 md:py-3 md:text-sm lg:px-8 lg:py-3 lg:text-sm"
                    >
                      {t("common:loadMoreBtn")}
                    </button>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Search;

export const getServerSideProps = async (context) => {
  const { query, _id } = context.query;

  const [data, attributes] = await Promise.all([
    ProductServices.getShowingStoreProducts({
      category: _id ? _id : "",
      title: query ? encodeURIComponent(query) : "",
    }),
    AttributeServices.getShowingAttributes({}),
  ]);

  return {
    props: {
      products: data?.products,
      attributes,
    },
  };
};

// export const getServerSideProps = async (context) => {
//   const { query } = context.query;
//   const { Category } = context.query;
//   const { category } = context.query;
//   const data = await ProductServices.getShowingProducts();

//   let products = [];
//   //service filter with parent category
//   if (Category) {
//     products = data.filter(
//       (product) => product.parent.toLowerCase().replace("&", "").split(" ").join("-") === Category
//     );
//   }
//   //service filter with child category
//   if (category) {
//     products = data.filter(
//       (product) => product.children.toLowerCase().replace("&", "").split(" ").join("-") === category
//     );
//   }

//   //search result
//   if (query) {
//     products = data.filter((product) => product.title.toLowerCase().includes(query.toLowerCase()));
//   }

//   return {
//     props: {
//       products,
//     },
//   };
// };
