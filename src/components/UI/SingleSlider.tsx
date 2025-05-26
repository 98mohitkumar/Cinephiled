import { useState } from "react";

import { cn } from "utils/helper";

import { SliderRoot, SliderRange, SliderThumb, SliderTrack } from "./Slider";
import P from "./Typography/P";
interface SingleSliderProps {
  min: number;
  max: number;
  step?: number;
  value: number;
  onValueCommit?: (value: number) => void;
  label: string;
  className?: string;
  formatValue?: (value: number) => string;
}

const SingleSlider = ({ min, max, step = 1, value, onValueCommit, label, className }: SingleSliderProps) => {
  const [sliderValue, setSliderValue] = useState<number>(value);

  const handleValueChange = (newValue: number[]) => {
    const newSingleValue = newValue[0];
    if (onValueCommit) onValueCommit(newSingleValue);
  };

  const valueChangeHandler = (newValue: number[]) => {
    setSliderValue(newValue[0]);
  };

  return (
    <div className={cn("w-full", className)}>
      <div className='flex items-center justify-between gap-16'>
        <P weight='medium' size='small' className='text-neutral-300'>
          {label}
        </P>
        <P size='small' className='text-neutral-400'>
          Min: {sliderValue}
        </P>
      </div>

      <SliderRoot defaultValue={[value]} onValueChange={valueChangeHandler} onValueCommit={handleValueChange} min={min} max={max} step={step}>
        <SliderTrack>
          <SliderRange />
        </SliderTrack>

        <SliderThumb aria-label='Min value' />
      </SliderRoot>
    </div>
  );
};

export default SingleSlider;
