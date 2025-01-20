import "./App.css";
import { useState } from "react";
import { Outlet } from "react-router-dom";

type User = {
  id: number;
  username: string;
  email: string;
  password: string;
};

function App() {
  const [user, setUser] = useState<User | null>(null);

  return (
    <>
      <Outlet context={{ user, setUser }} />
    </>
  );
}

export default App;
