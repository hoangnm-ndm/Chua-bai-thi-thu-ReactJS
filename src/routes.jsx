import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Course from "./pages/Course";
import CourseForm from "./pages/CourseForm";
import Lesson from "./pages/Lesson";
import LessonForm from "./pages/LessonForm";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Layout from "./pages/Layout";
import Protected from "./Protected";

const routes = createBrowserRouter([
  {
    path: "/",
    element: (
      <Protected>
        <Layout />
      </Protected>
    ),
    children: [
      { path: "/", element: <Course /> },
      { path: "/add", element: <CourseForm /> },
      { path: "/update/:id", element: <CourseForm /> },
      { path: "/lessons/:courseId", element: <Lesson /> },
      { path: "/lessons/:courseId/add", element: <LessonForm /> },
      { path: "/lessons/:courseId/update/:id", element: <LessonForm /> },
    ],
  },
  { path: "/register", element: <Register /> },
  { path: "/login", element: <Login /> },
  { path: "*", element: <h1>404 - Not Found</h1> },
]);

const AppRoutes = ({ children }) => {
  return <RouterProvider router={routes}>{children}</RouterProvider>;
};

export default AppRoutes;
