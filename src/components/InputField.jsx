import React, { useState } from "react";

function InputField({
  label,
  name,
  type,
  placeholder,
  value,
  required,
  onChange,
  accept,
  maxSize,
}) {
  const [selectedFile, setSelectedFile] = useState("No file chosen");
  const [fileError, setFileError] = useState(null);
  const isFileType = type === "file";

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];

      if (maxSize && file.size > maxSize) {
        setFileError(`File size must be less than ${maxSize / 1024 / 1024} MB`);
      } else {
        setSelectedFile(file.name);
        setFileError(null);
        if (onChange) onChange(e);
      }
    }
  };

  return (
    <div className="mb-3">
      <div className="flex items-center mb-2">
        <label
          htmlFor={name}
          className="block text-sm font-medium text-gray-900"
        >
          {label}
        </label>
        {fileError && (
          <span className="text-red-500 text-xs ml-2">{fileError}</span>
        )}
      </div>

      {isFileType ? (
        <div className="flex items-center">
          <input
            type="file"
            id={name}
            name={name}
            accept={accept}
            onChange={handleFileChange}
            hidden
          />
          <label
            htmlFor={name}
            className="px-4 py-2 md:w-36 w-48 min-h-[40px] bg-violet-800 text-white rounded-l-lg cursor-pointer hover:bg-violet-700"
          >
            Choose file
          </label>
          <span className="px-4 py-2 w-full bg-gray-50 border border-gray-300 rounded-r-lg text-gray-500 min-h-[40px] flex items-center">
            {selectedFile}
          </span>
        </div>
      ) : (
        <input
          type={type}
          id={name}
          name={name}
          placeholder={placeholder}
          value={value}
          required={required}
          onChange={onChange}
          className="w-full p-2.5 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:border-violet-600"
        />
      )}
    </div>
  );
}

export default InputField;
