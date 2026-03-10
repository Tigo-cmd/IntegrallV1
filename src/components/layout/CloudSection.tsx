import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Layout, Smartphone, Cloud, RefreshCw, Activity, Layers, ArrowRight } from 'lucide-react';
import { FadeInView, StaggerChildren, StaggerItem } from '@/components/ui/fade-in-view';
import { AnimatedHeading } from '@/components/ui/animated-heading';

export const CloudSection = () => {
    const [relayActive, setRelayActive] = useState(true);
    const [sliderValue, setSliderValue] = useState(65);

    return (
        <section className="il-section" style={{ background: 'var(--il-bg-alt)', borderTop: '1px solid var(--il-border)' }}>
            <div className="il-container">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    {/* Left: Content */}
                    <FadeInView>
                        <span className="il-section-label">Enterprise Connectivity</span>
                        <AnimatedHeading text="IoT Management. At Scale." className="mb-6" />
                        <p className="il-section-desc text-left mx-0 mb-8 max-w-lg">
                            Take your hardware beyond the local network. Integrall provides native hooks for cloud connectivity, allowing you to build real-time monitoring and control dashboards in minutes.
                        </p>

                        <StaggerChildren className="space-y-6" stagger={0.1}>
                            <StaggerItem className="flex gap-4">
                                <div className="p-3 rounded-xl bg-cyan-500/10 border border-cyan-500/20 h-fit">
                                    <Layout className="size-5 text-[#00f2ff]" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-white uppercase tracking-tight text-sm">Low-Code Dashboards</h4>
                                    <p className="text-white/50 text-sm mt-1">Drag-and-drop web console for visualizing telemetry and controlling device fleets.</p>
                                </div>
                            </StaggerItem>
                            <StaggerItem className="flex gap-4">
                                <div className="p-3 rounded-xl bg-magenta-500/10 border border-magenta-500/20 h-fit">
                                    <Smartphone className="size-5 text-[#ff00e5]" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-white uppercase tracking-tight text-sm">Blynk App Integration</h4>
                                    <p className="text-white/50 text-sm mt-1">Full compatibility with the Blynk IoT app for instant iOS & Android remote control.</p>
                                </div>
                            </StaggerItem>
                            <StaggerItem className="flex gap-4">
                                <div className="p-3 rounded-xl bg-[var(--il-lime)]/10 border border-[var(--il-lime)]/20 h-fit">
                                    <RefreshCw className="size-5 text-[var(--il-lime)]" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-white uppercase tracking-tight text-sm">OTA Firmware Management</h4>
                                    <p className="text-white/50 text-sm mt-1">Push secure firmware updates to your devices wirelessly over the air.</p>
                                </div>
                            </StaggerItem>
                        </StaggerChildren>

                        <motion.div
                            className="mt-10"
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            transition={{ delay: 0.5 }}
                        >
                            <a
                                href="#"
                                className="inline-flex items-center gap-2 text-[#00f2ff] font-bold text-sm tracking-widest uppercase hover:gap-3 transition-all underline underline-offset-8 decoration-cyan-500/30"
                            >
                                Explorer Cloud Features <ArrowRight className="size-4" />
                            </a>
                        </motion.div>
                    </FadeInView>

                    {/* Right: Mock UI */}
                    <FadeInView delay={0.2} className="relative">
                        <div className="il-glass p-1 border-white/5 rounded-[2rem] bg-white/[0.02]">
                            <div className="bg-[#050505] rounded-[1.8rem] overflow-hidden border border-white/10 shadow-2xl">
                                {/* Dashboard Header */}
                                <div className="p-6 border-b border-white/5 flex justify-between items-center bg-white/[0.01]">
                                    <div className="flex items-center gap-3">
                                        <div className="size-8 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center">
                                            <Activity className="size-4 text-black" />
                                        </div>
                                        <div>
                                            <div className="text-[10px] text-white/30 uppercase tracking-[0.2em] font-bold">Project Dashboard</div>
                                            <div className="text-xs font-bold text-white uppercase tracking-tighter">Kitchen Automation v1</div>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="size-2 rounded-full bg-cyan-400 il-pulse" />
                                        <span className="text-[10px] text-cyan-400 font-bold uppercase tracking-widest">Online</span>
                                    </div>
                                </div>

                                {/* Dashboard Content */}
                                <div className="p-6 space-y-6">
                                    {/* Stats Grid */}
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/5">
                                            <div className="text-[9px] text-white/30 uppercase tracking-widest font-bold">Temperature</div>
                                            <div className="text-2xl font-black text-[var(--il-lime)] mt-1">24.5°C</div>
                                        </div>
                                        <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/5">
                                            <div className="text-[9px] text-white/30 uppercase tracking-widest font-bold">Humidity</div>
                                            <div className="text-2xl font-black text-[#00f2ff] mt-1">42%</div>
                                        </div>
                                    </div>

                                    {/* Live Control Widget */}
                                    <div className="p-6 rounded-2xl bg-gradient-to-b from-white/[0.05] to-transparent border border-white/5">
                                        <div className="flex justify-between items-center mb-6">
                                            <div>
                                                <div className="text-[10px] text-white/40 uppercase tracking-widest font-bold">Relay Switch</div>
                                                <div className="text-sm font-bold text-white uppercase mt-1">Water Pump #1</div>
                                            </div>
                                            <button
                                                onClick={() => setRelayActive(!relayActive)}
                                                className={`w-12 h-6 rounded-full transition-all duration-300 relative ${relayActive ? 'bg-cyan-500 shadow-[0_0_15px_rgba(0,242,255,0.4)]' : 'bg-white/10'}`}
                                            >
                                                <motion.div
                                                    className="absolute top-1 left-1 size-4 bg-white rounded-full shadow-lg"
                                                    animate={{ x: relayActive ? 24 : 0 }}
                                                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                                                />
                                            </button>
                                        </div>

                                        <div className="space-y-3">
                                            <div className="flex justify-between text-[9px] text-white/40 uppercase font-bold tracking-widest">
                                                <span>Servo Angle</span>
                                                <span className="text-[#ff00e5]">{sliderValue}°</span>
                                            </div>
                                            <input
                                                type="range"
                                                min="0"
                                                max="180"
                                                value={sliderValue}
                                                onChange={(e) => setSliderValue(parseInt(e.target.value))}
                                                className="w-full h-1 bg-white/10 rounded-full appearance-none cursor-pointer accent-[#ff00e5]"
                                            />
                                        </div>
                                    </div>

                                    {/* Chart Placeholder */}
                                    <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 overflow-hidden">
                                        <div className="text-[9px] text-white/30 uppercase tracking-widest font-bold mb-4">Signal Strength (dBm)</div>
                                        <div className="flex items-end gap-1 h-20">
                                            {[40, 65, 45, 80, 55, 90, 70, 85, 60, 95, 75, 50, 85].map((h, i) => (
                                                <motion.div
                                                    key={i}
                                                    className="flex-1 bg-gradient-to-t from-cyan-500/40 to-cyan-500/10 rounded-t-sm"
                                                    initial={{ height: 0 }}
                                                    whileInView={{ height: `${h}%` }}
                                                    transition={{ delay: i * 0.05, duration: 1 }}
                                                />
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Decorative Elements */}
                            <div className="absolute -top-10 -right-10 size-32 bg-cyan-500/20 blur-[80px] pointer-events-none" />
                            <div className="absolute -bottom-10 -left-10 size-32 bg-magenta-500/20 blur-[80px] pointer-events-none" />
                        </div>
                    </FadeInView>
                </div>
            </div>
        </section>
    );
};
