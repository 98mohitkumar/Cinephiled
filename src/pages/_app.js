import "styles/globals.css";
import Layout from "components/Layout/Layout";
import { AnimatePresence } from "framer-motion";
import { Manrope, Montserrat } from "next/font/google";
import Head from "next/head";
import { useRouter } from "next/router";
import { SessionProvider } from "next-auth/react";
import { Fragment, useEffect, useState } from "react";
import ListsContextProvider from "Store/ListsContext";
import MediaContextProvider from "Store/MediaContext";
import UserContextProvider from "Store/UserContext";
import { Loader } from "styles/GlobalComponents";
import Theme from "styles/theme";

const manrope = Manrope({
  subsets: ["latin"],
  weights: [400, 500, 600, 700],
  variable: "--manrope"
});

const montserrat = Montserrat({
  subsets: ["latin"],
  weights: [600],
  variable: "--montserrat"
});

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handleStart = (url) => {
      // only compare base path without query
      url.split("?")[0] !== router.asPath.split("?")[0] ? setIsLoading(true) : setIsLoading(false);
    };

    const handleComplete = () => {
      setIsLoading(false);
      document.body.style.overflow = "auto";
    };

    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleComplete);
    router.events.on("routeChangeError", handleComplete);

    return () => {
      router.events.off("routeChangeStart", handleStart);
      router.events.off("routeChangeComplete", handleComplete);
      router.events.off("routeChangeError", handleComplete);
    };
  }, [router]);

  return (
    <Fragment>
      <Head>
        <title>Cinephiled</title>
      </Head>

      <Theme>
        <SessionProvider session={session} refetchOnWindowFocus={false}>
          <UserContextProvider>
            <ListsContextProvider>
              <MediaContextProvider>
                <AnimatePresence mode='wait'>
                  {isLoading ? (
                    <Loader />
                  ) : (
                    <Layout
                      key={router.pathname}
                      className={`${manrope.variable} ${montserrat.variable} main-wrapper`}>
                      <Component {...pageProps} />
                    </Layout>
                  )}
                </AnimatePresence>
              </MediaContextProvider>
            </ListsContextProvider>
          </UserContextProvider>
        </SessionProvider>
      </Theme>
    </Fragment>
  );
}

export default MyApp;
