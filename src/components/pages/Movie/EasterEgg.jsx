import { Lightbulb } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { Fragment, useState } from "react";

import Button from "components/UI/Button";
import FlexBox from "components/UI/FlexBox";
import H5 from "components/UI/Typography/H5";
import { opacityMotionTransition } from "data/global";

const easterEggQuotes = [
  "Aren't you scared?",
  "Keep the lights on.",
  "She's coming for you.",
  "Did you hear that?",
  "Whatever you do, don’t turn around.",
  "It's too late to run.",
  "Something's in the dark.",
  "You can't hide forever.",
  "Don't blink.",
  "Lights out... and you're next."
];

const EasterEgg = () => {
  const [isEasterEggActive, setIsEasterEggActive] = useState(false);

  const easterEggHandler = () => {
    setIsEasterEggActive((prev) => !prev);

    // toggle body overflow
    document.body.style.overflow = isEasterEggActive ? "auto" : "hidden";
  };

  return (
    <Fragment>
      <Button shape='circle' size='small' onClick={easterEggHandler} title='Turn off the lights'>
        <Lightbulb size={20} fill='inherit' />
      </Button>

      <AnimatePresence mode='wait'>
        {isEasterEggActive && (
          <motion.div className='fixed inset-0 z-modal grid place-items-center bg-black' {...opacityMotionTransition}>
            <FlexBox className='flex-col items-center gap-16 text-pretty px-20'>
              <H5 weight='semibold' className='text-center'>
                {easterEggQuotes[Math.floor(Math.random() * easterEggQuotes.length)]}
              </H5>

              <Button shape='circle' size='large' onClick={easterEggHandler} title='Turn on the lights'>
                <Lightbulb size={24} />
              </Button>
            </FlexBox>
          </motion.div>
        )}
      </AnimatePresence>
    </Fragment>
  );
};

export default EasterEgg;
