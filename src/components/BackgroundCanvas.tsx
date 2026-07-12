import React, { useEffect, useRef } from 'react';

const BackgroundCanvas: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let width = (canvas.width = window.innerWidth);
        let height = (canvas.height = window.innerHeight);

        const mouse = {
            x: null as number | null,
            y: null as number | null,
            radius: 125,
        };

        const handleMouseMove = (e: MouseEvent) => {
            mouse.x = e.clientX;
            mouse.y = e.clientY;
        };

        const handleMouseLeave = () => {
            mouse.x = null;
            mouse.y = null;
        };

        const handleResize = () => {
            if (!canvas) return;
            width = (canvas.width = window.innerWidth);
            height = (canvas.height = window.innerHeight);
        };

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseout', handleMouseLeave);
        window.addEventListener('resize', handleResize);

        const particles: Particle[] = [];
        const particleCount = 65;
        const maxDistance = 110;
        const codeWords = ["</>", "AI.BASE", "RAG", "LLM", "WAF", "C++", "Python", "Node.js", "Postgres", "PyTorch", "LoRA", "const"];

        class Particle {
            x: number;
            y: number;
            vx: number;
            vy: number;
            baseRadius: number;
            r: number;
            word: string | null;

            constructor() {
                this.x = Math.random() * width;
                this.y = Math.random() * height;
                this.vx = (Math.random() - 0.5) * 0.35;
                this.vy = (Math.random() - 0.5) * 0.35;
                this.baseRadius = Math.random() * 1.5 + 1;
                this.r = this.baseRadius;
                this.word = Math.random() > 0.65 ? codeWords[Math.floor(Math.random() * codeWords.length)] : null;
            }

            update() {
                if (mouse.x !== null && mouse.y !== null) {
                    const dx = this.x - mouse.x;
                    const dy = this.y - mouse.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    if (dist < mouse.radius) {
                        const force = (mouse.radius - dist) / mouse.radius;
                        const angle = Math.atan2(dy, dx);
                        this.x += Math.cos(angle) * force * 1.8;
                        this.y += Math.sin(angle) * force * 1.8;
                        this.r = this.baseRadius * 1.5;
                    } else {
                        this.r = this.baseRadius;
                    }
                } else {
                    this.r = this.baseRadius;
                }

                this.x += this.vx;
                this.y += this.vy;

                if (this.x < 0 || this.x > width) this.vx *= -1;
                if (this.y < 0 || this.y > height) this.vy *= -1;
            }

            draw(context: CanvasRenderingContext2D) {
                context.beginPath();
                context.arc(this.x, this.y, this.r, 0, Math.PI * 2);
                context.fillStyle = "rgba(100, 116, 139, 0.2)";
                context.fill();

                if (this.word) {
                    context.fillStyle = "rgba(56, 189, 248, 0.16)";
                    context.font = "9px JetBrains Mono";
                    context.fillText(this.word, this.x + 8, this.y + 4);
                }
            }
        }

        // Spawn particles
        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle());
        }

        let animationFrameId: number;

        const animate = () => {
            if (!ctx) return;
            ctx.clearRect(0, 0, width, height);

            particles.forEach((p) => {
                p.update();
                p.draw(ctx);
            });

            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const dist = Math.sqrt(dx * dx + dy * dy);

                    if (dist < maxDistance) {
                        ctx.beginPath();
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);

                        let baseAlpha = 0.08 * (1 - dist / maxDistance);
                        if (mouse.x !== null && mouse.y !== null) {
                            const midX = (particles[i].x + particles[j].x) / 2;
                            const midY = (particles[i].y + particles[j].y) / 2;
                            const mDist = Math.sqrt((midX - mouse.x) ** 2 + (midY - mouse.y) ** 2);
                            if (mDist < mouse.radius) {
                                baseAlpha *= 2.0;
                            }
                        }

                        ctx.strokeStyle = `rgba(56, 189, 248, ${baseAlpha})`;
                        ctx.lineWidth = 0.75;
                        ctx.stroke();
                    }
                }
            }

            animationFrameId = requestAnimationFrame(animate);
        };

        animate();

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseout', handleMouseLeave);
            window.removeEventListener('resize', handleResize);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return <canvas id="particleCanvas" ref={canvasRef} />;
};

export default BackgroundCanvas;
