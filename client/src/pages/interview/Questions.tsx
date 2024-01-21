import axios from "axios";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

type Inputs = {
  jobTitle: string;
  jobDescription: string;
};

const Questions = () => {
  const API_URL = import.meta.env.VITE_API_URL;
  const { register, handleSubmit } = useForm<Inputs>();

  // const [questions, setQuestions] = useState([]);

  const navigate = useNavigate();

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    let input;
    if (data.jobDescription) {
      input = `Job title is ${data.jobTitle} and job description is ${data.jobDescription}`;
    } else {
      input = `Job title is ${data.jobTitle}`;
    }

    const formData = {
      job_description: input,
    };

    console.log(formData);

    axios.post(`${API_URL}/get-questions`, formData).then((response) => {
      console.log(Object.values(response.data));
      const questions = Object.values(response.data);
      navigate("/interview", { state: { questions: questions } });
      // console.log(questions);
    });
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="">
        <input
          {...register("jobTitle", { required: true })}
          placeholder="Job title"
        />
        <input {...register("jobDescription")} placeholder="Job description" />
        <button type="submit">Generate</button>
      </form>
      {/* <div>
        {questions && (
          <ul>
            {questions.map((question: string, index) => (
              <li key={index}>{question}</li>
            ))}
          </ul>
        )}
      </div> */}
    </>
  );
};

export default Questions;
