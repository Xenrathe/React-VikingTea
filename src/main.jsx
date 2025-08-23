import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App.jsx";
import DefaultTeaShelf from "./components/Shelves/Default.jsx";
import Gyokuro from "./components/Shelves/Gyokuro.jsx";
import Sencha from "./components/Shelves/Sencha.jsx";
import Teaware from "./components/Shelves/Teaware.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <DefaultTeaShelf /> },
      { path: "Gyokuro", element: <Gyokuro /> },
      { path: "Sencha", element: <Sencha /> },
      { path: "Teaware", element: <Teaware /> },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
