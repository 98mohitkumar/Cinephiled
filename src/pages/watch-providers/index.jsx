import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { Fragment, useState } from "react";

import { getCountryCode } from "apiEndpoints/user";
import PlaceholderText from "components/PlaceholderText";
import DominantColor from "components/Shared/DominantColor/DominantColor";
import MetaWrapper from "components/Shared/MetaWrapper";
import { TabItem, Tabs } from "components/Shared/Tabs/Tabs";
import Input from "components/UI/Input";
import LayoutContainer from "components/UI/LayoutContainer";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "components/UI/Select";
import H1 from "components/UI/Typography/H1";
import { apiEndpoints } from "data/apiEndpoints";
import { blurPlaceholder, mediaTypeTabList } from "data/global";
import useTabs from "hooks/useTabs";
import { fetchOptions, framerTabVariants, getCleanTitle, matches } from "utils/helper";
import { getTMDBImage } from "utils/imageHelper";

const WatchProviders = ({ regions, movieProviders, tvProviders, selectedRegion, defaultRegion }) => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const { activeTab, setTab } = useTabs({
    tabLocation: "watchProvidersTab"
  });
  const activeTabIndex = mediaTypeTabList.findIndex((tab) => matches(tab.key, activeTab));

  const searchHandler = (e) => {
    setSearchQuery(e.target.value);
  };

  const currentRenderList = (activeTab === "movies" ? movieProviders : tvProviders).filter((provider) =>
    provider.provider_name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSelectChange = (key) => {
    if (key === defaultRegion) {
      router.replace(`/watch-providers`);
    } else {
      router.replace(`/watch-providers?region=${key}`, null, { shallow: false });
    }
  };

  const currentRegionName = regions.find(({ key }) => [selectedRegion, defaultRegion].includes(key))?.niceName;

  return (
    <Fragment>
      <MetaWrapper
        title='Watch Providers - Cinephiled'
        description='Explore a comprehensive list of OTT/streaming providers, both locally and globally, to elevate your entertainment experience. Discover a diverse range of options available in your country and around the world, ensuring you never miss out on the latest and greatest in streaming content.'
        url='https://cinephiled.vercel.app/watch-providers'
        image='https://raw.githubusercontent.com/98mohitkumar/Cinephiled/main/public/images/watch-providers.webp'
      />

      <LayoutContainer className='relative py-4064'>
        <DominantColor tint />

        <section className='relative z-5'>
          <div className='mb-3248 text-center'>
            <div className='mb-2440 flex flex-wrap items-center justify-end gap-16'>
              <Input type='text' placeholder='Search watch providers' onChange={searchHandler} className='shrink-0 max-sm:w-full sm:w-64' />

              <Select defaultValue={selectedRegion || defaultRegion} onValueChange={handleSelectChange}>
                <SelectTrigger className='w-fit min-w-[250px] shrink-0 max-sm:min-w-full'>
                  <SelectValue placeholder='Select Region' />
                </SelectTrigger>
                <SelectContent position='popper' align='end'>
                  {regions.map((option) => (
                    <SelectItem key={option.key} value={option.key}>
                      {option.value}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <H1 className='mx-auto max-w-screen-lg'>Watch Providers {currentRegionName ? `available in ${currentRegionName}` : ""}</H1>
          </div>

          <Tabs tabItemsCount={mediaTypeTabList.length} activeItemIndex={activeTabIndex}>
            {mediaTypeTabList.map(({ key, title }) => (
              <TabItem key={key} onClick={() => setTab(key)} className={matches(activeTab, key) ? "active" : ""}>
                {title}
              </TabItem>
            ))}
          </Tabs>

          <AnimatePresence mode='wait'>
            {currentRenderList?.length > 0 ? (
              <motion.div
                key={activeTab}
                variants={framerTabVariants}
                initial='hidden'
                animate='visible'
                exit='hidden'
                className='mt-3248 grid grid-cols-watchProviders gap-2432'>
                {currentRenderList.map((provider) => (
                  <Link
                    key={provider.provider_id}
                    href={`/watch-providers/${provider.provider_id}-${getCleanTitle(
                      provider.provider_name
                    )}/${activeTab}?watchregion=${selectedRegion || defaultRegion}`}>
                    <div className='block h-full w-full'>
                      <motion.div className='aspect-square w-full overflow-hidden rounded-lg' whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                        <Image
                          src={getTMDBImage({ path: provider.logo_path, type: "logo", size: "original" })}
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
        </section>
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
      fetch(apiEndpoints.watchProviders.tvWatchProviders({ region: selectedRegion || defaultRegion }), fetchOptions()),
      fetch(apiEndpoints.watchProviders.regions, fetchOptions())
    ]);

    const error = providersData.some((res) => !res.ok);

    if (error) throw new Error("Failed to fetch watch providers");

    const [movieProviders, tvProviders, regions] = await Promise.all(providersData.map((res) => res.json()));

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
