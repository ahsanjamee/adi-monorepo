import SettingServices from "@services/SettingServices";
import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);

    // Fetch general metadata from backend API
    const setting = await SettingServices.getStoreCustomizationSetting();

    console.log(setting.seo);

    return { ...initialProps, setting };
  }

  render() {
    const setting = this.props.setting;
    return (
      <Html lang="en">
        <Head>
          <link rel="icon" href={setting?.favicon || "/favicon.png"} />
          <meta property="og:title" content={setting?.meta_title || "Adi"} />
          <meta property="og:type" content="eCommerce Website" />
          <meta
            property="og:description"
            content={setting?.seo?.meta_description || "Electronics mart"}
          />
          <meta
            name="keywords"
            content={setting?.seo?.meta_keywords || "ecommenrce online store"}
          />
          <meta
            property="og:url"
            content={
              setting?.seo?.meta_url || "https://adi-store.ovationdental.store"
            }
          />
          <meta
            property="og:image"
            content={
              setting?.seo?.meta_img ||
              "https://res.cloudinary.com/dvml1gyhh/image/upload/v1725570508/ecom/auction.jpg"
            }
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
