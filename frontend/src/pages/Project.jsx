import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Plus } from "lucide-react";

import DashboardLayout from "../components/layout/DashboardLayout";
import CreatePromptModal from "../components/prompt/CreatePromptModal";
import EditPromptModal from "../components/prompt/EditPromptModal";
import DeletePromptModal from "../components/prompt/DeletePromptModal";

import EvaluationModal from "../components/evaluation/EvaluationModal";
import EvaluationHistoryModal from "../components/evaluation/EvaluationHistoryModal";
import PlaygroundModal from "../components/playground/PlaygroundModal";

import { useAuth } from "../context/AuthContext";
import projectService from "../services/projectService";
import promptService from "../services/promptService";

function Project() {
    const { projectId } = useParams();
    const { user } = useAuth();

    const [project, setProject] = useState(null);
    const [prompts, setPrompts] = useState([]);
    const [loading, setLoading] = useState(true);

    // Create
    const [showCreateModal, setShowCreateModal] = useState(false);

    // Edit
    const [showEditModal, setShowEditModal] = useState(false);
    const [selectedPrompt, setSelectedPrompt] = useState(null);

    // Delete
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [promptToDelete, setPromptToDelete] = useState(null);

    // Evaluation
    const [showEvaluation, setShowEvaluation] = useState(false);
    const [selectedPromptId, setSelectedPromptId] = useState(null);

    // History
    const [showHistoryModal, setShowHistoryModal] = useState(false);
    const [historyPromptId, setHistoryPromptId] = useState(null);

    // Playground
    const [showPlayground, setShowPlayground] = useState(false);
    const [playgroundPromptId, setPlaygroundPromptId] = useState(null);

    useEffect(() => {
        loadData();
    }, [projectId]);

    async function loadData() {
        try {
            setLoading(true);

            const [projectData, promptData] = await Promise.all([
                projectService.getProject(projectId),
                promptService.getPrompts(projectId),
            ]);

            setProject(projectData);
            setPrompts(promptData);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    function handleEvaluate(promptId) {
        setSelectedPromptId(promptId);
        setShowEvaluation(true);
    }

    function handleEdit(prompt) {
        setSelectedPrompt(prompt);
        setShowEditModal(true);
    }

    function handleDelete(prompt) {
        setPromptToDelete(prompt);
        setShowDeleteModal(true);
    }

    function handleHistory(promptId) {
        setHistoryPromptId(promptId);
        setShowHistoryModal(true);
    }

    function handlePlayground(promptId) {
        setPlaygroundPromptId(promptId);
        setShowPlayground(true);
    }

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-950">
                <p className="text-lg text-white">Loading project...</p>
            </div>
        );
    }

    return (
        <DashboardLayout username={user?.username || "User"}>

            <CreatePromptModal
                isOpen={showCreateModal}
                onClose={() => setShowCreateModal(false)}
                projectId={projectId}
                onPromptCreated={loadData}
            />

            <EditPromptModal
                isOpen={showEditModal}
                onClose={() => setShowEditModal(false)}
                prompt={selectedPrompt}
                onPromptUpdated={loadData}
            />

            <DeletePromptModal
                isOpen={showDeleteModal}
                onClose={() => setShowDeleteModal(false)}
                prompt={promptToDelete}
                onDeleted={loadData}
            />

            <EvaluationModal
                isOpen={showEvaluation}
                onClose={() => setShowEvaluation(false)}
                promptId={selectedPromptId}
            />

            <EvaluationHistoryModal
                isOpen={showHistoryModal}
                onClose={() => setShowHistoryModal(false)}
                promptId={historyPromptId}
            />

            <PlaygroundModal
                isOpen={showPlayground}
                onClose={() => setShowPlayground(false)}
                promptId={playgroundPromptId}
            />

            <div className="space-y-8">

                <div className="rounded-3xl border border-slate-800 bg-slate-900 p-8">

                    <div className="flex items-center justify-between">

                        <div>

                            <h1 className="text-4xl font-bold text-white">
                                {project?.name}
                            </h1>

                            <p className="mt-4 text-slate-400">
                                {project?.description || "No description provided."}
                            </p>

                        </div>

                        <button
                            onClick={() => setShowCreateModal(true)}
                            className="flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-700"
                        >
                            <Plus size={18} />
                            New Prompt
                        </button>

                    </div>

                </div>

                <section>

                    <div className="mb-6 flex items-center justify-between">

                        <h2 className="text-2xl font-bold text-white">
                            Prompts
                        </h2>

                        <span className="text-slate-400">
                            {prompts.length} Prompt{prompts.length !== 1 ? "s" : ""}
                        </span>

                    </div>

                    {prompts.length === 0 ? (

                        <div className="rounded-3xl border border-dashed border-slate-700 bg-slate-900 p-16 text-center">

                            <h3 className="text-2xl font-semibold text-white">
                                No prompts yet
                            </h3>

                            <p className="mt-3 text-slate-400">
                                Create your first prompt to start evaluating it with AI.
                            </p>

                        </div>

                    ) : (

                        <div className="grid gap-6">

                            {prompts.map((prompt) => (

                                <div
                                    key={prompt.id || prompt._id}
                                    className="rounded-2xl border border-slate-800 bg-slate-900 p-6 transition hover:border-blue-500"
                                >

                                    <div className="flex items-center justify-between">

                                        <div>

                                            <h3 className="text-xl font-semibold text-white">
                                                {prompt.title}
                                            </h3>

                                            <p className="mt-2 text-slate-400">
                                                {prompt.description || "No description"}
                                            </p>

                                        </div>

                                        <span className="rounded-full bg-blue-500/10 px-3 py-1 text-sm text-blue-400">
                                            v{prompt.version}
                                        </span>

                                    </div>

                                    <div className="mt-5 rounded-xl bg-slate-800 p-4">

                                        <pre className="whitespace-pre-wrap text-sm text-slate-300">
                                            {prompt.content}
                                        </pre>

                                    </div>

                                    <div className="mt-6 flex flex-wrap gap-3">

                                        <button
                                            onClick={() => handleEvaluate(prompt.id || prompt._id)}
                                            className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
                                        >
                                            Evaluate
                                        </button>

                                        <button
                                            onClick={() => handlePlayground(prompt.id || prompt._id)}
                                            className="rounded-lg bg-emerald-600 px-4 py-2 text-white hover:bg-emerald-700"
                                        >
                                            Playground
                                        </button>

                                        <button
                                            onClick={() => handleHistory(prompt.id || prompt._id)}
                                            className="rounded-lg bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700"
                                        >
                                            History
                                        </button>

                                        <button
                                            onClick={() => handleEdit(prompt)}
                                            className="rounded-lg bg-slate-700 px-4 py-2 text-white hover:bg-slate-600"
                                        >
                                            Edit
                                        </button>

                                        <button
                                            onClick={() => handleDelete(prompt)}
                                            className="rounded-lg bg-red-600 px-4 py-2 text-white hover:bg-red-700"
                                        >
                                            Delete
                                        </button>

                                    </div>

                                </div>

                            ))}

                        </div>

                    )}

                </section>

            </div>

        </DashboardLayout>
    );
}

export default Project;