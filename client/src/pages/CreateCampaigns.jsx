import { useState } from "react";
import { useNavigate } from "react-router";
import {
  FaArrowLeft,
  FaArrowRight,
  FaCheck,
} from "react-icons/fa";

const initialFormData = {
  title: "",
  shortDescription: "",
  category: "",
  city: "",
  state: "",
  imageUrl: "",
  startDate: "",
  durationMonths: "",
  targetAmount: "",
  fundingDescription: "",
  storyTitle: "",
  storyContent: "",
  storyImageUrl: "",
  rewardTitle: "",
  rewardDescription: "",
  rewardImageUrl: "",
  creatorName: "",
  creatorEmail: "",
  creatorWebsite: "",
};

const steps = [
  { number: 1, title: "Basics", description: "Your project" },
  { number: 2, title: "Funding", description: "Your goal" },
  { number: 3, title: "Story", description: "Your details" },
];

const inputClass =
  "mt-2 w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm text-gray-800 outline-none transition focus:border-teal-600 focus:ring-2 focus:ring-teal-100";

const labelClass = "text-sm font-medium text-gray-800";

function SectionHeading({ title, description }) {
  return (
    <div className="mb-6">
      <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
      <p className="mt-1 text-sm text-gray-500">{description}</p>
    </div>
  );
}

function Field({ label, name, value, onChange, required = false, placeholder = "", type = "text" }) {
  return (
    <div>
      <label htmlFor={name} className={labelClass}>
        {label}
        {required && <span className="ml-1 text-red-500">*</span>}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        required={required}
        placeholder={placeholder}
        className={inputClass}
      />
    </div>
  );
}

