import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useLocation, useNavigate } from "react-router-dom";
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

  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center my-10">
      <div className="w-1/2 flex flex-col items-center">
        <h1 className="text-2xl tracking-wider mb-5">Record Your Answers</h1>
        <Accordion type="single" collapsible>
          {questions.map((question: string, index: number) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger>{question}</AccordionTrigger>
              <AccordionContent className="flex flex-col items-center">
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
              navigate("/feedback", { state: { feedback: response.data } });
            });
          }}
          className="border-2 rounded px-4 py-2 bg-green-500 mt-5"
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default Interview;
