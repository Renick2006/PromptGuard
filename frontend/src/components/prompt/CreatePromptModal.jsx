import { useState } from "react";
import { X } from "lucide-react";
import promptService from "../../services/promptService";

function CreatePromptModal({
    isOpen,
    onClose,
    projectId,
    onPromptCreated,
}) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [content, setContent] = useState("");
    const [loading, setLoading] = useState(false);

    if (!isOpen) return null;

    async function handleSubmit(e) {
        e.preventDefault();

        if (!title.trim() || !content.trim()) return;

        try {
            setLoading(true);

            await promptService.createPrompt({
                project_id: projectId,
                title,
                description,
                content,
            });

            setTitle("");
            setDescription("");
            setContent("");

            onPromptCreated();
            onClose();
        } catch (error) {
            console.error(error);
            alert("Failed to create prompt.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">

            <div className="w-full max-w-3xl rounded-3xl border border-slate-700 bg-slate-900 p-8 shadow-2xl">

                <div className="mb-6 flex items-center justify-between">

                    <h2 className="text-2xl font-bold text-white">
                        Create Prompt
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
                            Prompt Title
                        </label>

                        <input
                            type="text"
                            value={title}
                            required
                            onChange={(e) => setTitle(e.target.value)}
                            className="w-full rounded-xl border border-slate-700 bg-slate-800 p-3 text-white outline-none focus:border-blue-500"
                            placeholder="Resume Generator"
                        />

                    </div>

                    <div>

                        <label className="mb-2 block text-sm text-slate-300">
                            Description
                        </label>

                        <input
                            type="text"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="w-full rounded-xl border border-slate-700 bg-slate-800 p-3 text-white outline-none focus:border-blue-500"
                            placeholder="Short description"
                        />

                    </div>

                    <div>

                        <label className="mb-2 block text-sm text-slate-300">
                            Prompt Content
                        </label>

                        <textarea
                            rows={10}
                            value={content}
                            required
                            onChange={(e) => setContent(e.target.value)}
                            className="w-full rounded-xl border border-slate-700 bg-slate-800 p-3 text-white outline-none focus:border-blue-500"
                            placeholder="Write your AI prompt here..."
                        />

                    </div>

                    <div className="flex justify-end gap-3 pt-2">

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
                            {loading ? "Creating..." : "Create Prompt"}
                        </button>

                    </div>

                </form>

            </div>

        </div>
    );
}

export default CreatePromptModal;