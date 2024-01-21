import React, { useState } from "react";
import { useReactMediaRecorder } from "react-media-recorder";
import Webcam from "react-webcam";

const MediaRecorder = () => {
  const { status, startRecording, stopRecording, mediaBlobUrl } =
    useReactMediaRecorder({
      video: true,
      audio: true,
      blobPropertyBag: { type: "video/mp4" },
    });
  console.log(status);
  return (
    <div>
      {status !== "stopped" ? (
        <Webcam />
      ) : (
        <video src={mediaBlobUrl} controls />
      )}

      {status === "idle" && (
        <button onClick={startRecording} className="border">
          Start Recording
        </button>
      )}
      {status === "recording" && (
        <button onClick={stopRecording} className="border">
          Stop Recording
        </button>
      )}
    </div>
  );
};

export default MediaRecorder;
