import { useState } from "react";
import { Link, useNavigate } from "react-router";
import AryseLogo from "../components/AryseLogo";

export default function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch("http://localhost:8080/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(formData),
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        setError(data.message || "Login failed. Check your email and password.");
        return;
      }

      window.dispatchEvent(
        new CustomEvent("aryse-auth-changed", {
          detail: data.user,
        })
      );

      navigate("/");
    } catch {
      setError("Unable to connect to Aryse. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 p-4">
      <div className="flex w-full max-w-4xl flex-col overflow-hidden rounded-2xl bg-white shadow-lg md:min-h-[540px] md:flex-row">
        <section className="flex flex-col justify-between bg-teal-50 p-8 md:w-1/2 md:p-10">
          <div>
            <AryseLogo />

            <h2 className="mt-10 text-3xl font-bold leading-tight text-slate-800">
              Every great idea starts somewhere.
            </h2>

            <p className="mt-4 text-sm leading-6 text-slate-600">
              Welcome back to Aryse. Discover student projects, share your
              ideas, and help turn them into real-world impact.
            </p>
          </div>

          <div className="my-8 rounded-xl border border-teal-100 bg-white/70 p-6">
            <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-lg bg-teal-100 text-xl text-teal-700">
              ↗
            </div>
            <p className="font-semibold text-slate-800">
              Ideas grow when people support them.
            </p>
            <p className="mt-2 text-sm text-slate-500">
              A place for student creativity, projects, and community impact.
            </p>
          </div>

          <p className="text-xs text-slate-400">© 2026 Aryse</p>
        </section>

        <section className="flex flex-col justify-center p-8 md:w-1/2 md:p-12">
          <h1 className="text-2xl font-bold text-slate-800">Welcome back</h1>
          <p className="mb-7 mt-2 text-sm text-slate-500">
            Sign in to continue with Aryse.
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-medium text-slate-700"
              >
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                autoComplete="email"
                placeholder="you@example.com"
                required
                className="w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 outline-none focus:border-teal-600 focus:ring-2 focus:ring-teal-100"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="mb-2 block text-sm font-medium text-slate-700"
              >
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                autoComplete="current-password"
                placeholder="Enter your password"
                required
                className="w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 outline-none focus:border-teal-600 focus:ring-2 focus:ring-teal-100"
              />
            </div>

            {error && (
              <p
                role="alert"
                className="rounded-lg bg-red-50 p-3 text-sm text-red-700"
              >
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="mt-1 w-full rounded-lg bg-[#0F8F83] py-3 text-sm font-semibold text-white hover:bg-teal-800 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>

          <p className="mt-7 text-center text-sm text-slate-500">
            New to Aryse?{" "}
            <Link
              to="/signup"
              className="font-semibold text-teal-700 hover:underline"
            >
              Create an account
            </Link>
          </p>

          <Link
            to="/"
            className="mt-5 text-center text-sm text-slate-500 hover:text-teal-700"
          >
            ← Back to Home
          </Link>
        </section>
      </div>
    </main>
  );
}