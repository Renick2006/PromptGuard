import api from "./api";

const evaluationService = {
    async evaluatePrompt(promptId) {
        const response = await api.post(
            `/prompt-evaluations/${promptId}`
        );

        return response.data;
    },

    async getEvaluations(promptId) {
        const response = await api.get(
            `/prompt-evaluations/${promptId}`
        );

        return response.data;
    },

    async getEvaluation(evaluationId) {
        const response = await api.get(
            `/prompt-evaluations/evaluation/${evaluationId}`
        );

        return response.data;
    },

    async deleteEvaluation(evaluationId) {
        const response = await api.delete(
            `/prompt-evaluations/evaluation/${evaluationId}`
        );

        return response.data;
    },
};

export default evaluationService;