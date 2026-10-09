import { Link } from "react-router";

export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-sm border border-slate-100 p-8 md:p-12">
        
        {/* Header Section */}
        <div className="border-b border-slate-100 pb-8 mb-8">
          <span className="text-teal-600 font-semibold text-xs tracking-wider uppercase">Legal</span>
          <h1 className="text-3xl md:text-4xl font-bold text-slate-800 mt-2">Terms of Service</h1>
          <p className="text-slate-500 text-sm mt-2">Last updated: March 2026</p>
        </div>

        {/* Content */}
        <div className="space-y-8 text-slate-600 text-sm leading-relaxed">
          <section>
            <h2 className="text-lg font-semibold text-slate-800 mb-3">1. Agreement to Terms</h2>
            <p>
              By accessing or using Aryse ("Platform"), you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use the Platform.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-800 mb-3">2. Account Registration</h2>
            <p className="mb-3">
              To launch or back campaigns, you must create an account. You are responsible for:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-slate-600">
              <li>Providing accurate, current, and complete information during registration.</li>
              <li>Maintaining the confidentiality of your account password.</li>
              <li>All activities that occur under your account.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-800 mb-3">3. Campaign Rules & Content</h2>
            <p className="mb-3">
              Aryse connects student innovators with supporters. Project creators agree that:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-slate-600">
              <li>All campaign information presented must be truthful and accurate.</li>
              <li>Campaigns must not violate intellectual property or local laws.</li>
              <li>Funds raised must be used solely for the stated project goals.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-800 mb-3">4. Limitation of Liability</h2>
            <p>
              Aryse provides a platform to facilitate project funding but does not guarantee campaign completion or outcomes. We are not liable for any direct or indirect losses resulting from platform use.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-800 mb-3">5. Changes to Terms</h2>
            <p>
              We reserve the right to modify these terms at any time. Continued use of Aryse after modifications indicates acceptance of the updated terms.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-800 mb-3">6. Contact Information</h2>
            <p>
              For legal inquiries or questions regarding these terms, please reach out through our{" "}
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