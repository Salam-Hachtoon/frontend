import "../App.css";
import React, { useState } from "react";
import Header from "../components/header";
import LoadingModal from "../components/LoadingModal";
import {
  handleFileUpload,
  handleFileDrop,
  handleDragOver,
} from "../utils/fileUploadUtils";

const Homepage = () => {
  const [file, setFile] = useState(null);
  const [isFileUploaded, setIsFileUploaded] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [generatedFileUrl, setGeneratedFileUrl] = useState(null);
  const [contentType, setContentType] = useState("");

  // const fileInputRef = useRef(null);
  // // Trigger file input click
  // const triggerFileInput = () => {
  //   fileInputRef.current.click();
  // };
  // Handle generate actions
  const handleGenerate = async (action) => {
    setIsModalOpen(true);
    setIsLoading(true);
    setContentType(action);

    // Simulate API call
    setTimeout(() => {
      // will be replace with the actual api call
      const fakeGeneratedFileUrl = "https://example.com/generated-summary.pdf";
      setGeneratedFileUrl(fakeGeneratedFileUrl);
      setIsLoading(false);
    }, 3000); // fixed 3 sec delay but needs to be updated with the api call time
  };

  // Close modal
  const closeModal = () => {
    setIsModalOpen(false);
    setGeneratedFileUrl(null);
  };

  return (
    <div>
      {/* Header */}
      <Header />

      <div className="flex flex-col items-center justify-center min-h-screen">
        {/* Heading */}
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold text-gray-800">IASQ</h1>
          <p className="text-lg text-gray-600 mt-2">
            Let's study and improve together
          </p>
        </div>

        {/* File Upload Area */}
        <div
          className="w-full max-w-md p-6 bg-white border-2 border-dashed border-gray-300 rounded-lg text-center cursor-pointer"
          onDrop={(e) => handleFileDrop(e, setFile, setIsFileUploaded)}
          onDragOver={handleDragOver}
        >
          {!isFileUploaded ? (
            <>
              <img
                src="/img/upload.svg"
                alt="Upload Icon"
                className="w-16 h-16 mx-auto mb-4 cursor-pointer"
                onClick={() => document.getElementById("file-upload").click()}
              />
              <p className="text-gray-600 mb-2">Drag and drop a file here</p>
              <p className="text-gray-400 text-sm">or</p>
              <input
                type="file"
                id="file-upload"
                className="hidden"
                onChange={(e) =>
                  handleFileUpload(e, setFile, setIsFileUploaded)
                }
              />
              <label
                htmlFor="file-upload"
                className="text-blue-500 font-semibold cursor-pointer hover:text-blue-600"
              >
                Click to upload
              </label>
            </>
          ) : (
            <p className="text-gray-600">File uploaded: {file.name}</p>
          )}
        </div>

        {/* Generate Buttons */}
        {isFileUploaded && (
          <div className="mt-8 space-x-4">
            <button
              className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 cursor-pointer"
              onClick={() => handleGenerate("Quiz")}
            >
              Generate Quiz
            </button>
            <button
              className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 cursor-pointer"
              onClick={() => handleGenerate("Flashcard Set")}
            >
              Generate Flashcard Set
            </button>
            <button
              className="px-6 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 cursor-pointer"
              onClick={() => handleGenerate("Summary")}
            >
              Generate Summary
            </button>
          </div>
        )}
      </div>

      {/* Loading Modal */}
      <LoadingModal
        isOpen={isModalOpen}
        isLoading={isLoading}
        contentType={contentType}
        file={file}
        generatedFileUrl={generatedFileUrl}
        onClose={closeModal}
      />
    </div>
  );
};

export default Homepage;
