/* eslint-disable @next/next/no-img-element */
import useTranslation from "next-translate/useTranslation";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { IoCloseOutline, IoSearchOutline } from "react-icons/io5";
import { handleLogEvent } from "@utils/analytics";
import { useQuery } from "react-query";
import ProductServices from "@services/ProductServices";
import Loading from "@component/preloader/Loading";
const SearchBar = () => {
  const [searchText, setSearchText] = useState("");
  const [showSearch, setShowSearch] = useState(false);

  const { t } = useTranslation();
  const router = useRouter();
  const handleSubmit = (e) => {
    e.preventDefault();

    // return;
    if (searchText) {
      router.push(`/search?query=${searchText}`, null, { scroll: false });
      setSearchText("");
      handleLogEvent("search", `searched ${searchText}`);
    } else {
      router.push(`/ `, null, { scroll: false });
      setSearchText("");
    }
  };

  const { data, isLoading } = useQuery(
    ["search", searchText],
    () => {
      return ProductServices.getShowingStoreProducts({
        title: encodeURIComponent(searchText),
      });
    },
    {
      enabled: !!searchText,
    }
  );

  const handleOnBlur = (e) => {
    if (e.target.value === "") {
      setShowSearch(false);
    }
  };

  return (
    <div className="w-full transition-all duration-200 ease-in-out md:mx-12 lg:mx-4 lg:flex lg:max-w-[420px] xl:mx-0 xl:max-w-[550px] 2xl:max-w-[650px]">
      <div className="relative z-30 flex w-full flex-shrink-0 flex-col justify-center">
        <div className="mx-auto flex w-full flex-col">
          <form
            className="relative w-full  rounded-md bg-white pr-16 shadow-lg md:pr-16"
            onSubmit={handleSubmit}
          >
            <label className=" flex items-center py-0.5">
              <input
                onChange={(e) => setSearchText(e.target.value)}
                value={searchText}
                className="form-input text-input min-h-10 h-10 w-full appearance-none rounded-md border border-none bg-white pl-5 font-sans text-sm placeholder-gray-500 placeholder-opacity-75 outline-none transition duration-200 ease-in-out focus:outline-none focus:ring-0"
                placeholder={t(`common:search-placeholder`)}
                onFocus={() => setShowSearch(true)}
                onBlur={(c) => handleOnBlur(c)}
              />
            </label>
            <div
              className={`w-16 h-full absolute right-0 top-0 rounded-r-md ${
                showSearch ? "bg-white" : "bg-emerald-500"
              }  flex items-center justify-center`}
            >
              {searchText === "" ? (
                <IoSearchOutline
                  color={showSearch ? "black" : "white"}
                  className="h-6 w-6  lg:top-[10px]"
                />
              ) : (
                <IoCloseOutline
                  color={showSearch ? "black" : "white"}
                  className="h-6 w-6 cursor-pointer fill-white"
                  onClick={() => {
                    setShowSearch(false);
                    setSearchText("");
                  }}
                />
              )}
            </div>
            {showSearch && (
              <div className="absolute top-[40px] z-10 max-h-[400px] min-h-[200px] w-full overflow-y-auto rounded-b-lg bg-white p-2  pt-0 shadow-xl lg:p-2 ">
                {isLoading ? (
                  <div className="flex h-[140px] items-center justify-center text-2xl text-slate-400">
                    <Loading />
                  </div>
                ) : data?.products?.length > 0 ? (
                  <div>
                    {data?.products.map((item) => (
                      <div
                        className=" flex cursor-pointer items-center rounded-xl p-2 text-base hover:bg-slate-100 lg:text-base"
                        key={item._id}
                        onClick={() =>
                          router.push(`/product/${item.slug}`, null, {
                            scroll: false,
                          })
                        }
                      >
                        {item.image.length ? (
                          <img
                            className="mr-6  max-w-[50px] lg:max-w-[70px]"
                            src={item.image[0]}
                            alt=""
                          />
                        ) : (
                          <img
                            className="mr-6  max-w-[50px] lg:max-w-[70px]"
                            src={"/placeholder.png"}
                            alt=""
                          />
                        )}
                        <div className="flex flex-col items-start justify-between">
                          <div className="text-md lg:text-md text-slate-400">
                            {item.title.en}
                          </div>
                          <div className="flex text-xs">
                            <b className="mr-1">Price:</b>{" "}
                            {item.prices.discount !== 0 && (
                              <span className="mr-1 line-through">
                                {item.prices.originalPrice}৳
                              </span>
                            )}{" "}
                            {item.prices.price}৳ <span className="mx-3">|</span>
                            <b className="mr-1">Stock:</b> {item.stock}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex h-[140px] items-center justify-center text-base text-slate-400 lg:text-base">
                    No product found
                  </div>
                )}
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;

// export const getServerSideProps = async (context) => {
//   const { query } = context.query;

//   const [data, attributes] = await Promise.all([
//     ProductServices.getShowingStoreProducts({
//       title: query ? encodeURIComponent(query) : "",
//     }),
//     AttributeServices.getShowingAttributes({}),
//   ]);

//   return {
//     props: {
//       products: data?.products,
//       attributes,
//     },
//   };
// };
