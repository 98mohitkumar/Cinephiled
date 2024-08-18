import "styles/globals.css";
import Layout from "components/Layout/Layout";
import { Loader } from "components/Loading";
import Head from "next/head";
import { useRouter } from "next/router";
import { SessionProvider } from "next-auth/react";
import { Fragment, useEffect, useState } from "react";
import ListsContextProvider from "Store/ListsContext";
import MediaContextProvider from "Store/MediaContext";
import UserContextProvider from "Store/UserContext";
// import { LoaderContainer } from "styles/GlobalComponents";
import Theme from "styles/theme";

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const handleComplete = () => {
      setIsLoading(false);
      document.body.style.overflow = "auto";
    };

    const handleStart = (url) => {
      // only compare base path without query
      if (url.split("?")[0] !== router.asPath.split("?")[0]) {
        setIsLoading(true);
        document.body.style.overflow = "hidden";
      } else {
        handleComplete();
      }
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
                {isLoading ? <Loader /> : null}
                <Layout>
                  <Component {...pageProps} />
                </Layout>
              </MediaContextProvider>
            </ListsContextProvider>
          </UserContextProvider>
        </SessionProvider>
      </Theme>
    </Fragment>
  );
}

export default MyApp;
