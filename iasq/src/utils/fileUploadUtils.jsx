export const handleFileUpload = (event, setFile, setIsFileUploaded) => {
  const uploadedFile = event.target.files[0];
  if (uploadedFile) {
    setFile(uploadedFile);
    setIsFileUploaded(true);
  }
};

export const handleFileDrop = (event, setFile, setIsFileUploaded) => {
  event.preventDefault();
  const droppedFile = event.dataTransfer.files[0];
  if (droppedFile) {
    setFile(droppedFile);
    setIsFileUploaded(true);
  }
};

export const handleDragOver = (event) => {
  event.preventDefault();
};
