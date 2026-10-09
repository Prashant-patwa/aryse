import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import { FaArrowLeft, FaCheckCircle, FaHeart } from "react-icons/fa";

const API_URL = "http://localhost:8080/api/projects";

const formatINR = (amount) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 2,
  }).format(Number(amount) || 0);

export default function DemoPayment() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [project, setProject] = useState(null);
  const [amount, setAmount] = useState("500");
  const [customAmount, setCustomAmount] = useState("");
  const [useCustomAmount, setUseCustomAmount] = useState(false);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const response = await fetch(`${API_URL}/${id}`);
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Unable to load this project.");
        }

        setProject(data.project);
      } catch (err) {
        setError(err.message || "Unable to load this project.");
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [id]);

  const selectedAmount = Number(
    useCustomAmount ? customAmount : amount
  );

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    if (
      !Number.isFinite(selectedAmount) ||
      selectedAmount <= 0 ||
      Math.round(selectedAmount * 100) !== selectedAmount * 100
    ) {
      setError("Enter a valid amount greater than ₹0, with up to 2 decimal places.");
      return;
    }

    setSubmitting(true);

    try {
      const response = await fetch(`${API_URL}/${id}/demo-payment`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: selectedAmount,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Demo contribution failed.");
      }

      navigate(`/projects/${id}/contribution-success`, {
        state: {
          amount: data.amount,
          raisedAmount: data.raisedAmount,
          projectTitle: project.title,
        },
      });
    } catch (err) {
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <p className="text-gray-600">Loading project...</p>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4 px-6">
        <p className="text-gray-700">
          {error || "Project not found."}
        </p>
        <Link to="/campaigns" className="text-teal-700 underline">
          Explore projects
        </Link>
      </div>
    );
  }

  return (
    <main className="bg-gray-50 py-12 px-5">
      <div className="max-w-2xl mx-auto">
        <Link
          to={`/projects/${id}`}
          className="inline-flex items-center gap-2 text-gray-600 hover:text-teal-700 mb-8"
        >
          <FaArrowLeft />
          Back to project
        </Link>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 md:p-9">
          <div className="text-center mb-8">
            <div className="w-14 h-14 rounded-full bg-teal-50 text-teal-700 flex items-center justify-center mx-auto mb-4">
              <FaHeart size={23} />
            </div>

            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
              Support this project
            </h1>

            <p className="text-gray-600 mt-2">
              Your support can help bring an idea to life.
            </p>
          </div>

          <div className="bg-gray-50 rounded-xl p-4 mb-7">
            <p className="text-sm text-gray-500 mb-1">Project</p>
            <h2 className="font-semibold text-gray-900">
              {project.title}
            </h2>
            <p className="text-sm text-gray-600 mt-2">
              Funding goal: {formatINR(project.goal_amount)}
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            <h3 className="font-semibold text-gray-900 mb-4">
              Choose a contribution amount
            </h3>

            <div className="grid grid-cols-3 gap-3 mb-4">
              {["100", "500", "1000"].map((value) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => {
                    setAmount(value);
                    setUseCustomAmount(false);
                  }}
                  className={`border rounded-lg py-3 font-semibold transition ${
                    !useCustomAmount && amount === value
                      ? "border-teal-700 bg-teal-50 text-teal-800"
                      : "border-gray-300 text-gray-700"
                  }`}
                >
                  ₹{Number(value).toLocaleString("en-IN")}
                </button>
              ))}
            </div>

            <button
              type="button"
              onClick={() => setUseCustomAmount(true)}
              className={`w-full border rounded-lg py-3 mb-4 font-medium ${
                useCustomAmount
                  ? "border-teal-700 bg-teal-50 text-teal-800"
                  : "border-gray-300 text-gray-700"
              }`}
            >
              Enter a custom amount
            </button>

            {useCustomAmount && (
              <div className="mb-5">
                <label
                  htmlFor="customAmount"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Custom amount (₹)
                </label>

                <input
                  id="customAmount"
                  type="number"
                  min="0.01"
                  step="0.01"
                  value={customAmount}
                  onChange={(event) => setCustomAmount(event.target.value)}
                  placeholder="Enter amount"
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-teal-700"
                  required
                />
              </div>
            )}

            <div className="flex items-center justify-between border-t border-gray-200 pt-5 mt-5 mb-6">
              <span className="text-gray-600">Your contribution</span>
              <span className="text-2xl font-bold text-gray-900">
                {formatINR(selectedAmount)}
              </span>
            </div>

            {error && (
              <p className="bg-red-50 text-red-700 rounded-lg p-3 text-sm mb-4">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={submitting}
              className="w-full bg-teal-700 hover:bg-teal-800 disabled:opacity-60 text-white font-semibold rounded-lg py-3.5"
            >
              {submitting ? "Processing demo..." : "Confirm demo contribution"}
            </button>
          </form>

          
        </div>
      </div>
    </main>
  );
}