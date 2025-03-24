import React from "react";

const Loader = ({ message = "Loading..." }) => {
  return (
    <div className="flex flex-col items-center justify-center space-y-4">
      <div className="w-12 h-12 border-4 border-t-4 border-gray-200 border-t-blue-500 rounded-full animate-spin"></div>
      <p className="text-gray-600">{message}</p>
    </div>
  );
};

export default Loader;