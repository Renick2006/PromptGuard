function AnalyticsCard({
    title,
    value,
    color = "blue",
}) {
    const colors = {
        blue: "text-blue-400",
        green: "text-emerald-400",
        purple: "text-violet-400",
        yellow: "text-amber-400",
        red: "text-red-400",
    };

    return (
        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">

            <h3 className="text-sm text-slate-400">
                {title}
            </h3>

            <h2
                className={`mt-4 text-4xl font-bold ${colors[color]}`}
            >
                {value}
            </h2>

        </div>
    );
}

export default AnalyticsCard;