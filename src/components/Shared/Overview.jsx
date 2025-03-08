import { Instagram, Link as LinkIcon, Twitter } from "lucide-react";
import Link from "next/link";

import ShareButton from "components/Shared/ShareButton";
import TechnicalDetails from "components/TechnicalDetails/TechnicalDetails";
import FlexBox from "components/UI/FlexBox";
import { Grid } from "components/UI/Grid";
import H4 from "components/UI/Typography/H4";
import P from "components/UI/Typography/P";
import { ROUTES } from "data/global";
import { formatCurrency, getNiceName, getReleaseDate, getRuntime, isEmptyObject, matches } from "utils/helper";

import CollectionCard from "../pages/Movie/CollectionCard";

const Overview = ({ overviewData, className, mediaType }) => {
  const { socialIds, homepage, status, language, title, description, technicalDetails } = overviewData;

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
        { title: "Type", copy: overviewData?.type },
        {
          title: "Network",
          copy: (
            <Link href={`/${ROUTES.networks}/${getNiceName({ id: overviewData?.network?.id, name: overviewData?.network?.name })}`}>
              <P
                tag='button'
                weight='medium'
                className='text-neutral-300 underline decoration-dotted underline-offset-4 transition-colors can-hover:text-cyan-300'>
                {overviewData?.network?.name}
              </P>
            </Link>
          ),
          isLink: true
        }
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

        <Grid colConfig={{ xxs: 2, sm: 3, lg: 4, "2xl": 2 }} className='w-full'>
          {gridItems.map((item) => (
            <div key={item.title}>
              <P weight='bold'>{item.title}</P>
              {item.isLink ? (
                item.copy
              ) : (
                <P weight='medium' className='text-neutral-300'>
                  {item.copy}
                </P>
              )}
            </div>
          ))}

          <div>
            <P weight='bold'>Technical Details</P>
            <TechnicalDetails technicalDetails={technicalDetails} />
          </div>
        </Grid>

        <FlexBox className='mt-40 items-center gap-40'>
          {socialMediaLinks.some((link) => Boolean(link.url))
            ? socialMediaLinks.map((item, i) => (
                <a key={i} href={item.url} target='_blank' rel='noreferrer' title={item.title} className='transition-colors can-hover:text-cyan-300'>
                  {item.icon}
                </a>
              ))
            : null}

          <ShareButton iconSize={28} className='transition-colors can-hover:text-cyan-300' variant='icon' title={title} text={description} />
        </FlexBox>
      </div>

      {matches(mediaType, "movie") && !isEmptyObject(overviewData?.collection) ? (
        <CollectionCard collection={overviewData?.collection} className='mt-40' />
      ) : null}
    </div>
  );
};

export default Overview;
