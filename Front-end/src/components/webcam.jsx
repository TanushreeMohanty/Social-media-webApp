import { useRef, useEffect, useState } from "react";
import * as Facemesh from "@mediapipe/face_mesh";
import * as cam from "@mediapipe/camera_utils";
import "./webcamstyle.css";

const WebcamCapture = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [isSelfieMode, setIsSelfieMode] = useState(false);
  var camera = null;
  var faceMesh = null;

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
            maxNumFaces: 1,
            minDetectionConfidence: 0.8,
            minTrackingConfidence: 0.8,
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
  }, []);

  const toggleSelfieMode = () => {
    setIsSelfieMode((prev) => !prev);
    // Flip the video horizontally by changing the scaleX property
    if (videoRef.current) {
      videoRef.current.style.transform = isSelfieMode
        ? "scaleX(1)"
        : "scaleX(-1)";
    }
  };

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
          for (const landmark of landmarks) {
            const x = landmark.x * videoWidth;
            const y = landmark.y * videoHeight;
            const radius = 1; // Adjust the radius as needed
            canvasCtx.beginPath();
            canvasCtx.arc(x, y, radius, 0, 2 * Math.PI);
            canvasCtx.fillStyle = "white"; // Set the color
            canvasCtx.fill();
          }
        }
      }
      canvasCtx.restore();
    }
  };

  return (
    <div className="webcam-capture">
      <h1>Webcam Capture with Face Mesh</h1>
      <div className={`video-container ${isSelfieMode ? "selfie-mode" : ""}`}>
        <video ref={videoRef} autoPlay playsInline />
        <canvas ref={canvasRef} className="output_canvas" />
      </div>
      <button onClick={toggleSelfieMode}>
        {isSelfieMode ? "Disable Selfie Mode" : "Enable Selfie Mode"}
      </button>
    </div>
  );
};

export default WebcamCapture;
