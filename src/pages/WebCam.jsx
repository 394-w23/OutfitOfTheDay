import React from "react";
import Webcam from "react-webcam";

const WebCam = () => {

  const videoConstraints = {
    width: 400,
    height: 600,
    aspectRatio: 0.5,
    facingMode: "user"
  };

  const webcamRef = React.useRef(null);

  const capture = React.useCallback(
    () => {
      const imageSrc = webcamRef.current.getScreenshot();
      console.log(imageSrc)
    },
    [webcamRef]
  );

  return (
    <div className="camera">
    <Webcam
        audio={false}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        videoConstraints={videoConstraints}
    />
    <button onClick={capture}>Capture photo</button>
    </div>
  );
};

export default WebCam;
