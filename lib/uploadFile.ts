import axios from 'axios';

export async function fileUploader(
  baseUrl: string,
  file: File,
  setUploadModal,
  setIsUploading,
  setProgress,
  closeModalImmediately = false
) {
  if (file) {
    const reader = new FileReader();

    reader.readAsArrayBuffer(file);
    reader.onerror = () => {
      console.error('Error reading file:', reader.error);
    };
  }

  // Close the modal immediately if requested
  if (closeModalImmediately && setUploadModal) {
    setUploadModal(false);
  }

  // Don't close the modal until upload is complete if not closed already
  try {
    await axios.put(baseUrl, file, {
      headers: {
        'Content-Type': file.type,
      },
      onUploadProgress: progressEvent => {
        //@ts-ignore
        const progress = Math.round((progressEvent.loaded / progressEvent.total) * 100);
        setProgress(progress);
      },
    });

    // Only close the modal after successful upload if not already closed
    if (!closeModalImmediately && setUploadModal) {
      setUploadModal(false);
    }
    setIsUploading(false);
  } catch (error) {
    console.error('Upload error:', error);
    setIsUploading(false);
    // Don't close modal on error to allow retry
  }
}
