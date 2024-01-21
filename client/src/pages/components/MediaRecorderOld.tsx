import { useState } from "react";
import { useReactMediaRecorder } from "react-media-recorder";
import axios from "axios";

function MediaRecorderOld() {
  const { status, startRecording, stopRecording, mediaBlobUrl } =
    useReactMediaRecorder({
      video: true,
      audio: true,
      blobPropertyBag: { type: "video/mp4" },
    });
  const [showVideoScreen, setShowVideoScreen] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [recordingStopped, setRecordingStopped] = useState(false); // Add state for recording stopped

  function userMessage() {
    return <div>{isRecording ? <p>Recording in progress...</p> : null}</div>;
  }

  async function sendRecordedVideoToApi(url: string) {
    const API = import.meta.env.API_URL;
    if (!url) {
      console.log("Media Blob is Undefined.");
      return;
    }
    try {
      const response = await fetch(url);
      const blobData = await response.blob();
      const formData = new FormData();
      formData.append("video", blobData, "recorded-video.mp4");
      await axios.post(API, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("Video uploaded successfully.");
    } catch (error) {
      console.error("Error while uploading video:", error);
    }
  }

  async function handleAnalyzeClick() {
    if (mediaBlobUrl) {
      await sendRecordedVideoToApi(mediaBlobUrl);
    } else {
      console.error("No recorded video to analyze.");
    }
  }

  function toggleRecord() {
    if (isRecording) {
      stopRecording();
      setShowVideoScreen(false);
      setRecordingStopped(true); // Set recordingStopped to true when recording stops
    } else {
      setShowVideoScreen(true);
      startRecording();
    }
    setIsRecording(!isRecording);
  }

  function VideoScreen() {
    return (
      <div>
        <video src={mediaBlobUrl} controls autoPlay></video>
      </div>
    );
  }

  return (
    <>
      <div>
        <p>{status}</p>
      </div>
      <div>
        {userMessage()}
        <button onClick={toggleRecord}>
          {isRecording ? "Stop Recording" : "Start Recording"}
        </button>
        {showVideoScreen ? null : <VideoScreen />}
      </div>
      <div>
        {recordingStopped && (
          <button onClick={handleAnalyzeClick}>Analyze Video</button>
        )}
      </div>
    </>
  );
}

export default MediaRecorderOld;
