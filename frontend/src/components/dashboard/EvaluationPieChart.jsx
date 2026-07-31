import {
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
    Tooltip,
} from "recharts";

function EvaluationPieChart({ analytics }) {

    const data = [
        {
            name: "Evaluations",
            value: analytics.totalEvaluations,
        },
        {
            name: "Prompts",
            value: analytics.totalPrompts,
        },
        {
            name: "Projects",
            value: analytics.totalProjects,
        },
    ];

    const COLORS = [
        "#3B82F6",
        "#10B981",
        "#8B5CF6",
    ];

    return (
        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">

            <h2 className="mb-6 text-xl font-bold text-white">
                Project Distribution
            </h2>

            <div className="h-80">

                <ResponsiveContainer>

                    <PieChart>

                        <Pie
                            data={data}
                            dataKey="value"
                            outerRadius={100}
                            label
                        >

                            {data.map((entry, index) => (

                                <Cell
                                    key={index}
                                    fill={COLORS[index]}
                                />

                            ))}

                        </Pie>

                        <Tooltip />

                    </PieChart>

                </ResponsiveContainer>

            </div>

        </div>
    );
}

export default EvaluationPieChart;