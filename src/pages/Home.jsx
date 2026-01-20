import React, { useEffect, useRef, useState } from 'react';
import Lenis from '@studio-freight/lenis';
import { motion, useScroll, AnimatePresence } from 'framer-motion';
import { Layout, CheckCircle, Smartphone } from 'lucide-react';

// Imported Sections
import Hero from '../components/Hero';
import Navbar from '../components/home/Navbar';
import Features from '../components/home/Features';
import Footer from '../components/home/Footer';

// --- INLINE COMPONENTS ---

// 2. WORKFLOW (Formerly StickyNarrative)
const Workflow = () => {
    const stages = [
        { title: "Plan", icon: Layout, desc: "Architect your quarter with neural clarity." },
        { title: "Execute", icon: CheckCircle, desc: "Momentum is automatic. Friction is gone." },
        { title: "Review", icon: Smartphone, desc: "Feedback loops that sharpen your mind." }
    ];

    return (
        <section className="py-32 bg-[#1a1a1a] text-[#Fdfbf7]">
            <div className="max-w-7xl mx-auto px-6 md:px-12">

                {/* Header */}
                <div className="mb-24 md:flex justify-between items-end">
                    <div>
                        <p className="text-sm uppercase tracking-widest mb-6 text-[#Fdfbf7]/40">The Workflow</p>
                        <h2 className="text-4xl md:text-6xl font-semibold leading-tight">
                            From Abstract<br />to <span className="text-[#Fdfbf7]/40">Concrete.</span>
                        </h2>
                    </div>
                    <div className="hidden md:block w-24 h-1 bg-[#ffffff]/10 rounded-full mb-4"></div>
                </div>

                {/* Grid Layout - "Straight away scroll" */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                    {stages.map((stage, i) => {
                        const Icon = stage.icon;
                        return (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: i * 0.1 }}
                                viewport={{ once: true }}
                                className="group"
                            >
                                <div className="mb-8 p-6 bg-[#ffffff]/5 rounded-[2rem] border border-[#ffffff]/5 aspect-square flex flex-col items-center justify-center text-center group-hover:bg-[#ffffff]/10 transition-colors cursor-default">
                                    <div className="mb-6 p-4 bg-[#ffffff]/10 rounded-full text-[#Fdfbf7]">
                                        <Icon size={32} />
                                    </div>
                                    <h3 className="text-2xl font-bold mb-3">{stage.title}</h3>

                                    {/* Abstract UI Representation */}
                                    <div className="w-16 h-1 bg-[#ffffff]/20 rounded-full mb-4 group-hover:w-24 transition-all"></div>

                                    <p className="text-[#Fdfbf7]/60 text-sm max-w-[200px] leading-relaxed">
                                        {stage.desc}
                                    </p>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>

            </div>
        </section>
    );
};



// --- MAIN PAGE ---

const Home = () => {

    useEffect(() => {
        const lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            direction: 'vertical',
            gestureDirection: 'vertical',
            smooth: true,
            mouseMultiplier: 1,
            smoothTouch: false,
            touchMultiplier: 2,
        });

        function raf(time) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }

        requestAnimationFrame(raf);

        return () => lenis.destroy();
    }, []);

    return (
        <main className="w-full min-h-screen bg-[#Fdfbf7] antialiased selection:bg-[#1a1a1a] selection:text-[#Fdfbf7]">
            <Navbar />
            <Hero />
            <Workflow />
            <Features />
            <Footer />
        </main>
    );
};

export default Home;
