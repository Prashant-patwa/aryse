
import { useState } from "react";
import { Link, useNavigate } from "react-router";
import AryseLogo from "../components/AryseLogo";

export default function Signup() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
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

    if (formData.password.length < 8) {
      setError("Password must be at least 8 characters long.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("http://localhost:8080/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(formData),
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        setError(data.message || "Unable to create your account.");
        return;
      }

      navigate("/login");
    } catch {
      setError("Unable to connect to Aryse. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="flex w-full max-w-4xl flex-col overflow-hidden rounded-2xl bg-white shadow-lg md:min-h-[570px] md:flex-row">
        <section className="flex flex-col justify-between bg-teal-50 p-8 md:w-1/2 md:p-10">
          <div>
            <AryseLogo />

            <h2 className="mt-10 text-3xl font-bold leading-tight text-slate-800">
              Your ideas deserve a chance to grow.
            </h2>

            <p className="mt-4 text-sm leading-6 text-slate-600">
              Join a community where students can share projects, explore new
              ideas, and work toward making a real-world difference.
            </p>
          </div>

          <div className="my-8 rounded-xl border border-teal-100 bg-white/70 p-6">
            <p className="font-semibold text-slate-800">
              Start with an idea. Build something meaningful.
            </p>
            <p className="mt-2 text-sm text-slate-500">
              Your next project could be the beginning of something bigger.
            </p>
          </div>

          <p className="text-xs text-slate-400">© 2026 Aryse</p>
        </section>

        <section className="flex flex-col justify-center p-8 md:w-1/2 md:p-12">
          <h1 className="text-2xl font-bold text-slate-800">
            Create your account
          </h1>
          <p className="mb-7 mt-2 text-sm text-slate-500">
            Join Aryse and bring your ideas one step closer to reality.
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
              <label htmlFor="username" className="mb-2 block text-sm font-medium text-slate-700">
                Username
              </label>
              <input
                id="username"
                name="username"
                type="text"
                value={formData.username}
                onChange={handleChange}
                autoComplete="username"
                placeholder="Choose a username"
                required
                className="w-full rounded-lg border border-slate-200 px-4 py-3 text-sm outline-none focus:border-teal-600 focus:ring-2 focus:ring-teal-100"
              />
            </div>

            <div>
              <label htmlFor="email" className="mb-2 block text-sm font-medium text-slate-700">
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
                className="w-full rounded-lg border border-slate-200 px-4 py-3 text-sm outline-none focus:border-teal-600 focus:ring-2 focus:ring-teal-100"
              />
            </div>

            <div>
              <label htmlFor="password" className="mb-2 block text-sm font-medium text-slate-700">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                autoComplete="new-password"
                placeholder="Create a password"
                minLength={8}
                required
                className="w-full rounded-lg border border-slate-200 px-4 py-3 text-sm outline-none focus:border-teal-600 focus:ring-2 focus:ring-teal-100"
              />
              <p className="mt-1 text-xs text-slate-400">
                Use at least 8 characters.
              </p>
            </div>

            {error && (
              <p role="alert" className="rounded-lg bg-red-50 p-3 text-sm text-red-700">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="mt-2 w-full rounded-lg bg-[#0F8F83] py-3 text-sm font-semibold text-white hover:bg-teal-800 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Creating account..." : "Create Account"}
            </button>
          </form>

          <p className="mt-7 text-center text-sm text-slate-500">
            Already have an account?{" "}
            <Link to="/login" className="font-semibold text-teal-700 hover:underline">
              Sign in
            </Link>
          </p>

          <Link to="/" className="mt-5 text-center text-sm text-slate-500 hover:text-teal-700">
            ← Back to Home
          </Link>
        </section>
      </div>
    </main>
  );
}
