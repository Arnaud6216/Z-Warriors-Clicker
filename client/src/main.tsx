import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import App from "./App.tsx";
import EnnemyCard from "./components/Card/EnnemyCard.tsx";
import Card from "./components/Card/PlayerCard.tsx";
import Homepage from "./components/Homepage/Homepage.tsx";
import Tech from "./components/Tech/Tech.tsx";
import { Provider } from "./components/options/Context";

const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        path: "/",
        element: <Homepage />,
      },
      {
        path: "/game",
        element: (
          <Provider>
            <Card />
            <Tech />
            <EnnemyCard />
          </Provider>
        ),
      },
    ],
  },
]);

const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error("Root element not found");
}

createRoot(rootElement).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);