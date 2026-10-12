
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import projectsData from "../data/projectsData.js";

export default function ProjectDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [project, setProject] = useState(null);
  const [activeTab, setActiveTab] = useState("about");

  useEffect(() => {
    try {
      const storedProjects = JSON.parse(
        localStorage.getItem("aryse_projects") || "[]"
      );

      const allProjects = [
        ...storedProjects,
        ...projectsData.filter(
          (defaultProject) =>
            !storedProjects.some(
              (savedProject) =>
                String(savedProject.id) === String(defaultProject.id)
            )
        ),
      ];

      const foundProject = allProjects.find(
        (item) => String(item.id) === String(id)
      );

      setProject(foundProject || null);
    } catch (error) {
      console.error("Could not load project:", error);
      setProject(null);
    }
  }, [id]);

  if (!project) {
    return (
      <div className="min-h-screen bg-gray-50 p-8 text-center">
        <h2 className="text-2xl font-bold text-gray-900">
          Project not found
        </h2>
        <Link
          to="/campaigns"
          className="mt-4 inline-block text-teal-700 underline"
        >
          Back to Explore Projects
        </Link>
      </div>
    );
  }

  const title = project.title || "Untitled Project";
  const description =
    project.shortDescription || project.short_description || "";
  const banner =
    project.bannerImage || project.banner_image || "";
  const goal = Number(project.fundingGoal ?? project.goal_amount ?? 0);
  const raised = Number(project.amountRaised ?? project.amount_raised ?? 0);
  const progress = goal > 0 ? Math.round((raised / goal) * 100) : 0;
  const creator = project.creator || {};
  const rewards = project.rewards || [];
  const updates = project.updates || [];

  const tabs = [
    { id: "about", label: "About Project" },
    { id: "updates", label: `Updates (${updates.length})` },
    { id: "rewards", label: `Rewards (${rewards.length})` },
  ];

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl space-y-6">
        <button
          onClick={() => navigate(-1)}
          className="text-sm font-medium text-teal-700 hover:text-teal-900"
        >
          ← Back
        </button>

        {/* Project header */}
        <section className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
          {banner && (
            <div className="h-56 bg-gray-200 sm:h-80">
              <img
                src={banner}
                alt={title}
                className="h-full w-full object-cover"
              />
            </div>
          )}

          <div className="p-5 sm:p-8">
            <span className="rounded-md bg-teal-50 px-3 py-1 text-xs font-semibold text-teal-700">
              {project.category}
            </span>

            <h1 className="mt-4 text-2xl font-bold text-gray-900 sm:text-3xl">
              {title}
            </h1>

            <p className="mt-3 text-sm leading-6 text-gray-600">
              {description}
            </p>

            {creator.name && (
              <div className="mt-5 flex items-center gap-3">
                {creator.avatar && (
                  <img
                    src={creator.avatar}
                    alt={creator.name}
                    className="h-11 w-11 rounded-full border object-cover"
                  />
                )}
                <div>
                  <p className="text-sm font-semibold text-gray-900">
                    {creator.name}
                  </p>
                  <p className="text-xs text-gray-500">
                    {creator.role || "Project Creator"}
                  </p>
                </div>
              </div>
            )}

            {/* Funding information */}
            <div className="mt-7">
              <div className="flex flex-wrap items-end justify-between gap-2">
                <p className="text-xl font-bold text-teal-700">
                  ₹{raised.toLocaleString("en-IN")} raised
                </p>
                <p className="text-sm text-gray-500">
                  Goal: ₹{goal.toLocaleString("en-IN")}
                </p>
              </div>

              <div className="mt-3 h-2.5 overflow-hidden rounded-full bg-gray-200">
                <div
                  className="h-full rounded-full bg-teal-600"
                  style={{ width: `${Math.min(progress, 100)}%` }}
                />
              </div>

              <p className="mt-2 text-xs text-gray-500">
                {progress}% of funding goal
              </p>
            </div>

            <Link
              to={`/projects/${project.id}/contribute`}
              className="mt-6 block rounded-lg bg-teal-600 px-5 py-3 text-center text-sm font-semibold text-white transition hover:bg-teal-700"
            >
              Support This Project
            </Link>
          </div>
        </section>

        {/* Tabs */}
        <section className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
          <div className="flex overflow-x-auto border-b border-gray-200">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`shrink-0 border-b-2 px-5 py-4 text-sm font-medium transition ${
                  activeTab === tab.id
                    ? "border-purple-500 text-teal-700"
                    : "border-transparent text-gray-500 hover:text-gray-800"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="p-5 sm:p-8">
            {/* About tab */}
            {activeTab === "about" && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-bold text-gray-900">
                    About this project
                  </h2>
                  <p className="mt-4 whitespace-pre-line text-sm leading-7 text-gray-600">
                    {project.story || description || "No project story has been added yet."}
                  </p>
                </div>

                {(project.skillsNeeded || project.skills_needed) && (
                  <div className="rounded-lg border border-teal-100 bg-teal-50 p-5">
                    <h3 className="font-semibold text-teal-900">
                      Skills and support needed
                    </h3>
                    <p className="mt-2 text-sm leading-6 text-teal-800">
                      {project.skillsNeeded || project.skills_needed}
                    </p>
                  </div>
                )}

                <div className="grid gap-4 text-sm sm:grid-cols-2">
                  <div className="rounded-lg bg-gray-50 p-4">
                    <p className="text-gray-500">Category</p>
                    <p className="mt-1 font-semibold text-gray-900">
                      {project.category || "Not specified"}
                    </p>
                  </div>
                  <div className="rounded-lg bg-gray-50 p-4">
                    <p className="text-gray-500">Location</p>
                    <p className="mt-1 font-semibold text-gray-900">
                      {[project.city, project.state].filter(Boolean).join(", ") || "Not specified"}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Updates tab */}
            {activeTab === "updates" && (
              <div>
                <h2 className="text-xl font-bold text-gray-900">
                  Project Updates
                </h2>

                {updates.length > 0 ? (
                  <div className="mt-6 space-y-6">
                    {updates.map((update, index) => (
                      <article
                        key={update.id || index}
                        className="border-l-2 border-teal-500 pl-5"
                      >
                        <p className="text-xs text-gray-500">
                          {update.date || "Project update"}
                        </p>
                        <h3 className="mt-1 font-semibold text-gray-900">
                          {update.title || "Update"}
                        </h3>
                        <p className="mt-2 whitespace-pre-line text-sm leading-6 text-gray-600">
                          {update.content || update.description || ""}
                        </p>
                      </article>
                    ))}
                  </div>
                ) : (
                  <p className="mt-4 rounded-lg bg-gray-50 p-5 text-sm text-gray-500">
                    The creator has not shared any updates yet. Check back later!
                  </p>
                )}
              </div>
            )}

            {/* Rewards tab */}
            {activeTab === "rewards" && (
              <div>
                <h2 className="text-xl font-bold text-gray-900">
                  Choose a reward
                </h2>
                <p className="mt-2 text-sm text-gray-600">
                  Explore the rewards offered by this project's creator.
                </p>

                {rewards.length > 0 ? (
                  <div className="mt-6 grid gap-4 md:grid-cols-2">
                    {rewards.map((reward, index) => (
                      <article
                        key={reward.id || index}
                        className="flex flex-col rounded-xl border border-gray-200 p-5 transition hover:border-teal-400"
                      >
                        <p className="text-xs font-semibold uppercase tracking-wide text-teal-700">
                          Support ₹
                          {Number(reward.pledgeAmount || 0).toLocaleString("en-IN")} or more
                        </p>

                        <h3 className="mt-2 text-lg font-bold text-gray-900">
                          {reward.title}
                        </h3>

                        <p className="mt-2 flex-1 text-sm leading-6 text-gray-600">
                          {reward.description}
                        </p>

                        <Link
                          to={`/projects/${project.id}/contribute?reward=${encodeURIComponent(reward.id || "")}`}
                          className="mt-5 block rounded-lg border border-teal-600 px-4 py-2.5 text-center text-sm font-semibold text-teal-700 transition hover:bg-teal-600 hover:text-white"
                        >
                          Select Reward
                        </Link>
                      </article>
                    ))}
                  </div>
                ) : (
                  <p className="mt-4 rounded-lg bg-gray-50 p-5 text-sm text-gray-500">
                    This project welcomes voluntary support without fixed reward tiers.
                  </p>
                )}
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
