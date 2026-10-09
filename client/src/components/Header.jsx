import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { FaChevronDown, FaSignOutAlt } from "react-icons/fa";
import AryseLogo from "./AryseLogo.jsx";
import NavButton from "./NavButton";

const API_URL = "http://localhost:8080";

export default function Header() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [checkingSession, setCheckingSession] = useState(true);
  const [logoutError, setLogoutError] = useState("");

  useEffect(() => {
    let active = true;

    async function checkSession() {
      try {
        const response = await fetch(`${API_URL}/api/session`, {
          credentials: "include",
        });
        const data = await response.json();

        if (active) {
          setUser(data.loggedIn ? data.user : null);
        }
      } catch (error) {
        console.error("Unable to check session:", error);
        if (active) setUser(null);
      } finally {
        if (active) setCheckingSession(false);
      }
    }

    function handleAuthChanged(event) {
      setUser(event.detail || null);
      setMenuOpen(false);
      setLogoutError("");
      setCheckingSession(false);
    }

    checkSession();
    window.addEventListener("aryse-auth-changed", handleAuthChanged);

    return () => {
      active = false;
      window.removeEventListener("aryse-auth-changed", handleAuthChanged);
    };
  }, []);

  async function handleLogout() {
    setLogoutError("");

    try {
      const response = await fetch(`${API_URL}/api/logout`, {
        method: "POST",
        credentials: "include",
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        setLogoutError(data.message || "Unable to log out. Please try again.");
        return;
      }

      setUser(null);
      setMenuOpen(false);
      window.dispatchEvent(
        new CustomEvent("aryse-auth-changed", { detail: null })
      );
      navigate("/");
    } catch {
      setLogoutError("Unable to connect to Aryse. Please try again.");
    }
  }

  const initial = (user?.username?.trim()?.[0] || user?.email?.trim()?.[0] || "U")
    .toUpperCase();

  return (
    <header className="sticky top-0 z-50 h-20 w-full border-b border-slate-100 bg-white shadow-sm">
      <div className="mx-auto flex h-full max-w-7xl items-center justify-between px-4 sm:px-6">
        <div className="flex items-center">
          <AryseLogo />
        </div>

        <nav className="hidden items-center gap-8 md:flex">
          <NavButton to="/" name="Home" variant="nav" />
          <NavButton to="/about" name="About" variant="nav" />
          <NavButton to="/campaigns" name="Explore" variant="nav" />
          <NavButton
            to="/create-campaigns"
            name="Create Projects"
            variant="nav"
          />
        </nav>

        <div className="flex items-center gap-3">
          {!checkingSession && !user && (
            <>
              <NavButton to="/login" name="Sign In" variant="signin" />
              <NavButton
                to="/signup"
                name="Create Account"
                variant="createAccount"
              />
            </>
          )}

          {user && (
            <div className="relative">
              <button
                type="button"
                onClick={() => {
                  setMenuOpen((previous) => !previous);
                  setLogoutError("");
                }}
                aria-label="Open account menu"
                aria-expanded={menuOpen}
                className="flex items-center gap-2 rounded-full p-1.5 transition hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-teal-600"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-teal-700 text-base font-semibold text-white">
                  {initial}
                </span>
                <FaChevronDown
                  size={12}
                  className="hidden text-slate-500 sm:block"
                />
              </button>

              {menuOpen && (
                <div className="absolute right-0 top-14 w-64 rounded-xl border border-slate-200 bg-white p-2 shadow-lg">
                  <div className="border-b border-slate-100 px-3 py-3">
                    <p className="truncate text-sm font-semibold text-slate-800">
                      {user.username || "Aryse user"}
                    </p>
                    <p className="mt-1 truncate text-xs text-slate-500">
                      {user.email}
                    </p>
                  </div>

                  {logoutError && (
                    <p role="alert" className="px-3 py-2 text-xs text-red-600">
                      {logoutError}
                    </p>
                  )}

                  <button
                    type="button"
                    onClick={handleLogout}
                    className="mt-1 flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm font-medium text-slate-700 transition hover:bg-red-50 hover:text-red-700"
                  >
                    <FaSignOutAlt size={14} />
                    Log out
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
