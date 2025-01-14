import React from "react";

const Select = ({ options, value, onChange, className }) => {
  return (
    <select
      value={value}
      onChange={onChange}
      className={`text-sm text-gray-700 ps-3 bg-white divide-y divide-gray-100 shadow-sm w-48 rounded-s-3xl rounded-e-none border border-gray-300 focus:ring-1 focus:ring-violet-500 focus:border-violet-500 focus:outline-none focus:z-10 ${className}`}
    >
      {options.map((option, index) => (
        <option
          key={index}
          value={option.value}
          disabled={option.disabled}
          selected={option.selected}
        >
          {option.label}
        </option>
      ))}
    </select>
  );
};

export default Select;
