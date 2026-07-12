document.addEventListener("DOMContentLoaded", () => {
    // -------------------------------------------------------------------------
    // 1. TAB SYSTEM WIDGET WITH INTERACTIVE FADE
    // -------------------------------------------------------------------------
    const tabLinks = document.querySelectorAll(".tab-link");
    const tabPanes = document.querySelectorAll(".tab-pane");

    tabLinks.forEach(link => {
        link.addEventListener("click", () => {
            tabLinks.forEach(btn => btn.classList.remove("active"));
            tabPanes.forEach(pane => pane.classList.remove("active"));

            link.classList.add("active");
            const targetTab = link.getAttribute("data-tab");
            const activePane = document.getElementById(targetTab);
            activePane.classList.add("active");

            // Custom stats animation trigger when switching to playground
            if (targetTab === "playground") {
                animateProgressGauges();
            }
        });
    });

    // -------------------------------------------------------------------------
    // 2. DYNAMIC GITHUB HEATMAP SIMULATION & SIMULATOR BUTTON
    // -------------------------------------------------------------------------
    const heatmapGrid = document.getElementById("heatmapGrid");
    const simulateBtn = document.getElementById("simulateCommitBtn");
    const daysOfWeek = 7;
    const totalDays = 53 * daysOfWeek; // 371 squares
    
    // Generate dates starting one year ago
    const startDate = new Date();
    startDate.setFullYear(startDate.getFullYear() - 1);
    
    const squaresList = [];

    // Generate custom commits levels with random clusters (weekday bias)
    for (let i = 0; i < totalDays; i++) {
        const square = document.createElement("div");
        square.className = "square";
        
        const date = new Date(startDate);
        date.setDate(startDate.getDate() + i);
        
        const day = date.getDay();
        const isWeekend = (day === 0 || day === 6);
        
        // Commits level weighting logic
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
        
        square.classList.add(`level-${level}`);
        square.dataset.date = date.toISOString();
        square.dataset.level = level;
        
        const commitCount = level === 0 ? "No" : level * 2 + Math.floor(Math.random() * 3);
        const dateStr = date.toLocaleDateString("en-US", { month: 'short', day: 'numeric', year: 'numeric' });
        square.setAttribute("title", `${commitCount} contributions on ${dateStr}`);
        
        heatmapGrid.appendChild(square);
        squaresList.push(square);
    }

    // Simulate Commit Click Interaction
    if (simulateBtn) {
        simulateBtn.addEventListener("click", () => {
            // Pick a random square to light up
            const randomIndex = Math.floor(Math.random() * squaresList.length);
            const targetSquare = squaresList[randomIndex];
            
            // Set it to max level and trigger a visual pop animation
            targetSquare.className = "square level-4";
            targetSquare.style.transform = "scale(1.6)";
            
            const date = new Date(targetSquare.dataset.date);
            const dateStr = date.toLocaleDateString("en-US", { month: 'short', day: 'numeric', year: 'numeric' });
            const newCount = 8 + Math.floor(Math.random() * 4);
            targetSquare.setAttribute("title", `${newCount} contributions on ${dateStr} (Simulated)`);

            // Temporarily change button text to show success feedback
            const originalText = simulateBtn.textContent;
            simulateBtn.textContent = "✔ Contribution Pushed!";
            simulateBtn.style.borderColor = "var(--accent-emerald)";
            simulateBtn.style.color = "var(--accent-emerald)";

            setTimeout(() => {
                targetSquare.style.transform = "";
                simulateBtn.textContent = originalText;
                simulateBtn.style.borderColor = "";
                simulateBtn.style.color = "";
            }, 1000);
        });
    }

    // -------------------------------------------------------------------------
    // 3. HTML5 CANVAS NEURAL NET + CODE PARTICLES SYSTEM (MOUSE REACTIVE)
    // -------------------------------------------------------------------------
    const canvas = document.getElementById("particleCanvas");
    const ctx = canvas.getContext("2d");
    
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);
    
    // Mouse Position Tracker
    const mouse = {
        x: null,
        y: null,
        radius: 120
    };

    window.addEventListener("mousemove", (e) => {
        mouse.x = e.x;
        mouse.y = e.y;
    });

    window.addEventListener("mouseout", () => {
        mouse.x = null;
        mouse.y = null;
    });

    window.addEventListener("resize", () => {
        width = (canvas.width = window.innerWidth);
        height = (canvas.height = window.innerHeight);
    });

    const particles = [];
    const particleCount = 60;
    const maxDistance = 120;
    const codeWords = ["</>", "AI.BASE", "RAG", "LLM", "WAF", "C++", "Python", "Node", "Postgres", "PyTorch", "LoRA", "const"];
    
    class Particle {
        constructor() {
            this.x = Math.random() * width;
            this.y = Math.random() * height;
            this.vx = (Math.random() - 0.5) * 0.4;
            this.vy = (Math.random() - 0.5) * 0.4;
            this.baseRadius = Math.random() * 1.5 + 1;
            this.r = this.baseRadius;
            this.word = Math.random() > 0.6 ? codeWords[Math.floor(Math.random() * codeWords.length)] : null;
        }
        
        update() {
            // Interactive mouse repelling logic
            if (mouse.x != null && mouse.y != null) {
                const dx = this.x - mouse.x;
                const dy = this.y - mouse.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < mouse.radius) {
                    const force = (mouse.radius - dist) / mouse.radius;
                    const angle = Math.atan2(dy, dx);
                    this.x += Math.cos(angle) * force * 2;
                    this.y += Math.sin(angle) * force * 2;
                    this.r = this.baseRadius * 1.6;
                } else {
                    this.r = this.baseRadius;
                }
            } else {
                this.r = this.baseRadius;
            }

            this.x += this.vx;
            this.y += this.vy;
            
            // Bounce walls
            if (this.x < 0 || this.x > width) this.vx *= -1;
            if (this.y < 0 || this.y > height) this.vy *= -1;
        }
        
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
            ctx.fillStyle = "rgba(100, 116, 139, 0.22)";
            ctx.fill();
            
            if (this.word) {
                ctx.fillStyle = "rgba(56, 189, 248, 0.18)";
                ctx.font = "10px JetBrains Mono";
                ctx.fillText(this.word, this.x + 8, this.y + 4);
            }
        }
    }
    
    // Spawn particles
    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }
    
    function animate() {
        ctx.clearRect(0, 0, width, height);
        
        particles.forEach(p => {
            p.update();
            p.draw();
        });
        
        // Draw connection networks
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                
                if (dist < maxDistance) {
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    
                    // Increase line opacity if near mouse
                    let baseAlpha = 0.09 * (1 - dist / maxDistance);
                    if (mouse.x != null && mouse.y != null) {
                        const midX = (particles[i].x + particles[j].x) / 2;
                        const midY = (particles[i].y + particles[j].y) / 2;
                        const mDist = Math.sqrt((midX - mouse.x)**2 + (midY - mouse.y)**2);
                        if (mDist < mouse.radius) {
                            baseAlpha *= 2.2;
                        }
                    }
                    
                    ctx.strokeStyle = `rgba(56, 189, 248, ${baseAlpha})`;
                    ctx.lineWidth = 0.8;
                    ctx.stroke();
                }
            }
        }
        
        requestAnimationFrame(animate);
    }
    animate();

    // -------------------------------------------------------------------------
    // 4. INTERACTIVE TERMINAL PLAYGROUND & MONITOR SYNCHRONIZER
    // -------------------------------------------------------------------------
    const termCmdBtns = document.querySelectorAll(".term-cmd-btn");
    const terminalResponse = document.getElementById("terminalResponse");
    
    // Status indicators HTML nodes
    const contextWindowStat = document.getElementById("contextWindowStat");
    const vectorMatchStat = document.getElementById("vectorMatchStat");
    const latencyStat = document.getElementById("latencyStat");
    const agentStateStat = document.getElementById("agentStateStat");

    const fills = document.querySelectorAll(".stat-progress-fill");

    function animateProgressGauges() {
        // Simple animation to fill gauges when loading
        fills.forEach(fill => {
            const w = fill.style.width;
            fill.style.width = "0%";
            setTimeout(() => {
                fill.style.width = w;
            }, 100);
        });
    }

    const commandResponses = {
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

    termCmdBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            const cmd = btn.getAttribute("data-cmd");
            const cmdText = btn.textContent;
            
            // 1. Sync Stats Monitor to Running Mode
            if (agentStateStat) {
                agentStateStat.textContent = "RUNNING";
                agentStateStat.className = "text-amber";
            }
            
            // Randomly spike monitor progress values while executing
            if (contextWindowStat) {
                contextWindowStat.textContent = "96%";
                fills[0].style.width = "96%";
            }
            if (latencyStat) {
                // Pick a realistic spiked latency
                const spike = (cmd === 'test_firewall') ? "12.8ms" : (cmd === 'analyze_contract' ? "85.2ms" : "44.6ms");
                latencyStat.textContent = spike;
                fills[2].style.width = (cmd === 'analyze_contract' ? "90%" : "72%");
            }
            if (vectorMatchStat) {
                // Change cosine similarity matching value
                const matchVal = (cmd === 'analyze_contract') ? "0.94" : "0.85";
                vectorMatchStat.textContent = matchVal;
                fills[1].style.width = (cmd === 'analyze_contract' ? "94%" : "85%");
            }

            // 2. Print command line trigger
            const userLine = document.createElement("div");
            userLine.className = "term-line mt-4";
            userLine.innerHTML = `<span class="text-success">saran-agent@portfolio:~$</span> run ${cmdText}`;
            
            // Print loading placeholder
            const loadLine = document.createElement("div");
            loadLine.className = "term-line text-muted italic animate-pulse-slow";
            loadLine.textContent = "Processing agent task...";
            
            terminalResponse.appendChild(userLine);
            terminalResponse.appendChild(loadLine);
            
            // Auto scroll terminal
            const terminalBody = document.querySelector(".terminal-body");
            terminalBody.scrollTop = terminalBody.scrollHeight;
            
            setTimeout(() => {
                // Remove loading placeholder line
                loadLine.remove();
                
                // Append real-time command output
                const respDiv = document.createElement("div");
                respDiv.innerHTML = commandResponses[cmd];
                terminalResponse.appendChild(respDiv);
                
                // Reset Monitor Stats back to normal stable state
                if (agentStateStat) {
                    agentStateStat.textContent = "IDLE";
                    agentStateStat.className = "text-success";
                }
                if (contextWindowStat) {
                    contextWindowStat.textContent = "92%";
                    fills[0].style.width = "92%";
                }
                
                // Auto scroll terminal again
                terminalBody.scrollTop = terminalBody.scrollHeight;
            }, 850);
        });
    });
});
