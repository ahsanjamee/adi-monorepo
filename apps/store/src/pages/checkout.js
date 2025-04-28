import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { CardElement } from "@stripe/react-stripe-js";
import Link from "next/link";
import {
  IoReturnUpBackOutline,
  IoArrowForward,
  IoBagHandle,
  IoWalletSharp,
} from "react-icons/io5";
import { ImCreditCard } from "react-icons/im";
import useTranslation from "next-translate/useTranslation";

//internal import

import Layout from "@layout/Layout";
import useAsync from "@hooks/useAsync";
import Label from "@component/form/Label";
import Error from "@component/form/Error";
import CartItem from "@component/cart/CartItem";
import InputArea from "@component/form/InputArea";
import useGetSetting from "@hooks/useGetSetting";
import InputShipping from "@component/form/InputShipping";
import InputPayment from "@component/form/InputPayment";
import useCheckoutSubmit from "@hooks/useCheckoutSubmit";
import useUtilsFunction from "@hooks/useUtilsFunction";
import SettingServices from "@services/SettingServices";
import Cookies from "js-cookie";
import InputSelect from "@component/form/InputSelect";
import ShippingRateServices from "@services/ShippingRateServices";

const Checkout = () => {
  const {
    handleSubmit,
    submitHandler,
    handleShippingCost,
    register,
    setValue,
    errors,
    showCard,
    setShowCard,
    error,
    stripe,
    couponInfo,
    couponRef,
    handleCouponCode,
    discountAmount,
    shippingCost,
    total,
    isEmpty,
    items,
    cartTotal,
    currency,
    isCheckoutSubmit,
    control,
    getValues,
    getFieldState,
  } = useCheckoutSubmit();

  const { t } = useTranslation();
  const { storeCustomizationSetting } = useGetSetting();
  const { showingTranslateValue } = useUtilsFunction();
  const [city, setCity] = useState("");
  const [shippingOptions, setShippingOptions] = useState([]);
  const { data: storeSetting } = useAsync(SettingServices.getStoreSetting);

  const calculateShippingCost = (data) => {
    return data.reduce((totalCost, item) => {
      const { baseCharge, weight, ratePerKg } = item;
      const shippingCost = baseCharge + weight * ratePerKg;
      return totalCost + shippingCost;
    }, 0); // Start the sum at 0
  };

  useEffect(() => {
    const shippingRateFetch = async () => {
      setShippingOptions([]);
      if (city !== "" && items.length > 0) {
        // handleShippingCost(100);
        items.map(async (item) => {
          const shippingRate =
            await ShippingRateServices.getShippingRateByCategoryAndCity(
              item.category._id,
              city === "Dhaka" ? "inside_dhaka" : "outside_dhaka"
            );
          setShippingOptions((prev) => {
            const isAlreadyAdded = prev.some(
              (option) =>
                option.city === shippingRate.city &&
                option.categoryId === shippingRate.categoryId
            );
            if (!isAlreadyAdded) {
              return [...prev, shippingRate];
            }
            return prev;
          });
        });
      }
    };

    shippingRateFetch();
  }, [city, items]);

  useEffect(() => {
    if (shippingOptions.length > 0) {
      handleShippingCost(calculateShippingCost(shippingOptions) || 0);
    } else {
      handleShippingCost(0);
    }
  }, [shippingOptions]);

  const options = [
    { value: "Bagerhat", label: "Bagerhat" },
    { value: "Bandarban", label: "Bandarban" },
    { value: "Barguna", label: "Barguna" },
    { value: "Barishal", label: "Barishal" },
    { value: "Bhola", label: "Bhola" },
    { value: "Bogura", label: "Bogura" },
    { value: "Brahmanbaria", label: "Brahmanbaria" },
    { value: "Chandpur", label: "Chandpur" },
    { value: "Chattogram", label: "Chattogram" },
    { value: "Chuadanga", label: "Chuadanga" },
    { value: "Cox's Bazar", label: "Cox's Bazar" },
    { value: "Cumilla", label: "Cumilla" },
    { value: "Dhaka", label: "Dhaka" },
    { value: "Dinajpur", label: "Dinajpur" },
    { value: "Faridpur", label: "Faridpur" },
    { value: "Feni", label: "Feni" },
    { value: "Gaibandha", label: "Gaibandha" },
    { value: "Gazipur", label: "Gazipur" },
    { value: "Gopalganj", label: "Gopalganj" },
    { value: "Habiganj", label: "Habiganj" },
    { value: "Jamalpur", label: "Jamalpur" },
    { value: "Jashore", label: "Jashore" },
    { value: "Jhalokathi", label: "Jhalokathi" },
    { value: "Jhenaidah", label: "Jhenaidah" },
    { value: "Joypurhat", label: "Joypurhat" },
    { value: "Khagrachari", label: "Khagrachari" },
    { value: "Khulna", label: "Khulna" },
    { value: "Kishoreganj", label: "Kishoreganj" },
    { value: "Kurigram", label: "Kurigram" },
    { value: "Kushtia", label: "Kushtia" },
    { value: "Lakshmipur", label: "Lakshmipur" },
    { value: "Lalmonirhat", label: "Lalmonirhat" },
    { value: "Madaripur", label: "Madaripur" },
    { value: "Magura", label: "Magura" },
    { value: "Manikganj", label: "Manikganj" },
    { value: "Meherpur", label: "Meherpur" },
    { value: "Moulvibazar", label: "Moulvibazar" },
    { value: "Munshiganj", label: "Munshiganj" },
    { value: "Mymensingh", label: "Mymensingh" },
    { value: "Naogaon", label: "Naogaon" },
    { value: "Narail", label: "Narail" },
    { value: "Narayanganj", label: "Narayanganj" },
    { value: "Narsingdi", label: "Narsingdi" },
    { value: "Natore", label: "Natore" },
    { value: "Netrokona", label: "Netrokona" },
    { value: "Nilphamari", label: "Nilphamari" },
    { value: "Noakhali", label: "Noakhali" },
    { value: "Pabna", label: "Pabna" },
    { value: "Panchagarh", label: "Panchagarh" },
    { value: "Patuakhali", label: "Patuakhali" },
    { value: "Pirojpur", label: "Pirojpur" },
    { value: "Rajbari", label: "Rajbari" },
    { value: "Rajshahi", label: "Rajshahi" },
    { value: "Rangamati", label: "Rangamati" },
    { value: "Rangpur", label: "Rangpur" },
    { value: "Satkhira", label: "Satkhira" },
    { value: "Shariatpur", label: "Shariatpur" },
    { value: "Sherpur", label: "Sherpur" },
    { value: "Sirajganj", label: "Sirajganj" },
    { value: "Sunamganj", label: "Sunamganj" },
    { value: "Sylhet", label: "Sylhet" },
    { value: "Tangail", label: "Tangail" },
    { value: "Thakurgaon", label: "Thakurgaon" },
  ];

  const cityError = {
    message: "City is required!",
  };

  useEffect(() => {
    if (Cookies.get("userInfo")) {
      const user = JSON.parse(Cookies.get("userInfo"));
      setValue("firstName", user.name === "User" ? "" : user.name);
      setValue("email", user.email);
      setValue("address", user.address);
      setValue("contact", user.phone);
      setValue("city", user.city);
      setValue("zipCode", user.zipCode);
    }
  }, []);

  return (
    <>
      <Layout title="Checkout" description="this is checkout page">
        <div className="mx-auto max-w-screen-2xl px-3 sm:px-10">
          <div className="py-10 lg:py-12 px-0 2xl:max-w-screen-2xl w-full xl:max-w-screen-xl flex flex-col md:flex-row lg:flex-row">
            <div className="md:w-full lg:w-3/5 flex h-full flex-col order-2 sm:order-1 lg:order-1">
              <div className="mt-5 md:mt-0 md:col-span-2">
                <form onSubmit={handleSubmit(submitHandler)}>
                  <div className="form-group">
                    <h2 className="font-semibold font-serif text-base text-gray-700 pb-3">
                      01.{" "}
                      {showingTranslateValue(
                        storeCustomizationSetting?.checkout?.personal_details
                      )}
                    </h2>
                    <div className="grid grid-cols-6 gap-6">
                      <div className="col-span-6 sm:col-span-6">
                        <InputArea
                          register={register}
                          label={showingTranslateValue(
                            storeCustomizationSetting?.checkout?.first_name
                          )}
                          name="firstName"
                          isRequired={true}
                          type="text"
                        />
                        <Error errorName={errors.firstName} />
                      </div>

                      <div className="col-span-6 sm:col-span-3">
                        <InputArea
                          register={register}
                          isRequired={false}
                          label={showingTranslateValue(
                            storeCustomizationSetting?.checkout?.email_address
                          )}
                          name="email"
                          type="email"
                          validation={{
                            pattern: {
                              value:
                                /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                              message: "Please enter a valid email address",
                            },
                          }}
                        />
                        <Error errorName={errors.email} />
                      </div>

                      <div className="col-span-6 sm:col-span-3">
                        <InputArea
                          register={register}
                          isRequired={true}
                          label={showingTranslateValue(
                            storeCustomizationSetting?.checkout?.checkout_phone
                          )}
                          validation={{
                            pattern: {
                              value: /^01\d{9}$/,
                              message: "Phone number is invalid",
                            },
                          }}
                          name="contact"
                        />

                        <Error errorName={errors.contact} />
                      </div>
                    </div>
                  </div>

                  <div className="form-group mt-12">
                    <h2 className="font-semibold font-serif text-base text-gray-700 pb-3">
                      02.{" "}
                      {showingTranslateValue(
                        storeCustomizationSetting?.checkout?.shipping_details
                      )}
                    </h2>

                    <div className="grid grid-cols-6 gap-6 mb-8">
                      <div className="col-span-6">
                        <InputArea
                          register={register}
                          isRequired={true}
                          label={showingTranslateValue(
                            storeCustomizationSetting?.checkout?.street_address
                          )}
                          name="address"
                          type="text"
                        />
                        <Error errorName={errors.address} />
                      </div>

                      {/* <div className="col-span-6 sm:col-span-6 lg:col-span-2">
                        <InputArea
                          register={register}
                          isRequired={true}
                          label={showingTranslateValue(
                            storeCustomizationSetting?.checkout?.city
                          )}
                          name="city"
                          type="text"
                          placeholder="Dhaka"
                        />
                        <Error errorName={errors.city} />
                      </div> */}

                      <div className="col-span-6 sm:col-span-6 lg:col-span-2">
                        <InputSelect
                          control={control}
                          name="city"
                          label="Select District"
                          options={options}
                          placeholder={"Select District"}
                          isRequired={true}
                          setCity={setCity}
                          validation={{ required: true }} // Add other validation if needed
                        />

                        <Error
                          errorName={
                            errors.city !== undefined ? cityError : null
                          }
                        />
                      </div>

                      <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                        <InputArea
                          register={register}
                          label={showingTranslateValue(
                            storeCustomizationSetting?.checkout?.zip_code
                          )}
                          name="zipCode"
                          isRequired={false}
                          type="text"
                        />
                        <Error errorName={errors.zipCode} />
                      </div>
                      <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                        <InputArea
                          register={register}
                          isRequired={false}
                          label={showingTranslateValue(
                            storeCustomizationSetting?.checkout?.country
                          )}
                          name="country"
                          defaultValue="Bangladesh"
                          disabled
                          type="text"
                          placeholder="Bangladesh"
                        />
                        <Error errorName={errors.country} />
                      </div>
                    </div>

                    <Label
                      label={showingTranslateValue(
                        storeCustomizationSetting?.checkout?.shipping_cost
                      )}
                    />
                    <div className="grid grid-cols-6 gap-6">
                      <div className="col-span-6 sm:col-span-3">
                        <InputShipping
                          currency={currency}
                          handleShippingCost={handleShippingCost}
                          register={register}
                          value="Courier"
                          time=""
                          cost={shippingCost}
                        />
                        <Error errorName={errors.shippingOption} />
                      </div>

                      {/* <div className="col-span-6 sm:col-span-3">
                        <InputShipping
                          currency={currency}
                          handleShippingCost={handleShippingCost}
                          register={register}
                          value="UPS"
                          time="7 Days"
                          cost={20}
                        />
                        <Error errorName={errors.shippingOption} />
                      </div> */}
                    </div>
                  </div>

                  <div className="form-group mt-12">
                    <h2 className="font-semibold font-serif text-base text-gray-700 pb-3">
                      03.{" "}
                      {showingTranslateValue(
                        storeCustomizationSetting?.checkout?.payment_method
                      )}
                    </h2>
                    {showCard && (
                      <div className="mb-3">
                        <CardElement />{" "}
                        <p className="text-red-400 text-sm mt-1">{error}</p>
                      </div>
                    )}
                    <div className="grid grid-cols-6 gap-6">
                      {storeSetting?.cod_status && (
                        <div className="col-span-6 sm:col-span-3">
                          <InputPayment
                            setShowCard={setShowCard}
                            register={register}
                            name={t("common:cashOnDelivery")}
                            value="Cash"
                            Icon={IoWalletSharp}
                          />
                          <Error errorName={errors.paymentMethod} />
                        </div>
                      )}

                      {storeSetting?.stripe_status && (
                        <div className="col-span-6 sm:col-span-3">
                          <InputPayment
                            setShowCard={setShowCard}
                            register={register}
                            name={t("common:creditCard")}
                            value="Card"
                            Icon={ImCreditCard}
                          />
                          <Error errorName={errors.paymentMethod} />
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-6 gap-4 lg:gap-6 mt-10">
                    <div className="col-span-6 sm:col-span-3">
                      <Link
                        href="/"
                        className="bg-indigo-50 border border-indigo-100 rounded py-3 text-center text-sm font-medium text-gray-700 hover:text-gray-800 hover:border-gray-300 transition-all flex justify-center font-serif w-full"
                      >
                        <span className="text-xl mr-2">
                          <IoReturnUpBackOutline />
                        </span>
                        {showingTranslateValue(
                          storeCustomizationSetting?.checkout?.continue_button
                        )}
                      </Link>
                    </div>
                    <div className="col-span-6 sm:col-span-3">
                      <button
                        type="submit"
                        disabled={isEmpty}
                        className="bg-emerald-500 hover:bg-emerald-600 border border-emerald-500 transition-all rounded py-3 text-center text-sm font-serif font-medium text-white flex justify-center w-full"
                      >
                        {isCheckoutSubmit ? (
                          <span className="flex justify-center text-center">
                            {" "}
                            <img
                              src="/loader/spinner.gif"
                              alt="Loading"
                              width={20}
                              height={10}
                            />{" "}
                            <span className="ml-2">
                              {t("common:processing")}
                            </span>
                          </span>
                        ) : (
                          <span className="flex justify-center text-center">
                            {showingTranslateValue(
                              storeCustomizationSetting?.checkout
                                ?.confirm_button
                            )}
                            <span className="text-xl ml-2">
                              {" "}
                              <IoArrowForward />
                            </span>
                          </span>
                        )}
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>

            <div className="md:w-full lg:w-2/5 lg:ml-10 xl:ml-14 md:ml-6 flex flex-col h-full md:sticky lg:sticky top-28 md:order-2 lg:order-2">
              <div className="border p-5 lg:px-8 lg:py-8 rounded-lg bg-white order-1 sm:order-2">
                <h2 className="font-semibold font-serif text-lg pb-4">
                  {showingTranslateValue(
                    storeCustomizationSetting?.checkout?.order_summary
                  )}
                </h2>

                <div className="overflow-y-scroll flex-grow scrollbar-hide w-full max-h-64 bg-gray-50 block">
                  {items.map((item) => (
                    <CartItem key={item.id} item={item} currency={currency} />
                  ))}

                  {isEmpty && (
                    <div className="text-center py-10">
                      <span className="flex justify-center my-auto text-gray-500 font-semibold text-4xl">
                        <IoBagHandle />
                      </span>
                      <h2 className="font-medium font-serif text-sm pt-2 text-gray-600">
                        No Item Added Yet!
                      </h2>
                    </div>
                  )}
                </div>

                <div className="flex items-center mt-4 py-4 lg:py-4 text-sm w-full font-semibold text-heading last:border-b-0 last:text-base last:pb-0">
                  <form className="w-full">
                    {couponInfo.couponCode ? (
                      <span className="bg-emerald-50 px-4 py-3 leading-tight w-full rounded-md flex justify-between">
                        {" "}
                        <p className="text-emerald-600">Coupon Applied </p>{" "}
                        <span className="text-red-500 text-right">
                          {couponInfo.couponCode}
                        </span>
                      </span>
                    ) : (
                      <div className="flex flex-col sm:flex-row items-start justify-end">
                        <input
                          ref={couponRef}
                          type="text"
                          placeholder={t("common:couponCode")}
                          className="form-input py-2 px-3 md:px-4 w-full appearance-none transition ease-in-out border text-input text-sm rounded-md h-12 duration-200 bg-white border-gray-200 focus:ring-0 focus:outline-none focus:border-emerald-500 placeholder-gray-500 placeholder-opacity-75"
                        />
                        <button
                          onClick={handleCouponCode}
                          className="md:text-sm leading-4 inline-flex items-center cursor-pointer transition ease-in-out duration-300 font-semibold text-center justify-center border border-gray-200 rounded-md placeholder-white focus-visible:outline-none focus:outline-none px-5 md:px-6 lg:px-8 py-3 md:py-3.5 lg:py-3 mt-3 sm:mt-0 sm:ml-3 md:mt-0 md:ml-3 lg:mt-0 lg:ml-3 hover:text-white hover:bg-emerald-500 h-12 text-sm lg:text-base w-full sm:w-auto"
                        >
                          {showingTranslateValue(
                            storeCustomizationSetting?.checkout?.apply_button
                          )}
                        </button>
                      </div>
                    )}
                  </form>
                </div>
                <div className="flex items-center py-2 text-sm w-full font-semibold text-gray-500 last:border-b-0 last:text-base last:pb-0">
                  {showingTranslateValue(
                    storeCustomizationSetting?.checkout?.sub_total
                  )}
                  <span className="ml-auto flex-shrink-0 text-gray-800 font-bold">
                    {currency}
                    {cartTotal?.toFixed(2)}
                  </span>
                </div>
                <div className="flex items-center py-2 text-sm w-full font-semibold text-gray-500 last:border-b-0 last:text-base last:pb-0">
                  {showingTranslateValue(
                    storeCustomizationSetting?.checkout?.shipping_cost
                  )}
                  <span className="ml-auto flex-shrink-0 text-gray-800 font-bold">
                    {currency}
                    {shippingCost.toFixed(2)}
                  </span>
                </div>
                <div className="flex items-center py-2 text-sm w-full font-semibold text-gray-500 last:border-b-0 last:text-base last:pb-0">
                  {showingTranslateValue(
                    storeCustomizationSetting?.checkout?.discount
                  )}
                  <span className="ml-auto flex-shrink-0 font-bold text-orange-400">
                    {currency}
                    {discountAmount.toFixed(2)}
                  </span>
                </div>
                <div className="border-t mt-4">
                  <div className="flex items-center font-bold font-serif justify-between pt-5 text-sm uppercase">
                    {showingTranslateValue(
                      storeCustomizationSetting?.checkout?.total_cost
                    )}
                    <span className="font-serif font-extrabold text-lg">
                      {currency}
                      {parseFloat(total).toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default dynamic(() => Promise.resolve(Checkout), { ssr: false });
