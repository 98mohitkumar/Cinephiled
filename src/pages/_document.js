import Document, { Head, Html, Main, NextScript } from "next/document";
import { ServerStyleSheet } from "styled-components";

export default class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App) => (props) => sheet.collectStyles(<App {...props} />)
        });

      const initialProps = await Document.getInitialProps(ctx);
      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        )
      };
    } finally {
      sheet.seal();
    }
  }

  render() {
    return (
      <Html lang='en'>
        <Head>
          <link rel='apple-touch-icon' sizes='180x180' href='/apple-touch-icon.png'></link>
          <link rel='icon' type='image/png' sizes='32x32' href='/favicon-32x32.png'></link>
          <link rel='icon' type='image/png' sizes='16x16' href='/favicon-16x16.png'></link>
          <link rel='manifest' href='/manifest.json' />
          <meta name='keywords' content='Cinema, Tv, Movies'></meta>
          <meta property='og:type' content='website' />
          <meta property='twitter:card' content='summary_large_image' />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
