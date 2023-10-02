import { useState, useEffect } from "react";
import "../styles/gallery.css";
import { FiTrash, FiDownload } from "react-icons/fi";

function Gallery() {
  // Initialize the list of images with those stored in localStorage
  const [imageUrls, setImageUrls] = useState(
    JSON.parse(localStorage.getItem("capturedImages")) || []
  );

  // Use useEffect to listen for changes in localStorage and update the state
  useEffect(() => {
    const updateImagesFromLocalStorage = () => {
      const storedImages =
        JSON.parse(localStorage.getItem("capturedImages")) || [];
      setImageUrls(storedImages);
    };

    // Listen for changes to the "capturedImages" key in localStorage
    window.addEventListener("storage", updateImagesFromLocalStorage);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener("storage", updateImagesFromLocalStorage);
    };
  }, []);

  // Function to handle image deletion
  const handleDelete = (index) => {
    const updatedImages = [...imageUrls];
    updatedImages.splice(index, 1);
    setImageUrls(updatedImages);
    // Also update localStorage
    localStorage.setItem("capturedImages", JSON.stringify(updatedImages));
  };

  // Function to handle image download
  const handleDownload = (imageUrl) => {
    // Create an anchor element to trigger the download
    const link = document.createElement("a");
    link.href = imageUrl;
    link.download = `captured_image_${new Date().getTime()}.jpg`; // Customize the downloaded file name
    link.click();
  };

  return (
    <>
      <div>
        <h1>Image Gallery</h1>
        <div className="image-container">
          {imageUrls.reverse().map((imageUrl, index) => (
            <div key={index} className="image-item">
              <img src={imageUrl} alt={`Captured Image ${index + 1}`} />
              <div className="image-options">
                <button onClick={() => handleDelete(index)}>
                  <FiTrash />
                </button>
                <button onClick={() => handleDownload(imageUrl)}>
                  <FiDownload />{" "}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Gallery;
