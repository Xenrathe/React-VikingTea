import App from "./App.jsx";
import MiddlePanels from "./components/MiddlePanels.jsx";

export const routes = [
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <MiddlePanels shelf="Default" /> },
      { path: ":shelf/:slug?", element: <MiddlePanels /> },
    ],
  },
];
