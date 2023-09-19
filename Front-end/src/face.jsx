import { useRef, useEffect, useState } from "react";
import * as Facemesh from "@mediapipe/face_mesh";
import * as cam from "@mediapipe/camera_utils";
import "./face.css";

const FaceMeshComponent = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  var camera = null;
  var faceMesh = null;
  const [selectedFilter, setSelectedFilter] = useState("No Filter");

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
            minDetectionConfidence: 0.1,
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
    if(selectedFilter === "demo"){
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
  
  const drawSunglasses = (canvasCtx, faceLandmarks) => {
      // Loading the sunglass image
      const sunglasses = new Image();
      sunglasses.src = "./assets/sunglass.png"; 
  
      // Waiting for the image to load before drawing it
      sunglasses.onload = () => {
        // Calculating the position for the sunglasses based on the landmarks
        const rightEye = faceLandmarks[Facemesh.FACEMESH_RIGHT_EYE];
        const leftEye = faceLandmarks[Facemesh.FACEMESH_LEFT_EYE];
  
        if (rightEye && leftEye) {
          const x = (leftEye[0].x + rightEye[3].x) / 2; // X position between eyes
          const y = (leftEye[0].y + leftEye[3].y) / 2; // Y position between eyes
  
          // Calculate the width and height of the sunglasses based on eye distance
          const width = rightEye[3].x - leftEye[0].x;
          const height = sunglasses.height * (width / sunglasses.width);
  
          // Draw the sunglasses
          canvasCtx.drawImage(sunglasses, x - width / 2, y - height / 2, width, height);
        }
      };
  };

  return (
    <div className="face-mesh-container">
      <h1>Anime AR Feat.</h1>

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
      <div className="video-container">
        <video ref={videoRef} autoPlay playsInline />
        <canvas ref={canvasRef} className="output-canvas" />
      </div>
    </div>
  );
};

export default FaceMeshComponent;
