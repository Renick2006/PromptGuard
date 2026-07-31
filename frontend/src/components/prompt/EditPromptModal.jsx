import { useEffect, useState } from "react";
import { X } from "lucide-react";

import promptService from "../../services/promptService";

function EditPromptModal({
    isOpen,
    onClose,
    prompt,
    onPromptUpdated,
}) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [content, setContent] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (prompt) {
            setTitle(prompt.title || "");
            setDescription(prompt.description || "");
            setContent(prompt.content || "");
        }
    }, [prompt]);

    async function handleSubmit(e) {
        e.preventDefault();

        try {
            setLoading(true);

            await promptService.updatePrompt(
                prompt.id || prompt._id,
                {
                    title,
                    description,
                    content,
                }
            );

            await onPromptUpdated();

            onClose();
        } catch (err) {
            console.error(err);
            alert("Failed to update prompt.");
        } finally {
            setLoading(false);
        }
    }

    if (!isOpen || !prompt) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-6">

            <div className="w-full max-w-3xl rounded-3xl border border-slate-800 bg-slate-900 p-8">

                <div className="mb-6 flex items-center justify-between">

                    <h2 className="text-3xl font-bold text-white">
                        Edit Prompt
                    </h2>

                    <button
                        onClick={onClose}
                        className="text-slate-400 hover:text-white"
                    >
                        <X size={24} />
                    </button>

                </div>

                <form
                    onSubmit={handleSubmit}
                    className="space-y-5"
                >

                    <input
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Prompt Title"
                        className="w-full rounded-xl bg-slate-800 p-4 text-white outline-none"
                        required
                    />

                    <input
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Description"
                        className="w-full rounded-xl bg-slate-800 p-4 text-white outline-none"
                    />

                    <textarea
                        rows={10}
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        placeholder="Prompt..."
                        className="w-full rounded-xl bg-slate-800 p-4 text-white outline-none"
                        required
                    />

                    <button
                        disabled={loading}
                        className="rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700 disabled:opacity-50"
                    >
                        {loading ? "Updating..." : "Update Prompt"}
                    </button>

                </form>

            </div>

        </div>
    );
}

export default EditPromptModal;