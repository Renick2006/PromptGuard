import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import DashboardLayout from "../components/layout/DashboardLayout";
import HeroSection from "../components/dashboard/HeroSection";
import StatsGrid from "../components/dashboard/StatsGrid";
import AnalyticsCard from "../components/dashboard/AnalyticsCard";
import QualityChart from "../components/dashboard/QualityChart";
import EvaluationPieChart from "../components/dashboard/EvaluationPieChart";
import CreateProjectModal from "../components/project/CreateProjectModal";

import { useAuth } from "../context/AuthContext";
import projectService from "../services/projectService";
import analyticsService from "../services/analyticsService";

function Dashboard() {
    const { user, loading } = useAuth();
    const navigate = useNavigate();

    const [projects, setProjects] = useState([]);
    const [loadingProjects, setLoadingProjects] = useState(true);
    const [showCreateModal, setShowCreateModal] = useState(false);

    const [analytics, setAnalytics] = useState({
        totalProjects: 0,
        totalPrompts: 0,
        totalEvaluations: 0,
        averageQuality: 0,
        averageClarity: 0,
        averageReadability: 0,
    });

    useEffect(() => {
        loadDashboard();
    }, []);

    async function loadDashboard() {
        try {
            setLoadingProjects(true);

            const projectData = await projectService.getProjects();

            setProjects(projectData);

            const analyticsData =
                await analyticsService.getDashboardAnalytics(projectData);

            setAnalytics(analyticsData);
        } catch (error) {
            console.error(error);
        } finally {
            setLoadingProjects(false);
        }
    }

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-950">
                <p className="text-lg text-white">
                    Loading dashboard...
                </p>
            </div>
        );
    }

    return (
        <DashboardLayout username={user?.username || "User"}>
            <CreateProjectModal
                isOpen={showCreateModal}
                onClose={() => setShowCreateModal(false)}
                onProjectCreated={loadDashboard}
            />

            <div className="space-y-8">

                <HeroSection
                    username={user?.username}
                    onCreateProject={() => setShowCreateModal(true)}
                />

                <StatsGrid projects={projects} />

                <section>
                    <h2 className="mb-6 text-2xl font-bold text-white">
                        Analytics
                    </h2>

                    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">

                        <AnalyticsCard
                            title="Projects"
                            value={analytics.totalProjects}
                            color="blue"
                        />

                        <AnalyticsCard
                            title="Prompts"
                            value={analytics.totalPrompts}
                            color="green"
                        />

                        <AnalyticsCard
                            title="Evaluations"
                            value={analytics.totalEvaluations}
                            color="purple"
                        />

                        <AnalyticsCard
                            title="Average Quality"
                            value={`${analytics.averageQuality}%`}
                            color="green"
                        />

                        <AnalyticsCard
                            title="Average Clarity"
                            value={`${analytics.averageClarity}%`}
                            color="blue"
                        />

                        <AnalyticsCard
                            title="Average Readability"
                            value={`${analytics.averageReadability}%`}
                            color="yellow"
                        />

                    </div>
                </section>

                <section>

                    <h2 className="mb-6 text-2xl font-bold text-white">
                        Analytics Charts
                    </h2>

                    <div className="grid gap-6 xl:grid-cols-2">

                        <QualityChart analytics={analytics} />

                        <EvaluationPieChart analytics={analytics} />

                    </div>

                </section>

                <section>

                    <div className="mb-6 flex items-center justify-between">

                        <h2 className="text-2xl font-bold text-white">
                            Recent Projects
                        </h2>

                        <button
                            onClick={() => setShowCreateModal(true)}
                            className="text-blue-400 hover:text-blue-300"
                        >
                            + New Project
                        </button>

                    </div>

                    {loadingProjects ? (

                        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-10 text-center text-slate-400">
                            Loading projects...
                        </div>

                    ) : projects.length === 0 ? (

                        <div className="rounded-2xl border border-dashed border-slate-700 bg-slate-900 p-12 text-center">

                            <h3 className="text-2xl font-semibold text-white">
                                No projects yet
                            </h3>

                            <p className="mt-3 text-slate-400">
                                Click <strong>Create New Project</strong> to get started.
                            </p>

                        </div>

                    ) : (

                        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">

                            {projects.map((project) => (

                                <div
                                    key={project.id || project._id}
                                    className="rounded-2xl border border-slate-800 bg-slate-900 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-blue-500 hover:shadow-xl"
                                >

                                    <div className="mb-4 flex items-center justify-between">

                                        <h3 className="text-xl font-bold text-white">
                                            {project.name}
                                        </h3>

                                        <span className="rounded-full bg-blue-500/10 px-3 py-1 text-xs text-blue-400">
                                            Active
                                        </span>

                                    </div>

                                    <p className="min-h-[50px] text-slate-400">
                                        {project.description ||
                                            "No description provided."}
                                    </p>

                                    <button
                                        onClick={() =>
                                            navigate(
                                                `/projects/${project.id || project._id}`
                                            )
                                        }
                                        className="mt-6 w-full rounded-xl bg-slate-800 py-3 font-medium text-white transition hover:bg-blue-600"
                                    >
                                        Open Project
                                    </button>

                                </div>

                            ))}

                        </div>

                    )}

                </section>

            </div>

        </DashboardLayout>
    );
}

export default Dashboard;