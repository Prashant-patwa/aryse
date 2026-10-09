import { Link, useLocation, useParams } from "react-router";
import { FaCheckCircle, FaArrowLeft } from "react-icons/fa";

const formatINR = (amount) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 2,
  }).format(Number(amount) || 0);

export default function ContributionSuccess() {
  const { id } = useParams();
  const location = useLocation();
  const contribution = location.state;

  if (!contribution) {
    return (
      <main className="min-h-[60vh] flex flex-col items-center justify-center px-5 text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-3">
          Contribution details unavailable
        </h1>
        <p className="text-gray-600 mb-6">
          Please return to the project page to view its current funding progress.
        </p>
        <Link
          to={`/projects/${id}`}
          className="bg-teal-700 text-white rounded-lg px-5 py-3"
        >
          Back to project
        </Link>
      </main>
    );
  }

  return (
    <main className="min-h-[65vh] bg-gray-50 flex items-center justify-center px-5 py-12">
      <div className="bg-white border border-gray-200 shadow-sm rounded-2xl p-8 md:p-10 max-w-lg w-full text-center">
        <FaCheckCircle className="text-teal-700 text-6xl mx-auto mb-5" />

        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
          Demo contribution successful!
        </h1>

        <p className="text-gray-600 mt-3">
          Thank you for supporting this student project.
        </p>

        <div className="bg-gray-50 rounded-xl p-5 my-7 text-left">
          <p className="text-sm text-gray-500">Project</p>
          <p className="font-semibold text-gray-900 mt-1">
            {contribution.projectTitle}
          </p>

          <div className="border-t border-gray-200 my-4" />

          <p className="text-sm text-gray-500">Demo contribution amount</p>
          <p className="text-2xl font-bold text-teal-800 mt-1">
            {formatINR(contribution.amount)}
          </p>

          {contribution.raisedAmount !== undefined && (
            <div className="mt-4">
              <p className="text-sm text-gray-500">
                Updated total raised
              </p>
              <p className="font-semibold text-gray-900 mt-1">
                {formatINR(contribution.raisedAmount)}
              </p>
            </div>
          )}
        </div>


        <Link
          to={`/projects/${id}`}
          className="w-full inline-flex items-center justify-center gap-2 bg-teal-700 hover:bg-teal-800 text-white font-semibold rounded-lg py-3"
        >
          <FaArrowLeft />
          Return to project
        </Link>
      </div>
    </main>
  );
}