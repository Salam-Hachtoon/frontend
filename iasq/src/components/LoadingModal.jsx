import React from "react";

const LoadingModal = ({
  isOpen,
  isLoading,
  contentType,
  file,
  generatedFileUrl,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-[#00000070]">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
        {isLoading ? (
          <div className="text-center">
            <p className="text-gray-800 mb-4">
              {contentType ?
                 `Please wait, your ${contentType} is being generated`
                : "Please wait while the file is being processed"}
            </p>
            {/* Loading Bar Animation */}
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div className="loading-bar h-2.5 bg-blue-500 rounded-full"></div>
            </div>
          </div>
        ) : (
          <>
            <p className="text-gray-800 mb-4">
              {file.name} has finished processing.
            </p>
            <div className="flex space-x-4">
              <a
                href={generatedFileUrl}
                download={`${file.name}_${contentType}.pdf`}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
              >
                Download PDF
              </a>
              <a
                href={generatedFileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
              >
                View in New Tab
              </a>
              <button
                onClick={onClose}
                className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
              >
                Close
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default LoadingModal;
