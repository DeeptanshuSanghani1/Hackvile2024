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

const Interview = () => {
  const { state } = useLocation();
  const { questions } = state;

  console.log(questions);

  return (
    <div>
      {/* <Accordion type="single" collapsible>
        <AccordionItem value="item-1">
          <AccordionTrigger>Is it accessible?</AccordionTrigger>
          <AccordionContent>
            Yes. It adheres to the WAI-ARIA design pattern.
          </AccordionContent>
        </AccordionItem>
      </Accordion> */}
      <Accordion type="single" collapsible>
        {questions.map((question: string, index: number) => (
          <AccordionItem key={index} value={`item-${index}`}>
            <AccordionTrigger>{question}</AccordionTrigger>
            <AccordionContent>
              {
                <MediaRecorder />
                //   <Webcam />
              }
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};

export default Interview;
