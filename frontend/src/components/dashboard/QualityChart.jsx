import {
    ResponsiveContainer,
    BarChart,
    Bar,
    CartesianGrid,
    XAxis,
    YAxis,
    Tooltip,
} from "recharts";

function QualityChart({ analytics }) {
    const data = [
        {
            name: "Quality",
            score: analytics.averageQuality,
        },
        {
            name: "Clarity",
            score: analytics.averageClarity,
        },
        {
            name: "Readability",
            score: analytics.averageReadability,
        },
    ];

    return (
        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">

            <h2 className="mb-6 text-xl font-bold text-white">
                AI Evaluation Scores
            </h2>

            <div className="h-80">

                <ResponsiveContainer width="100%" height="100%">

                    <BarChart data={data}>

                        <CartesianGrid strokeDasharray="3 3" stroke="#334155" />

                        <XAxis dataKey="name" stroke="#94A3B8" />

                        <YAxis domain={[0, 100]} stroke="#94A3B8" />

                        <Tooltip />

                        <Bar
                            dataKey="score"
                            radius={[8, 8, 0, 0]}
                        />

                    </BarChart>

                </ResponsiveContainer>

            </div>

        </div>
    );
}

export default QualityChart;