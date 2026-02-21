import React from 'react';

interface LayoutProps {
    children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
    return (
        <div className="min-h-screen bg-slate-900 bg-[url('https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?q=80&w=2674&auto=format&fit=crop')] bg-cover bg-center bg-fixed bg-no-repeat relative font-sans text-slate-100">
            {/* Overlay to ensure text readability */}
            <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm z-0"></div>

            {/* Main Content Area */}
            <div className="relative z-10 flex h-screen overflow-hidden">
                {children}
            </div>
        </div>
    );
}
