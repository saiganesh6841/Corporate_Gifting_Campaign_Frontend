export const downloadImages = async (imageUrls) => {
  console.log(imageUrls);
  await Promise.all(
    imageUrls.map(async (url, index) => {
      try {
        const response = await fetch(url);
        const blob = await response.blob();
        const blobUrl = URL.createObjectURL(blob);

        const link = document.createElement("a");
        link.href = blobUrl;
        link.download = `image-${index + 1}.jpg`; // Or use a more meaningful name if available
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(blobUrl);
      } catch (error) {
        console.error("Failed to download image:", url, error);
      }
    })
  );
};
