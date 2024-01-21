import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useLocation } from "react-router-dom";

const Feedback = () => {
  const { state } = useLocation();
  const { feedback } = state;

  console.log(feedback);

  const questions = [
    feedback.question1,
    feedback.question2,
    feedback.question3,
  ];

  const feedbacks = [
    feedback.feedback1,
    feedback.feedback2,
    feedback.feedback3,
  ];

  return (
    <div className="flex flex-col items-center mt-5">
      <div className="w-1/2 flex flex-col items-center">
        <h1 className="text-2xl tracking-wider mb-5">Your Feedback</h1>
        <Accordion type="single" collapsible>
          {questions.map((question: string, index: number) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger>{question}</AccordionTrigger>
              <AccordionContent className="flex flex-col items-center">
                <p className="text-center">{feedbacks[index]}</p>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
};

export default Feedback;
