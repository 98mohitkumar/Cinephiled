import { useState } from "react";

import { cn } from "utils/helper";

import { SliderRange, SliderThumb, SliderTrack, SliderRoot } from "./Slider";
import P from "./Typography/P";

interface RangeSliderProps {
  min: number;
  max: number;
  step?: number;
  defaultValue?: [number, number];
  value: [number, number];
  onValueCommit?: (value: [number, number]) => void;
  label: string;
  className?: string;
  formatValue?: (value: number) => string;
}

const RangeSlider = ({ min, max, step = 1, value, onValueCommit, label, className }: RangeSliderProps) => {
  const [sliderValue, setSliderValue] = useState<[number, number]>(value);

  const handleValueChange = (newValue: [number, number]) => {
    if (onValueCommit) onValueCommit(newValue);
  };

  const valueChangeHandler = (newValue: [number, number]) => {
    setSliderValue(newValue);
  };

  return (
    <div className={cn("w-full", className)}>
      <div className='flex items-center justify-between gap-16'>
        <P weight='medium' size='small' className='text-neutral-300'>
          {label}
        </P>
        <P size='small' className='font-montserrat text-neutral-400' weight='medium'>
          {sliderValue[0]} - {sliderValue[1]}
        </P>
      </div>

      <SliderRoot
        defaultValue={value}
        onValueCommit={handleValueChange}
        min={min}
        max={max}
        step={step}
        minStepsBetweenThumbs={1}
        onValueChange={valueChangeHandler}>
        <SliderTrack>
          <SliderRange />
        </SliderTrack>

        <SliderThumb aria-label='Min value' />
        <SliderThumb aria-label='Max value' />
      </SliderRoot>
    </div>
  );
};

export default RangeSlider;
