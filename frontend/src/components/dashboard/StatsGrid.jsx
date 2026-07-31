import {
    FolderKanban,
    FileText,
    Star,
    BarChart3,
} from "lucide-react";

import StatCard from "./StatCard";

function StatsGrid({ projects = [] }) {
    const totalProjects = projects.length;

    // These will become dynamic later
    const totalPrompts = 0;
    const averageScore = "--";
    const totalEvaluations = 0;

    return (
        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">

            <StatCard
                title="Projects"
                value={totalProjects}
                subtitle="Active Projects"
                icon={FolderKanban}
                color="blue"
            />

            <StatCard
                title="Prompts"
                value={totalPrompts}
                subtitle="Stored Prompts"
                icon={FileText}
                color="green"
            />

            <StatCard
                title="Average Score"
                value={averageScore}
                subtitle="AI Quality Score"
                icon={Star}
                color="yellow"
            />

            <StatCard
                title="Evaluations"
                value={totalEvaluations}
                subtitle="Completed Reviews"
                icon={BarChart3}
                color="purple"
            />

        </div>
    );
}

export default StatsGrid;