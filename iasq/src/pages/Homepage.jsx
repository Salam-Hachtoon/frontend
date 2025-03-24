import "../App.css";
import React, { useState } from "react";
import { useEffect, useRef} from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import LoadingModal from "../components/LoadingModal";

const Homepage = () => {
  const [files, setFiles] = useState([]); 
  const [isFileSelected, setIsFileSelected] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isFileUploaded, setIsFileUploaded] = useState(false);
  const [batchId, setBatchId] = useState(null);
  const [contentType, setContentType] = useState("");
  const [generatedData, setGeneratedData] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSummaryGenerated, setIsSummaryGenerated] = useState(false);

  const navigate = useNavigate();
  const token = localStorage.getItem("accessToken");
  const MAX_FILE_SIZE = 10 * 1024 * 1024;
  const MAX_FILE_COUNT = 3;
  const API_BASE_URL = "http://localhost:8000/api/v1";

  const handleFileSelection = (e) => {
    const selectedFiles = Array.from(e.target.files); 
    setFiles(selectedFiles);
    setIsFileSelected(selectedFiles.length > 0);
  };

  const handleFileDrop = (e) => {
    e.preventDefault();
    const droppedFiles = Array.from(e.dataTransfer.files); 
    setFiles(droppedFiles);
    setIsFileSelected(droppedFiles.length > 0);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleUpload = async () => {
    if (files.length === 0) return;

    if (files.length > MAX_FILE_COUNT) {
      toast.error(`Maximum file limit exceeded. Only ${MAX_FILE_COUNT} files are allowed.`);
      return;
    }

    setIsModalOpen(true);
    setIsLoading(true);

    const formData = new FormData();
    files.forEach((file) => {
      formData.append("files", file);
    });

    try {
      const response = await axios.post(`${API_BASE_URL}/upload_attachments/`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });
      setBatchId(response.data.data[0].batch_id);
      setIsFileUploaded(true);
      toast.success("Files uploaded successfully!");

      checkProcessingStatus(response.data.data[0].batch_id);
    } catch (error) {
      console.error("Error uploading files:", error);
      toast.error("Failed to upload files. Please try again.");
    } finally {
      setIsLoading(false);
      setIsModalOpen(false);
    }
  };


  const isMounted = useRef(true);
  const timeoutRef = useRef(null);

  useEffect(() => {
    return () => {
      isMounted.current = false;
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const checkProcessingStatus = async (batchId) => {
    if (!isMounted.current) return;

    try {
      const response = await axios.post(
        `${API_BASE_URL}/check_attachments/`,
        { batch_id: batchId },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.data.status === "complete") {
        if (!isMounted.current) return;
        setIsProcessing(false);
        toast.success("Processing complete! Generating summary automatically...");
        await generateSummary(batchId);
      } else {
        if (!isMounted.current) return;
        setIsProcessing(true);
        timeoutRef.current = setTimeout(() => checkProcessingStatus(batchId), 5000);
      }
    } catch (error) {
      if (!isMounted.current) return;
      console.error("Error checking status:", error);
      toast.info("Failed to check processing status. Retrying...");
      timeoutRef.current = setTimeout(() => checkProcessingStatus(batchId), 5000);
    }
  };

  const generateSummary = async (batchId) => {
    if (!isMounted.current) return;
    
    setContentType("Summary");
    setIsModalOpen(true);
    setIsLoading(true);
    
    try {
      const response = await axios.post(
        `${API_BASE_URL}/get_summary/`,
        { batch_id: batchId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      
      if (!isMounted.current) return;
      setGeneratedData(response.data.data);
      setIsSummaryGenerated(true);
      toast.success("Summary generated successfully!");
    } catch (error) {
      if (!isMounted.current) return;
      console.error("Error generating Summary:", error);
      toast.error("Failed to generate Summary. Please try again.");
    } finally {
      if (isMounted.current) {
        setIsLoading(false);
        setIsModalOpen(false);
      }
    }
  };


  const handleGenerate = async (action) => {

    if (!isSummaryGenerated && action !== "Summary") {
      toast.warning("Please wait for summary generation to complete.");
      return;
    }
    setContentType(action);
    setIsModalOpen(true);
    setIsLoading(true);

    try {
      let response;
      if (action === "Quiz") {
        response = await axios.post(`${API_BASE_URL}/get_quiz/`, {
          id: generatedData?.id,
          difficulty: "medium",
        }, {
          headers: { Authorization: `Bearer ${token}` },
        });
        toast.success("Quiz generated successfully!");
        navigate("quizpage", { state: { quiz: response.data.data } });
      } else if (action === "Flashcard Set") {
        response = await axios.post(`${API_BASE_URL}/get_flash_cards/`, {
          id: generatedData?.id,
        }, {
          headers: { Authorization: `Bearer ${token}` },
        });
        toast.success("Flashcard Set generated successfully!");
        navigate("flashcards", { state: { flashcards: response.data.data } });
      } else if (action === "Summary") {

        await generateSummary(batchId);
      }
    } catch (error) {
      console.error(`Error generating ${action}:`, error);
      toast.error(`Failed to generate ${action}. Please try again.`);
    } finally {
      setIsLoading(false);
      setIsModalOpen(false);
    }
  };

  const handleCancelUpload = () => {
    setFiles([]); 
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
          onDrop={handleFileDrop}
          onDragOver={handleDragOver}
        >
          {!isFileSelected ? (
            <>
              <img src="/img/upload.svg" alt="Upload Icon" className="w-16 h-16 mx-auto mb-4 cursor-pointer" onClick={() => document.getElementById("file-upload").click()} />
              <p className="text-gray-600 mb-2">Drag and drop files here</p>
              <p className="text-gray-400 text-sm">or</p>
              <input
                type="file"
                id="file-upload"
                className="hidden"
                multiple
                onChange={handleFileSelection}
              />
              <label htmlFor="file-upload" className="text-blue-500 font-semibold cursor-pointer hover:text-blue-600">Click to Select Files</label>
            </>
          ) : (
            <div>
              <p className="text-gray-600">Selected Files:</p>
              {files.map((file, index) => (
                <p key={index} className="text-gray-600">
                  {file.name} ({(file.size / 1024 / 1024).toFixed(2)} MB)
                </p>
              ))}
              <button className="mt-2 px-4 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600 cursor-pointer" onClick={handleCancelUpload}>
                Cancel
              </button>
            </div>
          )}
        </div>

        {isFileSelected && !isFileUploaded && (
          <button className="mt-8 px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 cursor-pointer" onClick={handleUpload}>
            Upload Files
          </button>
        )}

        {isFileUploaded && (
          <div className="mt-8 space-x-4">

            <button 
              className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 cursor-pointer"
              onClick={() => handleGenerate("Quiz")}
              disabled={!isSummaryGenerated}
            >
              Generate Quiz
            </button>
            <button 
              className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 cursor-pointer"
              onClick={() => handleGenerate("Flashcard Set")}
              disabled={!isSummaryGenerated}
            >
              Generate Flashcard Set
            </button>

            <button 
              className="px-6 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 cursor-pointer"
              onClick={() => handleGenerate("Summary")}
              disabled={isSummaryGenerated}
            >
              Generate Summary
            </button>
          </div>
        )}
      </div>
      <LoadingModal isOpen={isModalOpen} isLoading={isLoading} contentType={contentType} onClose={() => setIsModalOpen(false)} />
    </div>
  );
};

export default Homepage;
