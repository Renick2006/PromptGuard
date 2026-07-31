import projectService from "./projectService";
import promptService from "./promptService";
import evaluationService from "./evaluationService";

const analyticsService = {

    async getDashboardAnalytics(projects) {

        let totalPrompts = 0;
        let totalEvaluations = 0;

        let quality = 0;
        let clarity = 0;
        let readability = 0;

        for (const project of projects) {

            const prompts =
                await promptService.getPrompts(project.id || project._id);

            totalPrompts += prompts.length;

            for (const prompt of prompts) {

                const evaluations =
                    await evaluationService.getEvaluations(
                        prompt.id || prompt._id
                    );

                totalEvaluations += evaluations.length;

                evaluations.forEach((evaluation) => {

                    quality += evaluation.quality_score;
                    clarity += evaluation.clarity_score;
                    readability += evaluation.readability_score;

                });

            }

        }

        const divisor =
            totalEvaluations === 0 ? 1 : totalEvaluations;

        return {

            totalProjects: projects.length,

            totalPrompts,

            totalEvaluations,

            averageQuality:
                Math.round(quality / divisor),

            averageClarity:
                Math.round(clarity / divisor),

            averageReadability:
                Math.round(readability / divisor),

        };
    },

};

export default analyticsService;