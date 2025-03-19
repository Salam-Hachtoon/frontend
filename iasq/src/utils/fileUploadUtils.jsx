export const handleFileSelection= (event, setFile, setIsFileSelected) => {
  const selectedFile = event.target.files[0];
  if (selectedFile) {
    setFile(selectedFile);
    setIsFileSelected(true);
  }
};

export const handleFileDrop = (event, setFile, setIsFileSelected) => {
  event.preventDefault();
  const droppedFile = event.dataTransfer.files[0];
  if (droppedFile) {
    setFile(droppedFile);
    setIsFileSelected(true);
  }
};

export const handleDragOver = (event) => {
  event.preventDefault();
};
