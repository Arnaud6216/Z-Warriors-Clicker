import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import App from "./App.tsx";
import Login from "./components/Auth/login/Login.tsx";
import Register from "./components/Auth/register/Register.tsx";
import Homepage from "./components/Homepage/Homepage.tsx";
import Gameboard from "./pages/GameBoard.tsx";
import { Provider } from "./services/Context.tsx";

const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        path: "/",
        element: <Homepage />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/game",
        element: (
          <Provider>
            <Gameboard />
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
  </StrictMode>,
);
