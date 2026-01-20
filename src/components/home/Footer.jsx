import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="py-32 bg-[#1a1a1a] text-[#Fdfbf7] border-t border-white/10">
            <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-4 gap-12">

                <div className="md:col-span-2">
                    <h2 className="text-sm font-bold uppercase tracking-[0.2em] mb-8">Vacuum OS</h2>
                    <h3 className="text-4xl md:text-6xl font-semibold tracking-tight leading-tight max-w-sm">
                        Design your <br /> life's work.
                    </h3>
                </div>

                <div className="space-y-4">
                    <h4 className="text-xs font-mono uppercase text-white/40 mb-6">Product</h4>
                    <ul className="space-y-2 text-sm text-white/60">
                        <li><Link to="/app" className="hover:text-white transition-colors">Workspace</Link></li>
                        <li><Link to="/app/roadmap" className="hover:text-white transition-colors">Neural Roadmap</Link></li>
                        <li><Link to="/workroom" className="hover:text-white transition-colors">Deep Focus</Link></li>
                    </ul>
                </div>

                <div className="space-y-4">
                    <h4 className="text-xs font-mono uppercase text-white/40 mb-6">System</h4>
                    <ul className="space-y-2 text-sm text-white/60">
                        <li><span className="cursor-not-allowed">Changelog</span></li>
                        <li><span className="cursor-not-allowed">Manifesto</span></li>
                        <li><span className="cursor-not-allowed">Legal</span></li>
                    </ul>
                </div>

            </div>

            <div className="max-w-7xl mx-auto px-6 md:px-12 mt-32 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center text-xs text-white/20 uppercase tracking-widest">
                <div>© 2026 Vacuum Inc.</div>
                <div>All Systems Operational</div>
            </div>
        </footer>
    );
};

export default Footer;
