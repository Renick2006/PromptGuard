import { Bell, Search, UserCircle } from "lucide-react";

function Header({ username = "User" }) {
    return (
        <header className="h-20 bg-slate-900 border-b border-slate-800 flex items-center justify-between px-8">

            <div>
                <h1 className="text-2xl font-bold text-white">
                    Dashboard
                </h1>

                <p className="text-slate-400 text-sm mt-1">
                    Welcome back, {username} 👋
                </p>
            </div>

            <div className="flex items-center gap-4">

                <div className="relative">

                    <Search className="absolute left-3 top-3.5 h-5 w-5 text-slate-500" />

                    <input
                        type="text"
                        placeholder="Search..."
                        className="bg-slate-800 border border-slate-700 rounded-lg pl-10 pr-4 py-2 text-white outline-none focus:border-blue-500 w-64"
                    />

                </div>

                <button className="p-2 rounded-lg hover:bg-slate-800 transition">
                    <Bell className="text-slate-300 w-5 h-5" />
                </button>

                <div className="flex items-center gap-2">

                    <UserCircle className="text-blue-400 w-9 h-9" />

                    <span className="text-white font-medium">
                        {username}
                    </span>

                </div>

            </div>

        </header>
    );
}

export default Header;