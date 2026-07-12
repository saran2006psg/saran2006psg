import React from 'react';

const Sidebar: React.FC = () => {
    return (
        <aside className="sidebar">
            <div className="profile-pic-container">
                <div className="profile-pic-inner">
                    <img 
                        src="assets/saran.jpeg" 
                        onError={(e) => {
                            (e.target as HTMLImageElement).src = 'https://github.com/saran2006psg.png';
                        }} 
                        alt="Saran M" 
                        className="profile-pic" 
                    />
                </div>
                <div className="status-badge" title="Status">
                    <span className="status-dot"></span>
                    <span className="status-text">Exploring AI frontiers 🤖</span>
                </div>
            </div>
            
            <div className="profile-info">
                <h1 className="user-fullname">Saran M</h1>
                <p className="user-username">saran2006psg</p>
                <div className="user-bio">
                    AI Engineer &amp; Full-Stack Developer. Passionate about LLMs, RAG pipelines, model fine-tuning, and building systems that bridge intelligence with production code.
                </div>
                <button className="edit-profile-btn">Follow</button>
                
                <div className="user-stats">
                    <svg viewBox="0 0 16 16" width="16" height="16" fill="currentColor" className="stats-icon">
                        <path d="M2 5.5a3.5 3.5 0 1 1 5.898 2.549 5.508 5.508 0 0 1 3.034 4.084.75.75 0 1 1-1.482.235 4 4 0 0 0-7.9 0 .75.75 0 0 1-1.482-.236 5.507 5.507 0 0 1 3.102-4.082A3.49 3.49 0 0 1 2 5.5zM4.5 5a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm7.25 1.25a.75.75 0 0 1 .75-.75h3.25a.75.75 0 0 1 0 1.5h-3.25a.75.75 0 0 1-.75-.75zm0 3.5a.75.75 0 0 1 .75-.75h3.25a.75.75 0 0 1 0 1.5h-3.25a.75.75 0 0 1-.75-.75zm0 3.5a.75.75 0 0 1 .75-.75h3.25a.75.75 0 0 1 0 1.5h-3.25a.75.75 0 0 1-.75-.75z"></path>
                    </svg>
                    <span className="stat-count">384</span> followers
                    <span className="stat-separator">•</span>
                    <span className="stat-count">92</span> following
                </div>

                <ul className="profile-details">
                    <li>
                        <svg viewBox="0 0 16 16" width="16" height="16" fill="currentColor">
                            <path d="M1.5 2A1.5 1.5 0 0 1 3 0.5h10A1.5 1.5 0 0 1 14.5 2v12a1.5 1.5 0 0 1-1.5 1.5H3a1.5 1.5 0 0 1-1.5-1.5V2zm1.5-.5a.5.5 0 0 0-.5.5v1.5h11V2a.5.5 0 0 0-.5-.5H3zm0 3v9a.5.5 0 0 0 .5.5h10a.5.5 0 0 0 .5-.5v-9H3z"></path>
                        </svg>
                        <span>PSG College of Technology</span>
                    </li>
                    <li>
                        <svg viewBox="0 0 16 16" width="16" height="16" fill="currentColor">
                            <path d="M11.536 3.464a5 5 0 0 1 0 7.072L8 14.07l-3.536-3.535a5 5 0 0 1 0-7.072v.001a5 5 0 0 1 7.072 0zM8 9a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"></path>
                        </svg>
                        <span>Tamil Nadu, India</span>
                    </li>
                    <li>
                        <svg viewBox="0 0 16 16" width="16" height="16" fill="currentColor">
                            <path d="M1.75 2h12.5c.966 0 1.75.784 1.75 1.75v8.5A1.75 1.75 0 0 1 14.25 14H1.75A1.75 1.75 0 0 1 0 12.25v-8.5C0 2.784.784 2 1.75 2zM1.5 3.75v.7c.08.069.175.13.282.18l5.72 2.685a1.004 1.004 0 0 0 .996 0l5.72-2.685c.107-.05.202-.111.282-.18v-.7a.25.25 0 0 0-.25-.25H1.75a.25 2.25 0 0 0-.25.25zm13 2.138L8.97 8.437a2.502 2.502 0 0 1-1.94 0L1.5 5.888v6.362c0 .138.112.25.25.25h12.5a.25 2.25 0 0 0 .25-.25V5.888z"></path>
                        </svg>
                        <a href="mailto:saranpsg2006@gmail.com">saranpsg2006@gmail.com</a>
                    </li>
                    <li>
                        <svg viewBox="0 0 16 16" width="16" height="16" fill="currentColor">
                            <path d="M3.75 2h8.5c.966 0 1.75.784 1.75 1.75v8.5A1.75 1.75 0 0 1 12.25 14h-8.5A1.75 1.75 0 0 1 2 12.25v-8.5C2 2.784 2.784 2 3.75 2zm.25 1.75v8.5c0 .138.112.25.25.25h8.5a.25 2.25 0 0 0 .25-.25v-8.5a.25 2.25 0 0 0-.25-.25h-8.5a.25 2.25 0 0 0-.25.25zM5 5h6v1.5H5V5zm0 3.5h6V10H5V8.5z"></path>
                        </svg>
                        <a href="https://linkedin.com/in/saranpsg" target="_blank" rel="noreferrer">linkedin.com/in/saranpsg</a>
                    </li>
                </ul>

                <hr className="sidebar-divider" />
                
                <div className="achievements-section">
                    <h3>Achievements</h3>
                    <div className="achievement-badges">
                        <div className="badge" title="Winner of ETHER-X 2026 Hackathon">🏆 ETHER-X Winner</div>
                        <div className="badge" title="Winner of CREATE 2024 National level Competition">🥇 CREATE Winner</div>
                        <div className="badge" title="Developer & AI enthusiast">🤖 AI Builder</div>
                    </div>
                </div>
            </div>
        </aside>
    );
};

export default Sidebar;
