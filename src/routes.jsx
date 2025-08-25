import App from "./App.jsx";
import DefaultTeaShelf from "./components/Shelves/Default.jsx";
import Green from "./components/Shelves/Green.jsx";
import Oolong from "./components/Shelves/Oolong.jsx";
import Black from "./components/Shelves/Black.jsx";
import Exotics from "./components/Shelves/Exotics.jsx";
import Teaware from "./components/Shelves/Teaware.jsx";

export const routes = [
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <DefaultTeaShelf /> },
      { path: "Green", element: <Green /> },
      { path: "Oolong", element: <Oolong /> },
      { path: "Black", element: <Black /> },
      { path: "Exotics", element: <Exotics /> },
      { path: "Teaware", element: <Teaware /> },
    ],
  },
];