import { FaLeaf, FaLightbulb, FaPaperPlane, FaUsers } from "react-icons/fa";

export default function About() {
    return (
        <div className="bg-white text-[#587887]">
            {/* Hero Section */}
            <section className="bg-gradient-to-b from-[#F0FAF8] to-white py-16 md:py-24 px-6 md:px-10 border-b border-[#E3EFED]">
                <div className="mx-auto max-w-4xl text-center">
                    <span className="inline-block mb-4 px-3 py-1 rounded-full bg-[#DDF4F0] text-[#0F8F83] text-xs font-bold uppercase tracking-[0.2em]">
                        Community Engagement Project (CEP)
                    </span>
                    <h1 className="text-4xl font-extrabold tracking-tight text-[#075C59] sm:text-5xl lg:text-6xl leading-[1.1]">
                        Empowering Student Ideas, <br />
                        <span className="text-[#0F8F83]">Driving Real-World Impact.</span>
                    </h1>
                    <p className="mt-6 mx-auto max-w-2xl text-base sm:text-lg leading-relaxed text-[#587887]">
                        Aryse is a 100% free, community-driven platform built to help Indian college students turn websites, apps, social initiatives, and campus events into reality through voluntary support.
                    </p>
                    <div className="mt-8 flex flex-wrap justify-center gap-4 text-xs font-semibold text-[#075C59]">
                        <span className="bg-[#DDF4F0] px-4 py-2 rounded-lg border border-[#c5ede7]">⚡ 0% Platform Commission</span>
                        <span className="bg-[#DDF4F0] px-4 py-2 rounded-lg border border-[#c5ede7]">🤝 Funding, Skills & Mentorship</span>
                        <span className="bg-[#DDF4F0] px-4 py-2 rounded-lg border border-[#c5ede7]">🌱 Transparent Community Support</span>
                    </div>
                </div>
            </section>

            {/* Mission & Core Pillars Section */}
            <section className="mx-auto max-w-7xl px-6 py-16 md:px-10 md:py-24">
                <div className="grid gap-12 lg:grid-cols-[1fr_1.5fr] lg:items-center lg:gap-16">
                    <div>
                        <p className="mb-3 text-sm font-bold uppercase tracking-wider text-[#0F8F83]">How Aryse Works</p>
                        <h2 className="text-3xl font-bold leading-tight text-[#075C59] md:text-4xl">
                            Bridging student innovators with a caring community.
                        </h2>
                        <p className="mt-5 leading-relaxed text-[#587887]">
                            Whether it is funding a blood donation camp, securing hardware components for an IoT project, or finding expert developer mentorship for a startup idea, Aryse connects passionate students with backers who care.
                        </p>
                        <div className="mt-6 p-4 rounded-xl bg-[#F0FAF8] border border-[#E3EFED]">
                            <p className="text-xs font-medium text-[#075C59]">
                                💡 <span className="font-bold">Non-Profit Principle:</span> There are no premium upgrades or hidden fees. Every rupee or resource pledged goes directly toward helping the student creator succeed.
                            </p>
                        </div>
                    </div>

                    <div className="grid gap-6 sm:grid-cols-3">
                        <div className="p-6 rounded-2xl bg-[#F0FAF8] border border-[#E3EFED] hover:shadow-sm transition-shadow">
                            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-[#0F8F83] text-xl text-white shadow-sm">
                                <FaLightbulb aria-hidden="true" />
                            </div>
                            <h3 className="font-bold text-[#075C59] text-base">1. Share Ideas</h3>
                            <p className="mt-2 text-xs sm:text-sm leading-relaxed">Students publish their goals, intended community impact, and required resources.</p>
                        </div>

                        <div className="p-6 rounded-2xl bg-[#F0FAF8] border border-[#E3EFED] hover:shadow-sm transition-shadow">
                            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-[#0F8F83] text-xl text-white shadow-sm">
                                <FaUsers aria-hidden="true" />
                            </div>
                            <h3 className="font-bold text-[#075C59] text-base">2. Get Support</h3>
                            <p className="mt-2 text-xs sm:text-sm leading-relaxed">Community backers contribute funds, equipment, materials, or mentorship.</p>
                        </div>

                        <div className="p-6 rounded-2xl bg-[#F0FAF8] border border-[#E3EFED] hover:shadow-sm transition-shadow">
                            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-[#0F8F83] text-xl text-white shadow-sm">
                                <FaLeaf aria-hidden="true" />
                            </div>
                            <h3 className="font-bold text-[#075C59] text-base">3. Create Impact</h3>
                            <p className="mt-2 text-xs sm:text-sm leading-relaxed">Projects come to life, benefiting campuses, local neighborhoods, and society.</p>
                        </div>
                    </div>
                </div>

                {/* Bottom Banner Card */}
                <div className="mt-16 grid gap-8 rounded-2xl border border-[#E3EFED] bg-gradient-to-r from-[#F0FAF8] via-white to-[#F0FAF8] px-8 py-10 md:grid-cols-[1fr_1.5fr_auto] md:items-center md:gap-10 md:px-12">
                    <div className="relative text-xl font-bold italic leading-snug text-[#0F8F83]">
                        <span className="absolute -right-2 -top-2 text-2xl text-[#FFD166]">✦</span>
                        "Small student initiatives can spark monumental community change."
                    </div>

                    <div>
                        <h2 className="text-2xl font-bold leading-tight text-[#075C59]">
                            Built by Students, For Students
                        </h2>
                        <p className="mt-2 text-sm leading-relaxed">
                            Aryse serves as an open platform for college community engagement—uniting apps, environmental drives, tech fests, and social welfare under one collaborative roof.
                        </p>
                    </div>

                    <div className="flex items-center justify-start text-5xl text-[#0F8F83] md:justify-center">
                        <FaPaperPlane className="rotate-[-18nd] transform hover:translate-x-1 hover:-translate-y-1 transition-transform" aria-hidden="true" />
                    </div>
                </div>
            </section>
        </div>
    );
}