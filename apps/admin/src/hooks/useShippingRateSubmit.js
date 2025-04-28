import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";

//internal import
import { SidebarContext } from "@/context/SidebarContext";
import ShippingRateServices from "@/services/shippingRateServices";
import { notifyError, notifySuccess } from "@/utils/toast";
// import useTranslationValue from "./useTranslationValue";

const useShippingRateSubmit = (id, data) => {
  const { isDrawerOpen, closeDrawer, setIsUpdate, lang } =
    useContext(SidebarContext);
  const [resData, setResData] = useState({});
  const [checked, setChecked] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [children, setChildren] = useState([]);
  const [language, setLanguage] = useState(lang);
  const [published, setPublished] = useState(true);
  const [selectCategoryName, setSelectCategoryName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // const { handlerTextTranslateHandler } = useTranslationValue();

  const {
    register,
    handleSubmit,
    setValue,
    clearErrors,
    reset,
    formState: { errors },
  } = useForm();

  // console.log("lang", lang, language);

  // console.log("resData", resData);

  const onSubmit = async ({ weight, ratePerKg, city, baseCharge }) => {
    try {
      setIsSubmitting(true);

      const shippingData = {
        weight,
        ratePerKg,
        city,
        baseCharge,
        categoryId: checked ? checked : undefined,
      };

      // console.log("category submit", shippingData);
      // setIsSubmitting(false);
      // return;

      if (id) {
        const res = await ShippingRateServices.updateShippingRate(
          id,
          shippingData
        );
        setIsUpdate(true);
        setIsSubmitting(false);
        notifySuccess(res.message);
        closeDrawer();
        reset();
      } else {
        const res = await ShippingRateServices.addShippingRate(shippingData);
        setIsUpdate(true);
        setIsSubmitting(false);
        notifySuccess(res.message);
        closeDrawer();
      }
    } catch (err) {
      setIsSubmitting(false);
      notifyError(err ? err?.response?.data?.message : err?.message);
      closeDrawer();
    }
  };

  const handleSelectLanguage = (lang) => {
    setLanguage(lang);
    if (Object.keys(resData).length > 0) {
      setValue("name", resData.name[lang ? lang : "en"]);
      setValue("description", resData.description[lang ? lang : "en"]);
    }
  };

  useEffect(() => {
    if (!isDrawerOpen) {
      setResData({});
      setValue("weight", "");
      setValue("ratePerKg", "");
      setValue("city", "");
      setValue("baseCharge", "");
      setPublished(true);
      clearErrors("weight");
      clearErrors("ratePerKg");
      clearErrors("city");
      clearErrors("baseCharge");
      setSelectCategoryName("Home");
      setLanguage(lang);
      setValue("language", language);

      if (data !== undefined && data[0]?._id !== undefined) {
        setChecked(data[0]._id);
      }
      return;
    }
    if (id) {
      (async () => {
        try {
          const res = await ShippingRateServices.getShippingRateById(id);

          if (res) {
            setResData(res);
            setValue("language", language);
            setValue("categoryId", res.categoryId);
            setChecked(res.categoryId);
            setValue("weight", res.weight);
            setValue("ratePerKg", res.ratePerKg);
            setValue("city", res.city);
            setValue("baseCharge", res.baseCharge);
          }
        } catch (err) {
          notifyError(err ? err.response.data.message : err.message);
        }
      })();
    }
  }, [id, setValue, isDrawerOpen, language, clearErrors, data, lang]);

  return {
    register,
    handleSubmit,
    onSubmit,
    errors,
    imageUrl,
    setImageUrl,
    children,
    setChildren,
    published,
    setPublished,
    checked,
    setChecked,
    isSubmitting,
    selectCategoryName,
    setSelectCategoryName,
    handleSelectLanguage,
  };
};

export default useShippingRateSubmit;
