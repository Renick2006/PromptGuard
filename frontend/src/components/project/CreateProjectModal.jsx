import { useState } from "react";
import { X } from "lucide-react";
import projectService from "../../services/projectService";

function CreateProjectModal({
    isOpen,
    onClose,
    onProjectCreated,
}) {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [loading, setLoading] = useState(false);

    if (!isOpen) return null;

    async function handleSubmit(e) {
        e.preventDefault();

        if (!name.trim()) return;

        try {
            setLoading(true);

            await projectService.createProject({
                name,
                description,
            });

            setName("");
            setDescription("");

            onProjectCreated();
            onClose();
        } catch (err) {
            console.error(err);
            alert("Failed to create project.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">

            <div className="w-full max-w-lg rounded-3xl border border-slate-700 bg-slate-900 p-8 shadow-2xl">

                <div className="mb-6 flex items-center justify-between">

                    <h2 className="text-2xl font-bold text-white">
                        Create Project
                    </h2>

                    <button
                        onClick={onClose}
                        className="rounded-lg p-2 text-slate-400 hover:bg-slate-800 hover:text-white"
                    >
                        <X size={22} />
                    </button>

                </div>

                <form
                    onSubmit={handleSubmit}
                    className="space-y-5"
                >

                    <div>

                        <label className="mb-2 block text-sm text-slate-300">
                            Project Name
                        </label>

                        <input
                            type="text"
                            required
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full rounded-xl border border-slate-700 bg-slate-800 p-3 text-white outline-none focus:border-blue-500"
                            placeholder="Enter project name"
                        />

                    </div>

                    <div>

                        <label className="mb-2 block text-sm text-slate-300">
                            Description
                        </label>

                        <textarea
                            rows={4}
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="w-full rounded-xl border border-slate-700 bg-slate-800 p-3 text-white outline-none focus:border-blue-500"
                            placeholder="Enter description..."
                        />

                    </div>

                    <div className="flex justify-end gap-3 pt-3">

                        <button
                            type="button"
                            onClick={onClose}
                            className="rounded-xl border border-slate-700 px-5 py-3 text-slate-300 hover:bg-slate-800"
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            disabled={loading}
                            className="rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700 disabled:opacity-50"
                        >
                            {loading ? "Creating..." : "Create Project"}
                        </button>

                    </div>

                </form>

            </div>

        </div>
    );
}

export default CreateProjectModal;