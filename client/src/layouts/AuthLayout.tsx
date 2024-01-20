import { useAuth } from "@clerk/clerk-react";
import { Outlet, useNavigate } from "react-router-dom";

const AuthLayout = () => {
  const { userId } = useAuth();
  const navigate = useNavigate();

  if (userId) {
    navigate("/");
  }

  return (
    <div className="flex justify-center mt-20">
      <Outlet />
    </div>
  );
};

export default AuthLayout;
