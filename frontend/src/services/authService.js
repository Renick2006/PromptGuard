import api from "./api";

const authService = {
    async register(userData) {
        const response = await api.post("/auth/register", userData);
        return response.data;
    },

    async login(credentials) {
        const formData = new URLSearchParams();

        formData.append("username", credentials.email);
        formData.append("password", credentials.password);

        const response = await api.post(
            "/auth/login",
            formData,
            {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
            }
        );

        if (response.data.access_token) {
            localStorage.setItem(
                "access_token",
                response.data.access_token
            );
        }

        return response.data;
    },

    async getCurrentUser() {
        const response = await api.get("/auth/me");
        return response.data;
    },

    logout() {
        localStorage.removeItem("access_token");
    },

    getToken() {
        return localStorage.getItem("access_token");
    },

    isAuthenticated() {
        return !!localStorage.getItem("access_token");
    },
};

export default authService;