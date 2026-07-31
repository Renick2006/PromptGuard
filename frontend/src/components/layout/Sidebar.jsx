import { NavLink } from "react-router-dom";
import {
    LayoutDashboard,
    FolderKanban,
    FileText,
    BarChart3,
    Settings,
    ShieldCheck,
    LogOut,
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";

function Sidebar() {
    const { logout } = useAuth();

    const menuItems = [
        {
            name: "Dashboard",
            path: "/",
            icon: LayoutDashboard,
        },
        {
            name: "Projects",
            path: "/projects",
            icon: FolderKanban,
        },
        {
            name: "Prompts",
            path: "/prompts",
            icon: FileText,
        },
        {
            name: "Analytics",
            path: "/analytics",
            icon: BarChart3,
        },
        {
            name: "Settings",
            path: "/settings",
            icon: Settings,
        },
    ];

    return (
        <aside className="w-64 bg-slate-900 border-r border-slate-800 flex flex-col">

            <div className="p-6 border-b border-slate-800">

                <div className="flex items-center gap-3">

                    <div className="bg-blue-600 rounded-xl p-2">
                        <ShieldCheck className="w-6 h-6 text-white" />
                    </div>

                    <div>
                        <h1 className="text-white font-bold text-xl">
                            PromptGuard
                        </h1>

                        <p className="text-xs text-slate-400">
                            AI Prompt Evaluation
                        </p>
                    </div>

                </div>

            </div>

            <nav className="flex-1 px-4 py-6 space-y-2">

                {menuItems.map((item) => {

                    const Icon = item.icon;

                    return (
                        <NavLink
                            key={item.name}
                            to={item.path}
                            className={({ isActive }) =>
                                `flex items-center gap-3 rounded-lg px-4 py-3 transition-all ${
                                    isActive
                                        ? "bg-blue-600 text-white"
                                        : "text-slate-400 hover:bg-slate-800 hover:text-white"
                                }`
                            }
                        >
                            <Icon className="w-5 h-5" />

                            <span>{item.name}</span>

                        </NavLink>
                    );
                })}

            </nav>

            <div className="p-4 border-t border-slate-800">

                <button
                    onClick={logout}
                    className="w-full flex items-center gap-3 rounded-lg px-4 py-3 text-slate-400 hover:bg-red-500 hover:text-white transition-all"
                >
                    <LogOut className="w-5 h-5" />

                    Logout
                </button>

            </div>

        </aside>
    );
}

export default Sidebar;