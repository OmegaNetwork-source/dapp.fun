import React, { useState, useEffect, useRef } from 'react';

const Showcase = ({ onComplete }) => {
    const [scene, setScene] = useState('intro'); // intro, coding, success, compare, final
    const [progress, setProgress] = useState(0);
    const [codeText, setCodeText] = useState("");
    const targetCode = `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract AlphaProtocol {
    string public name = "Alpha";
    uint256 public supply = 1000000;
    
    function launch() public {
        // Broadcast to Omega...
    }
}`;

    // Time-based scene control
    useEffect(() => {
        let timer;
        if (scene === 'intro') {
            timer = setTimeout(() => setScene('coding'), 3500);
        } else if (scene === 'coding') {
            // Typewriter effect
            let charIndex = 0;
            const typeInterval = setInterval(() => {
                if (charIndex < targetCode.length) {
                    setCodeText(targetCode.substring(0, charIndex + 1));
                    charIndex++;
                } else {
                    clearInterval(typeInterval);
                    setTimeout(() => setScene('success'), 2000);
                }
            }, 25);
            return () => clearInterval(typeInterval);
        } else if (scene === 'success') {
            timer = setTimeout(() => setScene('compare'), 4500);
        } else if (scene === 'compare') {
            timer = setTimeout(() => setScene('final'), 6000);
        }
        return () => clearTimeout(timer);
    }, [scene]);

    // Styles
    const S = {
        bg: "#050505",
        silver: "#C0C0C0",
        white: "#FFFFFF",
        accent: "rgba(255,255,255,0.1)",
        border: "rgba(255,255,255,0.08)",
        panel: "#0a0a0a",
        fontMain: "'Inter', sans-serif",
        fontMono: "'JetBrains Mono', monospace"
    };

    const containerStyle = {
        height: "100vh", width: "100vw", background: S.bg, color: "#fff",
        fontFamily: S.fontMain, overflow: "hidden", position: "relative",
        display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center"
    };

    return (
        <div style={containerStyle}>
            {/* Dynamic Background */}
            <div className="showcase-glow" style={{ position: "absolute", width: "100%", height: "100%", background: "radial-gradient(circle at 50% 50%, rgba(255,255,255,0.02) 0%, transparent 70%)", pointerEvents: "none" }} />

            {/* Intro Scene */}
            {scene === 'intro' && (
                <div className="fade-in" style={{ textAlign: "center", zIndex: 10 }}>
                    <div className="logo-pulse" style={{ fontSize: 80, fontWeight: 900, letterSpacing: "-4px", marginBottom: 20 }}>DAPP.FUN</div>
                    <div style={{ fontSize: 24, fontWeight: 300, color: "rgba(255,255,255,0.5)", letterSpacing: "8px", textTransform: "uppercase" }}>High-Performance IDE</div>
                    <div className="line-grow" style={{ height: 1, width: 200, background: "rgba(255,255,255,0.2)", margin: "40px auto" }} />
                    <div className="blur-in" style={{ fontSize: 18, color: S.silver }}>Deploy Smart Contracts <b>10x Faster</b></div>
                </div>
            )}

            {/* Coding Scene (Actual Product Showcase) */}
            {scene === 'coding' && (
                <div className="slide-up" style={{ width: "95%", height: "85%", maxWidth: 1400, border: `1px solid ${S.border}`, background: "#080808", borderRadius: 24, overflow: "hidden", zIndex: 10, display: "flex", flexDirection: "column", boxShadow: "0 50px 100px rgba(0,0,0,0.8)" }}>
                    {/* Mock TopBar */}
                    <div style={{ padding: "12px 24px", background: "#0c0c0c", borderBottom: `1px solid ${S.border}`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                            <div style={{ display: "flex", gap: 6 }}>
                                <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#ff5f56" }} />
                                <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#ffbd2e" }} />
                                <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#27c93f" }} />
                            </div>
                            <span style={{ fontSize: 12, fontWeight: 700, color: "rgba(255,255,255,0.4)" }}>DappForge Workspace</span>
                        </div>
                        <div style={{ padding: "6px 16px", borderRadius: 10, background: "rgba(255,255,255,0.05)", border: `1px solid ${S.border}`, fontSize: 11, color: "#fff", fontWeight: 700 }}>Network: Omega Mainnet</div>
                    </div>

                    <div style={{ flex: 1, display: "flex", overflow: "hidden" }}>
                        {/* Mock Sidebar */}
                        <div style={{ width: 240, borderRight: `1px solid ${S.border}`, padding: 20, background: "#090909" }}>
                            <div style={{ fontSize: 10, fontWeight: 800, color: "rgba(255,255,255,0.2)", textTransform: "uppercase", letterSpacing: "1.5px", marginBottom: 20 }}>Workspace Files</div>
                            <div style={{ fontSize: 13, color: "rgba(255,255,255,0.5)", marginBottom: 12 }}>📁 contracts</div>
                            <div style={{ fontSize: 13, color: "#fff", padding: "8px 12px", background: "rgba(255,255,255,0.05)", borderRadius: 8, marginLeft: 12 }}>📄 AlphaProtocol.sol</div>
                            <div style={{ fontSize: 13, color: "rgba(255,255,255,0.5)", marginTop: 12 }}>📁 scripts</div>
                            <div style={{ fontSize: 13, color: "rgba(255,255,255,0.5)", marginTop: 12 }}>📁 tests</div>
                        </div>

                        {/* Main Editor Body */}
                        <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
                            <div style={{ flex: 1, padding: 40, fontFamily: S.fontMono, fontSize: 15, lineHeight: 1.6, color: "#ccc", background: "#060606", position: "relative" }}>
                                <pre style={{ margin: 0 }}>{codeText}<span className="cursor">|</span></pre>

                                {codeText.length > targetCode.length - 10 && (
                                    <div className="compile-badge" style={{ position: "absolute", bottom: 40, right: 40, padding: "16px 32px", background: "#fff", color: "#000", fontWeight: 900, fontSize: 14, borderRadius: 14, boxShadow: "0 10px 40px rgba(255,255,255,0.2)", display: "flex", alignItems: "center", gap: 8 }}>
                                        ✓ COMPILED SUCCESS
                                    </div>
                                )}
                            </div>

                            {/* Mock Console */}
                            <div style={{ height: 160, background: "#0a0a0a", borderTop: `1px solid ${S.border}`, padding: "20px 24px", fontFamily: S.fontMono, fontSize: 12 }}>
                                <div style={{ color: "rgba(255,255,255,0.3)", marginBottom: 8, fontWeight: 800 }}>TERMINAL</div>
                                {codeText.length > 50 && <div style={{ color: "#4ade80" }}>[system] Optimization cycle complete.</div>}
                                {codeText.length > 100 && <div style={{ color: "rgba(255,255,255,0.6)" }}>[solc] Generating bytecode for AlphaProtocol...</div>}
                                {codeText.length > targetCode.length - 20 && <div style={{ color: "#fff", fontWeight: 700 }}>[deploy] Ready for broadcast to Omega Network.</div>}
                            </div>
                        </div>

                        {/* Mock Protocol Inspector (Right Column) */}
                        <div style={{ width: 320, background: "#080808", borderLeft: `1px solid ${S.border}`, padding: 30 }}>
                            <div style={{ fontSize: 10, fontWeight: 800, color: "rgba(255,255,255,0.2)", textTransform: "uppercase", letterSpacing: "2px", marginBottom: 30 }}>Protocol Manifest</div>

                            <div style={{ padding: 20, borderRadius: 16, background: "rgba(255,255,255,0.02)", border: `1px solid ${S.border}`, marginBottom: 24 }}>
                                <div style={{ fontSize: 11, color: "rgba(255,255,255,0.4)", marginBottom: 8 }}>Resource Estimate</div>
                                <div style={{ fontSize: 28, fontWeight: 800 }}>1.2M <span style={{ fontSize: 14, color: "rgba(255,255,255,0.2)" }}>Gas</span></div>
                            </div>

                            <div style={{ padding: 20, borderRadius: 16, background: "rgba(255,255,255,0.02)", border: `1px solid ${S.border}` }}>
                                <div style={{ fontSize: 11, color: "rgba(255,255,255,0.4)", marginBottom: 12 }}>Security Standards</div>
                                <div style={{ color: "#fff", fontSize: 13, fontWeight: 600 }}>🛡️ OpenZeppelin Verified</div>
                                <div style={{ color: "#fff", fontSize: 13, fontWeight: 600, marginTop: 8 }}>🛡️ Reentrancy Guards Active</div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Success Scene */}
            {scene === 'success' && (
                <div className="zoom-in" style={{ textAlign: "center", zIndex: 10 }}>
                    <div className="success-icon" style={{ width: 140, height: 140, borderRadius: "50%", border: "2px solid #fff", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 40px", boxShadow: "0 0 50px rgba(255,255,255,0.2)" }}>
                        <div style={{ fontSize: 80 }}>✓</div>
                    </div>
                    <h2 style={{ fontSize: 56, fontWeight: 900, marginBottom: 16, letterSpacing: "-2px" }}>Deployment Broadcasted</h2>
                    <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 24, fontWeight: 300 }}>Instantiated on <b>Omega Network</b> Mainnet</p>

                    <div style={{ marginTop: 50, padding: "24px 48px", background: "rgba(255,255,255,0.03)", border: `1px solid ${S.border}`, borderRadius: 24, display: "inline-block", textAlign: "left" }}>
                        <div style={{ fontSize: 12, color: "rgba(255,255,255,0.3)", marginBottom: 8, letterSpacing: "1px" }}>TRANSACTION HASH</div>
                        <div style={{ fontFamily: S.fontMono, fontSize: 18, color: S.silver }}>0x8f2c73eb...b4c1a4e1a</div>
                    </div>
                </div>
            )}

            {/* Comparison Scene (Updated Reasons) */}
            {scene === 'compare' && (
                <div className="fade-in" style={{ width: "90%", maxWidth: 1200, zIndex: 10 }}>
                    <h2 style={{ fontSize: 44, fontWeight: 900, textAlign: "center", marginBottom: 70, letterSpacing: "-1.5px" }}>Why Builders Choose Dapp.Fun</h2>

                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 40, alignItems: "start" }}>
                        <div style={{ padding: 48, background: "rgba(255,255,255,0.01)", border: `1px solid ${S.border}`, borderRadius: 40, opacity: 0.6 }}>
                            <h3 style={{ fontSize: 24, color: "rgba(255,255,255,0.3)", marginBottom: 40, fontWeight: 800 }}>Others (Legacy Tools)</h3>
                            <div style={{ display: "flex", flexDirection: "column", gap: 24, fontSize: 17 }}>
                                <div style={{ color: "rgba(255,255,255,0.3)" }}>- Fragmented cross-chain workflow</div>
                                <div style={{ color: "rgba(255,255,255,0.3)" }}>- Manual contract boilerplate</div>
                                <div style={{ color: "rgba(255,255,255,0.3)" }}>- Dated, confusing interfaces</div>
                                <div style={{ color: "rgba(255,255,255,0.3)" }}>- No semantic understanding of code</div>
                                <div style={{ color: "rgba(255,255,255,0.3)" }}>- Painful bridge/deployment setup</div>
                            </div>
                        </div>

                        <div style={{ padding: 48, background: "rgba(255,255,255,0.05)", border: `1px solid rgba(255,255,255,0.2)`, borderRadius: 40, position: "relative", transform: "scale(1.05)", boxShadow: "0 40px 100px rgba(0,0,0,0.6)" }}>
                            <div style={{ position: "absolute", top: 24, right: 32, background: "#fff", color: "#000", fontSize: 11, fontWeight: 900, padding: "6px 14px", borderRadius: 20 }}>INDUSTRIAL GRADE</div>
                            <h3 style={{ fontSize: 28, color: "#fff", marginBottom: 40, fontWeight: 900 }}>Dapp.Fun</h3>
                            <div style={{ display: "flex", flexDirection: "column", gap: 24, fontSize: 18 }}>
                                <div style={{ fontWeight: 700, display: "flex", alignItems: "center", gap: 12 }}><span>✓</span> Pre-built Industry Templates</div>
                                <div style={{ fontWeight: 700, display: "flex", alignItems: "center", gap: 12 }}><span>✓</span> Native Network Integration</div>
                                <div style={{ fontWeight: 700, display: "flex", alignItems: "center", gap: 12 }}><span>✓</span> Solana Token Deployment</div>
                                <div style={{ fontWeight: 700, display: "flex", alignItems: "center", gap: 12 }}><span>✓</span> Solidity to Rust Translator</div>
                                <div style={{ fontWeight: 700, display: "flex", alignItems: "center", gap: 12 }}><span>✓</span> Ease of Use AI Core</div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Final Scene */}
            {scene === 'final' && (
                <div className="fade-in" style={{ textAlign: "center", zIndex: 10 }}>
                    <div style={{ fontSize: 72, fontWeight: 900, marginBottom: 24, letterSpacing: "-3px", lineHeight: 1 }}>Build Smarter.<br />Launch Absolute.</div>
                    <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 22, marginBottom: 50, fontWeight: 300 }}>The silver standard for protocol engineering.</p>

                    <button onClick={() => onComplete()} className="cta-btn" style={{
                        padding: "24px 60px", borderRadius: 60, background: "#fff", border: "none", color: "#000", fontWeight: 900,
                        fontSize: 20, cursor: "pointer", boxShadow: "0 20px 50px rgba(255,255,255,0.3)"
                    }}>
                        Enter the Workspace
                    </button>
                </div>
            )}

            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;700;800;900&family=JetBrains+Mono:wght@400;700&display=swap');
                
                .fade-in { animation: fadeIn 1.2s ease forwards; }
                .slide-up { animation: slideUp 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
                .zoom-in { animation: zoomIn 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) forwards; }
                .blur-in { animation: blurIn 2s ease forwards; }
                
                @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
                @keyframes slideUp { from { opacity: 0; transform: translateY(60px) scale(0.95); } to { opacity: 1; transform: translateY(0) scale(1); } }
                @keyframes zoomIn { from { opacity: 0; transform: scale(0.85); } to { opacity: 1; transform: scale(1); } }
                @keyframes blurIn { from { opacity: 0; filter: blur(30px); } to { opacity: 1; filter: blur(0); } }
                
                .logo-pulse {
                    background: linear-gradient(to bottom, #fff, rgba(255,255,255,0.3));
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    animation: pulse 4s infinite;
                }
                @keyframes pulse { 0%, 100% { transform: scale(1); opacity: 0.9; } 50% { transform: scale(1.02); opacity: 1; } }
                
                .line-grow { animation: grow 1.5s cubic-bezier(0.65, 0, 0.35, 1) forwards; }
                @keyframes grow { from { width: 0; } to { width: 300px; } }
                
                .cursor { animation: blink 1s step-end infinite; background: #fff; width: 2px; height: 1.2em; display: inline-block; vertical-align: middle; margin-left: 2px; }
                @keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }
                
                .success-icon { animation: successPulse 2s infinite; }
                @keyframes successPulse { 0%, 100% { box-shadow: 0 0 40px rgba(255,255,255,0.2); } 50% { box-shadow: 0 0 70px rgba(255,255,255,0.4); } }

                .cta-btn:hover { transform: translateY(-5px) scale(1.02); box-shadow: 0 30px 70px rgba(255,255,255,0.4); }
                .cta-btn { transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1); }
            `}</style>
        </div>
    );
};

export default Showcase;
