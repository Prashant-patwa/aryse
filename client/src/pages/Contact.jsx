import { useState } from "react";
import AryseLogo from "../components/AryseLogo";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Pre-added logic integration ready for future backend endpoint
    console.log("Contact submission:", formData);
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 py-12">
      <div className="bg-white rounded-2xl shadow-xl flex flex-col md:flex-row w-full max-w-4xl overflow-hidden min-h-[550px]">
        
        {/* Left Side: Branding & Info */}
        <div className="md:w-1/2 bg-teal-50/50 p-8 md:p-12 flex flex-col justify-between">
          <div>
            <AryseLogo />
            <h2 className="text-2xl font-bold text-slate-800 mt-8">Get in Touch</h2>
            <p className="text-slate-500 text-sm mt-2">
              Have questions about starting a project or backing student dreams? We're here to help.
            </p>

            <div className="mt-8 space-y-4 text-sm text-slate-600">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-teal-100 flex items-center justify-center text-teal-700 font-semibold text-xs">
                  @
                </div>
                <span>support@aryse.com</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-teal-100 flex items-center justify-center text-teal-700 font-semibold text-xs">
                  #
                </div>
                <span>Community & Student Support</span>
              </div>
            </div>
          </div>

          <div className="text-xs text-slate-400 mt-8 md:mt-0">
            © 2026 Aryse Inc. All rights reserved.
          </div>
        </div>

        {/* Right Side: Contact Form */}
        <div className="md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
          <h1 className="text-2xl font-bold text-slate-800">Send a Message</h1>
          <p className="text-sm text-slate-500 mt-1 mb-6">Fill out the form below and we'll reply shortly.</p>

          {submitted ? (
            <div className="p-4 bg-teal-50 border border-teal-200 text-teal-800 rounded-lg text-sm">
              Thank you for getting in touch! We've received your message.
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div>
                <label htmlFor="name" className="block text-xs font-semibold text-slate-700 mb-1">
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  onChange={handleChange}
                  value={formData.name}
                  placeholder="John Doe"
                  className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:outline-none focus:border-teal-600 text-sm text-slate-800 placeholder-slate-400 bg-slate-50/50"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-xs font-semibold text-slate-700 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  onChange={handleChange}
                  value={formData.email}
                  placeholder="you@example.com"
                  className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:outline-none focus:border-teal-600 text-sm text-slate-800 placeholder-slate-400 bg-slate-50/50"
                />
              </div>

              <div>
                <label htmlFor="subject" className="block text-xs font-semibold text-slate-700 mb-1">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  required
                  onChange={handleChange}
                  value={formData.subject}
                  placeholder="How can we help?"
                  className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:outline-none focus:border-teal-600 text-sm text-slate-800 placeholder-slate-400 bg-slate-50/50"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-xs font-semibold text-slate-700 mb-1">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  required
                  onChange={handleChange}
                  value={formData.message}
                  placeholder="Write your message here..."
                  className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:outline-none focus:border-teal-600 text-sm text-slate-800 placeholder-slate-400 bg-slate-50/50 resize-none"
                />
              </div>

              <button
                type="submit"
                className="mt-2 w-full py-2.5 bg-teal-600 hover:bg-teal-700 text-white font-medium text-sm rounded-lg transition-colors shadow-sm"
              >
                Send Message
              </button>
            </form>
          )}
        </div>

      </div>
    </div>
  );
}