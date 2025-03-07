import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { throttle } from "throttle-debounce";

import DominantColor from "components/Shared/DominantColor/DominantColor";
import MediaCastGrid from "components/Shared/MediaCastGrid";
import PlaceholderText from "components/Shared/PlaceholderText";
import FlexBox from "components/UI/FlexBox";
import Input from "components/UI/Input";
import LayoutContainer from "components/UI/LayoutContainer";
import H2 from "components/UI/Typography/H2";
import H4 from "components/UI/Typography/H4";
import { opacityMotionTransition } from "data/global";

const CastPage = ({ media: { title, year, poster }, cast, showEpisodeCount = false }) => {
  const [filteredCast, setFilteredCast] = useState(cast);

  const searchHandler = throttle(300, (e) => {
    if (e.target.value.trim().length === 0) {
      setFilteredCast(cast);
      return;
    }

    const searchValue = e.target.value.toLowerCase();
    const filteredCast = cast.filter(
      ({ name, character }) => name.toLowerCase().includes(searchValue) || character.toLowerCase().includes(searchValue)
    );
    setFilteredCast(filteredCast);
  });

  return (
    <div className='relative mb-auto'>
      <DominantColor image={poster} tint />

      <LayoutContainer className='relative z-10 py-4864'>
        <H2 className='mx-auto max-w-screen-xl text-center'>
          {title} ({year})
        </H2>

        <FlexBox className='mb-2432 mt-2440 flex-wrap items-center justify-between gap-12 max-sm:flex-col'>
          <H4 size='large' className='whitespace-nowrap'>
            Cast ({cast?.length})
          </H4>

          <div className='min-w-80 max-sm:w-full'>
            <Input placeholder='Search cast' onChange={searchHandler} fullWidth />
          </div>
        </FlexBox>

        <AnimatePresence mode='wait'>
          {filteredCast?.length > 0 ? (
            <motion.div key={filteredCast?.length || "cast"} {...opacityMotionTransition}>
              <MediaCastGrid cast={filteredCast} showEpisodeCount={showEpisodeCount} />
            </motion.div>
          ) : (
            <motion.div key='no-results' {...opacityMotionTransition}>
              <PlaceholderText height='large'>No results found</PlaceholderText>
            </motion.div>
          )}
        </AnimatePresence>
      </LayoutContainer>
    </div>
  );
};

export default CastPage;
