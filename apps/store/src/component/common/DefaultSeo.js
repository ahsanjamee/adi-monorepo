import React from "react";
import { DefaultSeo as NextSeo } from "next-seo";

//internal import

import useAsync from "@hooks/useAsync";
import SettingServices from "@services/SettingServices";

const DefaultSeo = () => {
  const {
    data: globalSetting,
    loading,
    error,
  } = useAsync(SettingServices.getStoreCustomizationSetting);
  return (
    <NextSeo
      title={globalSetting?.meta_title || "Adi"}
      openGraph={{
        type: "website",
        locale: "en_IE",
        url: globalSetting?.meta_url || "https://adi-store.ovationdental.store",
        site_name: globalSetting?.meta_title || "Adi",
        images: [
          {
            url:
              globalSetting?.meta_img ||
              "https://res.cloudinary.com/dvml1gyhh/image/upload/v1725570508/ecom/auction.jpg",
            width: 800,
            height: 600,
            alt: globalSetting?.meta_title || "Adi",
          },
        ],
      }}
      twitter={{
        handle: "@handle",
        site: "@site",
        cardType: "summary_large_image",
      }}
      additionalMetaTags={[
        {
          name: "viewport",
          content:
            "minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, viewport-fit=cover",
        },
        {
          name: "apple-mobile-web-app-capable",
          content: "yes",
        },
        {
          name: "theme-color",
          content: "#ffffff",
        },
      ]}
      additionalLinkTags={[
        {
          rel: "apple-touch-icon",
          href: "/icon-192x192.png",
        },
        {
          rel: "manifest",
          href: "/manifest.json",
        },
      ]}
    />
  );
};

export default DefaultSeo;
