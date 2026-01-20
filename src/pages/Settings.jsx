import React, { useState } from 'react';
import { User, Shield, Zap, Bell, Check } from 'lucide-react';

const Input = ({ label, defaultValue, type = "text" }) => (
    <div className="mb-6">
        <label className="block text-xs font-semibold uppercase tracking-wider text-[#1a1a1a]/40 mb-2">{label}</label>
        <input
            type={type}
            defaultValue={defaultValue}
            className="w-full bg-transparent border-b border-[#1a1a1a]/20 py-2 text-[#1a1a1a] focus:border-[#1a1a1a] outline-none transition-colors font-mono text-sm"
        />
    </div>
);

const Toggle = ({ label, checked }) => (
    <div className="flex items-center justify-between mb-6">
        <span className="text-sm font-medium text-[#1a1a1a]">{label}</span>
        <div className={`w-10 h-6 rounded-full p-1 cursor-pointer transition-colors ${checked ? 'bg-[#1a1a1a]' : 'bg-[#1a1a1a]/10'}`}>
            <div className={`w-4 h-4 bg-white rounded-full shadow-sm transition-transform ${checked ? 'translate-x-4' : ''}`}></div>
        </div>
    </div>
);

const Settings = () => {
    const [activeTab, setActiveTab] = useState('General');

    const tabs = [
        { name: 'General', icon: User },
        { name: 'Notifications', icon: Bell },
        { name: 'Security', icon: Shield },
        { name: 'Integrations', icon: Zap },
    ];

    return (
        <div className="max-w-2xl">

            {/* Header */}
            <div className="mb-12">
                <h1 className="text-3xl font-light tracking-tight text-[#1a1a1a]">Settings</h1>
                <p className="text-sm text-[#1a1a1a]/40 font-mono mt-2">CONFIGURATION /// USER PREFERENCES</p>
            </div>

            {/* Tabs */}
            <div className="flex border-b border-[#1a1a1a]/10 mb-12 overflow-x-auto">
                {tabs.map(tab => (
                    <button
                        key={tab.name}
                        onClick={() => setActiveTab(tab.name)}
                        className={`flex items-center gap-2 px-6 py-3 text-sm font-medium transition-colors border-b-2 
                   ${activeTab === tab.name ? 'border-[#1a1a1a] text-[#1a1a1a]' : 'border-transparent text-[#1a1a1a]/40 hover:text-[#1a1a1a]'}`}
                    >
                        <tab.icon size={16} />
                        {tab.name}
                    </button>
                ))}
            </div>

            {/* Content */}
            <div className="bg-white border border-[#1a1a1a]/10 rounded-xl p-8 shadow-sm">

                {activeTab === 'General' && (
                    <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
                        <div className="flex items-center gap-6 mb-8">
                            <div className="w-20 h-20 rounded-full bg-[#1a1a1a]/5 flex items-center justify-center text-2xl font-light text-[#1a1a1a]">
                                SR
                            </div>
                            <button className="text-sm font-medium border border-[#1a1a1a]/20 px-4 py-2 rounded-lg hover:border-[#1a1a1a] hover:bg-[#1a1a1a] hover:text-white transition-all">
                                Change Avatar
                            </button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <Input label="Full Name" defaultValue="Samradh " />
                            <Input label="Username" defaultValue="samradh" />
                        </div>
                        <Input label="Email Address" defaultValue="samradh@vacuum.os" type="email" />
                        <Input label="Bio" defaultValue="Product Engineer & Minimalist." />

                        <div className="mt-8 flex justify-end">
                            <button className="bg-[#1a1a1a] text-white px-6 py-2 rounded-lg text-sm font-medium flex items-center gap-2 hover:opacity-90 transition-opacity">
                                <Check size={16} /> Save Changes
                            </button>
                        </div>
                    </div>
                )}

                {activeTab === 'Notifications' && (
                    <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
                        <h3 className="text-xs font-semibold uppercase tracking-wider text-[#1a1a1a]/40 mb-6">Email Alerts</h3>
                        <Toggle label="Weekly Digest" checked={true} />
                        <Toggle label="New Task Assignments" checked={true} />
                        <Toggle label="System Updates" checked={false} />

                        <div className="h-px bg-[#1a1a1a]/10 my-8"></div>

                        <h3 className="text-xs font-semibold uppercase tracking-wider text-[#1a1a1a]/40 mb-6">Push Notifications</h3>
                        <Toggle label="Desktop Alerts" checked={true} />
                        <Toggle label="Tone Sound" checked={false} />
                    </div>
                )}

                {/* Placeholders for Security/Integrations */}
                {(activeTab === 'Security' || activeTab === 'Integrations') && (
                    <div className="flex flex-col items-center justify-center py-12 text-[#1a1a1a]/40 animate-in fade-in slide-in-from-bottom-2 duration-300 gap-4">
                        <Shield size={32} opacity={0.2} />
                        <p className="font-mono text-sm">SECURE AREA. ACCESS LIMITED.</p>
                    </div>
                )}

                {/* Sign Out Edge Case */}
                <div className="mt-12 pt-12 border-t border-[#1a1a1a]/10">
                    <a href="/" className="text-xs font-bold uppercase tracking-wider text-red-500 hover:text-red-600 transition-colors">
                        Disconnect Session (Sign Out)
                    </a>
                </div>

            </div>

        </div>
    );
};

export default Settings;
