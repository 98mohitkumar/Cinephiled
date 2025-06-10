import { Instagram, Link as LinkIcon, Twitter } from "lucide-react";
import Link from "next/link";

import ShareButton from "components/Shared/ShareButton";
import TechnicalDetails from "components/Shared/TechnicalDetails";
import FlexBox from "components/UI/FlexBox";
import { Grid } from "components/UI/Grid";
import H4 from "components/UI/Typography/H4";
import P from "components/UI/Typography/P";
import { ROUTES } from "data/global";
import { formatCurrency, getNiceName, getReleaseDate, getRuntime, isEmptyObject, matches } from "utils/helper";

import CollectionCard from "../pages/Movie/CollectionCard";

import ProductionDetails from "./ProductionDetails";

const Overview = ({ overviewData, className, mediaType }) => {
  const { socialIds, homepage, status, language, title, description, technicalDetails, keywords } = overviewData;

  const gridItems = matches(mediaType, "movie")
    ? [
        { title: "Title", copy: title },
        { title: "Release Date", copy: getReleaseDate(overviewData?.releaseDate) },
        { title: "Status", copy: status },
        { title: "Runtime", copy: getRuntime(overviewData?.runtime) },
        { title: "Language", copy: language },
        { title: "Budget", copy: overviewData?.budget ? formatCurrency({ value: overviewData?.budget }) : "-" },
        { title: "Revenue", copy: overviewData?.revenue ? formatCurrency({ value: overviewData?.revenue }) : "-" }
      ]
    : [
        { title: "Title", copy: title },
        { title: "First Air Date", copy: getReleaseDate(overviewData?.firstAirDate) },
        { title: "Last Air Date", copy: getReleaseDate(overviewData?.lastAirDate) },
        { title: "Status", copy: status },
        { title: "Language", copy: language },
        { title: "Type", copy: overviewData?.type }
      ];

  const socialMediaLinks = [
    ...(socialIds.instagram_id
      ? [{ title: "Instagram", url: `https://instagram.com/${socialIds.instagram_id}`, icon: <Instagram size={28} /> }]
      : []),
    ...(socialIds.twitter_id ? [{ title: "Twitter", url: `https://twitter.com/${socialIds.twitter_id}`, icon: <Twitter size={28} /> }] : []),
    ...(homepage ? [{ title: "Website", url: homepage, icon: <LinkIcon size={28} /> }] : [])
  ];

  return (
    <div className={className}>
      <div className='max-2xl:max-w-screen-xl'>
        <H4 className='mb-16'>Overview</H4>

        <Grid colConfig={{ xxs: 2, sm: 3, lg: 4, "2xl": 2 }} className='w-full gap-1624'>
          {gridItems.map((item) => (
            <div key={item.title}>
              <P weight='bold'>{item.title}</P>
              <P weight='medium' className='text-neutral-300'>
                {item.copy}
              </P>
            </div>
          ))}

          <div>
            <P weight='bold'>Studios</P>
            <ProductionDetails productionCompanies={overviewData?.productionCompanies} networks={overviewData?.networks} />
          </div>

          <div>
            <P weight='bold'>Technical Details</P>
            <TechnicalDetails technicalDetails={technicalDetails} />
          </div>
        </Grid>

        {keywords?.length > 0 ? (
          <div className='my-4048'>
            <P weight='bold'>Keywords</P>
            <FlexBox className='mt-8 flex-wrap gap-6'>
              {keywords.map((keyword) => (
                <Link key={keyword.id} href={`/${ROUTES.keywords}/${getNiceName({ id: keyword.id, name: keyword.name })}`}>
                  <P
                    key={keyword.id}
                    size='tiny'
                    weight='medium'
                    className='whitespace-nowrap rounded-2xl bg-neutral-600/75 px-10 py-4 transition-colors can-hover:bg-neutral-800'>
                    {keyword.name}
                  </P>
                </Link>
              ))}
            </FlexBox>
          </div>
        ) : null}

        <FlexBox className='mt-40 items-center gap-40'>
          {socialMediaLinks.some((link) => Boolean(link.url))
            ? socialMediaLinks.map((item, i) => (
                <a key={i} href={item.url} target='_blank' rel='noreferrer' title={item.title} className='transition-colors can-hover:text-cyan-300'>
                  {item.icon}
                </a>
              ))
            : null}

          <ShareButton iconSize={28} variant='icon' title={title} text={description} />
        </FlexBox>
      </div>

      {matches(mediaType, "movie") && !isEmptyObject(overviewData?.collection) ? (
        <CollectionCard collection={overviewData?.collection} className='mt-40' />
      ) : null}
    </div>
  );
};

export default Overview;
