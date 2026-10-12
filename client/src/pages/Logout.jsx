import { useState } from "react";
import { Link, useNavigate } from "react-router";

export default function Logout() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleLogout = () => {
    setLoading(true);

    // Remove login information stored in the browser.
    localStorage.removeItem("aryse_user");
    localStorage.removeItem("user");

    // Keep Aryse project data intact.
    navigate("/login", { replace: true });
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 p-4">
      <section className="w-full max-w-md rounded-2xl border border-slate-100 bg-white p-8 text-center shadow-lg sm:p-10">
        <Link to="/" className="inline-block">
          <span className="text-2xl font-bold tracking-tight text-[#0F8F83]">
            Aryse
          </span>
        </Link>

        <div className="mx-auto mt-8 flex h-14 w-14 items-center justify-center rounded-full bg-teal-50 text-2xl text-teal-700">
          ↗
        </div>

        <h1 className="mt-5 text-2xl font-bold text-slate-800">
          Sign out of Aryse?
        </h1>

        <p className="mt-3 text-sm leading-6 text-slate-500">
          You're about to leave your account. You can always come back to
          discover projects and share your ideas.
        </p>

        <button
          type="button"
          onClick={handleLogout}
          disabled={loading}
          className="mt-7 w-full rounded-lg bg-[#0F8F83] px-4 py-3 text-sm font-semibold text-white hover:bg-teal-800 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? "Signing out..." : "Yes, sign me out"}
        </button>

        <button
          type="button"
          onClick={() => navigate(-1)}
          disabled={loading}
          className="mt-3 w-full rounded-lg border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50 disabled:opacity-60"
        >
          Cancel
        </button>

        <Link
          to="/"
          className="mt-6 inline-block text-sm text-slate-500 hover:text-teal-700"
        >
          Back to Home
        </Link>
      </section>
    </main>
  );
}
