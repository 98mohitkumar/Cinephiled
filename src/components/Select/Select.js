import { useState, useEffect, useRef } from "react";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";

const Select = ({
  triggerText,
  options,
  handleChange,
  activeKey,
  baseSizeOptions = false,
  label
}) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    };

    window.addEventListener("click", handleOutsideClick);

    return () => {
      window.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  const changeHandler = (key) => {
    handleChange(key);
    setShowDropdown(false);
  };

  const triggerHandler = () => {
    setShowDropdown((prev) => !prev);
  };

  return (
    <div className='flex gap-4 items-center justify-end h-full'>
      {label && (
        <label className='text-neutral-400 text-lg font-medium whitespace-nowrap'>{label}</label>
      )}
      <div className={`relative block w-full h-full dropdown-toggle min-w-32`} ref={dropdownRef}>
        <div
          className='h-full px-4 py-2 bg-neutral-600 rounded-lg text-base inline-flex items-center justify-between gap-2 
          cursor-pointer hover:bg-neutral-700 transition-colors min-w-full w-max z-20 relative'
          onClick={triggerHandler}>
          <div className='capitalize font-semibold'>{triggerText}</div>
          <div className='mt-[2px] -mr-1 pointer-events-none'>
            {showDropdown ? <MdKeyboardArrowUp size={22} /> : <MdKeyboardArrowDown size={22} />}
          </div>
        </div>

        <div
          className={`absolute top-full right-0 min-w-full w-max
          shadow-lg z-[25] mt-2 bg-neutral-600 rounded-lg overflow-hidden ${
            showDropdown
              ? "visible opacity-100 pointer-events-auto"
              : "invisible opacity-0 pointer-events-none"
          }`}>
          <ul className='overflow-y-auto min-w-full w-max max-h-[190px]'>
            {options?.map(({ key, value, highlight }) => (
              <li
                key={key}
                className={`px-4 py-[6px] bg-neutral-600 hover:bg-neutral-700 transition-colors cursor-pointer [&:not(:last-child)]:border-b border-neutral-500 ${
                  activeKey === key ? "bg-neutral-700 selected" : ""
                } ${highlight ? "font-bold bg-neutral-700" : "font-medium"} ${
                  baseSizeOptions ? "text-base" : "text-sm"
                }`}
                onClick={() => changeHandler(key)}>
                {value}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Select;
