import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { LayoutDashboard, CheckSquare, BarChart2, BrainCircuit, Settings, Moon } from 'lucide-react';

const NavItem = ({ to, icon: Icon, label, end }) => (
    <NavLink
        to={to}
        end={end}
        className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-3 text-sm font-medium transition-colors rounded-md
       ${isActive ? 'bg-[#1a1a1a] text-[#Fdfbf7]' : 'text-[#1a1a1a]/60 hover:text-[#1a1a1a] hover:bg-[#1a1a1a]/5'}`
        }
    >
        <Icon size={18} />
        <span>{label}</span>
    </NavLink>
);

const Layout = ({ children }) => {
    return (
        <div className="flex h-screen bg-[#Fdfbf7] text-[#1a1a1a]">
            {/* Sidebar */}
            <aside className="w-64 border-r border-[#1a1a1a]/10 flex flex-col p-6">

                {/* Logo */}
                <div className="mb-10 px-2">
                    <Link to="/" className="text-sm font-bold uppercase tracking-[0.2em] hover:opacity-60 transition-opacity">
                        VACUUM OS
                    </Link>
                </div>

                {/* Navigation */}
                <nav className="space-y-1">
                    <NavItem to="/app" icon={LayoutDashboard} label="Dashboard" end />
                    <NavItem to="/app/tasks" icon={CheckSquare} label="Registry" />
                    <NavItem to="/app/roadmap" icon={BrainCircuit} label="Neural Roadmap" />
                    <NavItem to="/workroom" icon={Moon} label="Deep Focus" />
                    <NavItem to="/app/analytics" icon={BarChart2} label="Analytics" />
                    <NavItem to="/app/settings" icon={Settings} label="Settings" />
                </nav>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-y-auto p-8 md:p-12">
                <div className="max-w-5xl mx-auto">
                    {children}
                </div>
            </main>
        </div>
    );
};

export default Layout;
