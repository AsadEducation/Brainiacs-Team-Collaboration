import ImageKit from "imagekit"; // Use import instead of require

const imagekit = new ImageKit({
  publicKey: import.meta.env.VITE_IMAGEKIT_PUBLIC_KEY, 
  privateKey: import.meta.env.VITE_IMAGEKIT_PRIVATE_KEY,
  urlEndpoint: import.meta.env.VITE_IMAGEKIT_URL_ENDPOINT,
});

// Function to upload a file
async function uploadFile(filePath, fileName) {
  try {
    const response = await imagekit.upload({
      file: filePath,
      fileName: fileName,
    });
    return response;
  } catch (error) {
    console.error("Error uploading file:", error);
    throw error;
  }
}

export { uploadFile };
