
import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router";
import {
  FaSearch,
  FaMapMarkerAlt,
  FaTag,
  FaRegFolderOpen,
} from "react-icons/fa";

export default function ExploreCampaigns() {
  const navigate = useNavigate();

  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Fetch projects from the Express backend.
  useEffect(() => {
    const controller = new AbortController();

    const fetchProjects = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(
          "http://localhost:8080/api/projects",
          { signal: controller.signal }
        );

        if (!response.ok) {
          throw new Error(`Server returned status ${response.status}`);
        }

        const data = await response.json();

        // Support both [project, ...] and { projects: [...] }.
        const projectList = Array.isArray(data)
          ? data
          : Array.isArray(data.projects)
            ? data.projects
            : null;

        if (!projectList) {
          throw new Error("The server returned an unexpected project format.");
        }

        setProjects(projectList);
      } catch (err) {
        if (err.name === "AbortError") return;

        console.error("Failed to fetch projects:", err);
        setError(
          "Unable to load projects. Please check that your backend is running."
        );
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    };

    fetchProjects();

    return () => controller.abort();
  }, []);

  // Build category filters from the projects returned by the API.
  const categories = useMemo(() => {
    const uniqueCategories = [
      ...new Set(
        projects
          .map((project) => project.category)
          .filter(Boolean)
      ),
    ];

    return ["All", ...uniqueCategories];
  }, [projects]);

  // Search by title, short description, category, and location.
  const filteredProjects = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    return projects.filter((project) => {
      const searchableText = [
        project.title,
        project.short_description,
        project.description,
        project.category,
        project.city,
        project.state,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      const matchesSearch = searchableText.includes(query);

      const matchesCategory =
        selectedCategory === "All" ||
        project.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [projects, searchQuery, selectedCategory]);

  const formatCurrency = (amount) => {
    const value = Number(amount);

    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(Number.isFinite(value) ? value : 0);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      <main className="mx-auto w-full max-w-7xl px-6 py-12">
        {/* Page heading */}
        <section className="mx-auto mb-10 max-w-2xl text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-[#0F8F83]">
            Discover · Support · Grow
          </p>

          <h1 className="text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
            Explore Student Projects
          </h1>

          <p className="mt-3 text-base leading-7 text-slate-600">
            Discover student ideas, creative projects, startup concepts,
            and initiatives making a difference.
          </p>
        </section>

        {/* Search and category filters */}
        <section className="mb-10 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm md:p-6">
          <div className="flex flex-col gap-5">
            <div className="relative w-full">
              <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-sm text-slate-400" />

              <input
                type="search"
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                placeholder="Search projects by title, keyword, or location..."
                aria-label="Search projects"
                className="w-full rounded-lg border border-slate-200 bg-slate-50 py-3 pl-11 pr-4 text-sm outline-none focus:border-[#0F8F83] focus:bg-white focus:ring-2 focus:ring-teal-100"
              />
            </div>

            <div>
              <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
                Browse by category
              </p>

              <div className="flex flex-wrap gap-2">
                {categories.map((category) => {
                  const selected = selectedCategory === category;

                  return (
                    <button
                      key={category}
                      type="button"
                      onClick={() => setSelectedCategory(category)}
                      aria-pressed={selected}
                      className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                        selected
                          ? "bg-[#0F8F83] text-white"
                          : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                      }`}
                    >
                      {category}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* Loading state */}
        {loading && (
          <div className="rounded-2xl border border-slate-200 bg-white py-20 text-center">
            <div
              className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-4 border-[#0F8F83] border-t-transparent"
              role="status"
              aria-label="Loading projects"
            />

            <p className="text-sm font-medium text-slate-600">
              Loading projects...
            </p>
          </div>
        )}

        {/* Error state */}
        {!loading && error && (
          <div className="mx-auto max-w-xl rounded-2xl border border-red-200 bg-red-50 p-8 text-center">
            <h2 className="font-semibold text-red-800">
              Could not load projects
            </h2>

            <p className="mt-2 text-sm text-red-700">{error}</p>

            <button
              type="button"
              onClick={() => window.location.reload()}
              className="mt-5 rounded-lg bg-red-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-red-700"
            >
              Try Again
            </button>
          </div>
        )}

        {/* No matching projects */}
        {!loading && !error && filteredProjects.length === 0 && (
          <div className="rounded-2xl border border-slate-200 bg-white px-6 py-16 text-center shadow-sm">
            <FaRegFolderOpen className="mx-auto text-4xl text-slate-300" />

            <h2 className="mt-5 text-xl font-bold text-slate-800">
              {projects.length === 0
                ? "No projects available yet"
                : "No projects found"}
            </h2>

            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
              {projects.length === 0
                ? "Be the first to share an idea with the Aryse community."
                : "Try another search term or select a different category."}
            </p>

            {projects.length > 0 ? (
              <button
                type="button"
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("All");
                }}
                className="mt-6 rounded-lg border border-slate-200 px-5 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50"
              >
                Clear Filters
              </button>
            ) : (
              <Link
                to="/create-campaigns"
                className="mt-6 inline-block rounded-lg bg-[#0F8F83] px-6 py-3 text-sm font-semibold text-white hover:bg-teal-800"
              >
                Create a Project
              </Link>
            )}
          </div>
        )}

        {/* Project card grid */}
        {!loading && !error && filteredProjects.length > 0 && (
          <>
            <div className="mb-5 flex items-center justify-between">
              <p className="text-sm text-slate-500">
                Showing{" "}
                <span className="font-semibold text-slate-800">
                  {filteredProjects.length}
                </span>{" "}
                {filteredProjects.length === 1 ? "project" : "projects"}
              </p>
            </div>

            <div className="grid grid-cols-1 gap-7 md:grid-cols-2 lg:grid-cols-3">
              {filteredProjects.map((project, index) => {
                const id = project.id ?? project._id;
                const title = project.title || "Untitled Project";
                const description =
                  project.short_description ||
                  project.description ||
                  "No project description provided.";

                const imageUrl =
                  project.banner_image || project.imageUrl || "";

                const city = project.city || "";
                const state = project.state || "";
                const location = [city, state].filter(Boolean).join(", ");

                return (
                  <article
                    key={id ?? `${title}-${index}`}
                    className="flex flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition-shadow hover:shadow-md"
                  >
                    {/* Project banner */}
                    <div className="relative h-48 overflow-hidden bg-slate-100">
                      {imageUrl ? (
                        <img
                          src={imageUrl}
                          alt={title}
                          loading="lazy"
                          className="h-full w-full object-cover"
                          onError={(event) => {
                            event.currentTarget.style.display = "none";
                          }}
                        />
                      ) : (
                        <div className="flex h-full items-center justify-center text-slate-400">
                          <FaRegFolderOpen className="text-4xl" />
                        </div>
                      )}

                      <span className="absolute left-4 top-4 rounded-md bg-white px-3 py-1.5 text-xs font-semibold text-[#0F8F83] shadow-sm">
                        {project.category || "General"}
                      </span>
                    </div>

                    {/* Project details */}
                    <div className="flex flex-1 flex-col p-6">
                      <h2 className="line-clamp-2 text-xl font-bold text-slate-900">
                        {title}
                      </h2>

                      <p className="mt-3 line-clamp-3 text-sm leading-6 text-slate-600">
                        {description}
                      </p>

                      {location && (
                        <div className="mt-4 flex items-center gap-2 text-xs text-slate-500">
                          <FaMapMarkerAlt className="shrink-0 text-slate-400" />
                          <span>{location}</span>
                        </div>
                      )}

                      <div className="mt-auto pt-6">
                        <div className="mb-4 flex items-center justify-between gap-3 border-t border-slate-100 pt-4">
                          <span className="text-xs font-medium uppercase tracking-wide text-slate-500">
                            Funding goal
                          </span>

                          <span className="text-lg font-bold text-[#0F8F83]">
                            {formatCurrency(project.goal_amount ?? project.targetAmount ?? project.goal ?? 0)}
                          </span>
                        </div>

                        <button
                          type="button"
                          onClick={() => {
                            if (id != null) {
                              navigate(`/projects/${id}`);
                            }
                          }}
                          disabled={id == null}
                          className="block w-full rounded-lg bg-slate-100 py-3 text-center text-sm font-semibold text-slate-700 hover:bg-[#0F8F83] hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
                        >
                          View Project
                        </button>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </>
        )}

        {/* Bottom call to action */}
        <section className="mt-16 rounded-2xl border border-slate-200 bg-white px-6 py-10 text-center shadow-sm md:px-10">
          <div className="mx-auto max-w-2xl">
            <p className="text-sm font-semibold text-[#0F8F83]">
              HAVE AN IDEA?
            </p>

            <h2 className="mt-2 text-2xl font-bold text-slate-900">
              Your project could be next.
            </h2>

            <p className="mt-3 text-sm leading-6 text-slate-600">
              Share your project, startup idea, or community initiative
              with the Aryse student community.
            </p>

            <Link
              to="/create-campaigns"
              className="mt-6 inline-block rounded-lg bg-[#0F8F83] px-7 py-3 text-sm font-semibold text-white hover:bg-teal-800"
            >
              Create a Project
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}
