import api from "./api";

const promptService = {
    async getPrompts(projectId) {
        const response = await api.get(`/prompts/project/${projectId}`);
        return response.data;
    },

    async getPrompt(promptId) {
        const response = await api.get(`/prompts/${promptId}`);
        return response.data;
    },

    async createPrompt(promptData) {
        const response = await api.post("/prompts", promptData);
        return response.data;
    },

    async updatePrompt(promptId, promptData) {
        const response = await api.patch(
            `/prompts/${promptId}`,
            promptData
        );

        return response.data;
    },

    async deletePrompt(promptId) {
        const response = await api.delete(
            `/prompts/${promptId}`
        );

        return response.data;
    },

    async restorePrompt(promptId, version) {
        const response = await api.post(
            `/prompts/${promptId}/restore/${version}`
        );

        return response.data;
    },

    async playground(promptId, userInput) {
        const response = await api.post(
            `/prompts/${promptId}/playground`,
            {
                user_input: userInput,
            }
        );

        return response.data;
    },
};

export default promptService;