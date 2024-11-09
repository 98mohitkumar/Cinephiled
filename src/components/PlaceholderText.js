import { NoDataText } from "styles/GlobalComponents";

const PlaceholderText = ({ className, height = "small", children }) => {
  return (
    <div className={`${height === "small" ? "min-h-[20vh]" : "min-h-[45vh]"} grid place-items-center ${className}`}>
      <NoDataText className='text-center font-semibold'>{children}</NoDataText>
    </div>
  );
};

export default PlaceholderText;
