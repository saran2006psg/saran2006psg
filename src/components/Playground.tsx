import React, { useState, useRef, useEffect } from 'react';

interface TerminalLine {
    type: 'input' | 'system' | 'loading' | 'output';
    text?: string;
    html?: string;
}

interface MonitorStats {
    state: 'IDLE' | 'RUNNING';
    context: number;
    vectorMatch: number;
    latency: string;
    latencyPercentage: number;
}

const Playground: React.FC = () => {
    const terminalBodyRef = useRef<HTMLDivElement | null>(null);

    const [stats, setStats] = useState<MonitorStats>({
        state: 'IDLE',
        context: 92,
        vectorMatch: 0.88,
        latency: '12.8ms',
        latencyPercentage: 65
    });

    const [terminalLines, setTerminalLines] = useState<TerminalLine[]>([
        { type: 'input', text: 'saran-agent@portfolio:~$ init_copilot --mode=autonomous' },
        { type: 'system', text: 'Loading Claude-LLM pipelines & embeddings index... Done.' },
        { type: 'system', text: 'Indexing 9,447 legal clauses for vector retriever... Done.' },
        { type: 'system', html: '<span class="text-purple">[SYSTEM]</span> AI Agent initialized successfully! Select a script to run:' }
    ]);

    const [isExecuting, setIsExecuting] = useState(false);

    // Auto-scroll terminal to bottom when lines change
    useEffect(() => {
        if (terminalBodyRef.current) {
            terminalBodyRef.current.scrollTop = terminalBodyRef.current.scrollHeight;
        }
    }, [terminalLines]);

    const commandResponses: { [key: string]: string } = {
        analyze_contract: `
            <div class="terminal-output-block">
                <p class="text-success font-semibold">Executing analyze_contract.sh ...</p>
                <p class="text-muted mt-1">&gt; Ingesting sample_employment_contract.pdf (4 pages)</p>
                <p class="text-muted">&gt; Running PyMuPDF parsing &amp; OCR segments ... Done.</p>
                <p class="text-muted">&gt; Computing cosine similarity against 9,447 annotated legal clauses ...</p>
                <p class="text-accent mt-2 font-mono">=== RETRIEVAL RESULTS (Top 2 Matches) ===</p>
                <p class="text-muted">[Match 1] Row 842 - Non-Compete Scope Restriction (Sim: 0.941)</p>
                <p class="text-muted">[Match 2] Row 156 - Liquidated Damages Auto-settlements (Sim: 0.812)</p>
                <p class="text-accent mt-2 font-mono">=== LLM EXPLANATION (Fine-Tuned RoBERTa SLM) ===</p>
                <p class="text-light mt-1 leading-relaxed italic">
                    "Warning: Clause 4.2 contains a wide geographical non-compete constraint that exceeds standard municipal guidelines. Risk Rating: High. Recommend renegotiating limits to match local jurisdiction bounds."
                </p>
                <p class="text-amber mt-2 font-semibold">Decision: Flagged 2 High Risk Clauses. Overall Score: 78/100 (Unbalanced)</p>
            </div>
        `,
        forecast_swing: `
            <div class="terminal-output-block">
                <p class="text-success font-semibold">Executing predict_election_swing.py ...</p>
                <p class="text-muted mt-1">&gt; Connecting to PostgreSQL database ... Connected.</p>
                <p class="text-muted">&gt; Loading Constituency voter weights &amp; ML swing prediction tables ...</p>
                <p class="text-accent mt-2 font-mono">=== TAMIL NADU SWING ANALYSIS PREDICTION ===</p>
                <p class="text-muted">&gt; Running prediction on: Constituency 234 - TN Central</p>
                <p class="text-muted">&gt; Simulated Survey Size: N=15,000 respondents</p>
                <p class="text-light mt-2 font-mono leading-relaxed">
                    [Prediction Output] Voter Swing Ratio: +4.82% towards incumbent Alliance.<br>
                    Confidence Score: 94.5%<br>
                    Main Factors: High rural agricultural wallet payouts (+8.2% credit sentiment in AgriConnect wallets).
                </p>
                <p class="text-success mt-2 font-semibold">Swing Prediction Success. constituency_id=234 compiled successfully.</p>
            </div>
        `,
        get_ai_hacks: `
            <div class="terminal-output-block">
                <p class="text-success font-semibold">Executing fetch_productivity_hacks.sh ...</p>
                <p class="text-accent mt-2 font-mono">=== AI ENGINEERING HACKS FOR BUILDERS ===</p>
                <div class="text-light mt-1 leading-relaxed">
                    <p class="mt-1"><strong>1. Safe SQL generation from prompts:</strong> Always isolate prompt variables in LLM contexts. Map schema tables as strict metadata schemas instead of exposing raw db structures to the LLM.</p>
                    <p class="mt-1"><strong>2. High-performance RAG:</strong> Chunk documents semantically based on legal sentences rather than fixed character chunks. We used SentenceTransformers (all-mpnet-base-v2) for superior vector retrieval.</p>
                    <p class="mt-1"><strong>3. Model Quantization:</strong> Deploy your SLMs on serverless providers like Modal using LoRA adapters to drastically reduce cold-start latency to under 30 seconds.</p>
                </div>
            </div>
        `,
        test_firewall: `
            <div class="terminal-output-block">
                <p class="text-success font-semibold">Executing eval_waf_firewall.sh ...</p>
                <p class="text-muted mt-1">&gt; Simulating payload: <code>GET /search?q=' OR 1=1 --</code></p>
                <p class="text-muted">&gt; Passing stream through DistilBERT anomaly tokenizer ...</p>
                <p class="text-accent mt-2 font-mono">=== WEB APPLICATION FIREWALL CLASSIFIER ===</p>
                <p class="text-light font-mono">
                    Tokenized representation length: 14 tokens<br>
                    Inference latency: 12.8ms<br>
                    Threat Prediction: <span class="text-red">99.85% Attack Probability</span><br>
                    WAF Action: <span class="text-red">BLOCKED</span> (Code 403 Forbidden)
                </p>
                <p class="text-success mt-2 font-semibold">Evaluation complete. Firewall successfully blocked SQL injection payload.</p>
            </div>
        `
    };

    const handleRunScript = (cmd: string, cmdLabel: string) => {
        if (isExecuting) return;
        setIsExecuting(true);

        // 1. Spiking Stats Monitor
        setStats({
            state: 'RUNNING',
            context: 96,
            vectorMatch: cmd === 'analyze_contract' ? 0.94 : 0.85,
            latency: cmd === 'test_firewall' ? '12.8ms' : (cmd === 'analyze_contract' ? '85.2ms' : '44.6ms'),
            latencyPercentage: cmd === 'analyze_contract' ? 90 : 72
        });

        // 2. Append Command Input Line
        setTerminalLines(prev => [
            ...prev,
            { type: 'input', text: `saran-agent@portfolio:~$ run ${cmdLabel}` },
            { type: 'loading', text: 'Processing agent task...' }
        ]);

        setTimeout(() => {
            // 3. Complete Script execution
            setTerminalLines(prev => {
                const cleaned = prev.filter(line => line.type !== 'loading');
                return [
                    ...cleaned,
                    { type: 'output', html: commandResponses[cmd] }
                ];
            });

            // 4. Stabilize/Reset Monitor Stats
            setStats(prev => ({
                ...prev,
                state: 'IDLE',
                context: 92
            }));
            setIsExecuting(false);
        }, 850);
    };

    return (
        <div id="playground" className="tab-pane active">
            <div className="playground-layout">
                {/* Column 1: Shell Terminal */}
                <div className="terminal-mockup">
                    <div className="terminal-header">
                        <div className="terminal-buttons">
                            <span className="term-btn close"></span>
                            <span className="term-btn minimize"></span>
                            <span className="term-btn expand"></span>
                        </div>
                        <div className="terminal-title">bash - saran-agent@ai-base</div>
                    </div>
                    <div className="terminal-body" ref={terminalBodyRef}>
                        {terminalLines.map((line, idx) => (
                            <div key={idx} className="term-line">
                                {line.type === 'input' && (
                                    <>
                                        <span className="text-success">saran-agent@portfolio:~$</span>{' '}
                                        {line.text?.substring(27)}
                                    </>
                                )}
                                {line.type === 'system' && (
                                    line.html ? (
                                        <span dangerouslySetInnerHTML={{ __html: line.html }} />
                                    ) : (
                                        <span className="text-muted">{line.text}</span>
                                    )
                                )}
                                {line.type === 'loading' && (
                                    <span className="text-muted italic animate-pulse-slow">{line.text}</span>
                                )}
                                {line.type === 'output' && line.html && (
                                    <div dangerouslySetInnerHTML={{ __html: line.html }} />
                                )}
                            </div>
                        ))}
                    </div>
                    <div className="term-menu" style={{ padding: '0 24px 24px 24px', background: 'rgba(3,7,18,0.95)' }}>
                        <button 
                            className="term-cmd-btn" 
                            disabled={isExecuting}
                            onClick={() => handleRunScript('analyze_contract', 'analyze_contract.sh')}
                        >
                            analyze_contract.sh
                        </button>
                        <button 
                            className="term-cmd-btn" 
                            disabled={isExecuting}
                            onClick={() => handleRunScript('forecast_swing', 'predict_election_swing.py')}
                        >
                            predict_election_swing.py
                        </button>
                        <button 
                            className="term-cmd-btn" 
                            disabled={isExecuting}
                            onClick={() => handleRunScript('get_ai_hacks', 'fetch_productivity_hacks.sh')}
                        >
                            fetch_productivity_hacks.sh
                        </button>
                        <button 
                            className="term-cmd-btn" 
                            disabled={isExecuting}
                            onClick={() => handleRunScript('test_firewall', 'eval_waf_firewall.sh')}
                        >
                            eval_waf_firewall.sh
                        </button>
                    </div>
                </div>

                {/* Column 2: System Monitor Stats Panel */}
                <div className="system-stats-panel">
                    <h3>
                        <svg viewBox="0 0 16 16" width="16" height="16" fill="currentColor">
                            <path d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0zM1.5 8a6.5 6.5 0 1 0 13 0 6.5 6.5 0 0 0-13 0zm7.25-3.25v3.5a.75.75 0 0 1-1.5 0v-3.5a.75.75 0 0 1 1.5 0zm0 5.5a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0z"></path>
                        </svg>
                        Agent Status Monitor
                    </h3>
                    <div className="stat-row">
                        <div className="stat-label-container">
                            <span className="stat-label">Model Context Window</span>
                            <span className="stat-val text-accent">{stats.context}%</span>
                        </div>
                        <div className="stat-progress-bar">
                            <div className="stat-progress-fill bg-blue-fill" style={{ width: `${stats.context}%` }}></div>
                        </div>
                    </div>
                    <div className="stat-row">
                        <div className="stat-label-container">
                            <span className="stat-label">RAG Vector Match (Cosine)</span>
                            <span className="stat-val text-success">{stats.vectorMatch}</span>
                        </div>
                        <div className="stat-progress-bar">
                            <div className="stat-progress-fill bg-emerald-fill" style={{ width: `${stats.vectorMatch * 100}%` }}></div>
                        </div>
                    </div>
                    <div className="stat-row">
                        <div className="stat-label-container">
                            <span className="stat-label">LoRA Inference Latency</span>
                            <span className="stat-val text-purple">{stats.latency}</span>
                        </div>
                        <div className="stat-progress-bar">
                            <div className="stat-progress-fill bg-purple-fill" style={{ width: `${stats.latencyPercentage}%` }}></div>
                        </div>
                    </div>
                    <hr style={{ margin: '4px 0', borderColor: 'rgba(255,255,255,0.04)' }} />
                    <div className="radar-grid">
                        <div className="radar-item">
                            <span>Agent State</span>
                            <span className={stats.state === 'IDLE' ? 'text-success' : 'text-amber'} style={{ animation: 'term-pulse 2s infinite ease-in-out' }}>
                                {stats.state}
                            </span>
                        </div>
                        <div className="radar-item">
                            <span>Loaded Weights</span>
                            <span>DistilBERT / LLaMA</span>
                        </div>
                        <div className="radar-item">
                            <span>Pinecone Index</span>
                            <span>9,447 Vectors</span>
                        </div>
                        <div className="radar-item">
                            <span>Active Stream</span>
                            <span>SSE / WebSockets</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Playground;
