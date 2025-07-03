import React from "react";

interface DropdownProps {
  options: string[];
  selectedValue: string;
  onValueChange: (value: string) => void;
  label: string;
}

const Dropdown: React.FC<DropdownProps> = ({
  options,
  selectedValue,
  onValueChange,
  label,
}) => {
  return (
    <div className="relative w-full md:w-1/2 lg:w-1/3">
      <label
        htmlFor={`dropdown-${label.toLowerCase().replace(/\s/g, "-")}`}
        className="sr-only"
      >
        {label}
      </label>
      <select
        id={`dropdown-${label.toLowerCase().replace(/\s/g, "-")}`}
        value={selectedValue}
        onChange={(e) => onValueChange(e.target.value)}
        aria-label={label}
        className="block appearance-none w-full bg-white border border-gray-300 text-gray-700 py-3 px-4 pr-8 rounded-lg leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
        <svg
          className="fill-current h-4 w-4"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
        >
          <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
        </svg>
      </div>
    </div>
  );
};

export default Dropdown;
