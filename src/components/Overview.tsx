import React, { useState, useEffect } from 'react';

interface ContributionDay {
    date: Date;
    level: number;
    count: number;
    simulated?: boolean;
}

const Overview: React.FC = () => {
    const [heatmap, setHeatmap] = useState<ContributionDay[]>([]);
    const [feedback, setFeedback] = useState<string>("Simulate Commit");
    const [btnStatus, setBtnStatus] = useState<boolean>(false);

    // Initial heatmap generation
    useEffect(() => {
        const daysOfWeek = 7;
        const totalDays = 53 * daysOfWeek; // 371 squares
        const list: ContributionDay[] = [];
        const start = new Date();
        start.setFullYear(start.getFullYear() - 1);

        for (let i = 0; i < totalDays; i++) {
            const date = new Date(start);
            date.setDate(start.getDate() + i);

            const day = date.getDay();
            const isWeekend = (day === 0 || day === 6);
            let level = 0;
            const rand = Math.random();

            if (isWeekend) {
                if (rand > 0.85) level = 2;
                else if (rand > 0.70) level = 1;
            } else {
                if (rand > 0.90) level = 4;
                else if (rand > 0.75) level = 3;
                else if (rand > 0.50) level = 2;
                else if (rand > 0.25) level = 1;
            }

            const count = level === 0 ? 0 : level * 2 + Math.floor(Math.random() * 3);
            list.push({ date, level, count });
        }
        setHeatmap(list);
    }, []);

    // Simulate Commit trigger
    const handleSimulateCommit = () => {
        if (heatmap.length === 0) return;
        const randomIndex = Math.floor(Math.random() * heatmap.length);
        
        setHeatmap(prev => {
            const updated = [...prev];
            const current = updated[randomIndex];
            updated[randomIndex] = {
                ...current,
                level: 4,
                count: current.count === 0 ? 8 : current.count + 5,
                simulated: true
            };
            return updated;
        });

        // Feedback animations
        setFeedback("✔ Contribution Pushed!");
        setBtnStatus(true);
        setTimeout(() => {
            setFeedback("Simulate Commit");
            setBtnStatus(false);
            setHeatmap(prev => {
                const resetState = [...prev];
                if (resetState[randomIndex]) {
                    resetState[randomIndex] = {
                        ...resetState[randomIndex],
                        simulated: false
                    };
                }
                return resetState;
            });
        }, 1000);
    };

    return (
        <div id="overview" className="tab-pane active">
            <div className="section-header">
                <h2>Pinned Repositories</h2>
            </div>

            {/* Pinned Repos Grid */}
            <div className="repo-grid">
                {/* Repo 1 */}
                <div className="repo-card border-glow-blue">
                    <div className="repo-header">
                        <svg className="repo-icon text-accent" viewBox="0 0 16 16" width="16" height="16">
                            <path fill="currentColor" d="M2 2.5A2.5 2.5 0 0 1 4.5 0h8.75a.75.75 0 0 1 .75.75v12.5a.75.75 0 0 1-.75.75h-2.5a.75.75 0 1 1 0-1.5h1.75v-2h-8a1 1 0 0 0-.714 1.7.75.75 0 0 1-1.072 1.05A2.495 2.495 0 0 1 2 11.5v-9zm10.5-1V9h-8c-.356 0-.694.074-1 .208V2.5a1 1 0 0 1 1-1h8z"></path>
                        </svg>
                        <a href="https://github.com/saran2006psg/ContractRiskAnalyzer" target="_blank" rel="noreferrer" className="repo-title">ContractRiskAnalyzer</a>
                        <span className="repo-badge">Public</span>
                    </div>
                    <p className="repo-desc">
                        Built a legal risk classifier utilizing a RAG pipeline (9,447 clauses) with SentenceTransformers, Pinecone, and Modal serverless fine-tuned RoBERTa SLM.
                    </p>
                    <div className="repo-meta">
                        <span className="lang-pill"><span className="lang-color python"></span>Python</span>
                        <span className="meta-item hover-accent">
                            <a href="https://contract-risk-analyzer-sepia.vercel.app/" target="_blank" rel="noreferrer">🔗 Live Demo</a>
                        </span>
                    </div>
                </div>

                {/* Repo 2 */}
                <div className="repo-card border-glow-emerald">
                    <div className="repo-header">
                        <svg className="repo-icon text-success" viewBox="0 0 16 16" width="16" height="16">
                            <path fill="currentColor" d="M2 2.5A2.5 2.5 0 0 1 4.5 0h8.75a.75.75 0 0 1 .75.75v12.5a.75.75 0 0 1-.75.75h-2.5a.75.75 0 1 1 0-1.5h1.75v-2h-8a1 1 0 0 0-.714 1.7.75.75 0 0 1-1.072 1.05A2.495 2.495 0 0 1 2 11.5v-9zm10.5-1V9h-8c-.356 0-.694.074-1 .208V2.5a1 1 0 0 1 1-1h8z"></path>
                        </svg>
                        <a href="https://github.com/saran2006psg/aggriconnect" target="_blank" rel="noreferrer" className="repo-title">AgriConnect</a>
                        <span className="repo-badge">Public</span>
                    </div>
                    <p className="repo-desc">
                        Full-stack agricultural marketplace platform connecting farmers and consumers. Integrates role-based auth, wallet transaction ledgers, and crons.
                    </p>
                    <div className="repo-meta">
                        <span className="lang-pill"><span className="lang-color ts"></span>TypeScript</span>
                        <span className="meta-item hover-accent">
                            <a href="https://aggriconnect.vercel.app" target="_blank" rel="noreferrer">🔗 Live Demo</a>
                        </span>
                    </div>
                </div>

                {/* Repo 3 */}
                <div className="repo-card border-glow-purple">
                    <div className="repo-header">
                        <svg className="repo-icon text-purple" viewBox="0 0 16 16" width="16" height="16">
                            <path fill="currentColor" d="M2 2.5A2.5 2.5 0 0 1 4.5 0h8.75a.75.75 0 0 1 .75.75v12.5a.75.75 0 0 1-.75.75h-2.5a.75.75 0 1 1 0-1.5h1.75v-2h-8a1 1 0 0 0-.714 1.7.75.75 0 0 1-1.072 1.05A2.495 2.495 0 0 1 2 11.5v-9zm10.5-1V9h-8c-.356 0-.694.074-1 .208V2.5a1 1 0 0 1 1-1h8z"></path>
                        </svg>
                        <span className="repo-title">ai-base-omega</span>
                        <span className="repo-badge font-semibold text-purple">Development</span>
                    </div>
                    <p className="repo-desc">
                        A centralized hub indexing AI tool workflows, prompt matrices, setup guides, and tutorials with real-time semantic search indexing.
                    </p>
                    <div className="repo-meta">
                        <span className="lang-pill"><span className="lang-color js"></span>React / Next</span>
                        <span className="meta-item hover-accent">
                            <a href="https://ai-base-omega.vercel.app" target="_blank" rel="noreferrer">🔗 Live Demo</a>
                        </span>
                    </div>
                </div>

                {/* Repo 4 */}
                <div className="repo-card border-glow-blue">
                    <div className="repo-header">
                        <svg className="repo-icon text-accent" viewBox="0 0 16 16" width="16" height="16">
                            <path fill="currentColor" d="M2 2.5A2.5 2.5 0 0 1 4.5 0h8.75a.75.75 0 0 1 .75.75v12.5a.75.75 0 0 1-.75.75h-2.5a.75.75 0 1 1 0-1.5h1.75v-2h-8a1 1 0 0 0-.714 1.7.75.75 0 0 1-1.072 1.05A2.495 2.495 0 0 1 2 11.5v-9zm10.5-1V9h-8c-.356 0-.694.074-1 .208V2.5a1 1 0 0 1 1-1h8z"></path>
                        </svg>
                        <span className="repo-title">VoteVision-TN</span>
                        <span className="repo-badge">Public</span>
                    </div>
                    <p className="repo-desc">
                        Electoral district visualizer mapping 234 assembly constituencies in Tamil Nadu with real-time survey swing models and Leaflet integration.
                    </p>
                    <div className="repo-meta">
                        <span className="lang-pill"><span className="lang-color ts"></span>TypeScript</span>
                        <span className="meta-item hover-accent">
                            <a href="https://voter-vision.vercel.app" target="_blank" rel="noreferrer">🔗 Live Demo</a>
                        </span>
                    </div>
                </div>

                {/* Repo 5 */}
                <div className="repo-card border-glow-amber">
                    <div className="repo-header">
                        <svg className="repo-icon text-amber" viewBox="0 0 16 16" width="16" height="16">
                            <path fill="currentColor" d="M2 2.5A2.5 2.5 0 0 1 4.5 0h8.75a.75.75 0 0 1 .75.75v12.5a.75.75 0 0 1-.75.75h-2.5a.75.75 0 1 1 0-1.5h1.75v-2h-8a1 1 0 0 0-.714 1.7.75.75 0 0 1-1.072 1.05A2.495 2.495 0 0 1 2 11.5v-9zm10.5-1V9h-8c-.356 0-.694.074-1 .208V2.5a1 1 0 0 1 1-1h8z"></path>
                        </svg>
                        <a href="https://github.com/saran2006psg/relive-digital-memory-journal" target="_blank" rel="noreferrer" className="repo-title">ReLive</a>
                        <span className="repo-badge">Public</span>
                    </div>
                    <p className="repo-desc">
                        Digital memory journal featuring a postcard timeline, Polaroid gallery, mood tracking, Cloudinary media storage, and Supabase RLS policies.
                    </p>
                    <div className="repo-meta">
                        <span className="lang-pill"><span className="lang-color css-lang"></span>Next.js</span>
                        <span className="meta-item hover-accent">
                            <a href="https://relive-digital-memory-journal.vercel.app/" target="_blank" rel="noreferrer">🔗 Live Demo</a>
                        </span>
                    </div>
                </div>

                {/* Repo 6 */}
                <div className="repo-card border-glow-emerald">
                    <div className="repo-header">
                        <svg className="repo-icon text-success" viewBox="0 0 16 16" width="16" height="16">
                            <path fill="currentColor" d="M2 2.5A2.5 2.5 0 0 1 4.5 0h8.75a.75.75 0 0 1 .75.75v12.5a.75.75 0 0 1-.75.75h-2.5a.75.75 0 1 1 0-1.5h1.75v-2h-8a1 1 0 0 0-.714 1.7.75.75 0 0 1-1.072 1.05A2.495 2.495 0 0 1 2 11.5v-9zm10.5-1V9h-8c-.356 0-.694.074-1 .208V2.5a1 1 0 0 1 1-1h8z"></path>
                        </svg>
                        <a href="https://simplens.in" target="_blank" rel="noreferrer" className="repo-title">simpleNS</a>
                        <span className="repo-badge">Contributor</span>
                    </div>
                    <p className="repo-desc">
                        An open-source, plugin-based notification orchestration engine built for developers desiring full database control.
                    </p>
                    <div className="repo-meta">
                        <span className="lang-pill"><span className="lang-color ts"></span>TypeScript</span>
                        <span className="meta-item hover-accent">
                            <a href="https://simplens.in" target="_blank" rel="noreferrer">🔗 Website</a>
                        </span>
                    </div>
                </div>
            </div>

            {/* Heatmap Box Section */}
            <div className="contribution-container-header">
                <h2>852 contributions in the last year</h2>
                <button 
                    className="simulate-btn" 
                    id="simulateCommitBtn"
                    onClick={handleSimulateCommit}
                    style={btnStatus ? { borderColor: "var(--accent-emerald)", color: "var(--accent-emerald)" } : {}}
                >
                    {feedback}
                </button>
            </div>
            <div className="contribution-box">
                <div className="calendar-scroll">
                    <div className="calendar-grid" id="heatmapGrid">
                        {heatmap.map((day, idx) => {
                            const dateStr = day.date.toLocaleDateString("en-US", { month: 'short', day: 'numeric', year: 'numeric' });
                            const commitCount = day.count === 0 ? "No" : day.count;
                            return (
                                <div 
                                    key={idx}
                                    className={`square level-${day.level}`}
                                    style={day.simulated ? { transform: "scale(1.6)", zIndex: 10 } : {}}
                                    title={`${commitCount} contributions on ${dateStr}`}
                                />
                            );
                        })}
                    </div>
                </div>
                <div className="calendar-footer">
                    <span>Less</span>
                    <div className="color-keys">
                        <span className="square level-0"></span>
                        <span className="square level-1"></span>
                        <span className="square level-2"></span>
                        <span className="square level-3"></span>
                        <span className="square level-4"></span>
                    </div>
                    <span>More</span>
                </div>
            </div>
        </div>
    );
};

export default Overview;
