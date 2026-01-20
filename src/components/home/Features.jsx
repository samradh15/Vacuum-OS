import React from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, Terminal, Send, GitBranch } from 'lucide-react';

const SimulationCard = ({ title, children, className = "" }) => (
    <motion.div
        whileInView={{ opacity: 1, y: 0 }}
        initial={{ opacity: 0, y: 20 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true }}
        className={`bg-[#f5f5f5] rounded-3xl p-8 overflow-hidden relative ${className}`}
    >
        <div className="absolute top-8 left-8 z-10">
            <h3 className="text-sm font-bold uppercase tracking-widest text-[#1a1a1a]/40">{title}</h3>
        </div>
        {children}
    </motion.div>
);

const Features = () => {
    return (
        <section className="py-32 px-6 md:px-12 bg-[#Fdfbf7]">
            <div className="max-w-7xl mx-auto">

                <div className="mb-24">
                    <h2 className="text-4xl md:text-6xl font-semibold tracking-tight text-[#1a1a1a] mb-6">
                        Intelligence,<br />Visualized.
                    </h2>
                    <p className="text-xl text-[#1a1a1a]/60 max-w-lg">
                        Three distinct engines working in unison to clarify your intent and accelerate execution.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 min-h-[600px]">

                    {/* Feature 1: Neural Roadmap (Chat Sim) */}
                    <SimulationCard title="Neural Strategy" className="md:col-span-2 bg-[#1a1a1a] text-white">
                        <div className="h-full flex items-center justify-center pt-12">
                            <div className="w-full max-w-md bg-[#2a2a2a] rounded-xl border border-white/10 p-4 shadow-2xl">
                                <div className="flex items-center gap-2 mb-4 opacity-50 border-b border-white/10 pb-2">
                                    <Terminal size={14} />
                                    <span className="text-xs font-mono">STRATEGY_CORE</span>
                                </div>
                                <div className="space-y-3 font-mono text-xs">
                                    <motion.div
                                        initial={{ opacity: 0, x: -10 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.5 }}
                                        className="bg-white/5 p-2 rounded w-3/4"
                                    >
                                        &gt; Define Q3 Objective sequence.
                                    </motion.div>
                                    <motion.div
                                        initial={{ opacity: 0, x: 10 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 1.5 }}
                                        className="ml-auto bg-white text-[#1a1a1a] p-2 rounded w-3/4"
                                    >
                                        Optimization Path Generated. Launching V1 Protocol...
                                    </motion.div>
                                </div>
                            </div>
                        </div>
                    </SimulationCard>

                    {/* Feature 2: Deep Focus (Timer Sim) */}
                    <SimulationCard title="Deep Focus" className="border border-[#1a1a1a]/5">
                        <div className="h-full flex flex-col items-center justify-center pt-12">
                            <div className="relative">
                                <motion.div
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 10, ease: "linear", repeat: Infinity }}
                                    className="w-40 h-40 rounded-full border border-[#1a1a1a]/10 border-t-[#1a1a1a]"
                                />
                                <div className="absolute inset-0 flex items-center justify-center text-4xl font-mono tracking-tighter">
                                    24:59
                                </div>
                            </div>
                            <div className="mt-8 flex gap-4">
                                <div className="w-12 h-12 rounded-full bg-[#1a1a1a] flex items-center justify-center text-white">
                                    <Play size={20} fill="currentColor" />
                                </div>
                            </div>
                        </div>
                    </SimulationCard>

                    {/* Feature 3: Analytics (Abstract Sim) */}
                    <SimulationCard title="Output Velocity" className="border border-[#1a1a1a]/5">
                        <div className="h-full flex items-end justify-center px-8 pb-12">
                            <div className="flex items-end gap-2 h-40 w-full">
                                {[40, 70, 50, 90, 60, 80].map((h, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ height: 0 }}
                                        whileInView={{ height: `${h}%` }}
                                        transition={{ duration: 1, delay: i * 0.1, type: "spring" }}
                                        className="flex-1 bg-[#1a1a1a] rounded-t-sm opacity-20 hover:opacity-100 transition-opacity"
                                    />
                                ))}
                            </div>
                        </div>
                    </SimulationCard>

                    {/* Feature 4: Screen Mirroring */}
                    <SimulationCard title="The Canvas" className="md:col-span-2 bg-[#fff] border border-[#1a1a1a]/5">
                        <div className="h-full flex items-center justify-center pt-12 relative">
                            <div className="w-full h-full scale-110 opacity-50" style={{ backgroundImage: 'radial-gradient(#1a1a1a 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="bg-white px-8 py-4 rounded-full border border-[#1a1a1a]/10 shadow-xl flex items-center gap-4">
                                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                                    <span className="font-mono text-sm">Mirroring Active</span>
                                </div>
                            </div>
                        </div>
                    </SimulationCard>

                </div>
            </div>
        </section>
    );
};

export default Features;
