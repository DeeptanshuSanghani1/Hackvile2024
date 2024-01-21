import axios from "axios";
import { useEffect } from "react";
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
    <div className="flex flex-col items-center">
      {status !== "stopped" ? (
        <Webcam className="rounded-md" />
      ) : (
        <video src={mediaBlobUrl} controls autoPlay className="rounded-md" />
      )}

      {status === "idle" && (
        <button
          onClick={startRecording}
          className="border mt-5 px-4 py-2 rounded bg-slate-900 text-white"
        >
          Start Recording
        </button>
      )}
      {status === "recording" && (
        <button
          onClick={() => {
            stopRecording();
          }}
          className="border mt-5 px-4 py-2 rounded-lg bg-slate-900 text-white"
        >
          Stop Recording
        </button>
      )}
    </div>
  );
};

export default MediaRecorder;