export default function CreateCampaigns() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState(initialFormData);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  }

  function handleNext(event) {
    event.preventDefault();

    const currentForm = event.currentTarget.closest("form");
    if (!currentForm || !currentForm.reportValidity()) return;

    setError("");
    setStep((previous) => Math.min(previous + 1, 3));
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function handleBack() {
    setError("");
    setStep((previous) => Math.max(previous - 1, 1));
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");

    if (!event.currentTarget.reportValidity()) return;

    setLoading(true);

    const payload = {
      title: formData.title.trim(),
      short_description: formData.shortDescription.trim(),
      category: formData.category,
      city: formData.city.trim(),
      state: formData.state.trim(),
      banner_image: formData.imageUrl.trim(),
      start_date: formData.startDate,
      duration_months: Number(formData.durationMonths),
      goal_amount: Number(formData.targetAmount),
      funding_description: formData.fundingDescription.trim(),
      story_title: formData.storyTitle.trim(),
      story_content: formData.storyContent.trim(),
      story_image: formData.storyImageUrl.trim(),
      reward_title: formData.rewardTitle.trim(),
      reward_description: formData.rewardDescription.trim(),
      reward_image: formData.rewardImageUrl.trim(),
      creator_name: formData.creatorName.trim(),
      creator_email: formData.creatorEmail.trim(),
      creator_url: formData.creatorWebsite.trim(),
    };

    try {
      const response = await fetch("http://localhost:8080/api/projects", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(
          data.message || data.error || "Unable to create your project. Please try again."
        );
      }

      const createdId =
        data.id ?? data.projectId ?? data.project?.id ?? data.project?.insertId;

      if (createdId != null) {
        navigate(`/projects/${createdId}`);
      } else {
        navigate("/campaigns");
      }
    } catch (err) {
      setError(
        err.message || "Something went wrong. Please check your connection and try again."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-10 sm:px-6 lg:py-14">
      <div className="mx-auto max-w-3xl">
        {/* Page heading */}
        <div className="mb-8">
          <p className="text-sm font-semibold text-teal-700">CREATE A PROJECT</p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Bring your idea to life
          </h1>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-gray-600 sm:text-base">
            Tell people what you are building, what support you need, and why
            your project matters.
          </p>
        </div>

        {/* Step progress */}
        <div className="mb-6 rounded-xl border border-gray-200 bg-white p-4 sm:p-5">
          <div className="flex items-center">
            {steps.map((item, index) => {
              const completed = step > item.number;
              const active = step === item.number;

              return (
                <div key={item.number} className="flex flex-1 items-center">
                  <div className="flex items-center gap-2 sm:gap-3">
                    <div
                      className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-sm font-semibold ${
                        completed || active
                          ? "bg-teal-700 text-white"
                          : "bg-gray-100 text-gray-500"
                      }`}
                    >
                      {completed ? <FaCheck size={12} /> : item.number}
                    </div>

                    <div>
                      <p
                        className={`text-sm font-semibold ${
                          active || completed ? "text-gray-900" : "text-gray-400"
                        }`}
                      >
                        {item.title}
                      </p>
                      <p className="hidden text-xs text-gray-500 sm:block">
                        {item.description}
                      </p>
                    </div>
                  </div>

                  {index < steps.length - 1 && (
                    <div
                      className={`mx-2 h-px flex-1 sm:mx-4 ${
                        completed ? "bg-teal-600" : "bg-gray-200"
                      }`}
                    />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Form card */}
        <form
          onSubmit={step === 3 ? handleSubmit : handleNext}
          className="overflow-hidden rounded-xl border border-gray-200 bg-white"
        >
          <div className="p-5 sm:p-8">
            {step === 1 && (
              <>
                <SectionHeading
                  title="Project basics"
                  description="Start with the main information people should know."
                />

                <div className="space-y-5">
                  <Field
                    label="Project title"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    required
                    placeholder="e.g. Campus Recycling Initiative"
                  />

                  <div>
                    <label htmlFor="category" className={labelClass}>
                      Project category
                      <span className="ml-1 text-red-500">*</span>
                    </label>
                    <select
                      id="category"
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                      required
                      className={inputClass}
                    >
                      <option value="">Choose a category</option>
                      <option value="Website">Website</option>
                      <option value="App">App</option>
                      <option value="Product">Product</option>
                      <option value="Startup Idea">Startup idea</option>
                      <option value="College Event">College event</option>
                      <option value="Social Impact">Social impact</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="shortDescription" className={labelClass}>
                      Short description
                      <span className="ml-1 text-red-500">*</span>
                    </label>
                    <textarea
                      id="shortDescription"
                      name="shortDescription"
                      value={formData.shortDescription}
                      onChange={handleChange}
                      required
                      maxLength={250}
                      rows={3}
                      placeholder="Explain your idea in a few sentences."
                      className={inputClass + " resize-y"}
                    />
                    <p className="mt-1 text-right text-xs text-gray-500">
                      {formData.shortDescription.length}/250 characters
                    </p>
                  </div>

                  <Field
                    label="Cover image URL"
                    name="imageUrl"
                    value={formData.imageUrl}
                    onChange={handleChange}
                    placeholder="https://example.com/image.jpg"
                    type="url"
                  />
                  <p className="-mt-3 text-xs text-gray-500">
                    Optional. You can add an image link if you have one.
                  </p>
                </div>
              </>
            )}

            {step === 2 && (
              <>
                <SectionHeading
                  title="Funding details"
                  description="Set a realistic goal and explain how the money will be used."
                />

                <div className="space-y-5">
                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                    <Field
                      label="City"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      required
                      placeholder="e.g. Pune"
                    />
                    <Field
                      label="State"
                      name="state"
                      value={formData.state}
                      onChange={handleChange}
                      required
                      placeholder="e.g. Maharashtra"
                    />
                  </div>

                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                    <Field
                      label="Planned start date"
                      name="startDate"
                      value={formData.startDate}
                      onChange={handleChange}
                      required
                      type="date"
                    />
                    <Field
                      label="Project duration (months)"
                      name="durationMonths"
                      value={formData.durationMonths}
                      onChange={handleChange}
                      required
                      type="number"
                      placeholder="e.g. 3"
                    />
                    <p className="hidden" aria-hidden="true" />
                  </div>

                  <div>
                    <label htmlFor="targetAmount" className={labelClass}>
                      Funding goal (₹)
                      <span className="ml-1 text-red-500">*</span>
                    </label>
                    <input
                      id="targetAmount"
                      name="targetAmount"
                      type="number"
                      min="1"
                      step="1"
                      value={formData.targetAmount}
                      onChange={handleChange}
                      required
                      placeholder="e.g. 25000"
                      className={inputClass}
                    />
                    <p className="mt-1 text-xs text-gray-500">
                      Enter the total amount you need for this project.
                    </p>
                  </div>

                  <div>
                    <label htmlFor="fundingDescription" className={labelClass}>
                      How will the money be used?
                      <span className="ml-1 text-red-500">*</span>
                    </label>
                    <textarea
                      id="fundingDescription"
                      name="fundingDescription"
                      value={formData.fundingDescription}
                      onChange={handleChange}
                      required
                      rows={5}
                      placeholder="Describe the main costs, materials, or activities the funding will support."
                      className={inputClass + " resize-y"}
                    />
                  </div>
                </div>
              </>
            )}

            {step === 3 && (
              <>
                <SectionHeading
                  title="Your story"
                  description="Help supporters understand your motivation and who is behind the project."
                />

                <div className="space-y-5">
                  <Field
                    label="Story heading"
                    name="storyTitle"
                    value={formData.storyTitle}
                    onChange={handleChange}
                    required
                    placeholder="What makes this project important?"
                  />

                  <div>
                    <label htmlFor="storyContent" className={labelClass}>
                      Project story
                      <span className="ml-1 text-red-500">*</span>
                    </label>
                    <textarea
                      id="storyContent"
                      name="storyContent"
                      value={formData.storyContent}
                      onChange={handleChange}
                      required
                      rows={6}
                      placeholder="Explain the problem, your idea, and the impact you hope to make."
                      className={inputClass + " resize-y"}
                    />
                  </div>

                  <Field
                    label="Story image URL"
                    name="storyImageUrl"
                    value={formData.storyImageUrl}
                    onChange={handleChange}
                    placeholder="https://example.com/story-image.jpg"
                    type="url"
                  />

                  <div className="border-t border-gray-200 pt-6">
                    <h3 className="font-semibold text-gray-900">
                      Optional supporter reward
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">
                      Add a small thank-you or reward if you want to.
                    </p>

                    <div className="mt-4 space-y-5">
                      <Field
                        label="Reward title"
                        name="rewardTitle"
                        value={formData.rewardTitle}
                        onChange={handleChange}
                        placeholder="e.g. Project supporter"
                      />

                      <div>
                        <label htmlFor="rewardDescription" className={labelClass}>
                          Reward description
                        </label>
                        <textarea
                          id="rewardDescription"
                          name="rewardDescription"
                          value={formData.rewardDescription}
                          onChange={handleChange}
                          rows={3}
                          placeholder="Describe the thank-you or reward."
                          className={inputClass + " resize-y"}
                        />
                      </div>

                      <Field
                        label="Reward image URL"
                        name="rewardImageUrl"
                        value={formData.rewardImageUrl}
                        onChange={handleChange}
                        placeholder="https://example.com/reward.jpg"
                        type="url"
                      />
                    </div>
                  </div>

                  <div className="border-t border-gray-200 pt-6">
                    <h3 className="font-semibold text-gray-900">
                      Project creator
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">
                      Add your contact details so your project has a clear owner.
                    </p>

                    <div className="mt-4 space-y-5">
                      <Field
                        label="Your name"
                        name="creatorName"
                        value={formData.creatorName}
                        onChange={handleChange}
                        required
                        placeholder="Your full name"
                      />

                      <Field
                        label="Email address"
                        name="creatorEmail"
                        value={formData.creatorEmail}
                        onChange={handleChange}
                        required
                        type="email"
                        placeholder="you@example.com"
                      />

                      <Field
                        label="Website or portfolio"
                        name="creatorWebsite"
                        value={formData.creatorWebsite}
                        onChange={handleChange}
                        type="url"
                        placeholder="https://yourwebsite.com"
                      />
                    </div>
                  </div>
                </div>
              </>
            )}

            {error && (
              <div
                role="alert"
                className="mt-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
              >
                {error}
              </div>
            )}
          </div>

          {/* Form navigation */}
          <div className="flex items-center justify-between gap-4 border-t border-gray-200 bg-gray-50 px-5 py-4 sm:px-8">
            <div>
              {step > 1 && (
                <button
                  type="button"
                  onClick={handleBack}
                  disabled={loading}
                  className="inline-flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-200 disabled:opacity-50"
                >
                  <FaArrowLeft size={12} />
                  Back
                </button>
              )}
            </div>

            {step < 3 ? (
              <button
                type="submit"
                className="inline-flex items-center gap-2 rounded-lg bg-teal-700 px-5 py-3 text-sm font-semibold text-white transition hover:bg-teal-800 focus:outline-none focus:ring-2 focus:ring-teal-600 focus:ring-offset-2"
              >
                Continue
                <FaArrowRight size={12} />
              </button>
            ) : (
              <button
                type="submit"
                disabled={loading}
                className="inline-flex items-center gap-2 rounded-lg bg-teal-700 px-5 py-3 text-sm font-semibold text-white transition hover:bg-teal-800 focus:outline-none focus:ring-2 focus:ring-teal-600 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? "Creating project..." : "Create project"}
                {!loading && <FaCheck size={13} />}
              </button>
            )}
          </div>
        </form>

        <p className="mt-4 text-center text-xs leading-5 text-gray-500">
          Fields marked with <span className="text-red-500">*</span> are required.
          You can leave optional image links and reward details blank.
        </p>
      </div>
    </main>
  );
}
