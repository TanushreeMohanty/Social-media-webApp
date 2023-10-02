import { useRef, useEffect, useState } from "react";
import * as Facemesh from "@mediapipe/face_mesh";
import * as cam from "@mediapipe/camera_utils";

import "../styles/face.css";
import Gallery from "./gallery";

const FaceMeshComponent = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  var camera = null;
  var faceMesh = null;
  const [selectedFilter, setSelectedFilter] = useState("Basic Filter");
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);

  useEffect(() => {
    // Function to initialize and start the webcam feed
    const startWebcam = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
        });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (error) {
        console.error("Error accessing webcam:", error);
      }
    };

    startWebcam();
  }, []);

  useEffect(() => {
    // Initialize Face Mesh
    const initFaceMesh = async () => {
      try {
        if (videoRef.current && canvasRef.current) {
          faceMesh = new Facemesh.FaceMesh({
            locateFile: (file) => {
              return `https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh/${file}`;
            },
          });

          faceMesh.setOptions({
            maxNumFaces: 2,
            minDetectionConfidence: 0.9,
            minTrackingConfidence: 0.8,
            modelComplexity: 0, // Using the Lite model for better performance
            numThreads: 1,
          });

          faceMesh.onResults(onFaceMeshResults);

          camera = new cam.Camera(videoRef.current, {
            onFrame: async () => {
              await faceMesh.send({ image: videoRef.current });
            },
            width: 640,
            height: 480,
          });
          camera.start();
        }
      } catch (error) {
        console.error("Error initializing Face Mesh:", error);
      }
    };

    initFaceMesh();

    return () => {
      // Clean up when the component unmounts
      if (camera) {
        camera.stop();
      }
      if (faceMesh) {
        faceMesh.close();
      }
    };
  }, [selectedFilter]); //adding selectedFilter as a dependency, ensure that the filter changes dynamically when different option selected.

  const onFaceMeshResults = (results) => {
    if (canvasRef.current) {
      const canvasCtx = canvasRef.current.getContext("2d");
      const videoWidth = videoRef.current.videoWidth;
      const videoHeight = videoRef.current.videoHeight;
      canvasRef.current.width = videoWidth;
      canvasRef.current.height = videoHeight;
      canvasCtx.save();
      canvasCtx.clearRect(0, 0, videoWidth, videoHeight);

      if (results.multiFaceLandmarks) {
        for (const landmarks of results.multiFaceLandmarks) {
          drawFaceLandmarks(canvasCtx, landmarks);
        }
      }
      canvasCtx.restore();
    }
  };

  const drawFaceLandmarks = (canvasCtx, faceLandmarks) => {
    if (selectedFilter === "No Filter") {
      // Display only the original webcam feed
      canvasCtx.drawImage(
        videoRef.current,
        0,
        0,
        videoRef.current.width,
        videoRef.current.height
      );
    }
    if (selectedFilter === "Basic Filter") {
      // Define colors for different face parts
      const colors = {
        faceOutline: "#E0E0E0",
        rightEye: "#FF3030",
        leftEye: "#30FF30",
        eyebrows: "#30FF30",
        lips: "#E0E0E0",
      };

      // Draw face outline
      drawConnectors(canvasCtx, faceLandmarks, Facemesh.FACEMESH_FACE_OVAL, {
        color: colors.faceOutline,
        lineWidth: 1,
      });

      // Draw right eye
      drawConnectors(canvasCtx, faceLandmarks, Facemesh.FACEMESH_RIGHT_EYE, {
        color: colors.rightEye,
        lineWidth: 1,
      });

      // Draw left eye
      drawConnectors(canvasCtx, faceLandmarks, Facemesh.FACEMESH_LEFT_EYE, {
        color: colors.leftEye,
        lineWidth: 1,
      });

      // Draw eyebrows
      drawConnectors(
        canvasCtx,
        faceLandmarks,
        Facemesh.FACEMESH_RIGHT_EYEBROW,
        {
          color: colors.eyebrows,
          lineWidth: 1,
        }
      );
      drawConnectors(canvasCtx, faceLandmarks, Facemesh.FACEMESH_LEFT_EYEBROW, {
        color: colors.eyebrows,
        lineWidth: 1,
      });

      // Draw lips
      drawConnectors(canvasCtx, faceLandmarks, Facemesh.FACEMESH_LIPS, {
        color: colors.lips,
        lineWidth: 1,
      });
    }
    if (selectedFilter === "demo") {
      drawSunglasses(canvasCtx, faceLandmarks);
    }
  };

  const drawConnectors = (canvasCtx, landmarks, connectors, options) => {
    if (!landmarks || !canvasCtx) return;

    const { color, lineWidth } = options;

    canvasCtx.strokeStyle = color;
    canvasCtx.lineWidth = lineWidth;

    for (const connector of connectors) {
      const [startIdx, endIdx] = connector;
      const startPoint = landmarks[startIdx];
      const endPoint = landmarks[endIdx];

      if (startPoint && endPoint) {
        canvasCtx.beginPath();
        canvasCtx.moveTo(
          startPoint.x * videoRef.current.clientWidth,
          startPoint.y * videoRef.current.clientHeight
        );
        canvasCtx.lineTo(
          endPoint.x * videoRef.current.clientWidth,
          endPoint.y * videoRef.current.clientHeight
        );
        canvasCtx.stroke();
      }
    }
  };

  //   //debuging_drawSunglasses
  // const drawSunglasses = (canvasCtx, faceLandmarks) => {
  //   if (!canvasRef || !canvasCtx) {
  //     return;
  //   }

  //   console.log("Face Landmarks:", faceLandmarks);

  //   // Check the structure of the faceLandmarks object
  //   console.log("faceLandmarks structure:", Object.keys(faceLandmarks));

  //   // Check specific landmarks by numerical indices
  //   console.log("Right Eye Landmarks:", faceLandmarks[0]); // Replace 0 with the correct index
  //   console.log("Left Eye Landmarks:", faceLandmarks[1]); // Replace 1 with the correct index

  //   // Store the landmarks if they are accessible
  //   const rightEye = faceLandmarks[0]; // Replace 0 with the correct index
  //   const leftEye = faceLandmarks[1]; // Replace 1 with the correct index

  //   console.log(rightEye, leftEye);

  //   const sunglasses = new Image();
  //   sunglasses.src = "./src/assets/sunglass.png";

  //   sunglasses.onload = () => {
  //     console.log("Sunglasses image loaded successfully!");

  //     const x = (faceLandmarks[0].x + faceLandmarks[1].x) / 2;
  //     const y = (faceLandmarks[0].y + faceLandmarks[1].y) / 2;
  //     const width = faceLandmarks[1].x - faceLandmarks[0].x;
  //     const height = (sunglasses.height / sunglasses.width) * width;

  //     console.log("Sunglasses Position (x, y):", x, y);
  //     console.log("Sunglasses Dimensions (width, height):", width, height);

  //     if (sunglasses.loaded) {
  //       // Draw the sunglasses image on the canvas
  //       canvasCtx.drawImage(sunglasses, x, y, width, height);

  //       // Log a message to the console indicating that the image is being displayed
  //       console.log("Sunglasses image is being displayed on the screen.");
  //     } else {
  //       // Log a message to the console indicating that the image is not being displayed
  //       console.log("Sunglasses image is not being displayed on the screen.");
  //     }
  //   };

  //   // Log if there's an error loading the image
  //   sunglasses.onerror = (error) => {
  //     console.error("Error loading sunglasses image:", error);
  //   };
  // };

  const drawSunglasses = (canvasCtx, faceLandmarks) => {
    if (!canvasRef || !canvasCtx) {
      return;
    }

    // Store the landmarks if they are accessible
    const rightEye = faceLandmarks[0]; // Right eye index
    const leftEye = faceLandmarks[1]; // Left eye index

    const sunglasses = new Image();
    sunglasses.src = "./src/assets/sunglass.png";

    sunglasses.onload = () => {
      console.log("Sunglasses image loaded successfully!");

      if (rightEye && leftEye) {
        // Calculate the position and size of the sunglasses
        const x = leftEye.x + (rightEye.x - leftEye.x) / 2; // Calculate x based on the center of the eyes
        const y = (leftEye.y + rightEye.y) / 2; // Calculate y based on the average of vertical positions
        const width = rightEye.x - leftEye.x;
        const height = (sunglasses.height / sunglasses.width) * width;

        console.log("Sunglasses Position (x, y):", x, y);
        console.log("Sunglasses Dimensions (width, height):", width, height);

        // Draw the sunglasses image on the canvas
        canvasCtx.drawImage(sunglasses, width, height);

        // Log a message to the console indicating that the image is being displayed
        console.log("Sunglasses image is being displayed on the screen.");
      } else {
        // Log a message to the console indicating that the landmarks are not found
        console.error("Right eye and/or left eye landmarks not found.");
      }
    };

    // Log if there's an error loading the image
    sunglasses.onerror = (error) => {
      console.error("Error loading sunglasses image:", error);
    };
  };

  const onCaptureClick = () => {
    openGallery();

    if (!videoRef.current || !canvasRef.current) {
      return;
    }

    const video = videoRef.current;
    const canvas = canvasRef.current;

    // Create a canvas element to capture the image
    const captureCanvas = document.createElement("canvas");
    const captureCanvasCtx = captureCanvas.getContext("2d");

    if (!captureCanvasCtx) {
      return;
    }

    const videoWidth = video.videoWidth;
    const videoHeight = video.videoHeight;

    if (!videoWidth || !videoHeight) {
      return;
    }

    // Set the canvas size to match the video frame size
    captureCanvas.width = videoWidth;
    captureCanvas.height = videoHeight;

    // Draw the current frame from the video element onto the capture canvas
    captureCanvasCtx.drawImage(video, 0, 0, videoWidth, videoHeight);

    // Draw the filter canvas on top of the video frame
    captureCanvasCtx.drawImage(canvas, 0, 0, videoWidth, videoHeight);

    // Save the captured image data from the capture canvas to localStorage
    const imageDataURL = captureCanvas.toDataURL("image/png");

    // Retrieve the existing image URLs from localStorage or initialize an empty array
    const existingImageUrls =
      JSON.parse(localStorage.getItem("capturedImages")) || [];

    if (existingImageUrls.length >= 10) {
      // Display a message when the image limit is exceeded
      alert("Image capture limit reached (10 images).");
      return;
    }

    // Add the new image URL to the array
    existingImageUrls.push(imageDataURL);

    // Store the updated array in localStorage
    localStorage.setItem("capturedImages", JSON.stringify(existingImageUrls));

    // Log a message to indicate that the image has been captured
    console.log("Image captured and saved to localStorage.");
  };

  const openGallery = () => {
    setIsGalleryOpen(true);
  };

  const closeGallery = () => {
    setIsGalleryOpen(false);
  };
  return (
    <div className="face-mesh-container">
      <div
        className="video-container"
        style={{ display: isGalleryOpen ? "none" : "block" }}
      >
        <video ref={videoRef} autoPlay playsInline />
        <div className="filter-selection">
          <label>Select a Filter: </label>
          <select
            value={selectedFilter}
            onChange={(e) => setSelectedFilter(e.target.value)}
          >
            <option value="No Filter">No Filter</option>
            <option value="Basic Filter">Basic Filter</option>
            <option value="demo">demo</option>
          </select>
        </div>
        <canvas ref={canvasRef} className="output-canvas" />
      </div>
      {isGalleryOpen && (
        <div className="gallery-modal">
          <div className="gallery-content">
            <span className="close-button" onClick={closeGallery}>
              &times;
            </span>
            <Gallery />
          </div>
        </div>
      )}
      <div className="capture-screen">
        {!isGalleryOpen && (<button onClick={onCaptureClick}>Capture</button>)}
        <button onClick={isGalleryOpen ? closeGallery : openGallery}>
          {isGalleryOpen ? "Close Gallery" : "Open Gallery"}
        </button>
      </div>
    </div>
  );
};

export default FaceMeshComponent;
