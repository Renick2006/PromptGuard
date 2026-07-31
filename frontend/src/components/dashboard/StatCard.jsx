function StatCard({
    title,
    value,
    icon: Icon,
    color = "blue",
    subtitle,
}) {
    const colors = {
        blue: "bg-blue-500/10 text-blue-400 border-blue-500/20",
        green: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
        yellow: "bg-amber-500/10 text-amber-400 border-amber-500/20",
        purple: "bg-violet-500/10 text-violet-400 border-violet-500/20",
    };

    return (
        <div className="group rounded-2xl border border-slate-800 bg-slate-900 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-blue-500 hover:shadow-xl">

            <div className="flex items-center justify-between">

                <div>

                    <p className="text-sm text-slate-400">
                        {title}
                    </p>

                    <h2 className="mt-3 text-4xl font-bold text-white">
                        {value}
                    </h2>

                    {subtitle && (
                        <p className="mt-2 text-sm text-slate-500">
                            {subtitle}
                        </p>
                    )}

                </div>

                <div
                    className={`rounded-2xl border p-4 ${colors[color]}`}
                >
                    <Icon className="h-7 w-7" />
                </div>

            </div>

        </div>
    );
}

export default StatCard;