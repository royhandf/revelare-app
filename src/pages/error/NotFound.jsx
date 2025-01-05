import React from "react";

const NotFound = () => {
  const handleClick = () => {
    window.location.href = "/";
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center max-w-md w-full mx-4">
        <div className="mb-6 text-red-500">
          <span className="text-6xl font-bold">404</span>
        </div>

        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Page Not Found
        </h1>

        <p className="text-gray-600 text-lg mb-8">
          The page you are looking for does not exist.
        </p>

        <button
          onClick={handleClick}
          className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors duration-200"
        >
          Go Back Home
        </button>
      </div>
    </div>
  );
};

export default NotFound;
