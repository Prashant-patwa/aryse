import { useEffect, useState } from "react";
import { Navigate } from "react-router";

export default function ProtectedRoute({ children }) {
  const [status, setStatus] = useState("checking");

  useEffect(() => {
    let active = true;

    async function checkSession() {
      try {
        const response = await fetch("http://localhost:8080/api/session", {
          credentials: "include",
        });
        const data = await response.json();

        if (active) {
          setStatus(response.ok && data.loggedIn ? "allowed" : "denied");
        }
      } catch {
        if (active) setStatus("denied");
      }
    }

    checkSession();

    return () => {
      active = false;
    };
  }, []);

  if (status === "checking") {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <p className="text-sm text-slate-500">Checking your session...</p>
      </div>
    );
  }

  if (status === "denied") {
    return <Navigate to="/login" replace />;
  }

  return children;
}