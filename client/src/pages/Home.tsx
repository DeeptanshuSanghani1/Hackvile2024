import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <Link to="/questions" className=" text-red-700">
        Generate interview questions
      </Link>
    </div>
  );
};

export default Home;
