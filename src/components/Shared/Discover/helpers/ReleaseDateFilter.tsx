import { Calendar, ChevronLeft, ChevronRight } from "lucide-react";
import DatePicker, { DateObject } from "react-multi-date-picker";
import "react-multi-date-picker/styles/layouts/mobile.css";

import Input from "components/UI/Input";
import P from "components/UI/Typography/P";

import { DatePickerWrapper } from "./FilterStyles.js";

interface ReleaseDateFilterProps {
  value?: [string, string];
  onChange: (value: [string, string]) => void;
  className?: string;
  isMobile?: boolean;
}

const formatDate = (date: string): string => {
  const [year, month, day] = date.split("-");
  return `${day}-${month}-${year}`;
};

const DatePickerComponent = ({
  value,
  onChange,
  id,
  isMobile
}: {
  id: string;
  value: string;
  onChange: (date: DateObject | null) => void;
  className?: string;
  isMobile?: boolean;
}) => {
  return (
    <DatePicker
      id={id}
      value={value}
      onChange={onChange}
      render={<Input fullWidth suffix={<Calendar size={16} />} />}
      className={isMobile ? "rmdp-mobile" : ""}
      containerStyle={{ width: "100%" }}
      format='DD-MM-YYYY'
      hideOnScroll
      hideWeekDays
      renderButton={(direction: "left" | "right", handleClick: () => void) =>
        direction === "right" ? (
          <div className='flex cursor-pointer items-center justify-center p-6'>
            <ChevronRight size={14} className='text-neutral-600' onClick={handleClick} />
          </div>
        ) : (
          <div className='flex cursor-pointer items-center justify-center p-6'>
            <ChevronLeft size={14} className='text-neutral-600' onClick={handleClick} />
          </div>
        )
      }
      calendarPosition='bottom-center'
    />
  );
};

const ReleaseDateFilter = ({
  value = ["1900-01-01", `${new Date().getFullYear()}-12-31`],
  onChange,
  className,
  isMobile
}: ReleaseDateFilterProps) => {
  const handleFromDateChange = (date: DateObject | null) => {
    onChange([date?.format("YYYY-MM-DD") ?? "", value[1]]);
  };

  const handleToDateChange = (date: DateObject | null) => {
    onChange([value[0], date?.format("YYYY-MM-DD") ?? ""]);
  };

  return (
    <div className={className}>
      <P weight='medium' size='small' className='mb-12 text-neutral-300'>
        Release Date
      </P>

      <DatePickerWrapper className='flex flex-col gap-12'>
        <div className='relative'>
          <P size='small' className='mb-6 w-16'>
            From:
          </P>

          <DatePickerComponent value={formatDate(value[0])} onChange={handleFromDateChange} id='from-datepicker' isMobile={isMobile} />
        </div>

        <div className='relative'>
          <P size='small' className='mb-6 w-16'>
            To:
          </P>

          <DatePickerComponent value={formatDate(value[1])} onChange={handleToDateChange} id='to-datepicker' isMobile={isMobile} />
        </div>
      </DatePickerWrapper>
    </div>
  );
};

export default ReleaseDateFilter;
