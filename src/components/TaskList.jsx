import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import TaskCard from './TaskCard';

const TaskList = ({ tasks, onToggle }) => {
    return (
        <div className="w-full flex flex-col items-center gap-4 mt-8 px-4 pb-20">
            <AnimatePresence mode='popLayout'>
                {tasks.length === 0 ? (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: [0.5, 0.8, 0.5], scale: 1 }}
                        transition={{
                            opacity: { duration: 4, repeat: Infinity, ease: "easeInOut" },
                            scale: { duration: 0.5 }
                        }}
                        className="flex flex-col items-center justify-center text-white/30 mt-12"
                    >
                        <Sparkles size={48} strokeWidth={1} className="mb-4" />
                        <span className="text-sm font-display tracking-widest uppercase">All Systems Nominal</span>
                    </motion.div>
                ) : (
                    tasks.map((task) => (
                        <TaskCard
                            key={task.id}
                            task={task}
                            onToggle={onToggle}
                        />
                    ))
                )}
            </AnimatePresence>
        </div>
    );
};

export default TaskList;
