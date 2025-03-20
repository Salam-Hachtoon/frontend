import "../App.css";
import React, { useState } from "react";
import axios from "axios";
import {  ToastContainer, toast  } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "../components/header";
import LoadingModal from "../components/LoadingModal";
import {
  handleFileSelection,
  handleFileDrop,
  handleDragOver,
} from "../utils/fileUploadUtils";

// Initialize toast notifications


const Homepage = () => {
  const [file, setFile] = useState(null);
  const [fileSize, setFileSize] = useState(null);
  const [isFileSelected, setIsFileSelected] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isFileUploaded, setIsFileUploaded] = useState(false);
  const [generatedFileUrl, setGeneratedFileUrl] = useState(null);
  const [contentType, setContentType] = useState("");
  const [processingId, setProcessingId] = useState(null);

  const token = localStorage.getItem("jwt_token");
  const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10 MB

  const handleUpload = async () => {
    if (!file) return;

    if (file.size > MAX_FILE_SIZE) {
      toast.error("The file size exceeds the maximum limit of 10MB.");
      return;
    }

    setIsModalOpen(true);
    setIsLoading(true);
    
    const formData = new FormData();
    formData.append("file", file);
    formData.append("size", file ? file.size : 0);
    
    try {
      const response = await axios.post("https://your-backend.com/upload", formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      
      setProcessingId(response.data.processingId);
      pollProcessingStatus(response.data.processingId);
      toast.success("File uploaded successfully!");
    } catch (error) {
      console.error("Error uploading file:", error);
      setIsLoading(false);
      setIsModalOpen(false);
      toast.error("Failed to upload file. Please try again.");
    }
  };

  const pollProcessingStatus = async (processingId) => {
    const interval = setInterval(async () => {
      try {
        const response = await axios.get(`https://your-backend.com/status/${processingId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (response.data.status === "completed") {
          clearInterval(interval);
          setIsLoading(false);
          setIsFileUploaded(true);
          setIsModalOpen(false);
          toast.success("File processing completed!");
        }
      } catch (error) {
        console.error("Error checking processing status:", error);
      }
    }, 3000);
  };

  const handleGenerate = async (action) => {
    setContentType(action);
    setIsModalOpen(true);
    setIsLoading(true);
    
    try {
      const response = await axios.post("https://your-backend.com/generate", {
        processingId,
        action,
      }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      
      setTimeout(() => {
        setGeneratedFileUrl(response.data.generatedFileUrl);
        setIsLoading(false);
        toast.success(`${action} generated successfully!`);
      }, 2000);
    } catch (error) {
      console.error("Error generating content:", error);
      setIsLoading(false);
      setIsModalOpen(false);
      toast.error("Failed to generate content. Please try again.");
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setGeneratedFileUrl(null);
  };

  const handleCancelUpload = () => {
    setFile(null);
    setFileSize(null);
    setIsFileSelected(false);
    toast.info("File selection canceled.");
  };

  return (
    <div>
            <ToastContainer />
      <div className="flex flex-col items-center justify-center min-h-screen">
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold text-gray-800">IASQ</h1>
          <p className="text-lg text-gray-600 mt-2">Let's study and improve together</p>
        </div>

        <div
          className="w-full max-w-md p-6 bg-white border-2 border-dashed border-gray-300 rounded-lg text-center cursor-pointer"
          onDrop={(e) => handleFileDrop(e, setFile, setIsFileSelected, setFileSize)}
          onDragOver={handleDragOver}
        >
          {!isFileSelected ? (
            <>
              <img src="/img/upload.svg" alt="Upload Icon" className="w-16 h-16 mx-auto mb-4 cursor-pointer" onClick={() => document.getElementById("file-upload").click()} />
              <p className="text-gray-600 mb-2">Drag and drop a file here</p>
              <p className="text-gray-400 text-sm">or</p>
              <input
                type="file"
                id="file-upload"
                className="hidden"
                onChange={(e) => handleFileSelection(e, setFile, setIsFileSelected, setFileSize)}
              />
              <label htmlFor="file-upload" className="text-blue-500 font-semibold cursor-pointer hover:text-blue-600">Click to Select a File</label>
            </>
          ) : (
            <div>
              <p className="text-gray-600">Selected File: {file.name} ({(fileSize / 1024 / 1024).toFixed(2)} MB)</p>
              <button className="mt-2 px-4 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600 cursor-pointer" onClick={handleCancelUpload}>Cancel</button>
            </div>
          )}
        </div>

        {isFileSelected && !isFileUploaded && (
          <button className="mt-8 px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 cursor-pointer" onClick={handleUpload}>Upload {file.name}</button>
        )}

        {isFileUploaded && (
          <div className="mt-8 space-x-4">
            <button className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 cursor-pointer" onClick={() => handleGenerate("Quiz")}>Generate Quiz</button>
            <button className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 cursor-pointer" onClick={() => handleGenerate("Flashcard Set")}>Generate Flashcard Set</button>
            <button className="px-6 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 cursor-pointer" onClick={() => handleGenerate("Summary")}>Generate Summary</button>
          </div>
        )}
      </div>
      <LoadingModal isOpen={isModalOpen} isLoading={isLoading} contentType={contentType} file={file} generatedFileUrl={generatedFileUrl} onClose={closeModal} />
    </div>
  );
};

export default Homepage;