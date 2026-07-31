import { createContext, useContext, useEffect, useState } from "react";
import authService from "../services/authService";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchCurrentUser = async () => {
        try {
            const currentUser = await authService.getCurrentUser();

            setUser(currentUser);
            setIsAuthenticated(true);
        } catch (error) {
            authService.logout();
            setUser(null);
            setIsAuthenticated(false);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (authService.isAuthenticated()) {
            fetchCurrentUser();
        } else {
            setLoading(false);
        }
    }, []);

    const login = async (credentials) => {
        const data = await authService.login(credentials);
        await fetchCurrentUser();
        return data;
    };

    const register = async (userData) => {
        return await authService.register(userData);
    };

    const logout = () => {
        authService.logout();
        setUser(null);
        setIsAuthenticated(false);
    };

    return (
        <AuthContext.Provider
            value={{
                isAuthenticated,
                user,
                loading,
                login,
                register,
                logout,
                refreshUser: fetchCurrentUser,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);