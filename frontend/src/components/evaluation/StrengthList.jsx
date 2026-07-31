import { CheckCircle2 } from "lucide-react";

function StrengthList({ strengths = [] }) {
    return (
        <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-6">

            <h3 className="mb-5 flex items-center gap-2 text-xl font-semibold text-emerald-400">

                <CheckCircle2 size={22} />

                Strengths

            </h3>

            <div className="space-y-3">

                {strengths.length === 0 ? (

                    <p className="text-slate-400">
                        No strengths available.
                    </p>

                ) : (

                    strengths.map((item, index) => (

                        <div
                            key={index}
                            className="flex gap-3"
                        >

                            <CheckCircle2
                                size={18}
                                className="mt-1 text-emerald-400"
                            />

                            <p className="text-slate-300">
                                {item}
                            </p>

                        </div>

                    ))

                )}

            </div>

        </div>
    );
}

export default StrengthList;