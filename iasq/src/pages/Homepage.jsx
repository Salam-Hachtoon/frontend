import "../App.css";
import React, { useState } from "react";
import Header from "../components/header";
import LoadingModal from "../components/LoadingModal";
import {
  handleFileSelection,
  handleFileDrop,
  handleDragOver,
} from "../utils/fileUploadUtils";

const Homepage = () => {
  const [file, setFile] = useState(null);
  const [isFileSelected, setIsFileSelected] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isFileUploaded, setIsFileUploaded] = useState(false); // Track if file is uploaded
  const [generatedFileUrl, setGeneratedFileUrl] = useState(null);
  const [contentType, setContentType] = useState("");

  // Handle file upload to AI
  const handleUpload = async () => {
    setIsModalOpen(true);
    setIsLoading(true);

    try {
      // Simulate file upload to AI
      const response = await fakeUploadFileToAI(file);
      console.log("File uploaded successfully:", response);

      // Simulate backend confirmation
      setTimeout(() => {
        setIsLoading(false);
        setIsFileUploaded(true); // File has been processed successfully
        setIsModalOpen(false); // Close the loading modal
      }, 3000); // Simulate a 3-second delay for processing
    } catch (error) {
      console.error("Error uploading file:", error);
      setIsLoading(false);
      setIsModalOpen(false);
      alert("Failed to upload file. Please try again.");
    }
  };

  // Simulate file upload to AI
  const fakeUploadFileToAI = async (file) => {
    console.log("Uploading file:", file.name); // Log the file name
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ status: "success", message: "File processed successfully" });
      }, 3000); // Simulate a 3-second delay
    });
  };

  // Handle generate actions (Quiz, Flashcard Set, Summary)
  const handleGenerate = async (action) => {
    setContentType(action);
    setIsModalOpen(true); // Show loading modal
    setIsLoading(true);

    try {
      // Simulate API call for generating content
      const response = await fakeGenerateContent(action, file);
      console.log("Generated content:", response);

      // Simulate receiving the summarized file URL from the backend
      setTimeout(() => {
        const fakeGeneratedFileUrl = "https://example.com/generated-summary.pdf";
        setGeneratedFileUrl(fakeGeneratedFileUrl);
        setIsLoading(false);

        // Open the generated file in a new browser window or trigger download
        //window.open(fakeGeneratedFileUrl, "_blank"); // Open in new tab
      }, 2000); // Simulate a 2-second delay
    } catch (error) {
      console.error("Error generating content:", error);
      setIsLoading(false);
      setIsModalOpen(false);
      alert("Failed to generate content. Please try again.");
    }
  };

  // Simulate generating content (Quiz, Flashcard Set, Summary)
  const fakeGenerateContent = async (action, file) => {
    console.log(`Generating ${action} for file:`, file.name);
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ status: "success", message: `${action} generated successfully` });
      }, 2000); // Simulate a 2-second delay
    });
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
          onDrop={(e) => handleFileDrop(e, setFile, setIsFileSelected)}
          onDragOver={handleDragOver}
        >
          {!isFileSelected ? (
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
                  handleFileSelection(e, setFile, setIsFileSelected)
                }
              />
              <label
                htmlFor="file-upload"
                className="text-blue-500 font-semibold cursor-pointer hover:text-blue-600"
              >
                Click to Select a File
              </label>
            </>
          ) : (
            <p className="text-gray-600">Selected File: {file.name}</p>
          )}
        </div>

        {/* Upload Button (appears after file selection) */}
        {isFileSelected && !isFileUploaded && (
          <button
            className="mt-8 px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 cursor-pointer"
            onClick={handleUpload}
          >
            Upload {file.name}
          </button>
        )}

        {/* Generate Buttons (appear after file is uploaded and processed) */}
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