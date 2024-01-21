import axios from "axios";
import React, { useEffect, useState } from "react";
import { useReactMediaRecorder } from "react-media-recorder";
import Webcam from "react-webcam";

interface MediaRecorderProps {
  addVideoBlob: (blob: Blob) => void;
}

const MediaRecorder = (props: MediaRecorderProps) => {
  const { status, startRecording, stopRecording, mediaBlobUrl } =
    useReactMediaRecorder({
      video: true,
      audio: true,
      blobPropertyBag: { type: "video/mp4" },
    });

  useEffect(() => {
    if (mediaBlobUrl) {
      axios.get(mediaBlobUrl).then((response) => {
        props.addVideoBlob(response.data);
      });
    }
  }, [mediaBlobUrl]);

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
        <button
          onClick={() => {
            stopRecording();
          }}
          className="border"
        >
          Stop Recording
        </button>
      )}
    </div>
  );
};

export default MediaRecorder;
