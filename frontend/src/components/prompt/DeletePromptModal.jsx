import { Trash2, X } from "lucide-react";
import { useState } from "react";

import promptService from "../../services/promptService";

function DeletePromptModal({
    isOpen,
    onClose,
    prompt,
    onDeleted,
}) {
    const [loading, setLoading] = useState(false);

    if (!isOpen || !prompt) return null;

    async function handleDelete() {
        try {
            setLoading(true);

            await promptService.deletePrompt(prompt.id || prompt._id);

            await onDeleted();

            onClose();
        } catch (err) {
            console.error(err);
            alert("Failed to delete prompt.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-6">

            <div className="w-full max-w-md rounded-3xl border border-slate-800 bg-slate-900 p-8">

                <div className="mb-6 flex items-center justify-between">

                    <div className="flex items-center gap-3">

                        <Trash2
                            className="text-red-500"
                            size={28}
                        />

                        <h2 className="text-2xl font-bold text-white">
                            Delete Prompt
                        </h2>

                    </div>

                    <button
                        onClick={onClose}
                        className="text-slate-400 hover:text-white"
                    >
                        <X size={22} />
                    </button>

                </div>

                <p className="text-slate-300">
                    Are you sure you want to delete
                </p>

                <p className="mt-2 text-lg font-semibold text-white">
                    "{prompt.title}"
                </p>

                <p className="mt-4 text-sm text-red-400">
                    This action cannot be undone.
                </p>

                <div className="mt-8 flex justify-end gap-3">

                    <button
                        onClick={onClose}
                        className="rounded-lg bg-slate-700 px-5 py-2 text-white hover:bg-slate-600"
                    >
                        Cancel
                    </button>

                    <button
                        onClick={handleDelete}
                        disabled={loading}
                        className="rounded-lg bg-red-600 px-5 py-2 text-white hover:bg-red-700 disabled:opacity-50"
                    >
                        {loading ? "Deleting..." : "Delete Prompt"}
                    </button>

                </div>

            </div>

        </div>
    );
}

export default DeletePromptModal;