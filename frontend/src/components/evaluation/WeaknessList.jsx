import { AlertTriangle } from "lucide-react";

function WeaknessList({ weaknesses = [] }) {
    return (
        <div className="rounded-2xl border border-amber-500/20 bg-amber-500/5 p-6">

            <h3 className="mb-5 flex items-center gap-2 text-xl font-semibold text-amber-400">

                <AlertTriangle size={22} />

                Weaknesses

            </h3>

            <div className="space-y-3">

                {weaknesses.length === 0 ? (

                    <p className="text-slate-400">
                        No weaknesses found.
                    </p>

                ) : (

                    weaknesses.map((item, index) => (

                        <div
                            key={index}
                            className="flex gap-3"
                        >

                            <AlertTriangle
                                size={18}
                                className="mt-1 text-amber-400"
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

export default WeaknessList;