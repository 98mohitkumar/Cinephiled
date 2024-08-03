import { getCountryCode } from "api/user";
import DominantColor from "components/DominantColor/DominantColor";
import MetaWrapper from "components/MetaWrapper";
import PlaceholderText from "components/PlaceholderText";
import Select from "components/Select/Select";
import Tabs from "components/Tabs/Tabs";
import { AnimatePresence, motion } from "framer-motion";
import { apiEndpoints, blurPlaceholder } from "globals/constants";
import useTabs from "hooks/useTabs";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { Fragment, useState } from "react";
import { fetchOptions, framerTabVariants, getCleanTitle } from "src/utils/helper";
import { LayoutContainer } from "styles/GlobalComponents";

const tabList = [
  { key: "movies", name: `Movies` },
  { key: "tv", name: `TV Shows` }
];

const WatchProviders = ({
  regions,
  movieProviders,
  tvProviders,
  selectedRegion,
  defaultRegion
}) => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const { activeTab, setTab } = useTabs({
    tabLocation: "watchProvidersTab"
  });

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
      router.replace(`/watch-providers?region=${key}`, null, { shallow: false });
    }
  };

  const currentRegionName =
    regions.find(({ key }) => key === selectedRegion)?.niceName ||
    regions.find(({ key }) => key === defaultRegion)?.niceName;

  return (
    <Fragment>
      <MetaWrapper
        title='Watch Providers - Cinephiled'
        description='Explore a comprehensive list of OTT/streaming providers, both locally and globally, to elevate your entertainment experience. Discover a diverse range of options available in your country and around the world, ensuring you never miss out on the latest and greatest in streaming content.'
        url='https://cinephiled.vercel.app/watch-providers'
        image='https://raw.githubusercontent.com/98mohitkumar/Cinephiled/main/public/Images/watch-providers.webp'
      />

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
                  { key: "default", value: `Default (${defaultRegion})`, highlight: true },
                  ...regions
                ]}
                baseSizeOptions
                handleChange={handleSelectChange}
                activeKey={selectedRegion || "default"}
                triggerText={
                  selectedRegion
                    ? regions.find(({ key }) => key === selectedRegion)?.value
                    : `Default (${defaultRegion})`
                }
              />
            </div>
          </div>

          <h1 className='text-[calc(1.375rem_+_1.5vw)] xl:text-[2.25rem] w-full text-center font-semibold'>
            Watch Providers {currentRegionName ? `available in ${currentRegionName}` : ""}
          </h1>
        </div>

        <Tabs
          tabList={tabList}
          currentTab={activeTab}
          setTab={setTab}
          className='![margin:2.5rem_auto]'
        />

        <AnimatePresence mode='wait'>
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
                  )}/${activeTab}?watchregion=${selectedRegion || defaultRegion}`}>
                  <div className='block h-full w-full'>
                    <motion.div
                      className='w-full aspect-square rounded-lg overflow-hidden'
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}>
                      <Image
                        src={`https://image.tmdb.org/t/p/original${provider.logo_path}`}
                        alt={provider.provider_name}
                        width={200}
                        height={200}
                        blurDataURL={blurPlaceholder}
                        placeholder='blur'
                      />
                    </motion.div>
                  </div>
                </Link>
              ))}
            </motion.div>
          ) : (
            <PlaceholderText>No Watch Providers Found</PlaceholderText>
          )}
        </AnimatePresence>
      </LayoutContainer>
    </Fragment>
  );
};

export const getServerSideProps = async ({ req, query }) => {
  const ip = req.headers["x-forwarded-for"] || req.connection.remoteAddress;
  let selectedRegion = query.region || "";
  const defaultRegion = await getCountryCode(ip);

  try {
    const providersData = await Promise.all([
      fetch(
        apiEndpoints.watchProviders.movieWatchProviders({
          region: selectedRegion || defaultRegion
        }),
        fetchOptions()
      ),
      fetch(
        apiEndpoints.watchProviders.tvWatchProviders({ region: selectedRegion || defaultRegion }),
        fetchOptions()
      ),
      fetch(apiEndpoints.watchProviders.regions, fetchOptions())
    ]);

    const error = providersData.some((res) => !res.ok);

    if (error) throw new Error("Failed to fetch watch providers");

    const [movieProviders, tvProviders, regions] = await Promise.all(
      providersData.map((res) => res.json())
    );

    return {
      props: {
        regions:
          regions?.results
            .map(({ iso_3166_1, english_name }) => ({
              key: iso_3166_1,
              niceName: english_name,
              value: `${english_name} (${iso_3166_1})`
            }))
            .sort((a, b) => a.niceName.localeCompare(b.niceName)) || [],
        movieProviders: movieProviders?.results || [],
        tvProviders: tvProviders?.results || [],
        selectedRegion,
        defaultRegion
      }
    };
  } catch {
    return {
      notFound: true
    };
  }
};

export default WatchProviders;
