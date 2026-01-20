import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Code, PenTool, Briefcase, GraduationCap, Check } from 'lucide-react';
import { useTasks } from '../context/TaskContext';

const Onboarding = () => {
    const [step, setStep] = useState(1);
    const [archetype, setArchetype] = useState('');
    const [northStar, setNorthStar] = useState('');
    const { updateProfile } = useTasks();
    const navigate = useNavigate();

    const archetypes = [
        { id: 'Builder', icon: Code, desc: 'Shipping code & products.' },
        { id: 'Writer', icon: PenTool, desc: 'Crafting narratives & content.' },
        { id: 'Executive', icon: Briefcase, desc: 'Managing teams & strategy.' },
        { id: 'Student', icon: GraduationCap, desc: 'Learning & mastering skills.' },
    ];

    const handleComplete = () => {
        updateProfile({ archetype, northStar });
        // Simulate "Initializing"
        setStep(3);
        setTimeout(() => {
            navigate('/app');
        }, 2000);
    };

    return (
        <div className="h-screen w-full bg-[#Fdfbf7] flex flex-col items-center justify-center p-6 text-[#1a1a1a]">
            <div className="w-full max-w-2xl">

                {/* Progress */}
                <div className="flex gap-2 mb-12 justify-center">
                    {[1, 2, 3].map(i => (
                        <div key={i} className={`h-1 w-12 rounded-full transition-colors ${step >= i ? 'bg-[#1a1a1a]' : 'bg-[#1a1a1a]/10'}`}></div>
                    ))}
                </div>

                <AnimatePresence mode="wait">

                    {/* Step 1: Archetype */}
                    {step === 1 && (
                        <motion.div
                            key="step1"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="text-center"
                        >
                            <h1 className="text-4xl font-light tracking-tight mb-4">Identify your role.</h1>
                            <p className="text-[#1a1a1a]/60 mb-12">How will you use this workspace?</p>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {archetypes.map((a) => (
                                    <button
                                        key={a.id}
                                        onClick={() => setArchetype(a.id)}
                                        className={`p-6 border rounded-xl text-left transition-all group hover:scale-[1.02]
                                ${archetype === a.id ? 'border-[#1a1a1a] bg-[#1a1a1a] text-white' : 'border-[#1a1a1a]/10 bg-white hover:border-[#1a1a1a]/40'}`}
                                    >
                                        <a.icon size={24} className={`mb-4 ${archetype === a.id ? 'text-white' : 'text-[#1a1a1a]/40 group-hover:text-[#1a1a1a]'}`} />
                                        <div className="font-semibold">{a.id}</div>
                                        <div className={`text-sm mt-1 ${archetype === a.id ? 'text-white/60' : 'text-[#1a1a1a]/40'}`}>{a.desc}</div>
                                    </button>
                                ))}
                            </div>

                            <div className="mt-12 flex justify-end">
                                <button
                                    disabled={!archetype}
                                    onClick={() => setStep(2)}
                                    className="flex items-center gap-2 font-medium disabled:opacity-30 disabled:cursor-not-allowed hover:opacity-70 transition-opacity"
                                >
                                    Continue <ArrowRight size={18} />
                                </button>
                            </div>
                        </motion.div>
                    )}

                    {/* Step 2: North Star */}
                    {step === 2 && (
                        <motion.div
                            key="step2"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="text-center"
                        >
                            <h1 className="text-4xl font-light tracking-tight mb-4">Define your North Star.</h1>
                            <p className="text-[#1a1a1a]/60 mb-12">What is the one thing you must achieve this quarter?</p>

                            <div className="relative">
                                <input
                                    autoFocus
                                    type="text"
                                    className="w-full bg-transparent border-b-2 border-[#1a1a1a]/10 py-4 text-2xl md:text-3xl text-center outline-none focus:border-[#1a1a1a] transition-colors font-light placeholder:text-[#1a1a1a]/20"
                                    placeholder="e.g. Launch the MVP"
                                    value={northStar}
                                    onChange={(e) => setNorthStar(e.target.value)}
                                    onKeyDown={(e) => e.key === 'Enter' && northStar && handleComplete()}
                                />
                            </div>

                            <div className="mt-12 flex justify-between items-center">
                                <button onClick={() => setStep(1)} className="text-[#1a1a1a]/40 hover:text-[#1a1a1a]">Back</button>
                                <button
                                    disabled={!northStar}
                                    onClick={handleComplete}
                                    className="bg-[#1a1a1a] text-white px-8 py-4 rounded-full font-medium disabled:opacity-30 disabled:cursor-not-allowed hover:scale-105 transition-transform flex items-center gap-2"
                                >
                                    Enter Workspace <ArrowRight size={18} />
                                </button>
                            </div>
                        </motion.div>
                    )}

                    {/* Step 3: Loading */}
                    {step === 3 && (
                        <motion.div
                            key="step3"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="flex flex-col items-center"
                        >
                            <div className="w-12 h-12 border-2 border-[#1a1a1a] border-t-transparent rounded-full animate-spin mb-8"></div>
                            <h2 className="text-xl font-mono text-[#1a1a1a]">INITIALIZING ENVIRONMENT...</h2>
                            <p className="text-[#1a1a1a]/40 mt-2">Configuring for {archetype}s...</p>
                        </motion.div>
                    )}

                </AnimatePresence>

            </div>
        </div>
    );
};

export default Onboarding;
