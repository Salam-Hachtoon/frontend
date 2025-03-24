import React from "react";

const EmptyState = ({ title, message, actionText, onAction }) => {
  return (
    <div className="text-center py-12">
      <h3 className="text-2xl font-semibold text-gray-900 mb-4">{title}</h3>
      <p className="text-gray-600 mb-6">{message}</p>
      <button
        onClick={onAction}
        className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
      >
        {actionText}
      </button>
    </div>
  );
};

export default EmptyState;