import { SignIn } from "@clerk/clerk-react";

const Login = () => {
  return <SignIn afterSignInUrl={"/"} />;
};

export default Login;
