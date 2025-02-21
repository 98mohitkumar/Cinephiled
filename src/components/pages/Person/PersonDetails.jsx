import "keen-slider/keen-slider.min.css";
import { useKeenSlider } from "keen-slider/react";
import { Instagram, Link2, Twitter } from "lucide-react";
import Image from "next/image";
import { useMemo } from "react";

import DominantColor from "components/Shared/DominantColor/DominantColor";
import DownloadMediaButton from "components/Shared/DownloadMediaButton";
import FlexBox from "components/UI/FlexBox";
import { Grid } from "components/UI/Grid";
import LayoutContainer from "components/UI/LayoutContainer";
import H1 from "components/UI/Typography/H1";
import H4 from "components/UI/Typography/H4";
import P from "components/UI/Typography/P";
import { blurPlaceholder } from "data/global";
import { theme } from "theme/theme";
import { getGender } from "utils/helper";
import { getTMDBImage } from "utils/imageHelper";

import PersonBiography from "./helpers/PersonBiography";
import PersonPageTab from "./helpers/PersonPageTab";

// get age or died at age
const getAge = ({ birthday, deathday, alive }) => {
  if (alive) {
    const today = new Date();
    const age = Math.floor((today - new Date(birthday)) / (1000 * 3600 * 24 * 30.4375 * 12));
    return age;
  } else {
    const diedAt = Math.floor((new Date(deathday) - new Date(birthday)) / (1000 * 3600 * 24 * 30.4375 * 12));
    return diedAt;
  }
};

// get unique credits with department and job
const getCredits = ({ credits, mediaType, unique = true }) => {
  const combinedCredits =
    credits?.cast.concat(credits?.crew || [])?.map((item) => ({ ...item, department: item.department || "Acting", job: item.job || "Actor" })) || [];

  if (unique) {
    const uniqueAndMergedCredits = combinedCredits.reduce((acc, item) => {
      const existingCreditIndex = acc.findIndex((credit) => credit.id === item.id);
      if (existingCreditIndex >= 0) {
        acc[existingCreditIndex].job = [acc[existingCreditIndex].job, item.job].flat();
        acc[existingCreditIndex].department = [acc[existingCreditIndex].department, item.department].flat();
      } else {
        acc.push({ ...item, job: [item.job], media_type: mediaType });
      }
      return acc;
    }, []);

    return uniqueAndMergedCredits;
  }

  return combinedCredits;
};

const getLocaleDateString = (date) => {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric"
  });
};

