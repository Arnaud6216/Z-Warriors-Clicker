import "./App.css";
import { useState } from "react";
import { Outlet } from "react-router-dom";
import type { User } from "./types/vite-env";

function App() {
  const [user, setUser] = useState<User | null>(null);

  return (
    <>
      <Outlet context={{ user, setUser }} />
    </>
  );
}

export default App;
