import { Copy } from "lucide-react";

function ImprovedPrompt({ prompt = "" }) {

    async function copyPrompt() {
        try {
            await navigator.clipboard.writeText(prompt);
            alert("Prompt copied successfully!");
        } catch {
            alert("Failed to copy prompt.");
        }
    }

    return (
        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">

            <div className="mb-5 flex items-center justify-between">

                <h3 className="text-xl font-semibold text-white">
                    Improved Prompt
                </h3>

                <button
                    onClick={copyPrompt}
                    className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
                >
                    <Copy size={18} />
                    Copy
                </button>

            </div>

            <div className="rounded-xl bg-slate-800 p-5">

                <pre className="whitespace-pre-wrap text-slate-300">
                    {prompt}
                </pre>

            </div>

        </div>
    );
}

export default ImprovedPrompt;