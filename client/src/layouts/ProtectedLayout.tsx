import { useAuth } from "@clerk/clerk-react";
import { Outlet, useNavigate } from "react-router-dom";

const ProtectedLayout = () => {
  const { userId } = useAuth();
  const navigate = useNavigate();

  if (!userId) navigate("/login");

  return <Outlet />;
};

export default ProtectedLayout;
