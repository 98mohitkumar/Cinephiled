import RangeSlider from "components/UI/RangeSlider";

interface VoteAverageFilterProps {
  value?: [number, number];
  onChange: (value: [number, number]) => void;
  className?: string;
}

const VoteAverageFilter = ({ value = [0, 10], onChange, className }: VoteAverageFilterProps) => {
  return (
    <RangeSlider
      label='User Rating'
      min={0}
      max={10}
      step={0.5}
      value={value}
      className={className}
      onValueCommit={onChange}
      formatValue={(rating) => rating.toFixed(1)}
    />
  );
};

export default VoteAverageFilter;
