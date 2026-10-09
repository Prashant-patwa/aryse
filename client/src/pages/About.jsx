import { FaLeaf, FaLightbulb, FaPaperPlane, FaUsers } from "react-icons/fa";

export default function About() {
    return (
        <div className="bg-white text-[#587887]">
            <section className="bg-[#F0FAF8]">
                <div className="mx-auto grid max-w-7xl items-center gap-10 px-6 py-14 md:grid-cols-2 md:gap-12 md:px-10 md:py-20">
                    <div>
                        <p className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-[#0F8F83]">
                            About Us
                        </p>
                        <h1 className="max-w-xl text-4xl font-bold leading-[1.08] tracking-tight text-[#075C59] sm:text-5xl lg:text-6xl">
                            A platform for
                            <br />
                            student ideas,
                            <br />
                            <span className="text-[#0F8F83]">real world impact.</span>
                        </h1>
                        <p className="mt-6 max-w-lg text-base leading-7">
                            Aryse is built for students who want to turn their ideas into real
                            projects — and make a difference, together.
                        </p>
                    </div>

                    <div className="relative">
                        <span className="absolute right-12 top-4 h-4 w-4 rounded-full bg-[#FFD166]" />
                        {/* Replace this placeholder URL with the final Aryse illustration */}
                        <img
                            src="https://placehold.co/700x400/E0F5F1/0F8F83?text=Aryse+Student+Illustration"
                            alt="Aryse students looking toward a mountain with a flag"
                            className="aspect-[7/4] w-full rounded-2xl object-cover"
                        />
                    </div>
                </div>
            </section>

            <section className="mx-auto max-w-7xl px-6 py-14 md:px-10 md:py-20">
                <div className="grid gap-12 md:grid-cols-[0.9fr_1.6fr] md:items-center md:gap-16">
                    <div>
                        <p className="mb-3 text-sm font-bold text-[#0F8F83]">Our Mission</p>
                        <h2 className="max-w-md text-3xl font-bold leading-tight text-[#075C59] md:text-4xl">
                            Give students a platform to bring their ideas to life.
                        </h2>
                        <p className="mt-5 max-w-md leading-7">
                            We help students showcase their projects, get support, and build a
                            better tomorrow — together.
                        </p>
                    </div>

                    <div className="grid gap-8 sm:grid-cols-3">
                        <div>
                            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[#DDF4F0] text-2xl text-[#0F8F83]">
                                <FaLightbulb aria-hidden="true" />
                            </div>
                            <h3 className="font-bold text-[#075C59]">Share</h3>
                            <p className="mt-2 text-sm leading-6">Your ideas and projects</p>
                        </div>
                        <div>
                            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[#DDF4F0] text-2xl text-[#0F8F83]">
                                <FaUsers aria-hidden="true" />
                            </div>
                            <h3 className="font-bold text-[#075C59]">Get Support</h3>
                            <p className="mt-2 text-sm leading-6">From a community that cares</p>
                        </div>
                        <div>
                            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[#DDF4F0] text-2xl text-[#0F8F83]">
                                <FaLeaf aria-hidden="true" />
                            </div>
                            <h3 className="font-bold text-[#075C59]">Create Impact</h3>
                            <p className="mt-2 text-sm leading-6">For a brighter future</p>
                        </div>
                    </div>
                </div>

                <div className="mt-14 grid gap-10 rounded-2xl border border-[#E3EFED] bg-[#F0FAF8] px-7 py-9 md:grid-cols-[0.8fr_1.2fr_0.5fr] md:items-center md:gap-8 md:px-10 md:py-10">
                    <div className="relative max-w-[180px] text-2xl font-medium italic leading-tight text-[#0F8F83]">
                        <span className="absolute -right-2 top-1 text-2xl text-[#FFD166]">✦</span>
                        Small ideas
                        <br />
                        can create
                        <br />
                        big change
                    </div>

                    <div>
                        <h2 className="text-3xl font-bold leading-tight text-[#075C59]">
                            Built by Students,
                            <br />
                            For Students
                        </h2>
                        <p className="mt-4 max-w-lg leading-7">
                            Aryse is a space where student creativity, skills and support come
                            together.
                        </p>
                    </div>

                    <div className="relative flex items-center justify-start text-5xl text-[#0F8F83] md:justify-center">
                        <span className="absolute left-0 right-0 top-1/2 border-t border-dashed border-[#0F8F83] md:left-1/4 md:right-1/4" />
                        <FaPaperPlane className="relative rotate-[-18deg]" aria-hidden="true" />
                    </div>
                </div>
            </section>
        </div>
    );
}