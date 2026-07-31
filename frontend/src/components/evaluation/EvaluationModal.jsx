import { useEffect, useState } from "react";
import { X, Loader2 } from "lucide-react";

import evaluationService from "../../services/evaluationService";

import ScoreCard from "./ScoreCard";
import StrengthList from "./StrengthList";
import WeaknessList from "./WeaknessList";
import ImprovedPrompt from "./ImprovedPrompt";

function EvaluationModal({
    isOpen,
    onClose,
    promptId,
}) {
    const [loading, setLoading] = useState(false);
    const [evaluation, setEvaluation] = useState(null);
    const [error, setError] = useState("");

    useEffect(() => {
        if (!isOpen || !promptId) return;

        loadEvaluation();
    }, [isOpen, promptId]);

    async function loadEvaluation() {
        try {
            setLoading(true);
            setError("");

            await evaluationService.evaluatePrompt(promptId);

            const evaluations =
                await evaluationService.getEvaluations(promptId);

            if (evaluations.length === 0) {
                setEvaluation(null);
            } else {
                setEvaluation(evaluations[0]);
            }
        } catch (err) {
            console.error(err);
            setError("Failed to evaluate prompt.");
        } finally {
            setLoading(false);
        }
    }

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-6">

            <div className="relative max-h-[90vh] w-full max-w-5xl overflow-y-auto rounded-3xl bg-slate-950 border border-slate-800 p-8">

                <button
                    onClick={onClose}
                    className="absolute right-6 top-6 text-slate-400 hover:text-white"
                >
                    <X size={24} />
                </button>

                <h2 className="mb-8 text-3xl font-bold text-white">
                    AI Prompt Evaluation
                </h2>

                {loading && (
                    <div className="flex flex-col items-center justify-center py-24">

                        <Loader2
                            className="animate-spin text-blue-500"
                            size={50}
                        />

                        <p className="mt-6 text-slate-400">
                            AI is analyzing your prompt...
                        </p>

                    </div>
                )}

                {!loading && error && (
                    <div className="rounded-xl bg-red-500/10 p-6 text-red-400">
                        {error}
                    </div>
                )}

                {!loading && evaluation && (

                    <div className="space-y-8">

                        <div className="grid gap-6 md:grid-cols-3">

                            <ScoreCard
                                title="Quality"
                                value={evaluation.quality_score}
                                color="green"
                            />

                            <ScoreCard
                                title="Clarity"
                                value={evaluation.clarity_score}
                                color="blue"
                            />

                            <ScoreCard
                                title="Readability"
                                value={evaluation.readability_score}
                                color="purple"
                            />

                        </div>

                        <div className="grid gap-6 md:grid-cols-2">

                            <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">

                                <h3 className="mb-4 text-xl font-semibold text-white">
                                    Estimated Tokens
                                </h3>

                                <p className="text-4xl font-bold text-blue-400">
                                    {evaluation.estimated_tokens}
                                </p>

                            </div>

                            <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">

                                <h3 className="mb-4 text-xl font-semibold text-white">
                                    Estimated Cost
                                </h3>

                                <p className="text-4xl font-bold text-green-400">
                                    ${evaluation.estimated_cost}
                                </p>

                            </div>

                        </div>

                        <StrengthList
                            strengths={evaluation.strengths}
                        />

                        <WeaknessList
                            weaknesses={evaluation.weaknesses}
                        />

                        <ImprovedPrompt
                            prompt={evaluation.improved_prompt}
                        />

                    </div>

                )}

            </div>

        </div>
    );
}

export default EvaluationModal;