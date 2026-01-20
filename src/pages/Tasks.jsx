import React, { useState } from 'react';
import { Filter, Plus, ArrowUp, ArrowDown, MoreHorizontal, CheckCircle2, Circle } from 'lucide-react';
import { useTasks } from '../context/TaskContext';

const Tasks = () => {
    const { tasks, addTask, toggleTask } = useTasks();
    const [filter, setFilter] = useState('All');
    const [inputValue, setInputValue] = useState('');

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && inputValue.trim()) {
            addTask(inputValue.trim());
            setInputValue('');
        }
    };

    const filteredTasks = tasks.filter(task => {
        if (filter === 'All') return true;
        if (filter === 'Focus') return task.status === 'In Progress' || task.impact === 'Critical';
        if (filter === 'Backlog') return task.status === 'Todo';
        return true;
    });

    return (
        <div className="h-full flex flex-col">

            {/* Header */}
            <div className="flex items-end justify-between mb-8 pb-6 border-b border-[#1a1a1a]/10">
                <div>
                    <h1 className="text-3xl font-light tracking-tight text-[#1a1a1a]">Task Registry</h1>
                    <p className="text-sm text-[#1a1a1a]/40 font-mono mt-2">INDEX_V1.0 • {filteredTasks.length} ITEMS</p>
                </div>
                <div className="flex gap-2">
                    {['All', 'Focus', 'Backlog'].map(f => (
                        <button
                            key={f}
                            onClick={() => setFilter(f)}
                            className={`px-4 py-2 text-sm rounded-full transition-colors ${filter === f ? 'bg-[#1a1a1a] text-white' : 'hover:bg-[#1a1a1a]/5 text-[#1a1a1a]/60'}`}
                        >
                            {f}
                        </button>
                    ))}
                </div>
            </div>

            {/* Quick Add */}
            <div className="mb-8 relative group">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[#1a1a1a]/40">
                    <Plus size={18} />
                </div>
                <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Initialize new objective..."
                    className="w-full bg-white border border-[#1a1a1a]/10 rounded-lg py-4 pl-12 pr-4 outline-none focus:border-[#1a1a1a] transition-colors placeholder:text-[#1a1a1a]/30 font-mono text-sm"
                />
                <div className="absolute right-4 top-1/2 -translate-y-1/2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="text-[10px] uppercase font-bold text-[#1a1a1a]/30 border border-[#1a1a1a]/10 rounded px-1">Enter</span>
                </div>
            </div>

            {/* The Swiss Grid */}
            <div className="w-full text-left border-t border-[#1a1a1a]/10">

                {/* Table Header */}
                <div className="grid grid-cols-12 py-3 border-b border-[#1a1a1a]/10 text-[10px] uppercase tracking-widest font-bold text-[#1a1a1a]/40">
                    <div className="col-span-1 text-center">Status</div>
                    <div className="col-span-1">ID</div>
                    <div className="col-span-6 pl-4">Objective</div>
                    <div className="col-span-2">Impact</div>
                    <div className="col-span-2 text-right">Due</div>
                </div>

                {/* Rows */}
                <div className="divide-y divide-[#1a1a1a]/5">
                    {filteredTasks.map((task) => (
                        <div
                            key={task.id}
                            onClick={() => toggleTask(task.id)}
                            className="grid grid-cols-12 py-4 items-center hover:bg-[#1a1a1a]/[0.02] transition-colors group cursor-pointer text-sm"
                        >

                            {/* Status */}
                            <div className="col-span-1 flex justify-center text-[#1a1a1a]/40 group-hover:text-[#1a1a1a]">
                                {task.status === 'Done' ? <CheckCircle2 size={18} /> :
                                    task.status === 'In Progress' ? <div className="w-4 h-4 rounded-full border-2 border-current border-t-transparent animate-spin" /> :
                                        <Circle size={18} />}
                            </div>

                            {/* ID */}
                            <div className="col-span-1 font-mono text-[#1a1a1a]/40 text-xs mt-[1px]">
                                {task.id}
                            </div>

                            {/* Title */}
                            <div className="col-span-6 pl-4 font-medium text-[#1a1a1a]">
                                <span className={task.status === 'Done' ? 'line-through opacity-40' : ''}>{task.title}</span>
                            </div>

                            {/* Impact */}
                            <div className="col-span-2">
                                <span className={`inline-block px-2 py-0.5 rounded text-[10px] uppercase font-bold tracking-wide
                           ${task.impact === 'Critical' ? 'bg-red-100 text-red-700' :
                                        task.impact === 'High' ? 'bg-orange-100 text-orange-700' :
                                            task.impact === 'Medium' ? 'bg-blue-100 text-blue-700' :
                                                'bg-gray-100 text-gray-600'}`}>
                                    {task.impact}
                                </span>
                            </div>

                            {/* Due */}
                            <div className="col-span-2 text-right font-mono text-[#1a1a1a]/40 text-xs">
                                {task.due}
                            </div>

                        </div>
                    ))}

                    {/* Empty State */}
                    {filteredTasks.length === 0 && (
                        <div className="py-12 text-center text-[#1a1a1a]/40 font-mono text-sm">
                            NO OBJECTIVES FOUND.
                        </div>
                    )}
                </div>

            </div>

        </div>
    );
};

export default Tasks;
