import React from "react";

function Textarea({ label, name, placeholder, value, required, onChange }) {
  return (
    <div className="mb-3">
      <label
        htmlFor={name}
        className="block text-sm mb-2 font-medium text-gray-900"
      >
        {label}
      </label>
      <textarea
        id={name}
        name={name}
        placeholder={placeholder}
        required={required}
        onChange={onChange}
        value={value}
        className="w-full p-2.5 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-violet-500"
        rows="8"
      ></textarea>
    </div>
  );
}

export default Textarea;
