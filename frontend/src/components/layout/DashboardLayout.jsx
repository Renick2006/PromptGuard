import Sidebar from "./Sidebar";
import Header from "./Header";

function DashboardLayout({
    children,
    username = "User",
}) {
    return (
        <div className="min-h-screen bg-slate-950 flex">

            <Sidebar />

            <div className="flex-1 flex flex-col">

                <Header username={username} />

                <main className="flex-1 p-8 overflow-y-auto">
                    {children}
                </main>

            </div>

        </div>
    );
}

export default DashboardLayout;