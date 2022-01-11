import Theme from "../styles/theme";
import "bootstrap/dist/css/bootstrap.min.css";
import { AnimatePresence } from "framer-motion";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Loader } from "../styles/GlobalComponents";
import Layout from "../components/Layout/Layout";

function MyApp({ Component, pageProps }) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handleStart = (url) => {
      url !== router.asPath ? setIsLoading(true) : setIsLoading(false);
    };

    const handleComplete = (url) => {
      setIsLoading(false);
    };

    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleComplete);
    router.events.on("routeChangeError", handleComplete);
  }, [router]);

  return (
    <Theme>
      <AnimatePresence exitBeforeEnter>
        {isLoading ? (
          <Loader />
        ) : (
          <Layout router={router} key={router.asPath}>
            <Component {...pageProps} />
          </Layout>
        )}
      </AnimatePresence>
    </Theme>
  );
}

export default MyApp;
