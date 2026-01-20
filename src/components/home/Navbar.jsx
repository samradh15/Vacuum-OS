import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Menu, X } from 'lucide-react';

const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <>
            <motion.nav
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'py-4 bg-[#Fdfbf7]/80 backdrop-blur-md border-b border-[#1a1a1a]/5' : 'py-6 bg-transparent'
                    }`}
            >
                <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">

                    {/* Logo */}
                    <Link to="/" className="text-sm font-bold uppercase tracking-[0.2em] text-[#1a1a1a] relative z-50">
                        Vacuum OS
                    </Link>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center gap-8">
                        {['Manifesto', 'Roadmap', 'Pricing'].map((item) => (
                            <a
                                key={item}
                                href={`#${item.toLowerCase()}`}
                                className="text-sm font-medium text-[#1a1a1a]/60 hover:text-[#1a1a1a] transition-colors"
                            >
                                {item}
                            </a>
                        ))}

                        <div className="w-px h-4 bg-[#1a1a1a]/10"></div>

                        <Link to="/app" className="text-sm font-medium text-[#1a1a1a] hover:opacity-60 transition-opacity">
                            Log in
                        </Link>

                        <Link
                            to="/onboarding"
                            className="group flex items-center gap-2 px-4 py-2 bg-[#1a1a1a] text-[#Fdfbf7] text-sm font-medium rounded-full hover:bg-[#333] transition-all"
                        >
                            Get Started
                            <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
                        </Link>
                    </div>

                    {/* Mobile Menu Toggle */}
                    <button
                        className="md:hidden relative z-50 p-2 -mr-2 text-[#1a1a1a]"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    >
                        {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </motion.nav>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: "-100%" }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: "-100%" }}
                        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                        className="fixed inset-0 bg-[#Fdfbf7] z-40 flex flex-col justify-center items-center md:hidden"
                    >
                        <div className="flex flex-col items-center gap-8 text-xl font-medium">
                            {['Manifesto', 'Roadmap', 'Pricing'].map((item) => (
                                <a
                                    key={item}
                                    href={`#${item.toLowerCase()}`}
                                    onClick={() => setMobileMenuOpen(false)}
                                    className="text-[#1a1a1a]/60 hover:text-[#1a1a1a]"
                                >
                                    {item}
                                </a>
                            ))}
                            <div className="w-12 h-px bg-[#1a1a1a]/10 my-2"></div>
                            <Link
                                to="/app"
                                onClick={() => setMobileMenuOpen(false)}
                                className="text-[#1a1a1a]"
                            >
                                Log in
                            </Link>
                            <Link
                                to="/onboarding"
                                onClick={() => setMobileMenuOpen(false)}
                                className="px-6 py-3 bg-[#1a1a1a] text-[#Fdfbf7] rounded-full"
                            >
                                Get Started
                            </Link>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default Navbar;
