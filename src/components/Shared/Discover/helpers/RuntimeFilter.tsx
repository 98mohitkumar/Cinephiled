import RangeSlider from "components/UI/RangeSlider";

interface RuntimeFilterProps {
  value?: [number, number];
  onChange: (value: [number, number]) => void;
  className?: string;
}

const RuntimeFilter = ({ value = [0, 300], onChange, className }: RuntimeFilterProps) => {
  return (
    <RangeSlider
      label='Runtime (minutes)'
      min={0}
      max={300}
      step={5}
      className={className}
      value={value}
      onValueCommit={onChange}
      formatValue={(minutes) => `${minutes}m`}
    />
  );
};

export default RuntimeFilter;
