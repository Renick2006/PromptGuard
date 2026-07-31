import { useState } from "react";
import promptService from "../../services/promptService";

function PlaygroundModal({
    isOpen,
    onClose,
    promptId,
}) {
    const [userInput, setUserInput] = useState("");
    const [response, setResponse] = useState("");
    const [loading, setLoading] = useState(false);

    if (!isOpen) return null;

    async function handleGenerate() {
        if (!userInput.trim()) return;

        try {
            setLoading(true);

            const result = await promptService.playground(
                promptId,
                userInput
            );

            setResponse(result.response);
        } catch (err) {
            console.error(err);
            alert("Failed to generate response.");
        } finally {
            setLoading(false);
        }
    }

    function handleClose() {
        setUserInput("");
        setResponse("");
        onClose();
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">

            <div className="w-full max-w-4xl rounded-2xl border border-slate-700 bg-slate-900 p-8">

                <div className="flex items-center justify-between">

                    <h2 className="text-2xl font-bold text-white">
                        Prompt Playground
                    </h2>

                    <button
                        onClick={handleClose}
                        className="text-slate-400 hover:text-white text-2xl"
                    >
                        ×
                    </button>

                </div>

                <div className="mt-6">

                    <label className="mb-2 block text-sm font-medium text-slate-300">
                        Test Input
                    </label>

                    <textarea
                        rows={6}
                        value={userInput}
                        onChange={(e) => setUserInput(e.target.value)}
                        placeholder="Enter your test input..."
                        className="w-full rounded-xl border border-slate-700 bg-slate-800 p-4 text-white outline-none focus:border-blue-500"
                    />

                </div>

                <div className="mt-6">

                    <button
                        onClick={handleGenerate}
                        disabled={loading}
                        className="rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700 disabled:opacity-50"
                    >
                        {loading ? "Generating..." : "Generate Response"}
                    </button>

                </div>

                {response && (

                    <div className="mt-8">

                        <h3 className="mb-3 text-lg font-semibold text-white">
                            AI Response
                        </h3>

                        <div className="max-h-96 overflow-auto rounded-xl bg-slate-800 p-5">

                            <pre className="whitespace-pre-wrap text-slate-300">
                                {response}
                            </pre>

                        </div>

                    </div>

                )}

            </div>

        </div>
    );
}

export default PlaygroundModal;