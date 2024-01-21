import { useLocation } from "react-router-dom";

const Feedback = () => {
  const { state } = useLocation();
  const { feedback } = state;

  console.log(feedback);

  return <div>Feedback</div>;
};

export default Feedback;
