import Head from "next/head";

import { siteInfo } from "data/global";

const MetaWrapper = ({ title, description, image, url, children }) => {
  const metaTitle = title || siteInfo.title;
  const metaImage = image || siteInfo.image;
  const metaDescription = description || siteInfo.description;
  const metaUrl = url || siteInfo.url;

  return (
    <Head>
      {/* title */}
      <title>{metaTitle}</title>
      <meta name='title' content={metaTitle} key='title' />
      <meta property='og:title' content={metaTitle} key='og_title' />
      <meta property='twitter:title' content={metaTitle} key='twitter_title' />

      {/* description */}
      <meta name='description' content={metaDescription} key='description' />
      <meta property='og:description' content={metaDescription} key='og_description' />
      <meta property='twitter:description' content={metaDescription} key='twitter_description' />

      {/* url */}
      <meta property='og:url' content={metaUrl} key='og_url' />

      {/* image */}
      <meta property='og:image' content={metaImage} key='og_image' />
      <meta property='twitter:image' content={metaImage} key='twitter_image' />

      {/* twitter card */}
      <meta name='twitter:card' content='summary_large_image' key='twitter_card' />

      {children}
    </Head>
  );
};

export default MetaWrapper;
