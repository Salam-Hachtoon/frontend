import "../App.css";
import Header from "../components/header";
import { useState } from "react";

const Homepage = () => {
  const [file, setFile] = useState(null);
  const [isFileUploaded, setIsFileUploaded] = useState(false);

  // Handle file upload
  const handleFileUpload = (event) => {
    const uploadedFile = event.target.files[0];
    if (uploadedFile) {
      setFile(uploadedFile);
      setIsFileUploaded(true);
    }
  };

  // Handle file drop
  const handleFileDrop = (event) => {
    event.preventDefault();
    const droppedFile = event.dataTransfer.files[0];
    if (droppedFile) {
      setFile(droppedFile);
      setIsFileUploaded(true);
    }
  };

  // Prevent default behavior for drag and drop
  const handleDragOver = (event) => {
    event.preventDefault();
  };

  // Handle generate actions
  const handleGenerate = (action) => {
    alert(`Generating ${action} for file: ${file.name}`);
    // Add logic to generate quiz, flashcards, or summary
  };

  return (

      <div>
        {/* header */}
        <Header></Header>

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
            onDrop={handleFileDrop}
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
                  onChange={handleFileUpload}
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

          {/* Upload a File Rectangle */}
          {/* <div className="border border-[#E2E8F0] bg-white p-4 shadow-lg">
            <div className="max-w-md mx-auto">
              <div
                className="flex items-center justify-center p-4 bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer"
                onClick={() => document.getElementById("file-upload").click()}
              >
                <img
                  src="/img/upload.svg"
                  alt="Upload Icon"
                  className="w-6 h-6 mr-2"
                />
                <p className="text-gray-600">Upload a file to get started</p>
              </div>
            </div>
          </div> */}

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
      </div>

  );
};

export default Homepage;
