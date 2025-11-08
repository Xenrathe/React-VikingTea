import App from "./App.jsx";
import DefaultTeaShelf from "./components/DefaultShelf.jsx";
import TeaShelf from "./components/TeaShelf.jsx";

export const routes = [
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <DefaultTeaShelf /> },
      { path: "green", element: <TeaShelf shelf={"Green"} /> },
      { path: "green/:slug", element: <TeaShelf shelf={"Green"} /> },
      { path: "oolong", element: <TeaShelf shelf={"Oolong"} /> },
      { path: "oolong/:slug", element: <TeaShelf shelf={"Oolong"} /> },
      { path: "black", element: <TeaShelf shelf={"Black"} /> },
      { path: "black/:slug", element: <TeaShelf shelf={"Black"} /> },
      { path: "teaware", element: <TeaShelf shelf={"Teaware"} /> },
      { path: "teaware/:slug", element: <TeaShelf shelf={"Teaware"} /> },
    ],
  },
];
