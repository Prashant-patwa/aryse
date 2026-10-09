
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router";
import {
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaClock,
  FaTag,
  FaUser,
  FaEnvelope,
  FaGlobe,
  FaArrowLeft,
  FaGift,
} from "react-icons/fa";

const API_URL = "http://localhost:8080/api/projects";

export default function ProjectDetails() {
  const { id } = useParams();

  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    async function fetchProjectDetails() {
      if (!id) {
        setError("NOT_FOUND");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError("");

        const response = await fetch(`${API_URL}/${id}`, {
          signal: controller.signal,
        });

        if (response.status === 404) {
          setError("NOT_FOUND");
          return;
        }

        if (!response.ok) {
          throw new Error(`Request failed: ${response.status}`);
        }

        const data = await response.json();

        if (!data.project) {
          setError("NOT_FOUND");
          return;
        }

        setProject(data.project);
      } catch (err) {
        if (err.name !== "AbortError") {
          console.error("Error fetching project details:", err);
          setError("SERVER_ERROR");
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    fetchProjectDetails();

    return () => controller.abort();
  }, [id]);

  const formatINR = (amount) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(Number(amount) || 0);

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";

    const dateOnly = String(dateString).slice(0, 10);
    const parts = dateOnly.split("-");

    if (parts.length === 3) {
      const [year, month, day] = parts.map(Number);
      const date = new Date(year, month - 1, day);

      if (!Number.isNaN(date.getTime())) {
        return date.toLocaleDateString("en-IN", {
          year: "numeric",
          month: "long",
          day: "numeric",
        });
      }
    }

    return dateString;
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50 p-6">
        <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-12 text-center shadow-sm">
          <div className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-4 border-[#0F8F83] border-t-transparent" />
          <p className="text-sm font-medium text-slate-600">
            Loading project details...
          </p>
        </div>
      </div>
    );
  }

  if (error === "NOT_FOUND") {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50 p-6">
        <div className="w-full max-w-lg rounded-2xl border border-slate-200 bg-white p-12 text-center shadow-sm">
          <h2 className="mb-2 text-2xl font-bold text-slate-800">
            Project Not Found
          </h2>
          <p className="mb-6 text-sm text-slate-500">
            This project doesn't exist or may have been removed.
          </p>
          <Link
            to="/campaigns"
            className="inline-flex items-center gap-2 rounded-lg bg-[#0F8F83] px-6 py-2.5 text-sm font-medium text-white"
          >
            <FaArrowLeft className="text-xs" />
            Back to Explore
          </Link>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50 p-6">
        <div className="w-full max-w-lg rounded-2xl border border-red-200 bg-white p-10 text-center">
          <h2 className="mb-2 text-xl font-bold text-red-800">
            Unable to Load Project
          </h2>
          <p className="mb-6 text-sm text-slate-600">
            Something went wrong while connecting to the server.
            Please check your connection and try again.
          </p>
          <div className="flex justify-center gap-3">
            <button
              onClick={() => window.location.reload()}
              className="rounded-lg bg-red-600 px-5 py-2.5 text-sm font-medium text-white"
            >
              Retry
            </button>
            <Link
              to="/campaigns"
              className="rounded-lg bg-slate-200 px-5 py-2.5 text-sm font-medium text-slate-700"
            >
              Back to Explore
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (!project) return null;

  const {
    title,
    short_description,
    category,
    city,
    state,
    banner_image,
    start_date,
    duration_months,
    goal_amount,
    raised_amount,
    funding_description,
    story_title,
    story_content,
    story_image,
    reward_title,
    reward_description,
    reward_image,
    creator_name,
    creator_email,
    creator_url,
  } = project;

  const locationText = [city, state].filter(Boolean).join(", ");
  const hasReward = reward_title || reward_description || reward_image;

  const goal = Number(goal_amount) || 0;
  const raised = Number(raised_amount) || 0;
  const progress = goal > 0
    ? Math.min(100, Math.max(0, (raised / goal) * 100))
    : 0;

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-10 text-slate-800 sm:px-6">
      <div className="mx-auto max-w-6xl space-y-10">
        <Link
          to="/campaigns"
          className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600"
        >
          <FaArrowLeft className="text-xs" />
          Back to Explore
        </Link>

        {/* Project banner and title */}
        <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="flex h-64 items-center justify-center overflow-hidden bg-slate-100 sm:h-80">
            {banner_image ? (
              <img
                src={banner_image}
                alt={title || "Project banner"}
                className="h-full w-full object-cover"
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                }}
              />
            ) : (
              <p className="text-sm text-slate-400">
                No banner image available
              </p>
            )}
          </div>

          <div className="p-6 md:p-10">
            <div className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#0F8F83]">
              <FaTag />
              <span>{category || "General"}</span>
            </div>

            <h1 className="mb-4 text-3xl font-extrabold leading-tight text-slate-900 md:text-4xl">
              {title || "Untitled Project"}
            </h1>

            <p className="max-w-4xl text-base leading-relaxed text-slate-600 md:text-lg">
              {short_description || "No short description provided."}
            </p>
          </div>
        </section>

        {/* Main content and sidebar */}
        <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-3">
          <div className="space-y-8 lg:col-span-2">
            {/* Project story */}
            <section className="space-y-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
              <h2 className="border-b border-slate-100 pb-4 text-2xl font-bold text-slate-900">
                {story_title || "Project Story"}
              </h2>

              <p className="whitespace-pre-line text-sm leading-relaxed text-slate-700 md:text-base">
                {story_content || "The creator has not added a project story yet."}
              </p>

              {story_image && (
                <div className="overflow-hidden rounded-xl border border-slate-200 bg-slate-50">
                  <img
                    src={story_image}
                    alt="Project story"
                    className="max-h-96 w-full object-cover"
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
                    }}
                  />
                </div>
              )}
            </section>

            {/* Optional supporter perk */}
            {hasReward && (
              <section className="space-y-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
                <div className="flex items-center gap-3">
                  <FaGift className="text-xl text-[#0F8F83]" />
                  <h2 className="text-2xl font-bold text-slate-900">
                    Optional Supporter Perk
                  </h2>
                </div>

                <div className="space-y-4 rounded-xl border border-teal-100 bg-teal-50/50 p-6">
                  {reward_title && (
                    <h3 className="text-lg font-bold text-slate-800">
                      {reward_title}
                    </h3>
                  )}

                  {reward_description && (
                    <p className="text-sm leading-relaxed text-slate-600">
                      {reward_description}
                    </p>
                  )}

                  {reward_image && (
                    <img
                      src={reward_image}
                      alt="Supporter perk"
                      className="max-h-64 w-full rounded-lg border border-slate-200 object-cover"
                      onError={(e) => {
                        e.currentTarget.style.display = "none";
                      }}
                    />
                  )}
                </div>
              </section>
            )}
          </div>

          {/* Sidebar */}
          <aside className="space-y-8">
            {/* Funding and contribution */}
            <section className="space-y-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <div>
                <span className="mb-1 block text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Amount Raised
                </span>

                <p className="text-3xl font-extrabold text-[#0F8F83]">
                  {formatINR(raised)}
                </p>

                <p className="mt-2 text-sm text-slate-500">
                  Goal: {formatINR(goal)}
                </p>

                <div
                  className="mt-3 h-2 overflow-hidden rounded-full bg-slate-100"
                  role="progressbar"
                  aria-label="Funding progress"
                  aria-valuenow={Math.round(progress)}
                  aria-valuemin={0}
                  aria-valuemax={100}
                >
                  <div
                    className="h-full rounded-full bg-[#0F8F83] transition-all"
                    style={{ width: `${progress}%` }}
                  />
                </div>

                <p className="mt-2 text-xs text-slate-500">
                  {progress.toFixed(0)}% of funding goal reached
                </p>
              </div>

              <Link
                to={`/projects/${id}/contribute`}
                className="flex w-full items-center justify-center rounded-lg bg-[#0F8F83] px-5 py-3 font-semibold text-white"
              >
                Contribute to This Project
              </Link>

              <p className="text-center text-xs text-slate-500">
                Demo contribution only — no real money is transferred.
              </p>

              {funding_description && (
                <div className="border-t border-slate-100 pt-4">
                  <h3 className="mb-2 text-xs font-bold uppercase text-slate-700">
                    Funding Purpose
                  </h3>
                  <p className="text-sm leading-relaxed text-slate-600">
                    {funding_description}
                  </p>
                </div>
              )}

              <div className="space-y-4 border-t border-slate-100 pt-4 text-sm text-slate-600">
                {locationText && (
                  <div className="flex items-center gap-3">
                    <FaMapMarkerAlt className="shrink-0 text-[#0F8F83]" />
                    <span>{locationText}</span>
                  </div>
                )}

                {start_date && (
                  <div className="flex items-center gap-3">
                    <FaCalendarAlt className="shrink-0 text-[#0F8F83]" />
                    <span>Start date: {formatDate(start_date)}</span>
                  </div>
                )}

                {duration_months != null && (
                  <div className="flex items-center gap-3">
                    <FaClock className="shrink-0 text-[#0F8F83]" />
                    <span>
                      {duration_months} month
                      {Number(duration_months) === 1 ? "" : "s"} duration
                    </span>
                  </div>
                )}
              </div>
            </section>

            {/* Creator information */}
            <section className="space-y-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="border-b border-slate-100 pb-3 text-lg font-bold text-slate-900">
                Creator Information
              </h3>

              <div className="space-y-4 text-sm text-slate-700">
                {creator_name && (
                  <div className="flex items-center gap-3">
                    <FaUser className="shrink-0 text-slate-400" />
                    <span className="font-semibold">{creator_name}</span>
                  </div>
                )}

                {creator_email && (
                  <div className="flex items-center gap-3">
                    <FaEnvelope className="shrink-0 text-slate-400" />
                    <a
                      href={`mailto:${creator_email}`}
                      className="break-all text-[#0F8F83] hover:underline"
                    >
                      {creator_email}
                    </a>
                  </div>
                )}

                {creator_url && (
                  <div className="flex items-center gap-3">
                    <FaGlobe className="shrink-0 text-slate-400" />
                    <a
                      href={
                        /^https?:\/\//i.test(creator_url)
                          ? creator_url
                          : `https://${creator_url}`
                      }
                      target="_blank"
                      rel="noopener noreferrer"
                      className="break-all text-[#0F8F83] hover:underline"
                    >
                      {creator_url}
                    </a>
                  </div>
                )}

                {!creator_name && !creator_email && !creator_url && (
                  <p className="text-sm text-slate-500">
                    Creator information has not been provided.
                  </p>
                )}
              </div>
            </section>
          </aside>
        </div>
      </div>
    </div>
  );
}
