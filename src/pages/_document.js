import Document, { Head, Html, Main, NextScript } from 'next/document';
import { ServerStyleSheet } from 'styled-components';

export default class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App) => (props) =>
            sheet.collectStyles(<App {...props} />)
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
      <Html>
        <Head>
          <script
            dangerouslySetInnerHTML={{
              __html: `history.scrollRestoration = "manual"`
            }}
          />

          <link rel='preconnect' href='https://fonts.googleapis.com' />
          <link
            rel='preconnect'
            href='https://fonts.gstatic.com'
            crossOrigin={+true}
          />
          <link
            href='https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700&display=swap'
            rel='stylesheet'
          />
          <link
            href='https://api.fontshare.com/css?f[]=satoshi@500,700&display=swap'
            rel='stylesheet'
          />

          <link rel='apple-touch-icon' href='/apple-touch-icon.png'></link>
          <link rel='manifest' href='/manifest.json' />
          <meta name='theme-color' content='#121212' />
          <meta name='keywords' content='Cinema, Tv, Movies'></meta>
          <meta
            name='description'
            content='Cinephiled - A one stop website to preview any movie or tv show with reviews, ratings, description and posters.'
          />

          <meta
            property='og:description'
            content='Cinephiled - A one stop website to preview any movie or tv show with reviews, ratings, description and posters.'
          />

          <meta property='twitter:card' content='summary_large_image' />
          <meta property='twitter:title' content='Cinephiled' />
          <meta
            property='twitter:description'
            content='Cinephiled - A one stop website to preview any movie or tv show with reviews, ratings, discription and posters.'
          />
          <meta
            property='twitter:image'
            content='https://i.imgur.com/Jtl3tJG.png'
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
