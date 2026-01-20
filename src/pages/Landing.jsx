import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Brain, Zap, Globe, Layers } from 'lucide-react';

const Landing = () => {
    const navigate = useNavigate();
    const targetRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: targetRef,
        offset: ["start start", "end start"]
    });

    const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
    const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.9]);

    return (
        <div className="min-h-screen bg-canvas text-ink relative" ref={targetRef}>
            {/* 1. Navigation */}
            <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-4 bg-canvas/80 backdrop-blur-md border-b border-border">
                <div className="text-xl font-bold tracking-tighter uppercase">VACUUM</div>
                <div className="hidden md:flex gap-8 text-sm font-medium text-ink/60">
                    <a href="#" className="hover:text-ink transition-colors">Manifesto</a>
                    <a href="#features" className="hover:text-ink transition-colors">Features</a>
                    <a href="#" className="hover:text-ink transition-colors">Pricing</a>
                </div>
                <button
                    onClick={() => navigate('/onboarding')}
                    className="bg-ink text-canvas px-5 py-2 rounded-md text-sm font-medium hover:opacity-90 transition-opacity flex items-center gap-2"
                >
                    Enter Workspace <ArrowRight size={14} />
                </button>
            </nav>

            {/* 2. Hero Section */}
            <section className="h-screen flex flex-col items-center justify-center pt-20 px-6 overflow-hidden">
                <motion.div
                    style={{ opacity, scale }}
                    className="text-center max-w-5xl mx-auto"
                >
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                        className="text-6xl md:text-8xl font-bold tracking-tighter leading-[0.9] mb-8"
                    >
                        Order from Chaos.
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                        className="text-xl md:text-2xl text-ink/60 max-w-2xl mx-auto font-light tracking-wide"
                    >
                        The first operating system designed for the architecture of your mind. Not a to-do list. A blueprint.
                    </motion.p>
                </motion.div>

                {/* Hero Visual - Stacking Cards */}
                <div className="absolute bottom-[-10%] md:bottom-[-20%] w-full flex justify-center pointer-events-none">
                    <motion.div
                        initial={{ y: 200, rotate: -5 }}
                        animate={{ y: 0, rotate: -10 }}
                        transition={{ duration: 1, delay: 0.4 }}
                        className="w-64 h-80 bg-subtle border border-border rounded-xl shadow-2xl absolute -ml-40"
                    />
                    <motion.div
                        initial={{ y: 200, rotate: 5 }}
                        animate={{ y: 0, rotate: 10 }}
                        transition={{ duration: 1, delay: 0.5 }}
                        className="w-64 h-80 bg-subtle border border-border rounded-xl shadow-2xl absolute -mr-40"
                    />
                    <motion.div
                        initial={{ y: 200 }}
                        animate={{ y: -20 }}
                        transition={{ duration: 1, delay: 0.6, type: "spring" }}
                        className="w-72 h-96 bg-canvas border border-border rounded-xl shadow-2xl z-10 flex items-center justify-center"
                    >
                        <div className="text-center">
                            <div className="w-12 h-12 bg-ink rounded-full mx-auto mb-4 flex items-center justify-center text-canvas">
                                <Brain size={24} />
                            </div>
                            <div className="font-medium">Strategic Review</div>
                            <div className="text-xs text-ink/40 mt-1">Today, 9:00 AM</div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* 3. Bento Grid Features */}
            <section id="features" className="py-32 px-6 max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-auto md:h-[600px]">

                    {/* Card 1: Neural Roadmap */}
                    <motion.div
                        whileHover={{ y: -5 }}
                        className="md:col-span-2 bg-subtle rounded-xl p-8 border border-border flex flex-col justify-between overflow-hidden group"
                    >
                        <div>
                            <div className="w-10 h-10 bg-canvas border border-border rounded-lg flex items-center justify-center mb-4">
                                <Layers size={20} />
                            </div>
                            <h3 className="text-2xl font-semibold tracking-tight mb-2">Neural Roadmap</h3>
                            <p className="text-ink/60">Our AI doesn't just list tasks. It plans your quarter. Watch your goals unfold into actionable blueprints.</p>
                        </div>
                        <div className="mt-8 bg-canvas border border-border rounded-lg p-4 font-mono text-xs text-ink/40 h-48 group-hover:border-ink/20 transition-colors">
                            &gt; Analyzing Q1 Objectives...<br />
                            &gt; Breaking down "Launch Product"...<br />
                            &gt; <span className="text-ink">Generating Dependencies: Legal, Marketing, Dev...</span><br />
                            <span className="animate-pulse">_</span>
                        </div>
                    </motion.div>

                    {/* Card 2: Ecosystem Sync */}
                    <motion.div
                        whileHover={{ y: -5 }}
                        className="bg-canvas border border-border rounded-xl p-8 flex flex-col justify-between"
                    >
                        <div>
                            <div className="w-10 h-10 bg-subtle border border-border rounded-lg flex items-center justify-center mb-4">
                                <Globe size={20} />
                            </div>
                            <h3 className="text-xl font-semibold tracking-tight mb-2">Ecosystem Sync</h3>
                            <p className="text-sm text-ink/60">Seamless flow between your biological process and digital tools.</p>
                        </div>
                        <div className="flex justify-center items-center gap-4 mt-8 opacity-50">
                            <div className="w-8 h-12 border border-ink/20 rounded-md"></div>
                            <div className="h-px w-8 bg-ink/20"></div>
                            <div className="w-16 h-10 border border-ink/20 rounded-md"></div>
                        </div>
                    </motion.div>

                    {/* Card 3: Deep Work Mode */}
                    <motion.div
                        whileHover={{ y: -5 }}
                        className="bg-ink text-canvas rounded-xl p-8 flex flex-col justify-between relative overflow-hidden"
                    >
                        <div className="z-10">
                            <div className="w-10 h-10 bg-canvas/10 rounded-lg flex items-center justify-center mb-4">
                                <Zap size={20} />
                            </div>
                            <h3 className="text-xl font-semibold tracking-tight mb-2">Deep Work</h3>
                            <p className="text-sm text-canvas/60">Eliminate noise. A single toggle to enter the void.</p>
                        </div>
                        <div className="absolute right-4 bottom-4">
                            <div className="w-12 h-6 bg-canvas/20 rounded-full p-1 flex justify-end">
                                <div className="w-4 h-4 bg-canvas rounded-full"></div>
                            </div>
                        </div>
                    </motion.div>

                </div>
            </section >

            {/* Footer */}
            <footer className="py-12 border-t border-border text-center text-sm text-ink/40">
                <p>&copy; 2026 VACUUM Systems. Engineered for clarity.</p>
            </footer>
        </div>
    );
};

export default Landing;
