import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
    ShieldCheck,
    User,
    Mail,
    Lock,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";

function Register() {
    const navigate = useNavigate();
    const { register } = useAuth();

    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const validateForm = () => {
        if (formData.username.trim().length < 3) {
            return "Username must be at least 3 characters.";
        }

        if (!formData.email.includes("@")) {
            return "Please enter a valid email address.";
        }

        if (formData.password.length < 6) {
            return "Password must be at least 6 characters.";
        }

        return null;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setError("");
        setSuccess("");

        const validationError = validateForm();

        if (validationError) {
            setError(validationError);
            return;
        }

        setLoading(true);

        try {
            await register(formData);

            setSuccess(
                "Account created successfully! Redirecting to login..."
            );

            setTimeout(() => {
                navigate("/login");
            }, 1500);
        } catch (err) {
            setError(
                err.response?.data?.detail ||
                    "Registration failed. Please try again."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4">
            <div className="w-full max-w-md rounded-2xl bg-slate-900 border border-slate-800 shadow-2xl p-8">

                <div className="flex justify-center mb-6">
                    <div className="bg-blue-600 p-4 rounded-full">
                        <ShieldCheck className="w-8 h-8 text-white" />
                    </div>
                </div>

                <h1 className="text-3xl font-bold text-center text-white">
                    PromptGuard
                </h1>

                <p className="text-slate-400 text-center mt-2">
                    Create your account
                </p>

                {error && (
                    <div className="mt-6 rounded-lg bg-red-500/10 border border-red-500 text-red-400 px-4 py-3">
                        {error}
                    </div>
                )}

                {success && (
                    <div className="mt-6 rounded-lg bg-green-500/10 border border-green-500 text-green-400 px-4 py-3">
                        {success}
                    </div>
                )}

                <form
                    onSubmit={handleSubmit}
                    className="space-y-5 mt-8"
                >
                    <div>
                        <label className="text-slate-300 text-sm">
                            Username
                        </label>

                        <div className="relative mt-2">
                            <User className="absolute left-3 top-3.5 h-5 w-5 text-slate-500" />

                            <input
                                type="text"
                                name="username"
                                required
                                value={formData.username}
                                onChange={handleChange}
                                placeholder="Enter your username"
                                className="w-full rounded-lg bg-slate-800 border border-slate-700 text-white pl-11 pr-4 py-3 outline-none focus:border-blue-500"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="text-slate-300 text-sm">
                            Email
                        </label>

                        <div className="relative mt-2">
                            <Mail className="absolute left-3 top-3.5 h-5 w-5 text-slate-500" />

                            <input
                                type="email"
                                name="email"
                                required
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="Enter your email"
                                className="w-full rounded-lg bg-slate-800 border border-slate-700 text-white pl-11 pr-4 py-3 outline-none focus:border-blue-500"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="text-slate-300 text-sm">
                            Password
                        </label>

                        <div className="relative mt-2">
                            <Lock className="absolute left-3 top-3.5 h-5 w-5 text-slate-500" />

                            <input
                                type="password"
                                name="password"
                                required
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="Create a password"
                                className="w-full rounded-lg bg-slate-800 border border-slate-700 text-white pl-11 pr-4 py-3 outline-none focus:border-blue-500"
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full rounded-lg bg-blue-600 hover:bg-blue-700 transition py-3 font-semibold text-white disabled:opacity-50"
                    >
                        {loading ? "Creating Account..." : "Create Account"}
                    </button>
                </form>

                <p className="text-center text-slate-400 mt-6">
                    Already have an account?{" "}
                    <Link
                        to="/login"
                        className="text-blue-400 hover:text-blue-300"
                    >
                        Sign In
                    </Link>
                </p>
            </div>
        </div>
    );
}

export default Register;