import axios from "axios";

export async function fileUploader(baseUrl: string, file: File, setUploadModal, setIsUploading) {
  if (file) {
    const reader = new FileReader();

    reader.readAsArrayBuffer(file);
    reader.onerror = () => {
      console.error('Error reading file:', reader.error);
    };
  }

  setUploadModal(false)
  await axios.put(baseUrl, file, {
    headers: {
      "Content-Type": "video/mp4"
    }
  })

  setIsUploading(false)
}