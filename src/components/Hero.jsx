import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Hero = () => {
    const { scrollY } = useScroll();
    const y = useTransform(scrollY, [0, 500], [0, 150]);
    const opacity = useTransform(scrollY, [0, 300], [1, 0]);

    return (
        <section className="h-screen w-full flex flex-col justify-center items-center relative overflow-hidden bg-[#Fdfbf7] px-6">
            <motion.div
                style={{ y, opacity }}
                className="max-w-4xl w-full text-center z-10 flex flex-col items-center"
            >
                {/* Micro Label */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="mb-8"
                >
                    <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#1a1a1a]/30">
                        Vacuum OS 1.0
                    </span>
                </motion.div>

                {/* Main Headline */}
                <div className="overflow-hidden mb-8">
                    <motion.h1
                        initial={{ y: "100%" }}
                        animate={{ y: 0 }}
                        transition={{ duration: 1.2, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                        className="text-6xl md:text-9xl font-semibold tracking-tighter leading-[0.9] text-[#1a1a1a]"
                    >
                        Master<br />Momentum.
                    </motion.h1>
                </div>

                {/* Subtext */}
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    className="text-lg md:text-xl text-[#1a1a1a]/50 font-medium max-w-lg mb-12 leading-relaxed"
                >
                    The operating system for the uncompromising.<br className="hidden md:block" />
                    Designed for deep work and clarity.
                </motion.p>

                {/* CTA */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                >
                    <Link
                        to="/onboarding"
                        className="group relative inline-flex items-center gap-3 px-8 py-4 bg-[#1a1a1a] text-[#Fdfbf7] rounded-full overflow-hidden hover:bg-[#000000] hover:shadow-2xl transition-all duration-300"
                    >
                        <span className="relative z-10 font-medium text-sm">Enter Workspace</span>
                        <ArrowRight size={16} className="relative z-10 group-hover:translate-x-1 transition-transform" />
                    </Link>
                </motion.div>

            </motion.div>

            {/* Optional: Very subtle noise or gradient if specific aesthetic is needed, 
                but keeping it clean for 'minimal' request. 
                Could add a very faint background pattern if it feels too empty. */}
            <div className="absolute inset-0 pointer-events-none opacity-[0.03]"
                style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '40px 40px' }}>
            </div>

        </section>
    );
};

export default Hero;