const PersonDetails = ({ personDetails }) => {
  const { external_ids, images, movie_credits, tv_credits } = personDetails;
  const allMovieCredits = useMemo(() => getCredits({ credits: movie_credits, mediaType: "movie" }), [movie_credits]);
  const allTvCredits = useMemo(() => getCredits({ credits: tv_credits, mediaType: "tv" }), [tv_credits]);
  const movieDepartmentList = useMemo(
    () =>
      Array.from(new Set(getCredits({ credits: movie_credits, mediaType: "movie", unique: false }).map((item) => item.department))).map((item) => ({
        label: item,
        value: item
      })),
    [movie_credits]
  );
  const tvDepartmentList = useMemo(
    () =>
      Array.from(new Set(getCredits({ credits: tv_credits, mediaType: "tv", unique: false }).map((item) => item.department))).map((item) => ({
        label: item,
        value: item
      })),
    [tv_credits]
  );

  const [sliderRef] = useKeenSlider({
    renderMode: "performance",
    dragSpeed: 1.4,
    breakpoints: {
      "(min-width: 0px)": {
        slides: {
          perView: 1.75,
          spacing: 16
        }
      },
      [`(min-width: ${theme.breakpoints.xs})`]: {
        slides: {
          perView: 2.25,
          spacing: 16
        }
      },
      [`(min-width: ${theme.breakpoints.sm})`]: {
        slides: {
          perView: 3.25,
          spacing: 16
        }
      },
      [`(min-width: ${theme.breakpoints.lg})`]: {
        slides: {
          perView: 4.25,
          spacing: 20
        }
      },
      [`(min-width: ${theme.breakpoints.xl})`]: {
        slides: {
          perView: 4.75,
          spacing: 20
        }
      },
      [`(min-width: ${theme.breakpoints["2xl"]})`]: {
        slides: {
          perView: 5.75,
          spacing: 20
        }
      },
      [`(min-width: ${theme.breakpoints["3xl"]})`]: {
        slides: {
          perView: 7.75,
          spacing: 20
        }
      }
    }
  });

  const personFacts = [
    {
      title: "Known For",
      copy: personDetails.known_for_department
    },
    {
      title: "Known Credits",
      copy: personDetails.totalCredits
    },
    {
      title: "Gender",
      copy: getGender(personDetails.gender)
    },
    ...(personDetails.birthday
      ? [
          {
            title: "Birthday",
            copy: (
              <>
                {getLocaleDateString(personDetails.birthday)}{" "}
                {personDetails.deathday ? "" : `(${getAge({ birthday: personDetails.birthday, alive: true })} years old)`}
              </>
            )
          }
        ]
      : []),
    ...(personDetails?.deathday
      ? [
          {
            title: "Day of Death",
            copy: (
              <>
                {getLocaleDateString(personDetails.deathday)} (
                {getAge({ deathday: personDetails.deathday, birthday: personDetails.birthday, alive: false })} years old)
              </>
            )
          }
        ]
      : []),
    {
      title: "Place of Birth",
      copy: personDetails.place_of_birth
    }
  ];

  const socialMediaLinks = [
    ...(external_ids.instagram_id
      ? [
          {
            title: "Instagram",
            url: `https://instagram.com/${external_ids.instagram_id}`,
            icon: <Instagram size={36} />
          }
        ]
      : []),
    ...(external_ids.twitter_id
      ? [
          {
            title: "Twitter",
            url: `https://twitter.com/${external_ids.twitter_id}`,
            icon: <Twitter size={36} />
          }
        ]
      : []),
    ...(personDetails.homepage
      ? [
          {
            title: "Website",
            url: personDetails.homepage,
            icon: <Link2 size={36} />
          }
        ]
      : [])
  ];

  return (
    <section className='relative grow'>
      <DominantColor tint image={personDetails?.profile_path} />

      <div className='relative z-10'>
        <LayoutContainer className='py-3264'>
          <div>
            <div className='max-w-screen-xl'>
              <H1 className='text-pretty'>{personDetails.name}</H1>

              {personDetails.biography ? <PersonBiography biography={personDetails.biography} /> : null}

              {socialMediaLinks.some((link) => Boolean(link.url)) ? (
                <div className='mt-3248'>
                  <H4 weight='semibold'>Social Media</H4>

                  <FlexBox className='mt-12 items-center gap-32'>
                    {socialMediaLinks.map((item, i) => (
                      <a
                        key={i}
                        href={item.url}
                        target='_blank'
                        rel='noreferrer'
                        title={item.title}
                        className='transition-colors can-hover:text-cyan-300'>
                        {item.icon}
                      </a>
                    ))}
                  </FlexBox>
                </div>
              ) : null}

              <Grid
                className='mt-3248 gap-x-2448'
                colConfig={{
                  xxs: 2,
                  md: 3
                }}>
                {personFacts.map((item, i) => (
                  <div key={i}>
                    <P size='large' weight='bold'>
                      {item.title}
                    </P>

                    <P className='text-balance' weight='normal'>
                      {item.copy}
                    </P>
                  </div>
                ))}
              </Grid>
            </div>
          </div>
        </LayoutContainer>

        <LayoutContainer className='py-2448 pe-4'>
          <div ref={sliderRef} className='keen-slider'>
            {images?.profiles.map((item) => (
              <div className='keen-slider__slide relative aspect-poster' key={item.file_path}>
                <Image
                  src={getTMDBImage({ path: item.file_path, type: "profile", size: "h632" })}
                  alt='cast-image'
                  fill
                  placeholder='blur'
                  className='rounded-xl object-cover shadow-xl'
                  blurDataURL={blurPlaceholder}
                />
                <DownloadMediaButton item={item.file_path} />
              </div>
            ))}
          </div>
        </LayoutContainer>

        <LayoutContainer className='py-3264'>
          <PersonPageTab
            movieCredits={allMovieCredits}
            tvCredits={allTvCredits}
            movieDepartmentList={movieDepartmentList}
            tvDepartmentList={tvDepartmentList}
          />
        </LayoutContainer>
      </div>
    </section>
  );
};

export default PersonDetails;
