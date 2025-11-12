import App from "./App.jsx";
import MiddlePanels from "./components/MiddlePanels.jsx";

export const routes = [
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <MiddlePanels shelf="Default" /> },
      { path: ":shelf/:slug?", element: <MiddlePanels /> }, //erroneous routes will still go through here - additional logic found in MiddlePanels 
      { path: "*", element: <MiddlePanels shelf="Error" /> } // catch-all error route - renders within the app.
    ],
  },
];
