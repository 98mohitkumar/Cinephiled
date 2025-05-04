import SingleSlider from "components/UI/SingleSlider";

interface VoteCountFilterProps {
  value?: number;
  onChange: (value: number) => void;
  className?: string;
}

const VoteCountFilter = ({ value = 0, onChange, className }: VoteCountFilterProps) => {
  const handleSingleValueChange = (minValue: number) => {
    onChange(minValue);
  };

  return (
    <SingleSlider
      label='Minimum User Votes'
      min={0}
      max={1000}
      step={50}
      value={value}
      className={className}
      onValueCommit={handleSingleValueChange}
      formatValue={(count) => count.toLocaleString()}
    />
  );
};

export default VoteCountFilter;
