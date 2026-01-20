import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
    return (
        <div className="h-screen w-full bg-[#Fdfbf7] flex flex-col items-center justify-center text-[#1a1a1a]">
            <h1 className="text-9xl font-bold tracking-tighter mb-4">404</h1>
            <p className="text-xl font-mono text-[#1a1a1a]/60 mb-12">COORDINATES NOT FOUND</p>
            <Link to="/" className="border-b border-[#1a1a1a] pb-1 hover:opacity-50 transition-opacity">
                Return to Origin
            </Link>
        </div>
    );
};

export default NotFound;
