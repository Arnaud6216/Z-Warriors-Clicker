import "./App.css";
import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import type { User } from "./types/vite-env";

function App() {
  const [user, setUser] = useState<User | null>(null);
  const [isCheckingSession, setIsCheckingSession] = useState(true);

  useEffect(() => {
    // Restore the session from the httpOnly cookie set at login, if still valid
    fetch(`${import.meta.env.VITE_API_URL}/api/me`, {
      credentials: "include",
    })
      .then((response) => (response.ok ? response.json() : null))
      .then((currentUser) => setUser(currentUser))
      .catch(() => setUser(null))
      .finally(() => setIsCheckingSession(false));
  }, []);

  if (isCheckingSession) {
    return null;
  }

  return (
    <>
      <Outlet context={{ user, setUser }} />
    </>
  );
}

export default App;
