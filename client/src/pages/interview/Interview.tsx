import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useLocation } from "react-router-dom";
import MediaRecorderOld from "../components/MediaRecorderOld";
import Webcam from "react-webcam";
import MediaRecorder from "../components/MediaRecorder";
import { useState } from "react";
import axios from "axios";

const Interview = () => {
  const API_URL = import.meta.env.VITE_API_URL;

  const { state } = useLocation();
  const { questions } = state;

  const [videoBlobs, setVideoBlobs] = useState(undefined || ([] as Blob[]));

  const addVideoBlob = (blob: Blob) => {
    setVideoBlobs([...videoBlobs, blob]);
  };

  console.log(videoBlobs);

  return (
    <div>
      <Accordion type="single" collapsible>
        {questions.map((question: string, index: number) => (
          <AccordionItem key={index} value={`item-${index}`}>
            <AccordionTrigger>{question}</AccordionTrigger>
            <AccordionContent>
              {<MediaRecorder addVideoBlob={addVideoBlob} />}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>

      <button
        onClick={() => {
          const data = {
            recording1: videoBlobs[0],
            recording2: videoBlobs[1],
            recording3: videoBlobs[2],
            question1: questions[0],
            question2: questions[1],
            question3: questions[2],
          };
          axios.post(`${API_URL}/get-feedback`, data).then((response) => {
            console.log(response);
          });
        }}
      >
        Submit
      </button>
    </div>
  );
};

export default Interview;
