import React from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

const TaskCard = ({ task, onToggle }) => {
    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{
                opacity: 1,
                y: 0,
                scale: task.completed ? 0.95 : 1
            }}
            exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
            transition={{ duration: 0.3 }}
            className={`
        relative w-full max-w-2xl p-4 mb-3 
        bg-glass backdrop-blur-md border border-white/5 rounded-xl
        flex items-center gap-4 group cursor-pointer
        hover:border-white/10 transition-colors
      `}
            onClick={() => onToggle(task.id)}
        >
            {/* Custom Checkbox */}
            <div className={`
        relative flex items-center justify-center w-6 h-6 rounded-full border-2 transition-all duration-300
        ${task.completed
                    ? 'border-[#10b981] bg-[#10b981]/10'
                    : 'border-neutral-600 group-hover:border-neutral-500'}
      `}>
                {task.completed && (
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="w-2.5 h-2.5 bg-[#10b981] rounded-full shadow-[0_0_10px_#10b981]"
                    />
                )}
            </div>

            {/* Text Content */}
            <span className={`
        flex-1 text-lg font-medium font-sans text-gray-200 transition-all duration-300
        ${task.completed ? 'opacity-40' : 'opacity-100'}
      `}>
                {task.text}
            </span>
        </motion.div>
    );
};

export default TaskCard;
