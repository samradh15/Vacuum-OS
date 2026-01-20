import React from 'react';
import { ArrowUpRight, Play } from 'lucide-react';
import { useTasks } from '../context/TaskContext';
import { Link } from 'react-router-dom';

const Dashboard = () => {
    const { getFocusTask, getMetrics, tasks } = useTasks();
    const focusTask = getFocusTask();
    const metrics = getMetrics();

    // Get next 3 backlog items
    const nextActions = tasks
        .filter(t => t.status === 'Todo' && t.id !== focusTask?.id)
        .slice(0, 3);

    return (
        <div className="h-full flex flex-col">

            {/* Header */}
            <div className="flex items-end justify-between mb-8 pb-6 border-b border-[#1a1a1a]/10">
                <div>
                    <h1 className="text-3xl font-light tracking-tight text-[#1a1a1a]">Good Morning.</h1>
                    <p className="text-sm text-[#1a1a1a]/40 font-mono mt-2">{new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' }).toUpperCase()} • STATE: FLOW</p>
                </div>
                <div className="hidden md:block text-right">
                    <div className="text-xs text-[#1a1a1a]/40 uppercase tracking-wide">System Status</div>
                    <div className="text-sm font-bold text-[#1a1a1a] flex items-center justify-end gap-2">
                        <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span> ONLINE
                    </div>
                </div>
            </div>

            {/* Main Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 flex-1 min-h-0">

                {/* 1. Primary Focus (2 Cols) */}
                <div className="md:col-span-2 bg-white border border-[#1a1a1a]/10 rounded-xl p-8 flex flex-col justify-between shadow-sm relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                        <Play size={120} />
                    </div>

                    <div>
                        <div className="flex items-center gap-3 mb-6">
                            <span className="px-3 py-1 bg-[#1a1a1a] text-white text-[10px] uppercase font-bold tracking-widest rounded-full">Current Objective</span>
                            {focusTask?.impact === 'Critical' && <span className="px-3 py-1 bg-red-100 text-red-600 text-[10px] uppercase font-bold tracking-widest rounded-full">CRITICAL</span>}
                        </div>
                        <h2 className="text-4xl md:text-5xl font-medium tracking-tight leading-tight text-[#1a1a1a] max-w-lg">
                            {focusTask ? focusTask.title : "All objectives cleared."}
                        </h2>
                    </div>

                    <div className="mt-12">
                        {focusTask ? (
                            <div className="flex items-center gap-4">
                                <Link to="/workroom" className="bg-[#1a1a1a] text-white px-8 py-4 rounded-lg font-medium hover:opacity-90 transition-opacity flex items-center gap-2">
                                    <Play size={18} fill="currentColor" /> Enter Sanctuary
                                </Link>
                                <div className="text-sm text-[#1a1a1a]/60 font-mono">
                                    ID: {focusTask.id}
                                </div>
                            </div>
                        ) : (
                            <Link to="/app/tasks" className="text-[#1a1a1a] border-b border-[#1a1a1a] pb-1 hover:opacity-50 transition-opacity">
                                Initialize new tasks &rarr;
                            </Link>
                        )}
                    </div>
                </div>

                {/* Right Column Stack */}
                <div className="flex flex-col gap-6">

                    {/* 2. Performance Metric */}
                    <div className="bg-[#1a1a1a] text-white rounded-xl p-6 flex flex-col justify-between flex-1 shadow-sm">
                        <div className="flex justify-between items-start">
                            <h3 className="text-xs font-bold uppercase tracking-widest opacity-60">Focus Quality</h3>
                            <ArrowUpRight size={20} className="opacity-60" />
                        </div>
                        <div>
                            <div className="text-5xl font-light tracking-tighter mb-2">{metrics.score}%</div>
                            <div className="w-full h-1 bg-white/20 rounded-full overflow-hidden">
                                <div style={{ width: `${metrics.score}%` }} className="h-full bg-white"></div>
                            </div>
                        </div>
                    </div>

                    {/* 3. Next Actions (Inbox) */}
                    <div className="bg-white border border-[#1a1a1a]/10 rounded-xl p-6 flex-[1.5] shadow-sm flex flex-col">
                        <h3 className="text-xs font-bold uppercase tracking-widest text-[#1a1a1a]/40 mb-6">Next Actions</h3>
                        <div className="space-y-4 flex-1 overflow-y-auto">
                            {nextActions.length > 0 ? nextActions.map((task) => (
                                <div key={task.id} className="flex items-center gap-3 group cursor-pointer hover:opacity-100 opacity-60 transition-opacity">
                                    <div className="w-4 h-4 rounded border border-[#1a1a1a]/40 group-hover:border-[#1a1a1a]"></div>
                                    <span className="text-sm font-medium text-[#1a1a1a] truncate">{task.title}</span>
                                </div>
                            )) : (
                                <div className="text-xs text-[#1a1a1a]/40 font-mono">No pending actions.</div>
                            )}
                        </div>
                        <div className="mt-4 pt-4 border-t border-[#1a1a1a]/10 text-center">
                            <Link to="/app/tasks" className="text-[10px] uppercase font-bold text-[#1a1a1a]/40 hover:text-[#1a1a1a] transition-colors">
                                View Task Registry
                            </Link>
                        </div>
                    </div>

                </div>

            </div>

        </div>
    );
};

export default Dashboard;
