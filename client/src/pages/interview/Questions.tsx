import axios from "axios";
import { SubmitHandler, useForm } from "react-hook-form";

type Inputs = {
  jobTitle: string;
  jobDescription: string;
};

const Questions = () => {
  const API_URL = import.meta.env.VITE_API_URL;
  const { register, handleSubmit } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    axios.post(`${API_URL}/get-questions`, data).then((res) => {
      console.log(res);
    });
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          {...register("jobTitle", { required: true })}
          placeholder="Job title"
        />
        <input {...register("jobDescription")} placeholder="Job description" />
        <button type="submit">Generate</button>
      </form>
    </>
  );
};

export default Questions;
