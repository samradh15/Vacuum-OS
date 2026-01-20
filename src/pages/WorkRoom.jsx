import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { X, Play, Pause, RefreshCw, Music, BookOpen, Clock, Monitor, MonitorOff } from 'lucide-react';
import { useTasks } from '../context/TaskContext';

const WorkRoom = () => {
    const { getFocusTask } = useTasks();
    const focusTask = getFocusTask();

    const [isActive, setIsActive] = useState(false);
    const [timeLeft, setTimeLeft] = useState(25 * 60); // 25 minutes
    const [ambientMode, setAmbientMode] = useState(false);
    const [stream, setStream] = useState(null);
    const videoRef = useRef(null);

    useEffect(() => {
        let interval = null;
        if (isActive && timeLeft > 0) {
            interval = setInterval(() => {
                setTimeLeft(timeLeft - 1);
            }, 1000);
        } else if (timeLeft === 0) {
            setIsActive(false);
        }
        return () => clearInterval(interval);
    }, [isActive, timeLeft]);

    // Handle Stream
    useEffect(() => {
        if (videoRef.current && stream) {
            videoRef.current.srcObject = stream;
        }
    }, [stream]);

    const startSharing = async () => {
        try {
            const mediaStream = await navigator.mediaDevices.getDisplayMedia({
                video: { cursor: "always" },
                audio: false
            });
            setStream(mediaStream);

            // Handle stop sharing from browser UI
            mediaStream.getVideoTracks()[0].onended = () => {
                stopSharing();
            };
        } catch (err) {
            console.error("Error sharing screen:", err);
        }
    };

    const stopSharing = () => {
        if (stream) {
            stream.getTracks().forEach(track => track.stop());
            setStream(null);
        }
    };

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    const toggleTimer = () => setIsActive(!isActive);
    const resetTimer = () => {
        setIsActive(false);
        setTimeLeft(25 * 60);
    };

    // UI Theme Logic
    // If streaming, force 'HUD Mode' (White text, transparent bg, text shadow)
    // Else use standard Ambient Mode toggle
    const isHudMode = !!stream;
    const textColor = isHudMode ? 'text-white drop-shadow-md' : (ambientMode ? 'text-[#Fdfbf7]' : 'text-[#1a1a1a]');
    const bgColor = isHudMode ? 'bg-black/40 backdrop-blur-sm' : (ambientMode ? 'bg-[#0a0a0a]' : 'bg-[#Fdfbf7]');
    const iconColor = isHudMode ? 'text-white' : (ambientMode ? 'text-[#Fdfbf7]' : 'text-[#1a1a1a]');

    return (
        <div className={`h-screen w-full flex flex-col transition-colors duration-1000 relative overflow-hidden ${!isHudMode && bgColor}`}>

            {/* Background Video Layer */}
            {stream && (
                <div className="absolute inset-0 z-0">
                    <video
                        ref={videoRef}
                        autoPlay
                        playsInline
                        className="w-full h-full object-cover"
                    />
                    {/* Overlay for contrast */}
                    <div className="absolute inset-0 bg-black/20 pointer-events-none"></div>
                </div>
            )}

            {/* Header / Exit */}
            <div className={`flex justify-between items-center p-8 relative z-10 ${textColor}`}>
                <div className="text-xs font-mono tracking-widest opacity-60">SANCTUARY MODE {isHudMode && '• HUD ACTIVE'}</div>
                <Link to="/app" className="opacity-60 hover:opacity-100 transition-opacity p-2">
                    <X size={24} />
                </Link>
            </div>

            {/* Main Content */}
            <div className={`flex-1 flex flex-col items-center justify-center p-6 text-center relative z-10 ${textColor}`}>

                {/* The Task */}
                <div className="mb-24 max-w-4xl">
                    <h2 className="text-sm font-bold uppercase tracking-[0.2em] mb-8 opacity-60">
                        {focusTask?.impact === 'Critical' && <span className="text-red-500 mr-2">●</span>}
                        Current Objective
                    </h2>
                    <h1 className="text-5xl md:text-8xl font-bold tracking-tighter leading-tight drop-shadow-lg">
                        {focusTask ? focusTask.title : "No Active Focus."}
                    </h1>
                </div>

                {/* The Timer */}
                <div className="flex flex-col items-center gap-8">
                    <div className="text-9xl md:text-[12rem] font-mono font-light leading-none tracking-tighter tabular-nums drop-shadow-lg">
                        {formatTime(timeLeft)}
                    </div>

                    <div className="flex items-center gap-6">
                        <button
                            onClick={toggleTimer}
                            className={`w-16 h-16 rounded-full flex items-center justify-center transition-transform hover:scale-110 shadow-lg
                     ${isHudMode ? 'bg-white text-black' : (ambientMode ? 'bg-[#Fdfbf7] text-[#1a1a1a]' : 'bg-[#1a1a1a] text-[#Fdfbf7]')}`}
                        >
                            {isActive ? <Pause size={24} fill="currentColor" /> : <Play size={24} fill="currentColor" className="ml-1" />}
                        </button>
                        <button onClick={resetTimer} className="p-4 opacity-60 hover:opacity-100 transition-opacity">
                            <RefreshCw size={24} />
                        </button>
                    </div>
                </div>

            </div>

            {/* Footer Controls / Integrations */}
            <div className={`p-8 flex items-center justify-center gap-4 relative z-10 ${textColor}`}>

                {/* Stream Control */}
                <button
                    onClick={stream ? stopSharing : startSharing}
                    className={`px-6 py-3 rounded-full border flex items-center gap-2 text-sm font-medium transition-colors shadow-sm
             ${isHudMode
                            ? 'bg-red-500/20 border-red-500/50 text-white hover:bg-red-500/30'
                            : (ambientMode ? 'border-white/20 hover:bg-white/10' : 'border-[#1a1a1a]/10 hover:bg-[#1a1a1a]/5')}`}
                >
                    {stream ? (
                        <> <MonitorOff size={16} /> Disconnect Window </>
                    ) : (
                        <> <Monitor size={16} /> Connect Workspace </>
                    )}
                </button>

                <div className={`h-8 w-[1px] ${ambientMode || isHudMode ? 'bg-white/10' : 'bg-[#1a1a1a]/10'}`}></div>

                {/* Ambient Toggle (Hidden if streaming to reduce clutter, or kept for text contrast check) */}
                <button
                    onClick={() => setAmbientMode(!ambientMode)}
                    className={`px-6 py-3 rounded-full border flex items-center gap-2 text-sm font-medium transition-colors
             ${ambientMode || isHudMode ? 'border-white/20 hover:bg-white/10' : 'border-[#1a1a1a]/10 hover:bg-[#1a1a1a]/5'}`}
                >
                    <Clock size={16} />
                    {ambientMode ? 'Light Mode' : 'Dark Mode'}
                </button>

            </div>

        </div>
    );
};

export default WorkRoom;
