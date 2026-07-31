import { Plus, Sparkles } from "lucide-react";

function HeroSection({
    username = "User",
    onCreateProject,
}) {
    const hour = new Date().getHours();

    let greeting = "Good Evening";

    if (hour < 12) greeting = "Good Morning";
    else if (hour < 18) greeting = "Good Afternoon";

    return (
        <section className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-700 p-10 shadow-2xl">

            <div className="absolute -top-16 -right-16 h-52 w-52 rounded-full bg-white/10 blur-3xl"></div>
            <div className="absolute -bottom-20 left-10 h-40 w-40 rounded-full bg-white/5 blur-3xl"></div>

            <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">

                <div>

                    <div className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-white text-sm mb-5">
                        <Sparkles className="w-4 h-4" />
                        AI Powered Prompt Engineering
                    </div>

                    <h1 className="text-5xl font-bold text-white leading-tight">
                        {greeting},{" "}
                        <span className="text-yellow-300">
                            {username}
                        </span>{" "}
                        👋
                    </h1>

                    <p className="mt-5 text-blue-100 text-lg max-w-2xl">
                        Build, organize and evaluate AI prompts with intelligent
                        analytics, quality scoring and project management.
                    </p>

                </div>

                <button
                    onClick={onCreateProject}
                    className="inline-flex items-center justify-center gap-3 rounded-2xl bg-white px-7 py-4 font-semibold text-blue-700 shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl"
                >
                    <Plus className="w-5 h-5" />

                    Create New Project
                </button>

            </div>

        </section>
    );
}

export default HeroSection; 