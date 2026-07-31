import { useEffect, useState } from "react";
import { X, History } from "lucide-react";

import evaluationService from "../../services/evaluationService";

function EvaluationHistoryModal({
    isOpen,
    onClose,
    promptId,
}) {
    const [loading, setLoading] = useState(false);
    const [evaluations, setEvaluations] = useState([]);

    useEffect(() => {
        if (isOpen && promptId) {
            loadHistory();
        }
    }, [isOpen, promptId]);

    async function loadHistory() {
        try {
            setLoading(true);

            const data = await evaluationService.getEvaluations(promptId);

            setEvaluations(data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    }

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-6">

            <div className="w-full max-w-4xl rounded-3xl border border-slate-800 bg-slate-900 p-8 max-h-[90vh] overflow-y-auto">

                <div className="mb-8 flex items-center justify-between">

                    <div className="flex items-center gap-3">

                        <History
                            className="text-blue-400"
                            size={28}
                        />

                        <h2 className="text-3xl font-bold text-white">
                            Evaluation History
                        </h2>

                    </div>

                    <button
                        onClick={onClose}
                        className="text-slate-400 hover:text-white"
                    >
                        <X size={24} />
                    </button>

                </div>

                {loading ? (

                    <div className="py-16 text-center text-slate-400">
                        Loading history...
                    </div>

                ) : evaluations.length === 0 ? (

                    <div className="py-16 text-center text-slate-400">
                        No evaluations yet.
                    </div>

                ) : (

                    <div className="space-y-6">

                        {evaluations.map((evaluation) => {

                            const overall = Math.round(
                                (
                                    evaluation.quality_score +
                                    evaluation.clarity_score +
                                    evaluation.readability_score
                                ) / 3
                            );

                            return (

                                <div
                                    key={evaluation.id || evaluation._id}
                                    className="rounded-2xl border border-slate-800 bg-slate-950 p-6"
                                >

                                    <div className="flex items-center justify-between">

                                        <div>

                                            <h3 className="text-xl font-semibold text-white">
                                                Overall Score
                                            </h3>

                                            <p className="mt-1 text-slate-400">
                                                {new Date(
                                                    evaluation.created_at
                                                ).toLocaleString()}
                                            </p>

                                        </div>

                                        <span className="rounded-full bg-blue-600 px-4 py-2 font-bold text-white">
                                            {overall}/100
                                        </span>

                                    </div>

                                    <div className="mt-6 grid gap-4 md:grid-cols-3">

                                        <div className="rounded-xl bg-slate-800 p-4">
                                            <p className="text-slate-400">
                                                Quality
                                            </p>

                                            <p className="mt-2 text-3xl font-bold text-green-400">
                                                {evaluation.quality_score}
                                            </p>
                                        </div>

                                        <div className="rounded-xl bg-slate-800 p-4">
                                            <p className="text-slate-400">
                                                Clarity
                                            </p>

                                            <p className="mt-2 text-3xl font-bold text-blue-400">
                                                {evaluation.clarity_score}
                                            </p>
                                        </div>

                                        <div className="rounded-xl bg-slate-800 p-4">
                                            <p className="text-slate-400">
                                                Readability
                                            </p>

                                            <p className="mt-2 text-3xl font-bold text-purple-400">
                                                {evaluation.readability_score}
                                            </p>
                                        </div>

                                    </div>

                                </div>

                            );

                        })}

                    </div>

                )}

            </div>

        </div>
    );
}

export default EvaluationHistoryModal;