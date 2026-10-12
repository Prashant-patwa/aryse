import React, { useState, useEffect } from "react";
import { Link } from "react-router";
import  projectsData  from "../data/projectsData.js";

export default function ExploreCampaigns() {
  const [projects, setProjects] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = [
    "All",
    "Websites",
    "Apps",
    "Products",
    "Startup Ideas",
    "Community Impact",
    "College Events"
  ];

  // Load and combine static data with any newly created session projects from localStorage

useEffect(() => {
  try {
    const storedProjects = JSON.parse(
      localStorage.getItem("aryse_projects") || "[]"
    );

    const savedIds = new Set(
      storedProjects.map((project) => String(project.id))
    );

    const combinedProjects = [
      ...storedProjects,
      ...projectsData.filter(
        (project) => !savedIds.has(String(project.id))
      ),
    ];

    setProjects(combinedProjects);
  } catch (error) {
    console.error("Could not load projects:", error);
    setProjects(projectsData);
  }
}, []);


  // Filter projects based on search and category
const filteredProjects = projects.filter((project) => {
  const title = project.title || "";
  const description =
    project.shortDescription || project.short_description || "";
  const city = project.city || "";

  const search = searchTerm.toLowerCase();

  const matchesSearch =
    title.toLowerCase().includes(search) ||
    description.toLowerCase().includes(search) ||
    city.toLowerCase().includes(search);

  const matchesCategory =
    selectedCategory === "All" ||
    project.category === selectedCategory;

  return matchesSearch && matchesCategory;
});

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Section */}
        <div className="text-center mb-10">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
            Explore Student Projects & Community Events
          </h1>
          <p className="mt-3 max-w-2xl mx-auto text-base text-gray-600">
            Support student innovators with voluntary funding, skills, equipment, or mentorship. <span className="text-teal-600 font-semibold">0% commission platform.</span>
          </p>
        </div>

        {/* Search & Filter Controls */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8">
          
          {/* Search Input */}
          <div className="w-full md:w-1/3">
            <input
              type="text"
              placeholder="Search projects, keywords, or city..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full rounded-md border border-gray-300 px-4 py-2 text-sm focus:border-teal-500 focus:ring-teal-500 bg-white shadow-sm"
            />
          </div>

          {/* Category Tabs */}
          <div className="w-full md:w-auto overflow-x-auto pb-2 md:pb-0 flex gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs sm:text-sm font-medium whitespace-nowrap transition-colors ${
                  selectedCategory === cat
                    ? "bg-teal-600 text-white shadow-sm"
                    : "bg-white text-gray-700 border border-gray-200 hover:bg-gray-100"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

        </div>

        {/* Projects Grid */}
        {filteredProjects.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project) => {
              const progressVal = project.fundingGoal > 0
  ? Math.round(
      ((project.amountRaised || 0) / project.fundingGoal) * 100
    )
  : 0;
              
              return (
                <div
                  key={project.id}
                  className="bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow overflow-hidden flex flex-col justify-between"
                >
                  <div>
                    {/* Banner Image */}
                    <div className="h-48 w-full bg-gray-200 overflow-hidden relative">
                      <img
                        src={project.bannerImage}
                        alt={project.title}
                        className="w-full h-full object-cover"
                      />
                      <span className="absolute top-3 left-3 bg-teal-600 text-white text-xs font-semibold px-2.5 py-1 rounded-md shadow">
                        {project.category}
                      </span>
                    </div>

                    {/* Content */}
                    <div className="p-5">
                      <h3 className="text-lg font-bold text-gray-900 line-clamp-1 mb-2">
                        {project.title}
                      </h3>
                      <p className="text-sm text-gray-600 line-clamp-2 mb-4">
                        {project.shortDescription}
                      </p>

                      {/* Creator Info */}
                      {project.creator && (
                        <div className="flex items-center gap-3 mb-4">
                          <img
                            src={project.creator.avatar}
                            alt={project.creator.name}
                            className="w-8 h-8 rounded-full object-cover border border-gray-200"
                          />
                          <div>
                            <p className="text-xs font-medium text-gray-900">{project.creator.name}</p>
                            <p className="text-[11px] text-gray-500">{project.creator.role}</p>
                          </div>
                        </div>
                      )}

                      {/* Funding Progress Bar */}
                      <div className="mb-4">
                        <div className="flex justify-between text-xs font-medium text-gray-700 mb-1">
                          <span>₹{project.amountRaised?.toLocaleString() || 0} raised</span>
                          <span>Goal: ₹{project.fundingGoal?.toLocaleString()}</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-teal-600 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${Math.min(progressVal, 100)}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Card Footer / Action Link */}
                  <div className="px-5 pb-5 pt-0">
                    <Link
                      to={`/projects/${project.id}`}
                      className="w-full block text-center bg-teal-50 text-teal-700 hover:bg-teal-600 hover:text-white font-medium py-2.5 px-4 rounded-lg text-sm transition-colors border border-teal-200 hover:border-teal-600"
                    >
                      View Project & Support
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          /* Empty State */
          <div className="text-center py-16 bg-white rounded-xl border border-gray-100 shadow-sm p-8">
            <h3 className="text-lg font-medium text-gray-900 mb-2">No projects found</h3>
            <p className="text-sm text-gray-500 mb-6">
              Try adjusting your search query or selecting a different category filter.
            </p>
            <button
              onClick={() => { setSearchTerm(""); setSelectedCategory("All"); }}
              className="px-4 py-2 bg-teal-600 text-white rounded-md text-sm font-medium hover:bg-teal-700 transition-colors"
            >
              Reset Filters
            </button>
          </div>
        )}

      </div>
    </div>
  );
}