import React, { useState } from "react";
import { useNavigate } from "react-router";
import  projectsData   from "../data/projectsData.js";

export default function CreateCampaigns() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    shortDescription: "",
    category: "Community Impact",
    city: "Mumbai",
    state: "Maharashtra",
    bannerImage: "",
    fundingGoal: "",
    creatorName: "",
    creatorRole: "",
    creatorAvatar: "",
    story: "",
    skillsNeeded: "",
    rewardsText: ""
  });

  const [submittedMessage, setSubmittedMessage] = useState(false);

  const categories = [
    "Websites",
    "Apps",
    "Products",
    "Startup Ideas",
    "Community Impact",
    "College Events"
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };


    // Construct new project object matching shared frontend data structure



const handleSubmit = (e) => {
  e.preventDefault();

  const newProject = {
    id: Date.now().toString(),
    title: formData.title.trim(),
    shortDescription: formData.shortDescription.trim(),
    category: formData.category,
    city: formData.city.trim(),
    state: formData.state.trim(),
    bannerImage:
      formData.bannerImage.trim() ||
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80",
    fundingGoal: Number(formData.fundingGoal),
    amountRaised: 0,
    progress: 0,
    creator: {
      name: formData.creatorName.trim(),
      role: formData.creatorRole.trim(),
      avatar:
        formData.creatorAvatar.trim() ||
        "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80",
    },
    story: formData.story.trim(),
    skillsNeeded: formData.skillsNeeded.trim(),
    rewards: formData.rewardsText.trim()
      ? [
          {
            id: "r-custom",
            title: "Supporter Reward",
            description: formData.rewardsText.trim(),
            pledgeAmount: 0,
          },
        ]
      : [],
    updates: [],
  };

  try {
    const savedProjects = JSON.parse(
      localStorage.getItem("aryse_projects") || "[]"
    );

    if (!Array.isArray(savedProjects)) {
      throw new Error("Invalid saved project data");
    }

    localStorage.setItem(
      "aryse_projects",
      JSON.stringify([newProject, ...savedProjects])
    );

    setSubmittedMessage(true);

    setTimeout(() => {
      navigate("/campaigns");
    }, 1000);
  } catch (error) {
    console.error("Unable to save project:", error);
    alert("Unable to save the project. Please try again.");
  }
};


  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-sm border border-gray-100 p-6 sm:p-10">
        
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Publish Your Project on Aryse</h1>
          <p className="mt-2 text-sm text-gray-600">
            Connect with community supporters, get voluntary funding, or find peer collaborators. Aryse charges <span className="font-semibold text-teal-600">0% commission</span>.
          </p>

        </div>

        {submittedMessage && (
          <div className="mb-6 bg-teal-600 text-white p-4 rounded-lg text-center font-medium shadow-sm transition-all">
            🎉 Project published successfully! Redirecting to home...
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* Project Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Project Title *</label>
            <input
              type="text"
              name="title"
              required
              value={formData.title}
              onChange={handleChange}
              placeholder="e.g. EcoCycle: Smart Campus Waste Segregator"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500 sm:text-sm border p-2.5"
            />
          </div>

          {/* Short Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Short Summary *</label>
            <input
              type="text"
              name="shortDescription"
              required
              value={formData.shortDescription}
              onChange={handleChange}
              placeholder="Brief 1-2 sentence overview of what your project does"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500 sm:text-sm border p-2.5"
            />
          </div>

          {/* Category & Location Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Category *</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500 sm:text-sm border p-2.5 bg-white"
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">City</label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500 sm:text-sm border p-2.5"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">State</label>
              <input
                type="text"
                name="state"
                value={formData.state}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500 sm:text-sm border p-2.5"
              />
            </div>
          </div>

          {/* Banner Image URL & Funding Goal */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Banner Image URL</label>
              <input
                type="url"
                name="bannerImage"
                value={formData.bannerImage}
                onChange={handleChange}
                placeholder="https://images.unsplash.com/..."
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500 sm:text-sm border p-2.5"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Funding Goal (₹) *</label>
              <input
                type="number"
                name="fundingGoal"
                required
                min="100"
                value={formData.fundingGoal}
                onChange={handleChange}
                placeholder="15000"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500 sm:text-sm border p-2.5"
              />
            </div>
          </div>

          {/* Creator Details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Creator Name *</label>
              <input
                type="text"
                name="creatorName"
                required
                value={formData.creatorName}
                onChange={handleChange}
                placeholder="Aarav Sharma"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500 sm:text-sm border p-2.5"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Creator Role / Department *</label>
              <input
                type="text"
                name="creatorRole"
                required
                value={formData.creatorRole}
                onChange={handleChange}
                placeholder="Third-Year CSE Student"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500 sm:text-sm border p-2.5"
              />
            </div>
          </div>

          {/* Full Story / Intended Impact */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Project Story & Intended Impact *</label>
            <textarea
              name="story"
              rows="4"
              required
              value={formData.story}
              onChange={handleChange}
              placeholder="Describe what problem you are solving, how funds will be utilized, and what community impact you expect to achieve."
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500 sm:text-sm border p-2.5"
            ></textarea>
          </div>

          {/* Skills & Resources Needed */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Skills or Resources Needed (Optional)</label>
            <input
              type="text"
              name="skillsNeeded"
              value={formData.skillsNeeded}
              onChange={handleChange}
              placeholder="e.g. Looking for React developers, Arduino sensors, or UI designers"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500 sm:text-sm border p-2.5"
            />
          </div>

          {/* Optional Rewards */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Supporter Reward Offering (Optional)</label>
            <input
              type="text"
              name="rewardsText"
              value={formData.rewardsText}
              onChange={handleChange}
              placeholder="e.g. Personalized thank-you note and early access beta link"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500 sm:text-sm border p-2.5"
            />
          </div>

          {/* Submit Button */}
          <div className="pt-4">
            <button
              type="submit"
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 transition-colors"
            >
              Publish Project 
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}