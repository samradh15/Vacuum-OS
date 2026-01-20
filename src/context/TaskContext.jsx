import React, { createContext, useContext, useState, useEffect } from 'react';

const TaskContext = createContext();

export const useTasks = () => useContext(TaskContext);

export const TaskProvider = ({ children }) => {
    // Load initial state or seed data
    const [tasks, setTasks] = useState(() => {
        const saved = localStorage.getItem('vacuum_os_v1');
        if (saved) return JSON.parse(saved);
        return [
            { id: 'T-100', title: 'Initialize Vacuum System', impact: 'Critical', status: 'Done', due: new Date().toISOString().split('T')[0], completedAt: new Date().toISOString() },
            { id: 'T-101', title: 'Define Q3 Objective', impact: 'High', status: 'In Progress', due: new Date().toISOString().split('T')[0], completedAt: null },
        ];
    });

    const [profile, setProfile] = useState(() => {
        const saved = localStorage.getItem('vacuum_profile_v1');
        if (saved) return JSON.parse(saved);
        return { name: 'User', archetype: 'Builder', northStar: 'Build the future.' };
    });

    // Persistence
    useEffect(() => {
        localStorage.setItem('vacuum_os_v1', JSON.stringify(tasks));
    }, [tasks]);

    useEffect(() => {
        localStorage.setItem('vacuum_profile_v1', JSON.stringify(profile));
    }, [profile]);


    // Actions
    const addTask = (title) => {
        const newTask = {
            id: `T-${100 + tasks.length + 1}`, // Simple Increment ID
            title,
            impact: 'Medium', // Default
            status: 'Todo',
            due: new Date().toISOString().split('T')[0], // Today
            completedAt: null,
        };
        setTasks([newTask, ...tasks]);
    };

    const toggleTask = (id) => {
        setTasks(tasks.map(t => {
            if (t.id === id) {
                const isComplete = t.status === 'Done';
                return {
                    ...t,
                    status: isComplete ? 'Todo' : 'Done',
                    completedAt: isComplete ? null : new Date().toISOString()
                };
            }
            return t;
        }));
    };

    const updateTaskStatus = (id, status) => {
        setTasks(tasks.map(t => t.id === id ? { ...t, status } : t));
    };

    const deleteTask = (id) => {
        setTasks(tasks.filter(t => t.id !== id));
    };

    // Analytics Helpers
    const getMetrics = () => {
        const total = tasks.length;
        const done = tasks.filter(t => t.status === 'Done').length;
        const inProgress = tasks.filter(t => t.status === 'In Progress').length;
        const score = total === 0 ? 0 : Math.round((done / total) * 100);
        return { total, done, inProgress, score };
    };

    const getFocusTask = () => {
        // Priority: Critical In Progress > High In Progress > In Progress > Critical Todo
        return tasks.find(t => t.status === 'In Progress' && t.impact === 'Critical') ||
            tasks.find(t => t.status === 'In Progress') ||
            tasks.find(t => t.status === 'Todo' && t.impact === 'Critical') ||
            tasks.find(t => t.status === 'Todo');
    };

    const updateProfile = (newProfile) => {
        setProfile({ ...profile, ...newProfile });
    };

    return (
        <TaskContext.Provider value={{ tasks, addTask, toggleTask, updateTaskStatus, deleteTask, getMetrics, getFocusTask, profile, updateProfile }}>
            {children}
        </TaskContext.Provider>
    );
};
