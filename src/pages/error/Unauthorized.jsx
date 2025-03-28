import React from "react";
import Button from "../../components/Button";

const Unauthorized = () => {
  const handleClick = () => {
    window.location.href = "/";
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center max-w-md w-full mx-4">
        <div className="mb-6 text-violet-500">
          <span className="text-6xl font-bold">×</span>
        </div>

        <h1 className="text-3xl font-bold text-gray-900 mb-4">Access Denied</h1>

        <p className="text-gray-600 text-lg mb-8">
          You do not have permission to access this page.
        </p>

        <Button
          onClick={handleClick}
          className="bg-violet-600 hover:bg-violet-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors duration-200"
        >
          Go Back
        </Button>
      </div>
    </div>
  );
};

export default Unauthorized;
