import { Link } from "react-router";

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-sm border border-slate-100 p-8 md:p-12">
        
        {/* Header Section */}
        <div className="border-b border-slate-100 pb-8 mb-8">
          <span className="text-teal-600 font-semibold text-xs tracking-wider uppercase">Legal</span>
          <h1 className="text-3xl md:text-4xl font-bold text-slate-800 mt-2">Privacy Policy</h1>
          <p className="text-slate-500 text-sm mt-2">Last updated: March 2026</p>
        </div>

        {/* Content */}
        <div className="space-y-8 text-slate-600 text-sm leading-relaxed">
          <section>
            <h2 className="text-lg font-semibold text-slate-800 mb-3">1. Information We Collect</h2>
            <p className="mb-3">
              At Aryse, we value your privacy. We collect personal information that you voluntarily provide to us when you register on the platform, create or back projects, or contact us.
            </p>
            <ul className="list-disc pl-5 space-y-2 text-slate-600">
              <li><strong>Account Data:</strong> Username, email address, password hash, and profile details.</li>
              <li><strong>Project Data:</strong> Campaign descriptions, media uploads, and goal details.</li>
              <li><strong>Technical Data:</strong> IP address, browser type, and cookies essential for session persistence.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-800 mb-3">2. How We Use Your Information</h2>
            <p className="mb-3">We use the collected information to:</p>
            <ul className="list-disc pl-5 space-y-2 text-slate-600">
              <li>Provide, operate, and maintain our student crowdfunding platform.</li>
              <li>Authenticate your identity and manage account access securely.</li>
              <li>Notify you about updates, backing milestones, and platform changes.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-800 mb-3">3. Sharing Your Information</h2>
            <p>
              We do not sell your personal data. We only share information with trusted third-party service providers (such as payment processors or database hosts) necessary to operate our service.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-800 mb-3">4. Security & Data Retention</h2>
            <p>
              We implement industry-standard security measures, including HTTPS encryption and secure cross-origin HTTP cookies, to protect your data against unauthorized access.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-800 mb-3">5. Contact Us</h2>
            <p>
              If you have questions regarding this Privacy Policy, please reach out via our{" "}
              <Link to="/contact" className="text-teal-600 font-semibold hover:underline">
                Contact Page
              </Link>.
            </p>
          </section>
        </div>

      </div>
    </div>
  );
}