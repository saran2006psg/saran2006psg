import React, { useState, useEffect } from 'react';

const Journey: React.FC = () => {
    const [animate, setAnimate] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setAnimate(true);
        }, 50);
        return () => clearTimeout(timer);
    }, []);

    const timelineData = [
        {
            badge: "Intern",
            badgeClass: "bg-blue",
            title: "Software Development Engineer Intern",
            subtitle: "DossierNexus • Remote",
            date: "May 2026 – July 2026",
            desc: "Engineered scalable backend components using Node.js, Express.js, and PostgreSQL. Designed real-time data streaming pipelines with SSE and WebSockets. Developed an autonomous natural language to SQL analytics copilot."
        },
        {
            badge: "Hackathon",
            badgeClass: "bg-amber",
            title: "1st Prize Winner – ETHER-X 2026",
            subtitle: "ETHER-X Hackathon",
            date: "Feb 2026",
            desc: "Built a Transformer-based Web Application Firewall (WAF) using DistilBERT to classify HTTP network threats (SQL Injection, XSS) in real-time streams."
        },
        {
            badge: "Education",
            badgeClass: "bg-purple",
            title: "B.E. Computer Science & Engineering (AIML)",
            subtitle: "PSG College of Technology • Coimbatore",
            date: "2024 – Expected 2027",
            desc: "Focusing on Dense Retrievers, SLMs, and RAG optimization. Active member of Infinitum Helpdesk and CodeNvibe clubs."
        },
        {
            badge: "Hackathon",
            badgeClass: "bg-amber",
            title: "First Prize Winner – CREATE 2024",
            subtitle: "National Level Technical Competition",
            date: "Dec 2024",
            desc: "Secured 1st Place for developing a \"Smart Sign Glove for Disabled People\" integrating gyroscopes, flex sensors, and a lightweight gesture recognition ML pipeline."
        },
        {
            badge: "Education",
            badgeClass: "bg-purple",
            title: "Diploma in Electrical & Electronics Engineering",
            subtitle: "Nachimuthu Polytechnic College • Tamil Nadu",
            date: "2021 – 2024",
            desc: "Specialization in control systems, sensor modeling, and embedded systems integration."
        }
    ];

    return (
        <div id="journey" className="tab-pane active">
            <div className="timeline-container">
                {timelineData.map((node, index) => (
                    <div 
                        key={index} 
                        className={`timeline-item ${animate ? 'animate-timeline' : ''}`}
                        style={animate ? { animationDelay: `${index * 0.12}s` } : {}}
                    >
                        <div className={`timeline-badge ${node.badgeClass}`}>{node.badge}</div>
                        <div className="timeline-card">
                            <div className="card-header">
                                <h3>{node.title}</h3>
                                <span className="card-date">{node.date}</span>
                            </div>
                            <h4 className="card-subtitle text-accent">{node.subtitle}</h4>
                            <p className="card-desc">{node.desc}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Journey;
