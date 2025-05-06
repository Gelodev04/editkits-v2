import axios from 'axios';

export async function fileUploader(
  baseUrl: string,
  file: File,
  setUploadModal,
  setIsUploading,
  setProgress
) {
  if (file) {
    const reader = new FileReader();

    reader.readAsArrayBuffer(file);
    reader.onerror = () => {
      console.error('Error reading file:', reader.error);
    };
  }

  // Don't close the modal until upload is complete
  try {
    await axios.put(baseUrl, file, {
      headers: {
        'Content-Type': 'video/mp4',
      },
      onUploadProgress: progressEvent => {
        //@ts-ignore
        const progress = Math.round((progressEvent.loaded / progressEvent.total) * 100);
        setProgress(progress);
      },
    });

    // Only close the modal after successful upload
    setUploadModal(false);
    setIsUploading(false);
  } catch (error) {
    console.error('Upload error:', error);
    setIsUploading(false);
    // Don't close modal on error to allow retry
  }
}
