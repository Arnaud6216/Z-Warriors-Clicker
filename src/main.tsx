import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Homepage from './components/Homepage/Homepage.tsx';
import Card from './components/Card/PlayerCard.tsx';
import Tech from './components/Tech/Tech.tsx';
import EnnemyCard from './components/Card/EnnemyCard.tsx';
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
        element: <Provider>
        <Card />
        <Tech />
        <EnnemyCard />
      </Provider>
      },
    ],
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
  <RouterProvider router={router} />
  </StrictMode>,
)
