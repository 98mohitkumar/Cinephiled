import { useState, useEffect, useRef } from "react";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";

const Select = ({ triggerText, options, handleChange, activeKey, baseSizeOptions = false, label }) => {
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
    <div className='flex h-full items-center justify-end gap-4'>
      {label && <label className='text-lg whitespace-nowrap font-medium text-neutral-400'>{label}</label>}
      <div className={`dropdown-toggle relative block h-full w-full min-w-32`} ref={dropdownRef}>
        <div
          className='text-base relative z-20 inline-flex h-full w-max min-w-full cursor-pointer items-center justify-between 
          gap-2 rounded-lg bg-neutral-600 px-4 py-2 transition-colors hover:bg-neutral-700'
          onClick={triggerHandler}>
          <div className='font-semibold capitalize'>{triggerText}</div>
          <div className='-mr-1 pointer-events-none mt-[2px]'>
            {showDropdown ? <MdKeyboardArrowUp size={22} /> : <MdKeyboardArrowDown size={22} />}
          </div>
        </div>

        <div
          className={`absolute right-0 top-full z-[25] mt-2
          w-max min-w-full overflow-hidden rounded-lg bg-neutral-600 shadow-lg ${
            showDropdown ? "pointer-events-auto visible opacity-100" : "pointer-events-none invisible opacity-0"
          }`}>
          <ul className='max-h-[190px] w-max min-w-full overflow-y-auto'>
            {options?.map(({ key, value, highlight }) => (
              <li
                key={key}
                className={`cursor-pointer border-neutral-500 bg-neutral-600 px-4 py-[6px] transition-colors hover:bg-neutral-700 [&:not(:last-child)]:border-b ${
                  activeKey === key ? "selected bg-neutral-700" : ""
                } ${highlight ? "bg-neutral-700 font-bold" : "font-medium"} ${baseSizeOptions ? "text-base" : "text-sm"}`}
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
