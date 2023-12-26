import DominantColor from "components/DominantColor/DominantColor";
import MetaWrapper from "components/MetaWrapper";
import Select from "components/Select/Select";
import Tabs from "components/Tabs/Tabs";
import { AnimatePresence, motion } from "framer-motion";
import { apiEndpoints, blurPlaceholder } from "globals/constants";
import useTabs from "hooks/useTabs";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { Fragment, useEffect, useRef, useState } from "react";
import { framerTabVariants, getCleanTitle, getCountryCode } from "src/utils/helper";
import { Error404, LayoutContainer, Loader } from "styles/GlobalComponents";

const tabList = [
  { key: "movies", name: `Movies` },
  { key: "tv", name: `TV Shows` }
];

const WatchProviders = ({ regions }) => {
  const router = useRouter();
  const {
    query: { region: selectedRegion }
  } = router;

  const [{ loading, error }, setResponseState] = useState({
    loading: false,
    error: false
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [{ movieProviders, tvProviders }, setProviders] = useState({
    movieProviders: [],
    tvProviders: []
  });

  const { activeTab, setTab } = useTabs({
    tabLocation: "watchProviders",
    defaultState: "movies"
  });

  const userRegion = useRef("");

  useEffect(() => {
    const AbortCtrl = new AbortController();

    const getWatchProviders = async () => {
      setResponseState({
        loading: true,
        error: false
      });

      if (!userRegion.current) {
        const region = await getCountryCode();
        userRegion.current = region;
      }

      const [movieRes, tvRes] = await Promise.all([
        fetch(
          apiEndpoints.watchProviders.movieWatchProviders({
            region: selectedRegion || userRegion.current
          }),
          {
            signal: AbortCtrl.signal
          }
        ),
        fetch(
          apiEndpoints.watchProviders.tvWatchProviders({
            region: selectedRegion || userRegion.current
          }),
          {
            signal: AbortCtrl.signal
          }
        )
      ]);

      const error = [movieRes, tvRes].some((res) => !res.ok);

      if (error) throw new Error("Failed to fetch watch providers");

      const [movieData, tvData] = await Promise.all([movieRes.json(), tvRes.json()]);

      movieData?.results?.forEach((item) => {
        delete item.display_priorities;
      });

      tvData?.results?.forEach((item) => {
        delete item.display_priorities;
      });

      return {
        movieProviders: movieData.results,
        tvProviders: tvData.results
      };
    };

    getWatchProviders()
      .then(({ movieProviders, tvProviders }) => {
        setProviders({
          movieProviders: movieProviders.filter((provider) => provider.logo_path),
          tvProviders: tvProviders
            .filter((provider) => provider.logo_path)
            .map((provider) => ({
              ...provider,
              tvProvider: true
            }))
        });

        setResponseState({
          loading: false,
          error: false
        });
      })
      .catch(() => {
        setProviders({
          movieProviders: [],
          tvProviders: []
        });

        setResponseState({
          loading: false,
          error: true
        });
      });

    return () => AbortCtrl.abort();
  }, [selectedRegion]);

  const searchHandler = (e) => {
    setSearchQuery(e.target.value);
  };

  const currentRenderList = (activeTab === "movies" ? movieProviders : tvProviders).filter(
    (provider) => provider.provider_name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSelectChange = (key) => {
    if (key === "default") {
      router.replace(`/watch-providers`);
    } else {
      router.replace(`/watch-providers?region=${key}`);
    }
  };

  const currentRegionName = regions.find(
    ({ key }) => key === (selectedRegion || userRegion.current)
  )?.niceName;

  return (
    <Fragment>
      <MetaWrapper
        title='Watch Providers - Cinephiled'
        description='Explore a comprehensive list of OTT/streaming providers, both locally and globally, to elevate your entertainment experience. Discover a diverse range of options available in your country and around the world, ensuring you never miss out on the latest and greatest in streaming content.'
        url='https://cinephiled.vercel.app/watch-providers'
      />

      {error ? (
        <Error404>404</Error404>
      ) : (
        <LayoutContainer className='relative'>
          <DominantColor tint flip />

          <div className='flex flex-col gap-8 relative z-20'>
            <div className='flex justify-end gap-3 max-sm:w-full flex-wrap max-md:order-2'>
              <input
                type='text'
                placeholder='Search watch providers'
                className='px-4 py-2 rounded-lg bg-neutral-600 text-white focus:outline-none 
                focus:ring-2 focus:ring-neutral-400 focus:border-transparent md:min-w-[300px] text-lg max-md:grow max-sm:min-w-full'
                onChange={searchHandler}
              />

              <div className='min-w-[250px] max-sm:min-w-full max-md:grow'>
                <Select
                  options={[
                    { key: "default", value: `Default (${userRegion.current})` },
                    ...regions
                  ]}
                  handleChange={handleSelectChange}
                  activeKey={selectedRegion || "default"}
                  triggerText={
                    selectedRegion
                      ? regions.find(({ key }) => key === selectedRegion)?.value
                      : `Default (${userRegion.current})`
                  }
                />
              </div>
            </div>

            <h1 className='max-sm:text-3xl text-4xl w-full text-center font-semibold'>
              Watch Providers {currentRegionName ? `available in ${currentRegionName}` : ""}
            </h1>
          </div>

          <Tabs
            tabList={tabList}
            currentTab={activeTab}
            setTab={setTab}
            className='[margin:2.5rem_auto!important]'
          />

          {loading ? (
            <Loader className='profile-page' />
          ) : (
            <AnimatePresence exitBeforeEnter initial={false}>
              {currentRenderList?.length > 0 ? (
                <motion.div
                  key={activeTab}
                  variants={framerTabVariants}
                  initial='hidden'
                  animate='visible'
                  exit='hidden'
                  className='mt-12 mb-4 max-sm:gap-6 gap-8 grid grid-cols-[repeat(auto-fill,minmax(min(65px,20vw),1fr))] relative z-10'>
                  {currentRenderList.map((provider) => (
                    <Link
                      key={provider.provider_id}
                      href={`/watch-providers/${provider.provider_id}-${getCleanTitle(
                        provider.provider_name
                      )}/${provider.tvProvider ? "tv" : "movies"}?region=${
                        selectedRegion || userRegion.current
                      }`}>
                      <a className='block h-full w-full'>
                        <motion.div
                          className='w-full aspect-square'
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}>
                          <Image
                            src={`https://image.tmdb.org/t/p/original${provider.logo_path}`}
                            alt={provider.provider_name}
                            layout='responsive'
                            width={200}
                            height={200}
                            blurDataURL={blurPlaceholder}
                            placeholder='blur'
                            className='rounded-lg'
                          />
                        </motion.div>
                      </a>
                    </Link>
                  ))}
                </motion.div>
              ) : (
                <div className='text-center py-12 relative z-10'>
                  <h2 className='text-3xl font-semibold '>No Watch Providers Found</h2>
                </div>
              )}
            </AnimatePresence>
          )}
        </LayoutContainer>
      )}
    </Fragment>
  );
};

WatchProviders.getInitialProps = async () => {
  try {
    const regionsRes = await fetch(apiEndpoints.watchProviders.regions);

    if (!regionsRes.ok) throw Error("cannot fetch data");

    const regionsData = await regionsRes.json();

    return {
      error: false,
      regions:
        regionsData?.results.map(({ iso_3166_1, english_name }) => ({
          key: iso_3166_1,
          niceName: english_name,
          value: `${english_name} (${iso_3166_1})`
        })) || []
    };
  } catch {
    return {
      error: true,
      regions: []
    };
  }
};

export default WatchProviders;
