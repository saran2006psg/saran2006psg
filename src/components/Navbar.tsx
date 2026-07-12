import React from 'react';

interface NavbarProps {
    activeTab: string;
    setActiveTab: (tab: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ activeTab, setActiveTab }) => {
    return (
        <header className="navbar">
            <div className="nav-left">
                <svg 
                    className="git-logo" 
                    height="32" 
                    viewBox="0 0 16 16" 
                    width="32"
                    onClick={() => setActiveTab('overview')}
                >
                    <path fill="currentColor" d="M8 0c4.42 0 8 3.58 8 8a8.013 8.013 0 0 1-5.45 7.59c-.4.08-.55-.17-.55-.38 0-.27.01-1.13.01-2.2 0-.75-.25-1.23-.54-1.48 1.78-.2 3.65-.88 3.65-3.95 0-.88-.31-1.59-.82-2.15.08-.2.36-1.02-.08-2.12 0 0-.67-.22-2.2.82-.64-.18-1.32-.27-2-.27-.68 0-1.36.09-2 .27-1.53-1.03-2.2-.82-2.2-.82-.44 1.1-.16 1.92-.08 2.12-.51.56-.82 1.28-.82 2.15 0 3.06 1.86 3.75 3.64 3.95-.23.2-.44.55-.51 1.07-.46.21-1.61.55-2.33-.66-.15-.24-.6-.83-1.23-.82-.67.01-.27.38.01.53.34.19.73.9.82 1.13.16.45.68 1.35 3.12.88.01.47.01.84.01.93 0 .22-.15.47-.55.38A7.995 7.995 0 0 1 0 8c0-4.42 3.58-8 8-8Z"></path>
                </svg>
                <div className="nav-search">
                    <input type="text" value="saran2006psg / portfolio" readOnly />
                    <span className="search-badge">/</span>
                </div>
                <nav className="nav-links">
                    <a 
                        href="#overview" 
                        className={activeTab === 'overview' ? 'active' : ''}
                        onClick={(e) => { e.preventDefault(); setActiveTab('overview'); }}
                    >
                        Overview
                    </a>
                    <a href="#pull-requests" onClick={(e) => e.preventDefault()}>Pull requests</a>
                    <a href="#issues" onClick={(e) => e.preventDefault()}>Issues</a>
                    <a href="#codespaces" onClick={(e) => e.preventDefault()}>Codespaces</a>
                    <a href="#marketplace" onClick={(e) => e.preventDefault()}>Marketplace</a>
                    <a href="#explore" onClick={(e) => e.preventDefault()}>Explore</a>
                </nav>
            </div>
            <div className="nav-right">
                <button className="icon-btn" aria-label="Notifications">
                    <svg viewBox="0 0 16 16" width="16" height="16" fill="currentColor">
                        <path d="M8 16a2 2 0 0 0 1.985-1.75H6.015A2 2 0 0 0 8 16zm0-12.5h.01c.62 0 1.12.5 1.12 1.12v.63C10.63 5.75 11.5 7 11.5 8.5v3.25l1 1v.75h-9v-.75l1-1V8.5c0-1.5.87-2.75 2.37-3.25v-.63c0-.62.5-1.12 1.13-1.12zM9.5 2a1.5 1.5 0 1 0-3 0 1.5 1.5 0 0 0 3 0z"></path>
                    </svg>
                </button>
                <button className="create-dropdown">
                    <span>+</span>
                    <span className="arrow">▼</span>
                </button>
                <div className="avatar-mini">
                    <img 
                        src="assets/saran.jpeg" 
                        onError={(e) => {
                            (e.target as HTMLImageElement).src = 'https://github.com/saran2006psg.png';
                        }} 
                        alt="Saran M" 
                    />
                </div>
            </div>
        </header>
    );
};

export default Navbar;
