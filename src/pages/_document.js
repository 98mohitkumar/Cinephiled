import Document, { Head, Html, Main, NextScript } from "next/document";
import Script from "next/script";
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
          <meta name='theme-color' content='#121212' />
          <meta name='keywords' content='Cinema, Tv, Movies'></meta>
          <meta property='og:type' content='website' />
          <meta property='twitter:card' content='summary_large_image' />

          <meta name='google-site-verification' content={process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION} />

          {process.env.NODE_ENV !== "development" && (
            <Script id='ms-clarity' strategy='beforeInteractive'>
              {`(function(c,l,a,r,i,t,y){
              c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
              t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
              y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
              })(window, document, "clarity", "script", "${process.env.NEXT_PUBLIC_MS_CLARITY_TAG}");`}
            </Script>
          )}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
