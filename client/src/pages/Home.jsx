import { useEffect, useState } from "react";
import { Link } from "react-router";
import {
  FaLightbulb,
  FaUsers,
  FaRocket,
  FaMapMarkerAlt,
} from "react-icons/fa";
import projectsData from "../data/projectsData.js";

export default function Home() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const storedProjects = JSON.parse(
        localStorage.getItem("aryse_projects") || "[]"
      );

      const savedProjects = Array.isArray(storedProjects)
        ? storedProjects
        : [];

      // Keep new projects and sample projects without duplicate IDs.
      const projectMap = new Map();

      [...savedProjects, ...projectsData].forEach((project) => {
        if (!projectMap.has(String(project.id))) {
          projectMap.set(String(project.id), project);
        }
      });

      setProjects(Array.from(projectMap.values()));
    } catch (error) {
      console.error("Could not load projects:", error);
      setProjects(Array.isArray(projectsData) ? projectsData : []);
    } finally {
      setLoading(false);
    }
  }, []);

  const formatINR = (amount) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(Number(amount) || 0);

  // Support both the new camelCase fields and older sample-data fields.
  const getBanner = (project) =>
    project.bannerImage || project.banner_image || "";

  const getDescription = (project) =>
    project.shortDescription ||
    project.short_description ||
    "Discover the idea and learn what the student creator is building.";

  const getGoal = (project) =>
    project.fundingGoal ?? project.goal_amount ?? 0;

  const featuredProjects = projects.slice(0, 3);
  const heroProject = projects[2];

  return (
    <div className="min-h-screen bg-white text-slate-800">
      <main>
        {/* HERO SECTION */}
        <section className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-6 py-16 md:py-20 lg:grid-cols-2">
          {/* Left column */}
          <div className="max-w-xl">
            <span className="mb-5 inline-block rounded-full bg-teal-50 px-4 py-2 text-sm font-semibold text-[#0F8F83]">
              Student ideas. Real-world impact.
            </span>

            <h1 className="text-4xl font-extrabold leading-tight text-slate-900 sm:text-5xl">
              Your ideas deserve a chance to grow.
            </h1>

            <p className="mt-6 text-lg leading-relaxed text-slate-600">
              Aryse connects student innovators with a supportive community.
              Showcase your projects, find support, and turn your ideas into
              real-world impact.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link
                to="/campaigns"
                className="rounded-lg bg-[#0F8F83] px-6 py-3 font-medium text-white shadow-sm transition-colors hover:bg-[#0c7369]"
              >
                Explore Projects
              </Link>

              <Link
                to="/create-campaigns"
                className="rounded-lg border-2 border-[#0F8F83] px-6 py-3 font-medium text-[#0F8F83] transition-colors hover:bg-teal-50"
              >
                Create a Project
              </Link>
            </div>
          </div>

          {/* Right column: Featured project preview */}
          <div className="mx-auto w-full max-w-lg">
            {loading ? (
              <div className="animate-pulse overflow-hidden rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                <div className="h-56 rounded-xl bg-slate-100" />
                <div className="mt-5 h-5 w-3/4 rounded bg-slate-100" />
                <div className="mt-3 h-4 w-full rounded bg-slate-100" />
                <div className="mt-2 h-4 w-2/3 rounded bg-slate-100" />
              </div>
            ) : heroProject ? (
              <Link
                to={`/projects/${heroProject.id}`}
                className="block overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-shadow hover:shadow-md"
              >
                <div className="h-64 overflow-hidden bg-slate-100">
                  {getBanner(heroProject) ? (
                    <img
                      src={getBanner(heroProject)}
                      alt={heroProject.title || "Featured project"}
                      className="h-full w-full object-cover"
                      onError={(event) => {
                        event.currentTarget.style.display = "none";
                      }}
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center text-slate-400">
                      <FaLightbulb className="text-5xl" />
                    </div>
                  )}
                </div>

                <div className="p-6">
                  <span className="text-xs font-semibold uppercase tracking-wider text-[#0F8F83]">
                    Featured Project ·{" "}
                    {heroProject.category || "Student Project"}
                  </span>

                  <h2 className="mt-2 text-2xl font-bold text-slate-900">
                    {heroProject.title || "Student Project"}
                  </h2>

                  <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-slate-600">
                    {getDescription(heroProject)}
                  </p>

                  <div className="mt-5 flex items-center justify-between gap-3 border-t border-slate-100 pt-4">
                    <span className="flex items-center gap-2 text-sm text-slate-500">
                      <FaMapMarkerAlt className="text-[#0F8F83]" />
                      {[heroProject.city, heroProject.state]
                        .filter(Boolean)
                        .join(", ") || "Location not specified"}
                    </span>

                    <span className="text-sm font-bold text-[#0F8F83]">
                      {formatINR(getGoal(heroProject))}
                    </span>
                  </div>
                </div>
              </Link>
            ) : (
              <div className="flex min-h-80 flex-col items-center justify-center rounded-2xl border border-slate-200 bg-slate-50 p-8 text-center">
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-teal-50 text-[#0F8F83]">
                  <FaLightbulb className="text-3xl" />
                </div>

                <h2 className="text-xl font-bold text-slate-900">
                  Ideas start here.
                </h2>

                <p className="mt-2 max-w-xs text-sm leading-relaxed text-slate-600">
                  Be among the first to share a student project with the Aryse
                  community.
                </p>

                <Link
                  to="/create-campaigns"
                  className="mt-5 rounded-lg bg-[#0F8F83] px-5 py-2.5 text-sm font-medium text-white"
                >
                  Create a Project
                </Link>
              </div>
            )}
          </div>
        </section>

        {/* HOW ARYSE WORKS */}
        <section className="border-y border-slate-100 bg-slate-50 py-16">
          <div className="mx-auto max-w-7xl px-6">
            <div className="mb-12 text-center">
              <h2 className="text-3xl font-bold text-slate-900">
                How Aryse Works
              </h2>

              <p className="mt-2 text-sm text-slate-500">
                Three simple steps to bring student innovation to life.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              <div className="flex flex-col items-center rounded-xl border border-slate-200 bg-white p-8 text-center shadow-sm">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-teal-50 text-[#0F8F83]">
                  <FaLightbulb className="h-6 w-6" />
                </div>

                <h3 className="text-xl font-semibold">
                  1. Share Your Idea
                </h3>

                <p className="mt-2 text-sm text-slate-600">
                  Showcase your website, app, startup idea, or community event.
                </p>
              </div>

              <div className="flex flex-col items-center rounded-xl border border-slate-200 bg-white p-8 text-center shadow-sm">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-teal-50 text-[#0F8F83]">
                  <FaUsers className="h-6 w-6" />
                </div>

                <h3 className="text-xl font-semibold">
                  2. Find Support
                </h3>

                <p className="mt-2 text-sm text-slate-600">
                  Introduce your work to people who can encourage your idea.
                </p>
              </div>

              <div className="flex flex-col items-center rounded-xl border border-slate-200 bg-white p-8 text-center shadow-sm">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-teal-50 text-[#0F8F83]">
                  <FaRocket className="h-6 w-6" />
                </div>

                <h3 className="text-xl font-semibold">
                  3. Make an Impact
                </h3>

                <p className="mt-2 text-sm text-slate-600">
                  Work towards turning your idea into something meaningful.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* FEATURED PROJECTS */}
        <section className="mx-auto max-w-7xl px-6 py-20">
          <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
            <div>
              <h2 className="text-3xl font-bold text-slate-900">
                Featured Projects
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Discover ideas shared by student creators.
              </p>
            </div>

            <Link
              to="/campaigns"
              className="text-sm font-semibold text-[#0F8F83] hover:underline"
            >
              View All Projects →
            </Link>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {[1, 2, 3].map((item) => (
                <div
                  key={item}
                  className="animate-pulse overflow-hidden rounded-xl border border-slate-200"
                >
                  <div className="h-44 bg-slate-100" />
                  <div className="space-y-3 p-6">
                    <div className="h-4 w-1/3 rounded bg-slate-100" />
                    <div className="h-5 w-3/4 rounded bg-slate-100" />
                    <div className="h-4 rounded bg-slate-100" />
                    <div className="h-4 w-1/2 rounded bg-slate-100" />
                  </div>
                </div>
              ))}
            </div>
          ) : featuredProjects.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {featuredProjects.map((project) => (
                <Link
                  to={`/projects/${project.id}`}
                  key={project.id}
                  className="flex flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition-shadow hover:shadow-md"
                >
                  <div className="h-44 overflow-hidden bg-slate-100">
                    {getBanner(project) ? (
                      <img
                        src={getBanner(project)}
                        alt={project.title || "Project"}
                        className="h-full w-full object-cover"
                        onError={(event) => {
                          event.currentTarget.style.display = "none";
                        }}
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center text-slate-400">
                        <FaLightbulb className="text-3xl" />
                      </div>
                    )}
                  </div>

                  <div className="flex flex-grow flex-col p-6">
                    <span className="mb-2 text-xs font-semibold uppercase tracking-wider text-[#0F8F83]">
                      {project.category || "General"}
                    </span>

                    <h3 className="mb-2 line-clamp-1 text-lg font-bold text-slate-800">
                      {project.title || "Untitled Project"}
                    </h3>

                    <p className="mb-4 line-clamp-2 flex-grow text-sm text-slate-600">
                      {getDescription(project)}
                    </p>

                    <div className="flex items-center justify-between gap-3 border-t border-slate-100 pt-4 text-sm">
                      <span className="text-slate-500">
                        Funding goal
                      </span>

                      <span className="font-semibold text-[#0F8F83]">
                        {formatINR(getGoal(project))}
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-12 text-center">
              <h3 className="text-lg font-semibold text-slate-700">
                No projects available yet
              </h3>

              <p className="mb-6 mt-1 text-sm text-slate-500">
                Be the first student to publish a project on Aryse!
              </p>

              <Link
                to="/create-campaigns"
                className="inline-block rounded-lg bg-[#0F8F83] px-5 py-2.5 text-sm font-medium text-white hover:bg-[#0c7369]"
              >
                Create a Project
              </Link>
            </div>
          )}
        </section>

        {/* FINAL CALL TO ACTION */}
        <section className="border-t border-slate-100 bg-slate-50 py-16">
          <div className="mx-auto max-w-4xl px-6 text-center">
            <h2 className="text-3xl font-bold text-slate-900">
              Ready to bring your idea to life?
            </h2>

            <p className="mt-3 text-slate-600">
              Share your project and take the first step towards making an
              impact.
            </p>

            <div className="mt-8">
              <Link
                to="/create-campaigns"
                className="inline-block rounded-lg bg-[#0F8F83] px-8 py-3 font-medium text-white shadow-sm transition-colors hover:bg-[#0c7369]"
              >
                Create a Project
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
