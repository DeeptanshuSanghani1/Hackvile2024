import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="flex flex-col items-center gap-4 mt-10">
      <h1 className="text-3xl tracking-widest"> PITCH PERFECT</h1>
      <h2 className="text-xl tracking-wide">
        Interview preparation made easy!
      </h2>
      <Link
        to="/questions"
        className="border-2 px-4 py-2 rounded-md bg-sky-500 hover:bg-sky-600 uppercase tracking-wide"
      >
        Get Started!
      </Link>
    </div>
  );
};

export default Home;
