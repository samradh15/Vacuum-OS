import React, { useState } from 'react';
import { Send, Cpu, GitBranch, Terminal } from 'lucide-react';
import { motion } from 'framer-motion';

const Message = ({ role, content }) => (
    <div className={`flex gap-4 mb-6 ${role === 'user' ? 'flex-row-reverse' : ''}`}>
        <div className={`w-8 h-8 rounded shrink-0 flex items-center justify-center 
      ${role === 'ai' ? 'bg-[#1a1a1a] text-white' : 'bg-[#1a1a1a]/10 text-[#1a1a1a]'}`}>
            {role === 'ai' ? <Cpu size={14} /> : <div className="text-xs font-bold">YOU</div>}
        </div>
        <div className={`max-w-[80%] p-4 rounded-lg text-sm leading-relaxed
      ${role === 'ai' ? 'bg-white border border-[#1a1a1a]/10 text-[#1a1a1a]' : 'bg-[#1a1a1a] text-white'}`}>
            {content}
        </div>
    </div>
);

const Node = ({ x, y, label, type = 'default' }) => (
    <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, delay: Math.random() * 0.5 }}
        className={`absolute transform -translate-x-1/2 -translate-y-1/2 px-4 py-2 border rounded-full text-xs font-mono whitespace-nowrap
        ${type === 'root' ? 'bg-[#1a1a1a] text-white border-[#1a1a1a]' : 'bg-white text-[#1a1a1a] border-[#1a1a1a]/20'}`}
        style={{ left: `${x}%`, top: `${y}%` }}
    >
        {label}
    </motion.div>
);

const Connection = ({ x1, y1, x2, y2 }) => (
    <motion.line
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1, ease: 'easeInOut' }}
        x1={`${x1}%`} y1={`${y1}%`} x2={`${x2}%`} y2={`${y2}%`}
        stroke="#1a1a1a" strokeWidth="1" strokeOpacity="0.2"
    />
);

const Roadmap = () => {
    const [input, setInput] = useState('');
    const [history, setHistory] = useState([
        { role: 'ai', content: 'Neural Core Online. Describe your primary objective to generate a strategic roadmap.' }
    ]);

    const handleSend = () => {
        if (!input.trim()) return;
        setHistory([...history, { role: 'user', content: input }]);
        setInput('');
        // Simulate AI response
        setTimeout(() => {
            setHistory(prev => [...prev, { role: 'ai', content: 'Processing parameters... Generating optimal execution path.' }]);
        }, 1000);
    };

    return (
        <div className="h-full flex flex-col md:flex-row gap-6 -m-2">

            {/* Left: Chat Interface */}
            <div className="flex-1 flex flex-col bg-white border border-[#1a1a1a]/10 rounded-xl overflow-hidden shadow-sm">

                {/* Terminal Header */}
                <div className="bg-[#fcfcfc] border-b border-[#1a1a1a]/5 p-4 flex items-center gap-2 text-xs font-mono text-[#1a1a1a]/40 uppercase tracking-widest">
                    <Terminal size={14} />
                    <span>Strategy_Engine_V1</span>
                </div>

                {/* Messages */}
                <div className="flex-1 p-6 overflow-y-auto bg-[#FAFAFA]/50">
                    {history.map((msg, i) => <Message key={i} {...msg} />)}
                </div>

                {/* Input Area */}
                <div className="p-4 bg-white border-t border-[#1a1a1a]/10">
                    <div className="relative">
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                            placeholder="Input strategic goals..."
                            className="w-full bg-[#1a1a1a]/[0.02] border border-[#1a1a1a]/10 rounded-lg py-3 pl-4 pr-12 text-sm outline-none focus:border-[#1a1a1a]/30 transition-colors placeholder:text-[#1a1a1a]/20"
                        />
                        <button
                            onClick={handleSend}
                            className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 text-[#1a1a1a] hover:bg-[#1a1a1a]/5 rounded-md transition-colors"
                        >
                            <Send size={16} />
                        </button>
                    </div>
                </div>
            </div>

            {/* Right: The Tree Visualization (Static Demo) */}
            <div className="flex-1 bg-[#1a1a1a]/[0.02] border border-[#1a1a1a]/10 rounded-xl relative overflow-hidden flex items-center justify-center">
                <div className="absolute top-6 right-6 flex items-center gap-2 text-xs font-mono text-[#1a1a1a]/40 bg-white px-3 py-1.5 rounded-full border border-[#1a1a1a]/10 shadow-sm">
                    <GitBranch size={12} />
                    VISUALIZATION
                </div>

                {/* Container for SVG Lines */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none">
                    <Connection x1={50} y1={20} x2={50} y2={45} />
                    <Connection x1={50} y1={45} x2={25} y2={65} />
                    <Connection x1={50} y1={45} x2={75} y2={65} />
                    <Connection x1={25} y1={65} x2={15} y2={85} />
                    <Connection x1={25} y1={65} x2={35} y2={85} />
                </svg>

                {/* Nodes */}
                <div className="relative w-full h-full">
                    <Node x={50} y={20} label="Launch V1" type="root" />

                    <Node x={50} y={45} label="MVP Core" />

                    <Node x={25} y={65} label="Backend" />
                    <Node x={75} y={65} label="Frontend" />

                    <Node x={15} y={85} label="Auth" />
                    <Node x={35} y={85} label="DB Schema" />
                </div>

            </div>

        </div>
    );
};

export default Roadmap;
