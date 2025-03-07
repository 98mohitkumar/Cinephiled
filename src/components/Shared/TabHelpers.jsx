import React, { Fragment } from "react";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "components/Shared/Accordion";
import MediaImageTemplateGrid from "components/Templates/MediaImageTemplateGrid";
import FlexBox from "components/UI/FlexBox";
import H4 from "components/UI/Typography/H4";
import H5 from "components/UI/Typography/H5";
import P from "components/UI/Typography/P";
import { cn, isEmptyObject, matches } from "utils/helper";

import MediaCastGrid from "./MediaCastGrid";
import Overview from "./Overview";
import PlaceholderText from "./PlaceholderText";
import { TabItem, Tabs } from "./Tabs/Tabs";

export const TabTemplate = ({ tabList, activeTab, setTab, activeTabIndex }) => {
  return (
    <Tabs tabItemsCount={tabList.length} activeItemIndex={activeTabIndex}>
      {tabList.map(({ key, name, icon }) => (
        <TabItem title={name} key={key} onClick={() => setTab(key)} className={matches(activeTab, key) ? "active" : ""}>
          <FlexBox className='h-full items-center justify-between gap-x-8 gap-y-4 max-sm:flex-col'>
            {icon(matches(key, activeTab))}
            <P size='small-to-p' weight='semibold'>
              {name}
            </P>
          </FlexBox>
        </TabItem>
      ))}
    </Tabs>
  );
};

export const PhotosTabContent = ({ backdrops, posters }) => {
  return (
    <Fragment>
      <Accordion collapsible='true' type='multiple' defaultValue={["backdrops", "posters"]}>
        {backdrops.length > 0 ? (
          <AccordionItem value='backdrops' className='border-none'>
            <AccordionTrigger className='justify-start gap-12 pb-16 pt-0'>
              <H5 tag='span'>Backdrops</H5>
            </AccordionTrigger>
            <AccordionContent className='pb-3240'>
              <MediaImageTemplateGrid items={backdrops} type='backdrops' />
            </AccordionContent>
          </AccordionItem>
        ) : null}

        {posters.length > 0 ? (
          <AccordionItem value='posters' className='border-none'>
            <AccordionTrigger className='justify-start gap-12'>
              <H5 tag='span'>Posters</H5>
            </AccordionTrigger>
            <AccordionContent>
              <MediaImageTemplateGrid items={posters} type='posters' />
            </AccordionContent>
          </AccordionItem>
        ) : null}
      </Accordion>
    </Fragment>
  );
};

export const OverviewTabContent = ({ overviewData, cast, mediaType }) => {
  const noCollection = matches(mediaType, "movie") && isEmptyObject(overviewData?.collection);

  return (
    <FlexBox className='flex-col items-start gap-x-32 gap-y-40 2xl:flex-row'>
      <Overview
        overviewData={overviewData}
        className={cn("top-6 w-full max-w-full shrink-0 2xl:sticky 2xl:max-w-96", {
          "2xl:max-w-80": matches(mediaType, "tv") || noCollection
        })}
        mediaType={mediaType}
      />

      <div className='w-full grow'>
        <H4 className='mb-16'>Cast</H4>
        {cast?.data?.length > 0 ? (
          <MediaCastGrid cast={cast?.data} totalCount={cast?.totalCount} showEpisodeCount={matches(mediaType, "tv")} />
        ) : (
          <PlaceholderText>No cast found</PlaceholderText>
        )}
      </div>
    </FlexBox>
  );
};
