import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router";
import projectData from "../data/projectsData.js";

export default function DemoPayment() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [project, setProject] = useState(null);
  const [supportAmount, setSupportAmount] = useState("500");
  const [supporterName, setSupporterName] = useState("");
  const [supporterEmail, setSupporterEmail] = useState("");
  const [selectedReward, setSelectedReward] = useState("None / Open Support");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    // 1. Check session local storage for newly created projects
    const storedProjects = JSON.parse(localStorage.getItem("aryse_projects") || "[]");
    const allProjects = [...storedProjects, ...projectData];
    
    // 2. Find target project
    const found = allProjects.find((p) => String(p.id) === String(id));
    if (found) {
      setProject(found);
    }
  }, [id]);

  const handleDemoContribute = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const contribAmountNum = Number(supportAmount) || 0;

    // Simulate short network delay for demo feel
    setTimeout(() => {
      if (project) {
        // Update local session storage raised amount so it reflects immediately in Explore/Details
        const storedProjects = JSON.parse(localStorage.getItem("aryse_projects") || "[]");
        
        // Check if project is in storedProjects or main projectData
        const isStored = storedProjects.some((p) => String(p.id) === String(project.id));
        
        if (isStored) {
          const updatedStored = storedProjects.map((p) => {
            if (String(p.id) === String(project.id)) {
              const newRaised = (p.amountRaised || 0) + contribAmountNum;
              const goal = p.fundingGoal || 1000;
              return {
                ...p,
                amountRaised: newRaised,
                progress: Math.min(Math.round((newRaised / goal) * 100), 100)
              };
            }
            return p;
          });
          localStorage.setItem("aryse_projects", JSON.stringify(updatedStored));
        } else {
          // If it's a default static project, store an override or update copy in localStorage
          const existingOverrides = JSON.parse(localStorage.getItem("aryse_project_overrides") || "{}");
          const currentRaised = existingOverrides[project.id]?.amountRaised ?? (project.amountRaised || 0);
          const newRaised = currentRaised + contribAmountNum;
          const goal = project.fundingGoal || 1000;

          existingOverrides[project.id] = {
            amountRaised: newRaised,
            progress: Math.min(Math.round((newRaised / goal) * 100), 100)
          };
          localStorage.setItem("aryse_project_overrides", JSON.stringify(existingOverrides));
        }
      }

      setIsSubmitting(false);
      // Navigate to success confirmation page or back with success state
      navigate(`/contribution-success`, { state: { projectTitle: project?.title, amount: supportAmount } });
    }, 1000);
  };

  if (!project) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white p-8 rounded-xl border border-gray-100 shadow-sm text-center max-w-md">
          <h2 className="text-lg font-bold text-gray-900 mb-2">Project Not Found</h2>
          <p className="text-sm text-gray-600 mb-4">Unable to locate the project for contribution.</p>
          <Link to="/explore" className="text-teal-600 hover:underline text-sm font-medium">Back to Explore</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto bg-white rounded-xl border border-gray-100 shadow-sm p-6 sm:p-10">
        
        {/* Header */}
        <div className="text-center mb-8">

          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mt-3">
            Support: {project.title}
          </h1>
          <p className="text-sm text-gray-600 mt-1">
            Aryse charges <span className="font-semibold text-teal-600">0% commission</span>. 100% of your voluntary support goes directly to the student creator.
          </p>
        </div>



        <form onSubmit={handleDemoContribute} className="space-y-6">
          
          {/* Support Amount */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Voluntary Support Amount (₹) *
            </label>
            <div className="relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500 font-semibold">
                ₹
              </div>
              <input
                type="number"
                required
                min="1"
                value={supportAmount}
                onChange={(e) => setSupportAmount(e.target.value)}
                className="block w-full pl-8 pr-4 py-3 rounded-md border border-gray-300 focus:border-teal-500 focus:ring-teal-500 text-sm"
                placeholder="500"
              />
            </div>
            <div className="flex gap-2 mt-2">
              {[100, 500, 1000, 2500].map((amt) => (
                <button
                  type="button"
                  key={amt}
                  onClick={() => setSupportAmount(String(amt))}
                  className={`text-xs px-3 py-1.5 rounded border transition-colors ${
                    supportAmount === String(amt)
                      ? "bg-teal-600 text-white border-teal-600"
                      : "bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100"
                  }`}
                >
                  ₹{amt}
                </button>
              ))}
            </div>
          </div>

          {/* Supporter Details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Your Name </label>
              <input
                type="text"
                value={supporterName}
                onChange={(e) => setSupporterName(e.target.value)}
                placeholder="John Doe"
                className="w-full rounded-md border border-gray-300 px-3 py-2.5 text-sm focus:border-teal-500 focus:ring-teal-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email / College ID </label>
              <input
                type="email"
                value={supporterEmail}
                onChange={(e) => setSupporterEmail(e.target.value)}
                placeholder="example@gmail.com"
                className="w-full rounded-md border border-gray-300 px-3 py-2.5 text-sm focus:border-teal-500 focus:ring-teal-500"
              />
            </div>
          </div>

          {/* Reward Selection */}
          {project.rewards && project.rewards.length > 0 && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Select Reward Tier</label>
              <select
                value={selectedReward}
                onChange={(e) => setSelectedReward(e.target.value)}
                className="w-full rounded-md border border-gray-300 px-3 py-2.5 text-sm bg-white focus:border-teal-500 focus:ring-teal-500"
              >
                <option value="None / Open Support">None / Open Voluntary Support</option>
                {project.rewards.map((r) => (
                  <option key={r.id} value={r.title}>
                    ₹{r.pledgeAmount} - {r.title}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Simulated Payment Method Box */}


          {/* Action Button */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 transition-colors disabled:opacity-50"
            >
              {isSubmitting ? "Simulating Secure Transaction..." : `Complete Simulated Contribution of ₹${supportAmount}`}
            </button>
          </div>

          <div className="text-center">
            <Link to={`/projects/${project.id}`} className="text-xs text-teal-600 hover:underline">
              Cancel and return to project
            </Link>
          </div>

        </form>
      </div>
    </div>
  );
}