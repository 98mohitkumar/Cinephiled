import Document, { Head, Html, Main, NextScript } from "next/document";

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang='en'>
        <Head>
          <link rel='preconnect' href='https://fonts.googleapis.com' />
          <link rel='preconnect' href='https://fonts.gstatic.com' crossOrigin={+true} />
          <link
            href='https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700&display=swap'
            rel='stylesheet'
          />
          <link
            href='https://fonts.googleapis.com/css2?family=Montserrat:wght@600&display=swap'
            rel='stylesheet'
          />

          <link rel='apple-touch-icon' sizes='180x180' href='/apple-touch-icon.png'></link>
          <link rel='icon' type='image/png' sizes='32x32' href='/favicon-32x32.png'></link>
          <link rel='icon' type='image/png' sizes='16x16' href='/favicon-16x16.png'></link>
          <link rel='manifest' href='/manifest.json' />
          <meta name='theme-color' content='#121212' />
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
