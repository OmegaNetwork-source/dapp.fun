import React, { useState, useEffect } from 'react';

const Showcase = ({ onComplete }) => {
    const [scene, setScene] = useState('intro'); // intro, agent, api, hype, final
    const [codeText, setCodeText] = useState("");
    const targetCode = `// AI Agent Request
POST https://api.dapp.fun/deploy
{
  "agent": "OpenClaw-v1",
  "task": "Deploy Yield Vault",
  "chain": "Omega-Mainnet",
  "status": "Broadcasting..."
}`;

    useEffect(() => {
        let timer;
        if (scene === 'intro') {
            timer = setTimeout(() => setScene('agent'), 3000);
        } else if (scene === 'agent') {
            timer = setTimeout(() => setScene('api'), 4000);
        } else if (scene === 'api') {
            let charIndex = 0;
            const typeInterval = setInterval(() => {
                if (charIndex < targetCode.length) {
                    setCodeText(targetCode.substring(0, charIndex + 1));
                    charIndex++;
                } else {
                    clearInterval(typeInterval);
                    setTimeout(() => setScene('hype'), 2000);
                }
            }, 30);
            return () => clearInterval(typeInterval);
        } else if (scene === 'hype') {
            timer = setTimeout(() => setScene('final'), 4500);
        }
        return () => clearTimeout(timer);
    }, [scene]);

    const S = {
        bg: "#020202",
        accent: "#FF4D4D", // OpenClaw Red
        glow: "rgba(255, 77, 77, 0.4)",
        fontMain: "'Outfit', sans-serif",
        fontMono: "'JetBrains Mono', monospace"
    };

    const containerStyle = {
        height: "100vh", width: "100vw", background: S.bg, color: "#fff",
        fontFamily: S.fontMain, overflow: "hidden", position: "relative",
        display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center"
    };

    return (
        <div style={containerStyle}>
            {/* Ambient Background Elements */}
            <div className="noise-bg" />
            <div style={{
                position: "absolute", inset: 0,
                background: `radial-gradient(circle at center, ${S.glow} 0%, transparent 60%)`,
                opacity: scene === 'agent' || scene === 'hype' ? 0.15 : 0.05,
                transition: "opacity 2s ease"
            }} />

            {/* INTRO SCENE: The Vision */}
            {scene === 'intro' && (
                <div className="scene-container intro-content">
                    <div className="label-top">EST. 2026</div>
                    <h1 className="hero-text">
                        <span className="gradient-text">FUTURE OF</span><br />
                        BLOCKCHAIN INFRA
                    </h1>
                    <div className="line-animate" />
                    <p className="sub-hero">THE INFRASTRUCTURE FOR THE AGENTIC AGE.</p>
                </div>
            )}

            {/* AGENT SCENE: The Professional AI */}
            {scene === 'agent' && (
                <div className="scene-container">
                    <div className="agent-ui-box">
                        <div className="ui-header">
                            <span className="dot" />
                            <span className="ui-title">OPENCLAW TERMINAL v2.0</span>
                        </div>
                        <div className="ui-body chat-mode">
                            <div className="chat-msg user">
                                <span className="pfp">👤</span>
                                <div className="bubble">"Can you deploy a DEX for me on all EVM networks?"</div>
                            </div>
                            <div className="chat-msg agent fade-in-delayed">
                                <span className="pfp">🦞</span>
                                <div className="bubble">"Sure! Deploying now..."</div>
                            </div>
                            <div className="deployment-log-mini">
                                <div className="log-line">→ OMEGA: <span className="green">DEPLOYED</span></div>
                                <div className="log-line">→ BASE: <span className="green">DEPLOYED</span></div>
                                <div className="log-line">→ ETHEREUM: <span className="green">DEPLOYED</span></div>
                                <div className="log-line">→ MONAD: <span className="green">DEPLOYING...</span></div>
                            </div>
                        </div>
                    </div>
                    <h2 className="scene-title">OPENCLAW <span style={{ color: S.accent }}>READY</span></h2>
                    <p className="scene-desc">Dapp.Fun API powers the world's most capable AI Agents.</p>
                </div>
            )}

            {/* API SCENE: The Infrastructure HUB */}
            {scene === 'api' && (
                <div className="scene-container api-visual-hub">
                    <div className="hub-wrapper">
                        <div className="central-core">
                            <div className="core-inner">
                                <span className="api-text">API</span>
                                <div className="core-glow" />
                            </div>
                            <div className="orbit-ring r1" />
                            <div className="orbit-ring r2" />
                            <div className="orbit-ring r3" />
                        </div>

                        <div className="network-nodes">
                            {['OMEGA', 'SOLANA', 'BASE', 'ETHEREUM', 'MONAD', 'SOMNIA'].map((name, i) => (
                                <div key={name} className={`node n${i}`}>
                                    <div className="node-dot" />
                                    <span className="node-name">{name}</span>
                                    <div className="data-beam" />
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="api-highlights">
                        <h2 className="api-title">GLOBAL <span className="shiny-text">INFRASTRUCTURE</span></h2>
                        <p className="api-subtitle">One Unified Endpoint. Unlimited Scalability.</p>
                        <div className="endpoint-pill">https://api.dapp.fun/v1/deploy</div>
                    </div>
                </div>
            )}

            {/* HYPE SCENE: The Impact */}
            {scene === 'hype' && (
                <div className="scene-container hype-content">
                    <div className="hype-grid">
                        <div className="hype-card c1">
                            <h3>INSTANT</h3>
                            <p>EVM & Solana Deployment</p>
                        </div>
                        <div className="hype-card c2 highlight">
                            <h3>HEADLESS</h3>
                            <p>Build with AI Logic</p>
                        </div>
                        <div className="hype-card c3">
                            <h3>FREE</h3>
                            <p>Omega Gasless Infra</p>
                        </div>
                    </div>
                    <h2 className="hype-main">ANYTHING. ANYWHERE. <span className="flash-text">NOW.</span></h2>
                </div>
            )}

            {/* FINAL SCENE: Call to action */}
            {scene === 'final' && (
                <div className="scene-container final-content">
                    <div className="final-logo">DAPP.FUN</div>
                    <h1 className="final-headline">BUILD SMARTER.<br />LAUNCH WITH AI.</h1>
                    <button className="launch-button" onClick={onComplete}>
                        GET API KEY
                        <div className="btn-glow" />
                    </button>
                    <div className="powered-by">POWERING OPENCLAW & AI AGENTIC AGE</div>
                </div>
            )}

            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;600;900&family=JetBrains+Mono&display=swap');

                .scene-container {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    text-align: center;
                    width: 100%;
                    max-width: 1200px;
                    animation: sceneIn 0.8s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
                }

                @keyframes sceneIn {
                    from { opacity: 0; transform: translateY(20px) scale(0.98); }
                    to { opacity: 1; transform: translateY(0) scale(1); }
                }

                .hero-text {
                    font-size: 8vw;
                    line-height: 0.9;
                    font-weight: 900;
                    letter-spacing: -4px;
                    margin: 20px 0;
                }

                .gradient-text {
                    background: linear-gradient(to right, #fff, #666);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                }

                .sub-hero {
                    font-size: 14px;
                    letter-spacing: 6px;
                    color: rgba(255,255,255,0.4);
                    margin-top: 20px;
                }

                /* New Agent UI */
                .agent-ui-box {
                    width: 400px;
                    border: 1px solid rgba(255, 77, 77, 0.2);
                    border-radius: 12px;
                    background: #111;
                    overflow: hidden;
                    margin-bottom: 40px;
                    box-shadow: 0 40px 100px rgba(0,0,0,0.8);
                }
                .ui-header {
                    background: #1a1a1a;
                    padding: 8px 16px;
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    border-bottom: 1px solid rgba(255,255,255,0.05);
                }
                .ui-header .dot { width: 6px; height: 6px; background: #FF4D4D; border-radius: 50%; box-shadow: 0 0 10px #FF4D4D; }
                .ui-title { font-size: 10px; font-family: ${S.fontMono}; color: #666; letter-spacing: 2px; }
                .ui-body.chat-mode { 
                    padding: 24px; 
                    flex-direction: column; 
                    align-items: flex-start;
                    gap: 16px; 
                }
                .chat-msg { display: flex; gap: 12px; align-items: flex-end; margin-bottom: 8px; width: 100%; text-align: left; }
                .chat-msg.user { flex-direction: row; }
                .chat-msg.agent { flex-direction: row; }
                .pfp { width: 28px; height: 28px; background: #222; border-radius: 50%; display: flex; alignItems: center; justifyContent: center; font-size: 14px; flex-shrink: 0; border: 1px solid rgba(255,255,255,0.1); }
                .bubble { 
                    padding: 10px 16px; 
                    border-radius: 12px; 
                    background: rgba(255,255,255,0.05); 
                    font-size: 13px; 
                    line-height: 1.4;
                    max-width: 80%;
                }
                .chat-msg.user .bubble { border-bottom-left-radius: 2px; }
                .chat-msg.agent .bubble { background: rgba(255, 77, 77, 0.1); border: 1px solid rgba(255, 77, 77, 0.2); border-bottom-left-radius: 2px; }
                
                .deployment-log-mini {
                    width: 100%;
                    padding: 12px;
                    background: #000;
                    border-radius: 8px;
                    font-family: ${S.fontMono};
                    font-size: 10px;
                    text-align: left;
                    margin-top: 8px;
                    border: 1px solid rgba(255,255,255,0.05);
                }
                .log-line { margin-bottom: 4px; color: rgba(255,255,255,0.4); }
                .green { color: #4ade80; font-weight: 900; }
                .fade-in-delayed { animation: sceneIn 0.5s ease 1s forwards; opacity: 0; }

                @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }

                .scene-title { font-size: 60px; font-weight: 900; letter-spacing: -2px; margin-bottom: 10px; }
                .scene-desc { font-size: 20px; color: rgba(255,255,255,0.6); }

                .status-badge {
                    margin-top: 30px;
                    padding: 8px 16px;
                    background: rgba(255, 77, 77, 0.1);
                    border: 1px solid ${S.accent};
                    border-radius: 4px;
                    font-size: 12px;
                    font-family: ${S.fontMono};
                    color: ${S.accent};
                    text-transform: uppercase;
                }

                /* API HUB Visualization */
                .api-visual-hub { perspective: 1000px; }
                .hub-wrapper {
                    position: relative;
                    width: 500px;
                    height: 500px;
                    margin-bottom: 60px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }
                .central-core {
                    width: 120px;
                    height: 120px;
                    background: rgba(255, 77, 77, 0.1);
                    border: 1px solid rgba(255, 77, 77, 0.4);
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    position: relative;
                    z-index: 10;
                    box-shadow: 0 0 50px rgba(255, 77, 77, 0.3);
                }
                .core-inner { font-weight: 900; font-size: 24px; letter-spacing: 2px; position: relative; }
                .core-glow {
                    position: absolute;
                    inset: -20px;
                    background: radial-gradient(circle, rgba(255, 77, 77, 0.4) 0%, transparent 70%);
                    animation: pulse 2s ease-in-out infinite;
                }
                .orbit-ring {
                    position: absolute;
                    border: 1px solid rgba(255,255,255,0.05);
                    border-radius: 50%;
                }
                .r1 { inset: -40px; }
                .r2 { inset: -80px; }
                .r3 { inset: -120px; }

                .node {
                    position: absolute;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    gap: 10px;
                }
                .node-dot { width: 10px; height: 10px; background: #fff; border-radius: 50%; box-shadow: 0 0 15px #fff; }
                .node-name { font-size: 10px; font-weight: 900; opacity: 0.5; letter-spacing: 1px; }

                /* Node Positions */
                .n0 { top: 0; left: 50%; transform: translateX(-50%); }
                .n1 { top: 25%; right: 0; }
                .n2 { bottom: 25%; right: 0; }
                .n3 { bottom: 0; left: 50%; transform: translateX(-50%); }
                .n4 { bottom: 25%; left: 0; }
                .n5 { top: 25%; left: 0; }

                .data-beam {
                    position: absolute;
                    width: 2px;
                    height: 100px;
                    background: linear-gradient(to bottom, transparent, rgba(255, 77, 77, 0.8), transparent);
                    top: 50%;
                    left: 50%;
                    transform-origin: top center;
                    animation: beamFlow 3s linear infinite;
                    opacity: 0;
                }

                @keyframes beamFlow {
                    0% { transform: translateY(-50%) scaleY(0); opacity: 0; }
                    50% { opacity: 1; }
                    100% { transform: translateY(50%) scaleY(1); opacity: 0; }
                }

                .shiny-text {
                    background: linear-gradient(to bottom, #fff, #999);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                }
                .endpoint-pill {
                    margin-top: 24px;
                    padding: 12px 24px;
                    background: rgba(255,255,255,0.05);
                    border: 1px solid rgba(255,255,255,0.1);
                    border-radius: 40px;
                    font-family: ${S.fontMono};
                    font-size: 14px;
                    color: rgba(255,255,255,0.6);
                }

                /* Hype Grid */
                .hype-grid {
                    display: grid;
                    grid-template-columns: repeat(3, 1fr);
                    gap: 24px;
                    margin-bottom: 60px;
                    width: 100%;
                }
                .hype-card {
                    padding: 40px;
                    background: rgba(255,255,255,0.02);
                    border: 1px solid rgba(255,255,255,0.05);
                    border-radius: 24px;
                    text-align: left;
                }
                .hype-card.highlight {
                    background: rgba(255, 77, 77, 0.05);
                    border: 1px solid rgba(255, 77, 77, 0.2);
                }
                .hype-card h3 { font-size: 12px; letter-spacing: 2px; color: ${S.accent}; margin-bottom: 10px; }
                .hype-card p { font-size: 24px; font-weight: 600; line-height: 1.2; }

                .hype-main { font-size: 72px; font-weight: 900; letter-spacing: -3px; }
                .flash-text { animation: flash 1s ease infinite alternate; color: ${S.accent}; }
                @keyframes flash { from { opacity: 0.3; } to { opacity: 1; } }

                /* Final */
                .final-logo { font-size: 24px; font-weight: 900; letter-spacing: 8px; color: ${S.accent}; margin-bottom: 30px; }
                .final-headline { font-size: 80px; font-weight: 900; letter-spacing: -4px; margin-bottom: 50px; }
                .launch-button {
                    padding: 24px 80px;
                    border-radius: 12px;
                    background: ${S.accent};
                    border: none;
                    color: #fff;
                    font-size: 20px;
                    font-weight: 900;
                    cursor: pointer;
                    position: relative;
                    transition: transform 0.2s;
                }
                .launch-button:hover { transform: scale(1.05); }
                .btn-glow {
                    position: absolute;
                    inset: -10px;
                    background: ${S.accent};
                    filter: blur(20px);
                    opacity: 0.3;
                    z-index: -1;
                }
                .powered-by {
                    margin-top: 40px;
                    font-size: 11px;
                    letter-spacing: 3px;
                    color: rgba(255,255,255,0.2);
                    text-transform: uppercase;
                }

                .noise-bg {
                    position: absolute;
                    inset: 0;
                    background-image: url("https://grainy-gradients.vercel.app/noise.svg");
                    opacity: 0.05;
                    pointer-events: none;
                }
            `}</style>
        </div>
    );
};

export default Showcase;
