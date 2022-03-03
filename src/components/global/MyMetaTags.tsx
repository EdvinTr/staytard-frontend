import Head from "next/head";

interface GenerateMetaTagProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  language?: string;
  productMeta?: {
    priceAmount: string;
    currency: string;
  };
}
export const MyMetaTags = ({
  title = "",
  description = "",
  keywords = "",
  productMeta,
  image,
  url = "",
  language,
}: GenerateMetaTagProps) => {
  return (
    <Head>
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      <meta charSet="utf-8" />

      <title key="title">{title}</title>
      <meta name="description" content={description} key="description" />
      <meta name="keywords" content={keywords} key="keywords" />

      <meta property="og:title" content={title} key="ogTitle" />
      <meta
        property="og:image"
        content={image || "/img/staytard-logo.png"}
        key="ogImage"
      />
      <meta
        property="og:description"
        content={description}
        key="ogDescription"
      />
      <meta property="og:type" content="website" key="type" />

      <meta name="twitter:title" content={title} key="twitterTitle" />
      <meta
        name="twitter:description"
        content={description}
        key="twitterDescription"
      />
      <meta name="twitter:image" content={image} key="twitterImage" />
      <meta name="twitter:card" content="summary_large_image" key="card" />

      {productMeta && (
        <>
          <meta
            property="product:price:amount"
            content={productMeta.priceAmount}
          />
          <meta
            property="product:price:currency"
            content={productMeta.currency}
          />
        </>
      )}

      {/*     <meta name="theme-color" content="#118b92" />
        <link rel="manifest" href="/static/manifest/manifest.json" /> */}
      {/*     <meta name="author" content="..." /> */}
      {/*     <meta property="og:site_name" content="..." /> */}
      {/*    <meta property="og:url" content={`...${language}/${url}`} /> */}
      {/*     <link rel="alternate" href={`...${url}`} hrefLang="nl" />
        <link rel="alternate" href={`...${url}`} hrefLang="en" />
        <link rel="alternate" href={`...${url}`} hrefLang="fr" />
    
        <link rel="icon" type="image/png" href="" sizes="16x16" />
        <link rel="icon" type="image/png" href="" sizes="32x32" />
        <link rel="apple-touch-icon" href="" />
        <link rel="apple-touch-icon" sizes="180x180" href="" />
        <link rel="mask-icon" href="" color="#d04819" />
        <link rel="shortcut icon" href="" />
        <meta name="theme-color" content="#118b92" /> */}
    </Head>
  );
};
