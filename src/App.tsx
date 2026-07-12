import React, { useState, useEffect } from 'react';
import BackgroundCanvas from './components/BackgroundCanvas';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Overview from './components/Overview';
import Journey from './components/Journey';
import Playground from './components/Playground';

const App: React.FC = () => {
    const [activeTab, setActiveTab] = useState<string>('overview');
    const [indicatorStyle, setIndicatorStyle] = useState({ width: 0, left: 0 });

    // Track active tab button changes to slide underline indicator
    useEffect(() => {
        const updateIndicator = () => {
            const activeBtn = document.querySelector(`.tab-link[data-tab="${activeTab}"]`) as HTMLElement;
            if (activeBtn) {
                setIndicatorStyle({
                    width: activeBtn.offsetWidth,
                    left: activeBtn.offsetLeft
                });
            }
        };

        // Small delay to ensure render layout coordinates are settled
        const timer = setTimeout(updateIndicator, 50);
        
        window.addEventListener('resize', updateIndicator);
        return () => {
            clearTimeout(timer);
            window.removeEventListener('resize', updateIndicator);
        };
    }, [activeTab]);

    // Handle 3D Perspective Tilt for hover elements
    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            const card = (e.target as HTMLElement).closest('.repo-card, .timeline-card, .system-stats-panel') as HTMLElement;
            if (!card) return;

            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = ((centerY - y) / centerY) * 5;
            const rotateY = ((x - centerX) / centerX) * 5;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
            card.style.backgroundImage = `radial-gradient(circle at ${x}px ${y}px, rgba(56, 189, 248, 0.07) 0%, rgba(13, 22, 42, 0.45) 80%)`;
        };

        const handleMouseLeave = (e: MouseEvent) => {
            const card = (e.target as HTMLElement).closest('.repo-card, .timeline-card, .system-stats-panel') as HTMLElement;
            if (!card) return;

            card.style.transform = "";
            card.style.backgroundImage = "";
        };

        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseout', handleMouseLeave);
        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseout', handleMouseLeave);
        };
    }, []);

    return (
        <div className="app-root-container">
            {/* Ambient Background Glows */}
            <div className="ambient-blob blob-1"></div>
            <div className="ambient-blob blob-2"></div>
            <div className="ambient-blob blob-3"></div>

            {/* Particle Canvas */}
            <BackgroundCanvas />

            {/* Navigation Header */}
            <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />

            {/* Main Content Layout */}
            <main className="container">
                <Sidebar />

                <section className="content-area">
                    {/* Tabs Menu Navigation */}
                    <nav className="content-tabs">
                        <button 
                            className={`tab-link ${activeTab === 'overview' ? 'active' : ''}`} 
                            data-tab="overview"
                            onClick={() => setActiveTab('overview')}
                        >
                            <svg viewBox="0 0 16 16" width="16" height="16" fill="currentColor" className="tab-icon">
                                <path d="M0 1.75C0 .784.784 0 1.75 0h12.5C15.216 0 16 .784 16 1.75v12.5A1.75 1.75 0 0 1 14.25 16H1.75A1.75 1.75 0 0 1 0 14.25V1.75zM1.5 1.75v12.5c0 .138.112.25.25.25h12.5a.25 2.25 0 0 0 .25-.25V1.75a.25 2.25 0 0 0-.25-.25H1.75a.25 2.25 0 0 0-.25.25z"></path>
                            </svg>
                            <span>Overview</span>
                        </button>
                        <button 
                            className={`tab-link ${activeTab === 'journey' ? 'active' : ''}`} 
                            data-tab="journey"
                            onClick={() => setActiveTab('journey')}
                        >
                            <svg viewBox="0 0 16 16" width="16" height="16" fill="currentColor" className="tab-icon">
                                <path d="M1.5 8a6.5 6.5 0 1 1 13 0 6.5 6.5 0 0 1-13 0zM8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0zm.5 4.75a.75.75 0 0 0-1.5 0v3.5a.75.75 0 0 0 .324.614l2.5 1.75a.75.75 0 1 0 .852-1.228L8.5 7.576V4.75z"></path>
                            </svg>
                            <span>Timeline &amp; Journey</span>
                        </button>
                        <button 
                            className={`tab-link ${activeTab === 'playground' ? 'active' : ''}`} 
                            data-tab="playground"
                            onClick={() => setActiveTab('playground')}
                        >
                            <svg viewBox="0 0 16 16" width="16" height="16" fill="currentColor" className="tab-icon">
                                <path d="M8 15a7 7 0 1 1 0-14 7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"></path>
                                <path d="M11.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.793 8l-2.647 2.646a.5.5 0 0 0 .708.708l3-3zM4 8a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5A.5.5 0 0 1 4 8z"></path>
                            </svg>
                            <span>AI Agent Workspace</span>
                        </button>
                        
                        {/* Smooth Sliding Underline */}
                        <div 
                            className="tab-indicator" 
                            style={{ 
                                width: `${indicatorStyle.width}px`, 
                                left: `${indicatorStyle.left}px` 
                            }}
                        ></div>
                    </nav>

                    {/* Tab Panes */}
                    {activeTab === 'overview' && <Overview />}
                    {activeTab === 'journey' && <Journey />}
                    {activeTab === 'playground' && <Playground />}
                </section>
            </main>

            {/* Footer Links */}
            <footer className="footer">
                <div className="footer-links">
                    <span>© 2026 saran2006psg</span>
                    <a href="https://github.com/saran2006psg" target="_blank" rel="noreferrer">GitHub</a>
                    <a href="https://linkedin.com/in/saranpsg" target="_blank" rel="noreferrer">LinkedIn</a>
                    <a href="mailto:saranpsg2006@gmail.com">Contact</a>
                </div>
            </footer>
        </div>
    );
};

export default App;
