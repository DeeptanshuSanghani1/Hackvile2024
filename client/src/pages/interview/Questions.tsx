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
    });
  };

  return (
    <div className="flex flex-col items-center gap-6 mt-10 ">
      <h1 className="text-xl tracking-wide">Job Details</h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col items-center gap-3 w-1/4"
      >
        <input
          {...register("jobTitle", { required: true })}
          placeholder="Job title"
          className="border-2 rounded p-2 w-full"
        />
        <textarea
          {...register("jobDescription")}
          placeholder="Job description"
          className="border-2 rounded p-2 h-52 w-full"
        />
        <button
          type="submit"
          className="border-2 px-4 py-2 bg-sky-500 hover:bg-sky-600 rounded-md"
        >
          Generate
        </button>
      </form>
    </div>
  );
};

export default Questions;
