function ScoreCard({
    title,
    value,
    color = "blue",
}) {
    const colors = {
        blue: {
            text: "text-blue-400",
            bg: "bg-blue-500",
        },
        green: {
            text: "text-emerald-400",
            bg: "bg-emerald-500",
        },
        yellow: {
            text: "text-amber-400",
            bg: "bg-amber-500",
        },
        purple: {
            text: "text-violet-400",
            bg: "bg-violet-500",
        },
    };

    const percentage = Math.max(0, Math.min(100, value ?? 0));

    return (
        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">

            <div className="flex items-center justify-between">

                <h3 className="text-sm font-medium text-slate-400">
                    {title}
                </h3>

                <span
                    className={`text-2xl font-bold ${colors[color].text}`}
                >
                    {percentage}%
                </span>

            </div>

            <div className="mt-5 h-3 overflow-hidden rounded-full bg-slate-800">

                <div
                    className={`${colors[color].bg} h-full rounded-full transition-all duration-700`}
                    style={{
                        width: `${percentage}%`,
                    }}
                />

            </div>

        </div>
    );
}

export default ScoreCard;