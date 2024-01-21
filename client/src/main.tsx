import React from "react";
import ReactDOM from "react-dom/client";
import RootLayout from "./layouts/RootLayout.tsx";
import ProtectedLayout from "./layouts/ProtectedLayout.tsx";
import Home from "./pages/Home.tsx";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Login from "./pages/authentication/Login.tsx";
import Register from "./pages/authentication/Register.tsx";
import AuthLayout from "./layouts/AuthLayout.tsx";
import Questions from "./pages/interview/Questions.tsx";
import Interview from "./pages/interview/Interview.tsx";
import "./index.css";
import Feedback from "./pages/interview/Feedback.tsx";

const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      {
        element: <AuthLayout />,
        children: [
          {
            path: "/login",
            element: <Login />,
          },
          {
            path: "/register",
            element: <Register />,
          },
        ],
      },
      {
        element: <ProtectedLayout />,
        children: [
          {
            path: "/",
            element: <Home />,
          },
          {
            path: "/questions",
            element: <Questions />,
          },
          {
            path: "/interview",
            element: <Interview />,
          },
          {
            path: "/feedback",
            element: <Feedback />,
          },
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
