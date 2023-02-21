import React from "react";
import Container from "react-bootstrap/Container";
import { BsFillRecordCircleFill } from "react-icons/bs";
import Webcam from "react-webcam";

const WebCam = ({ setImgBytes }) => {
  const videoConstraints = {
    width: 400,
    height: 600,
    aspectRatio: 0.5,
    facingMode: "user",
  };

  const webcamRef = React.useRef(null);

  const capture = React.useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImgBytes(imageSrc);
  }, [webcamRef]);

  return (
    <Container className="webcam-container">
      <Container>
        <Webcam
          className="webcam"
          audio={false}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          videoConstraints={videoConstraints}
        />
      </Container>
      <Container className="mt-2">
        <BsFillRecordCircleFill size={34} onClick={capture} />
      </Container>
    </Container>
  );
};

export default WebCam;
