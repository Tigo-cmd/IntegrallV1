import React from 'react';
import { motion } from 'framer-motion';
import {
    Book,
    Terminal,
    Cpu,
    Wifi,
    Zap,
    Layout,
    Smartphone,
    ShieldCheck,
    ChevronRight,
    Download,
    ExternalLink,
    Code2,
    Box,
    Copy,
    Check,
    Home,
    Search,
    Thermometer,
    ArrowLeft
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { AnimatedHeading } from '@/components/ui/animated-heading';
import { FadeInView, StaggerChildren, StaggerItem } from '@/components/ui/fade-in-view';

const CodeBlock = ({ code, language }: { code: string; language: string }) => {
    const [copied, setCopied] = React.useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(code);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="relative group my-6">
            <div className="absolute -inset-2 bg-gradient-to-r from-cyan-500/10 to-transparent blur-xl rounded-xl opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="relative bg-[#080810] border border-white/5 rounded-xl overflow-hidden shadow-2xl">
                <div className="flex items-center justify-between px-4 py-2 bg-white/[0.03] border-b border-white/5">
                    <div className="flex gap-1.5 font-mono text-[9px] uppercase tracking-widest text-white/30">
                        {language}
                    </div>
                    <button
                        onClick={handleCopy}
                        className="text-white/30 hover:text-[#00f2ff] transition-colors"
                    >
                        {copied ? <Check className="size-3" /> : <Copy className="size-3" />}
                    </button>
                </div>
                <pre className="p-5 font-mono text-sm leading-relaxed overflow-x-auto text-white/70">
                    <code>{code}</code>
                </pre>
            </div>
        </div>
    );
};

export default function DocumentationPage() {
    return (
        <div className="min-h-screen bg-[#050505] text-white selection:bg-cyan-500/30">
            {/* Background Decor */}
            <div className="fixed inset-0 pointer-events-none">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-cyan-500/5 blur-[120px]" />
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-magenta-500/5 blur-[120px]" />
            </div>

            <div className="relative z-10 mx-auto max-w-7xl px-6 py-24 lg:grid lg:grid-cols-12 lg:gap-16">

                {/* Sidebar Nav */}
                <aside className="hidden lg:block lg:col-span-3 sticky top-24 h-fit">
                    <nav className="space-y-8">
                        <div>
                            <Link to="/" className="flex items-center gap-2 text-white/40 hover:text-white transition-colors mb-8 group no-underline">
                                <ArrowLeft className="size-4 group-hover:-translate-x-1 transition-transform" />
                                <span className="text-[10px] font-bold uppercase tracking-[0.2em]">Back to Home</span>
                            </Link>

                            <h5 className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#D4FF33] mb-4 px-2">Knowledge Base</h5>
                            <ul className="space-y-1">
                                {['Getting Started', 'Dependencies', 'WiFi Infrastructure', 'Hardware Ecosystem'].map((item, idx) => (
                                    <li key={item}>
                                        <a href={`#${item.toLowerCase().replace(/ /g, '-')}`} className="flex items-center gap-3 px-3 py-2 text-sm text-white/50 hover:text-white hover:bg-white/5 rounded-lg transition-all border border-transparent hover:border-white/5">
                                            <span className="text-[10px] text-white/20 font-mono w-4">{String(idx + 1).padStart(2, '0')}</span>
                                            {item}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div>
                            <h5 className="text-[10px] font-bold uppercase tracking-[0.3em] text-magenta-500 mb-4 px-2">Hardware Integration</h5>
                            <ul className="space-y-1 h-[350px] overflow-y-auto pr-2 custom-scrollbar">
                                {[
                                    { name: 'LCD', id: 'module-lcd' },
                                    { name: 'Servo', id: 'module-servo' },
                                    { name: 'Sensors', id: 'module-sensors' },
                                    { name: 'Relay', id: 'module-relay' },
                                    { name: 'Keypad', id: 'module-keypad' },
                                    { name: 'OLED', id: 'module-oled' },
                                    { name: 'Buzzer', id: 'module-buzzer' },
                                    { name: 'Audio (MP3)', id: 'module-audio-rich' },
                                    { name: 'RGB LED', id: 'module-rgb' },
                                    { name: 'Blinker', id: 'module-blinker' },
                                    { name: 'Camera', id: 'module-camera' },
                                    { name: 'Input UI', id: 'module-input' },
                                    { name: 'Storage', id: 'module-storage' },
                                    { name: 'Time & GPS', id: 'module-time' },
                                    { name: 'Wireless', id: 'module-comm' },
                                    { name: 'Power', id: 'module-power' },
                                    { name: 'Stepper', id: 'module-stepper' }
                                ].map((item, idx) => (
                                    <li key={item.id}>
                                        <a href={`#${item.id}`} className="flex items-center gap-3 px-3 py-2 text-sm text-white/50 hover:text-white hover:bg-white/5 rounded-lg transition-all border border-transparent hover:border-white/5">
                                            <span className="text-[10px] text-white/20 font-mono w-4">{String(idx + 5).padStart(2, '0')}</span>
                                            {item.name}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div>
                            <h5 className="text-[10px] font-bold uppercase tracking-[0.3em] text-cyan-500 mb-4 px-2">Advanced Core</h5>
                            <ul className="space-y-1">
                                {[
                                    { name: 'Project Presets', id: 'project-presets' },
                                    { name: 'IoT Cloud & Backend', id: 'iot-cloud-and-backend' },
                                    { name: 'Debugging', id: 'debugging' },
                                    { name: 'Configuration', id: 'configuration' }
                                ].map((item, idx) => (
                                    <li key={item.id}>
                                        <a href={`#${item.id}`} className="flex items-center gap-3 px-3 py-2 text-sm text-white/50 hover:text-white hover:bg-white/5 rounded-lg transition-all border border-transparent hover:border-white/5">
                                            <span className="text-[10px] text-white/20 font-mono w-4">{String(idx + 22).padStart(2, '0')}</span>
                                            {item.name}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="p-6 rounded-2xl bg-gradient-to-br from-[var(--il-lime)]/10 to-transparent border border-[var(--il-lime)]/20">
                            <h6 className="text-[10px] font-bold uppercase tracking-widest text-[var(--il-lime)] mb-2">Need Help?</h6>
                            <p className="text-xs text-white/40 leading-relaxed mb-4">Our community is active 24/7 on Discord and GitHub.</p>
                            <a href="#" className="text-xs font-bold uppercase tracking-tighter flex items-center gap-2 hover:gap-3 transition-all duration-300">
                                Join Community <ExternalLink style={{ color: 'var(--il-lime)' }} className="size-3" />
                            </a>
                        </div>
                    </nav>
                </aside>

                {/* Main Content */}
                <main className="lg:col-span-9">
                    <Link to="/" className="inline-flex lg:hidden items-center gap-2 text-white/40 hover:text-white transition-colors mb-12 group no-underline">
                        <ArrowLeft className="size-4 group-hover:-translate-x-1 transition-transform" />
                        <span className="text-[10px] font-bold uppercase tracking-[0.2em]">Back to Home</span>
                    </Link>

                    <FadeInView>
                        <div className="flex items-center gap-3 mb-8">
                            <Book className="size-5 text-[var(--il-lime)]" />
                            <span className="text-[10px] font-bold uppercase tracking-[0.5em] text-white/30">Release v1.0.4 Stable</span>
                        </div>
                        <AnimatedHeading text="Documentation" className="text-5xl lg:text-7xl mb-8" />
                        <p className="text-lg text-white/50 max-w-2xl leading-relaxed mb-12">
                            Welcome to the Integrall user guide. Build fast, safe, and powerful IoT projects with professional-grade abstraction.
                        </p>

                        {/* Quick Actions */}
                        <div className="grid sm:grid-cols-2 gap-4 mb-20">
                            <a href="#" className="group relative p-6 bg-white/[0.02] border border-white/5 rounded-2xl hover:bg-white/[0.04] transition-all overflow-hidden">
                                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                                    <Download className="size-16 rotate-[-10deg]" />
                                </div>
                                <div className="flex items-center gap-4 mb-4">
                                    <div className="p-2 rounded-lg bg-[var(--il-lime)]/10 text-[var(--il-lime)]">
                                        <Download className="size-5" />
                                    </div>
                                    <h4 className="font-bold uppercase tracking-tight">Main Library</h4>
                                </div>
                                <p className="text-sm text-white/40">Download the latest universal zip for Arduino IDE & PlatformIO.</p>
                                <div className="mt-4 flex items-center gap-2 text-[10px] font-bold text-[var(--il-lime)] uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
                                    Download v1.0.4 <ChevronRight className="size-3" />
                                </div>
                            </a>
                            <a href="#" className="group relative p-6 bg-white/[0.02] border border-white/5 rounded-2xl hover:bg-white/[0.04] transition-all">
                                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                                    <Box className="size-16 rotate-[10deg]" />
                                </div>
                                <div className="flex items-center gap-4 mb-4">
                                    <div className="p-2 rounded-lg bg-magenta-500/10 text-[#ff00e5]">
                                        <Box className="size-5" />
                                    </div>
                                    <h4 className="font-bold uppercase tracking-tight">Backend v0.8</h4>
                                </div>
                                <p className="text-sm text-white/40">FastAPI project for device management and telemetry logging.</p>
                                <div className="mt-4 flex items-center gap-2 text-[10px] font-bold text-[#ff00e5] uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
                                    Get Source <ChevronRight className="size-3" />
                                </div>
                            </a>
                        </div>

                        {/* Content Sections */}
                        <div className="space-y-32">

                            {/* Getting Started */}
                            <section id="getting-started" className="relative pt-16">
                                <div className="absolute left-0 top-0 w-12 h-px bg-cyan-500/50" />
                                <h2 className="text-3xl font-black uppercase tracking-tighter mb-8 flex items-center gap-4">
                                    <span className="text-white/10 shrink-0">01</span>
                                    Getting Started
                                </h2>
                                <div className="prose prose-invert prose-cyan max-w-none text-white/60 space-y-6">
                                    <p>The philosophy of Integrall is <strong className="text-white">Complexity Abstraction</strong>. We hide the "ugly" setup so you can write logic in one line.</p>
                                    <p>By default, Integrall stays <strong className="text-cyan-400">OFFLINE</strong>. This is perfect for simple projects and produces zero WiFi logs.</p>

                                    <h4 className="text-white uppercase tracking-widest text-xs font-bold mt-12 mb-4">1. Minimal Sketch Structure</h4>
                                    <CodeBlock
                                        language="cpp"
                                        code={`#define INTEGRALL_ENABLE_RELAY\n#define INTEGRALL_ENABLE_LCD\n#include <Integrall.h>\n\nIntegrall::System integrall;`}
                                    />

                                    <h4 className="text-white uppercase tracking-widest text-xs font-bold mt-12 mb-4">2. Enabling WiFi</h4>
                                    <CodeBlock
                                        language="cpp"
                                        code={`#define INTEGRALL_ENABLE_WIFI\n#include <Integrall.h>`}
                                    />
                                </div>
                            </section>

                            {/* Dependencies Section */}
                            <section id="dependencies" className="relative pt-16">
                                <div className="absolute left-0 top-0 w-12 h-px bg-[#D4FF33]/50" />
                                <h2 className="text-3xl font-black uppercase tracking-tighter mb-8 flex items-center gap-4">
                                    <span className="text-white/10 shrink-0">02</span>
                                    Required Dependencies
                                </h2>
                                <div className="prose prose-invert prose-cyan max-w-none text-white/60 space-y-6">
                                    <p>To use the full power of the <strong className="text-white">Integrall Framework</strong>, you must install the following libraries via the Arduino Library Manager (<kbd className="px-2 py-1 bg-white/10 rounded text-xs font-mono">Ctrl+Shift+I</kbd>). Failure to install these will result in compilation errors.</p>

                                    <div className="overflow-x-auto my-8">
                                        <table className="w-full text-left text-sm border-collapse">
                                            <thead>
                                                <tr className="border-b border-white/10 text-white font-bold uppercase tracking-[0.2em] text-[10px]">
                                                    <th className="py-4 px-2">Library</th>
                                                    <th className="py-4 px-2">Module Flag</th>
                                                    <th className="py-4 px-2">Purpose</th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-white/5">
                                                <tr>
                                                    <td className="py-4 px-2 text-white font-bold italic">ArduinoJson</td>
                                                    <td className="py-4 px-2"><span className="px-2 py-0.5 rounded bg-white/5 text-[10px] uppercase font-bold text-white/40">Core Requirement</span></td>
                                                    <td className="py-4 px-2">Essential for all data/telemetry logging.</td>
                                                </tr>
                                                <tr>
                                                    <td className="py-4 px-2 text-white font-bold italic">LiquidCrystal I2C</td>
                                                    <td className="py-4 px-2"><code className="text-cyan-500 text-[10px]">INTEGRALL_ENABLE_LCD</code></td>
                                                    <td className="py-4 px-2">For generic 16x2 and 20x4 I2C screens.</td>
                                                </tr>
                                                <tr>
                                                    <td className="py-4 px-2 text-white font-bold italic">DallasTemperature</td>
                                                    <td className="py-4 px-2"><code className="text-cyan-500 text-[10px]">INTEGRALL_ENABLE_SENSORS</code></td>
                                                    <td className="py-4 px-2">For DS18B20 waterproof temp probes.</td>
                                                </tr>
                                                <tr>
                                                    <td className="py-4 px-2 text-white font-bold italic">Adafruit BME280</td>
                                                    <td className="py-4 px-2"><code className="text-cyan-500 text-[10px]">INTEGRALL_ENABLE_SENSORS</code></td>
                                                    <td className="py-4 px-2">High-precision environmental sensors.</td>
                                                </tr>
                                                <tr>
                                                    <td className="py-4 px-2 text-white font-bold italic">MFRC522</td>
                                                    <td className="py-4 px-2"><code className="text-cyan-500 text-[10px]">INTEGRALL_ENABLE_INPUT</code></td>
                                                    <td className="py-4 px-2">RFID card reading and auth.</td>
                                                </tr>
                                                <tr>
                                                    <td className="py-4 px-2 text-white font-bold italic">IRremote</td>
                                                    <td className="py-4 px-2"><code className="text-cyan-500 text-[10px]">INTEGRALL_ENABLE_INPUT</code></td>
                                                    <td className="py-4 px-2">Infrared signals from TV remotes.</td>
                                                </tr>
                                                <tr>
                                                    <td className="py-4 px-2 text-white font-bold italic">TinyGPS++</td>
                                                    <td className="py-4 px-2"><code className="text-cyan-500 text-[10px]">INTEGRALL_ENABLE_TIME</code></td>
                                                    <td className="py-4 px-2">Satellite positioning and global time.</td>
                                                </tr>
                                                <tr>
                                                    <td className="py-4 px-2 text-white font-bold italic">RTClib</td>
                                                    <td className="py-4 px-2"><code className="text-cyan-500 text-[10px]">INTEGRALL_ENABLE_TIME</code></td>
                                                    <td className="py-4 px-2">Hardware Real-Time Clocks (DS3231).</td>
                                                </tr>
                                                <tr>
                                                    <td className="py-4 px-2 text-white font-bold italic">LoRa</td>
                                                    <td className="py-4 px-2"><code className="text-cyan-500 text-[10px]">INTEGRALL_ENABLE_COMM</code></td>
                                                    <td className="py-4 px-2">Long-range radio communication.</td>
                                                </tr>
                                                <tr>
                                                    <td className="py-4 px-2 text-white font-bold italic">DFRobotDFPlayerMini</td>
                                                    <td className="py-4 px-2"><code className="text-cyan-500 text-[10px]">INTEGRALL_ENABLE_AUDIO</code></td>
                                                    <td className="py-4 px-2">MP3 playback via MicroSD.</td>
                                                </tr>
                                                <tr>
                                                    <td className="py-4 px-2 text-white font-bold italic">Adafruit INA219</td>
                                                    <td className="py-4 px-2"><code className="text-cyan-500 text-[10px]">INTEGRALL_ENABLE_POWER</code></td>
                                                    <td className="py-4 px-2">Current & Power monitoring.</td>
                                                </tr>
                                                <tr>
                                                    <td className="py-4 px-2 text-white font-bold italic">ESP32Servo</td>
                                                    <td className="py-4 px-2"><code className="text-magenta-500 text-[10px]">INTEGRALL_ENABLE_SERVO</code></td>
                                                    <td className="py-4 px-2">Required for PWM control on ESP32.</td>
                                                </tr>
                                                <tr>
                                                    <td className="py-4 px-2 text-white font-bold italic">Keypad</td>
                                                    <td className="py-4 px-2"><code className="text-cyan-500 text-[10px]">INTEGRALL_ENABLE_KEYPAD</code></td>
                                                    <td className="py-4 px-2">Matrix input for PIN and password locks.</td>
                                                </tr>
                                                <tr>
                                                    <td className="py-4 px-2 text-white font-bold italic">Adafruit SSD1306 + GFX</td>
                                                    <td className="py-4 px-2"><code className="text-magenta-500 text-[10px]">INTEGRALL_ENABLE_OLED</code></td>
                                                    <td className="py-4 px-2">Professional graphics and progress bars.</td>
                                                </tr>
                                                <tr>
                                                    <td className="py-4 px-2 text-white font-bold italic">DHT Sensor Library</td>
                                                    <td className="py-4 px-2"><code className="text-yellow-500 text-[10px]">INTEGRALL_ENABLE_SENSORS</code></td>
                                                    <td className="py-4 px-2">Environment monitoring (Temp/Hum).</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>

                                    <div className="p-6 rounded-2xl bg-[#D4FF33]/5 border border-[#D4FF33]/20 mt-8">
                                        <h4 className="text-[#D4FF33] font-bold text-sm mb-4 uppercase tracking-widest flex items-center gap-2">
                                            <Download className="size-4" />
                                            How to Install
                                        </h4>
                                        <ol className="list-decimal pl-5 space-y-3 text-sm">
                                            <li>Open <strong className="text-white">Arduino IDE</strong>.</li>
                                            <li>Go to <strong className="text-white">Sketch &rarr; Include Library &rarr; Manage Libraries</strong>.</li>
                                            <li>Search for the library name and click <strong className="text-white">Install</strong>.</li>
                                        </ol>
                                    </div>
                                </div>
                            </section>

                            {/* Connectivity Section */}
                            <section id="wifi-infrastructure" className="relative pt-16">
                                <div className="absolute left-0 top-0 w-12 h-px bg-[#D4FF33]/50" />
                                <h2 className="text-3xl font-black uppercase tracking-tighter mb-8 flex items-center gap-4">
                                    <span className="text-white/10 shrink-0">03</span>
                                    WiFi Infrastructure
                                </h2>
                                <div className="prose prose-invert prose-cyan max-w-none text-white/60 space-y-8">
                                    <p className="text-lg leading-relaxed">
                                        Integrall manages WiFi persistence and reconnection automatically. Unlike standard library implementations, Integrall uses a <strong className="text-white">non-blocking connection manager</strong> that doesn't freeze your code while waiting for a signal.
                                    </p>

                                    <div className="space-y-4">
                                        <h4 className="text-white font-bold text-sm">Basic WiFi Setup</h4>
                                        <CodeBlock
                                            language="cpp"
                                            code={`#define INTEGRALL_ENABLE_WIFI\n#include <Integrall.h>\n\nvoid setup() {\n  integrall.begin();\n  integrall.connectWiFi("SSID", "PASSWORD");\n}`}
                                        />
                                    </div>

                                    <div className="grid md:grid-cols-2 gap-6 not-prose mt-8">
                                        <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5">
                                            <h5 className="text-white font-bold text-xs uppercase mb-2">isOnline()</h5>
                                            <p className="text-[11px] leading-relaxed">Returns <code className="text-cyan-400">true</code> only when WiFi chip is fully associated and IP is assigned.</p>
                                        </div>
                                        <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5">
                                            <h5 className="text-white font-bold text-xs uppercase mb-2">Auto-Reconnect</h5>
                                            <p className="text-[11px] leading-relaxed">If signal is lost, the framework silently attempts reconnection in the background every 30 seconds.</p>
                                        </div>
                                    </div>
                                </div>
                            </section>

                            {/* Hardware Modules Catalog */}
                            <section id="hardware-ecosystem" className="relative pt-16">
                                <div className="absolute left-0 top-0 w-12 h-px bg-magenta-500/50" />
                                <h2 className="text-3xl font-black uppercase tracking-tighter mb-8 flex items-center gap-4">
                                    <span className="text-white/10 shrink-0">04</span>
                                    Hardware Ecosystem
                                </h2>

                                <div className="grid md:grid-cols-2 gap-8 mt-12">
                                    <div className="p-8 rounded-3xl bg-white/[0.02] border border-white/5 hover:border-cyan-500/30 transition-all">
                                        <div className="size-12 rounded-2xl bg-cyan-500/10 flex items-center justify-center text-[#00f2ff] mb-6">
                                            <Layout className="size-6" />
                                        </div>
                                        <h3 className="text-xl font-bold text-white uppercase mb-4">LCD Display (I2C)</h3>
                                        <p className="text-sm text-white/50 leading-relaxed mb-6">Hides Wire.h and address management. Includes automatic scrolling for long text strings.</p>
                                        <CodeBlock
                                            language="cpp"
                                            code={`integrall.lcdPrint("Hello Integrall", 0, 0);`}
                                        />
                                    </div>

                                    <div className="p-8 rounded-3xl bg-white/[0.02] border border-white/5 hover:border-magenta-500/30 transition-all">
                                        <div className="size-12 rounded-2xl bg-magenta-500/10 flex items-center justify-center text-[#ff00e5] mb-6">
                                            <Zap className="size-6" />
                                        </div>
                                        <h3 className="text-xl font-bold text-white uppercase mb-4">Servo Control</h3>
                                        <p className="text-sm text-white/50 leading-relaxed mb-6">Non-blocking movement with smooth easing and auto-mapping from analog inputs.</p>
                                        <CodeBlock
                                            language="cpp"
                                            code={`integrall.easeServo(90, 20);`}
                                        />
                                    </div>
                                </div>

                                <div className="mt-12 p-8 rounded-3xl bg-gradient-to-r from-cyan-500/5 to-transparent border border-white/5">
                                    <h4 className="text-sm font-bold text-white uppercase tracking-widest mb-4">Complete Hardware Catalog</h4>
                                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-y-4 gap-x-8">
                                        {['Sensors', 'Relays', 'Keypads', 'OLED', 'Buzzer', 'Audio (MP3)', 'RGB LED', 'ESP32-CAM', 'Blinker', 'Input UI', 'Storage', 'Time & GPS', 'Wireless', 'Power', 'Stepper'].map(m => (
                                            <div key={m} className="flex items-center gap-2 text-xs text-white/40">
                                                <div className="size-1.5 rounded-full bg-cyan-500/50" />
                                                {m}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </section>

                            {/* Hardware Catalog Placeholder */}
                            {/* LCD Module Documentation */}
                            <section id="module-lcd" className="relative pt-16">
                                <div className="absolute left-0 top-0 w-12 h-px bg-cyan-500/50" />
                                <h2 className="text-3xl font-black uppercase tracking-tighter mb-8 flex items-center gap-4">
                                    <span className="text-white/10 shrink-0">05</span>
                                    LCD Module Integration
                                </h2>

                                <div className="prose prose-invert prose-cyan max-w-none text-white/60 space-y-12">
                                    <div>
                                        <p className="text-lg leading-relaxed">
                                            The <code className="text-[#00f2ff]">LCDModule</code> is a professional-grade wrapper for I2C LiquidCrystal displays.
                                            It intelligently handles Wire initialization, character buffering, and introduces <strong className="text-white">Smart Printing</strong>—a feature that automatically detects if text is too long for the row and handles non-blocking scrolling without any extra code from you.
                                        </p>
                                    </div>

                                    {/* Function List */}
                                    <div className="space-y-16">
                                        <div className="group">
                                            <h3 className="text-white uppercase tracking-widest text-sm font-black mb-4 flex items-center gap-2">
                                                <div className="size-2 rounded-full bg-[#00f2ff]" />
                                                begin(address, cols, rows)
                                            </h3>
                                            <p className="mb-4">Initializes the I2C hardware and starts the display.</p>
                                            <ul className="list-disc pl-5 space-y-2 text-sm">
                                                <li><code className="text-cyan-400">address</code>: I2C address (Default: 0x27)</li>
                                                <li><code className="text-cyan-400">cols/rows</code>: Screen dimensions (Default: 16x2)</li>
                                                <li>Auto-executes <code className="text-white/40">Wire.begin()</code> if the bus is inactive.</li>
                                            </ul>
                                            <CodeBlock language="cpp" code={`integrall.begin(); // Uses 0x27, 16x2 by default`} />
                                        </div>

                                        <div className="group">
                                            <h3 className="text-white uppercase tracking-widest text-sm font-black mb-4 flex items-center gap-2">
                                                <div className="size-2 rounded-full bg-[#00f2ff]" />
                                                print(text, col, row)
                                            </h3>
                                            <p className="mb-4">The "Brain" of the LCD. It analyzes the input text length relative to screen columns.</p>
                                            <ul className="list-disc pl-5 space-y-2 text-sm">
                                                <li>If the text fits: It clears the row and prints statically.</li>
                                                <li>If text is long: It registers the row for <strong className="text-white">Background Scrolling</strong>.</li>
                                            </ul>
                                            <CodeBlock language="cpp" code={`integrall.lcdPrint("Short", 0, 0);\nintegrall.lcdPrint("This is a very long string that will scroll", 0, 1);`} />
                                        </div>

                                        <div className="group">
                                            <h3 className="text-white uppercase tracking-widest text-sm font-black mb-4 flex items-center gap-2">
                                                <div className="size-2 rounded-full bg-[#00f2ff]" />
                                                handle(speed_ms)
                                            </h3>
                                            <p className="mb-4 text-[#ff00e5] font-bold">MANDATORY FUNCTION.</p>
                                            <p className="mb-4">Processes the animation frames for all scrolling rows. Must be placed in your main <code className="text-white">loop()</code>.</p>
                                            <CodeBlock language="cpp" code={`void loop() {\n  integrall.handle(); // Processes LCD animations in the background\n}`} />
                                        </div>

                                        <div className="group">
                                            <h3 className="text-white uppercase tracking-widest text-sm font-black mb-4 flex items-center gap-2">
                                                <div className="size-2 rounded-full bg-[#00f2ff]" />
                                                scrollText(text, row, speed_ms)
                                            </h3>
                                            <p className="mb-4">Force a professional, non-blocking scroll on a specific row, regardless of text length.</p>
                                            <CodeBlock language="cpp" code={`integrall.lcdScrollText("DANGER: SYSTEM OVERHEAT", 0, 100);`} />
                                        </div>

                                        <div className="grid sm:grid-cols-2 gap-8">
                                            <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5">
                                                <h4 className="text-white text-xs font-bold uppercase tracking-widest mb-4">setCursorVisible</h4>
                                                <p className="text-xs mb-4 text-white/40">Toggle the hardware cursor and blinking state.</p>
                                                <CodeBlock language="cpp" code={`integrall.lcdCursor(true, true);`} />
                                            </div>
                                            <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5">
                                                <h4 className="text-white text-xs font-bold uppercase tracking-widest mb-4">setBacklight</h4>
                                                <p className="text-xs mb-4 text-white/40">Power management for the display LEDs.</p>
                                                <CodeBlock language="cpp" code={`integrall.lcdBacklight(false); // eco-mode`} />
                                            </div>
                                        </div>

                                        <div className="group">
                                            <h3 className="text-white uppercase tracking-widest text-sm font-black mb-4 flex items-center gap-2">
                                                <div className="size-2 rounded-full bg-[#00f2ff]" />
                                                createCustomChar(slot, charMap)
                                            </h3>
                                            <p className="mb-4">Allows defining up to 8 custom 5x8 pixel characters (binary arrays).</p>
                                            <CodeBlock language="cpp" code={`byte heart[8] = {0x0,0xa,0x1f,0x1f,0xe,0x4,0x0};\nintegrall.lcdCreateChar(0, heart);`} />
                                        </div>

                                        <div className="group">
                                            <h3 className="text-white uppercase tracking-widest text-sm font-black mb-4 flex items-center gap-2">
                                                <div className="size-2 rounded-full bg-[#00f2ff]" />
                                                getRaw()
                                            </h3>
                                            <p className="mb-4">Returns a pointer to the underlying <code className="text-white">LiquidCrystal_I2C</code> object for power users.</p>
                                            <CodeBlock language="cpp" code={`integrall.getLCD()->getRaw()->command(LCD_RETURNHOME);`} />
                                        </div>
                                    </div>

                                    {/* Final Example */}
                                    <div className="pt-12 border-t border-white/5">
                                        <h3 className="text-xl font-bold text-white mb-6">Full Integration Example</h3>
                                        <CodeBlock language="cpp" code={`#define INTEGRALL_ENABLE_LCD\n#include <Integrall.h>\n\nIntegrall::System integrall;\n\nvoid setup() {\n  integrall.begin();\n  integrall.lcdPrint("INTEGRALL v1.0", 0, 0);\n  integrall.lcdPrint("Initializing sensors and network...", 0, 1);\n}\n\nvoid loop() {\n  integrall.handle(); // Processes the scroll on row 1!\n}`} />
                                    </div>
                                </div>
                            </section>

                            {/* Servo Module Documentation */}
                            <section id="module-servo" className="relative pt-16">
                                <div className="absolute left-0 top-0 w-12 h-px bg-magenta-500/50" />
                                <h2 className="text-3xl font-black uppercase tracking-tighter mb-8 flex items-center gap-4">
                                    <span className="text-white/10 shrink-0">06</span>
                                    Servo Module Integration
                                </h2>

                                <div className="prose prose-invert prose-cyan max-w-none text-white/60 space-y-12">
                                    <div>
                                        <p className="text-lg leading-relaxed">
                                            The <code className="text-[#ff00e5]">ServoModule</code> provides a unified, high-level API for controlling multiple servo motors.
                                            It automatically handles hardware-specific PWM timers (like <strong className="text-white">ESP32Servo</strong>) and offers sophisticated <strong className="text-white">non-blocking animations</strong>—allowing your servos to move smoothly while the rest of your code stays responsive.
                                        </p>
                                    </div>

                                    {/* Function List */}
                                    <div className="space-y-16">
                                        <div className="group">
                                            <h3 className="text-white uppercase tracking-widest text-sm font-black mb-4 flex items-center gap-2">
                                                <div className="size-2 rounded-full bg-[#ff00e5]" />
                                                attach(pin, startAngle)
                                            </h3>
                                            <p className="mb-4">Physically connects the software to a GPIO pin and sets an optional initial position.</p>
                                            <ul className="list-disc pl-5 space-y-2 text-sm">
                                                <li>Returns a <code className="text-magenta-400">Servo ID</code> (0-3) used in all other functions.</li>
                                                <li>Supports up to <code className="text-white">4 concurrent servos</code> (customizable in config).</li>
                                            </ul>
                                            <CodeBlock language="cpp" code={`int claw = integrall.enableServo(13, 90); // Attach to pin 13, start at 90°`} />
                                        </div>

                                        <div className="group">
                                            <h3 className="text-white uppercase tracking-widest text-sm font-black mb-4 flex items-center gap-2">
                                                <div className="size-2 rounded-full bg-[#ff00e5]" />
                                                set(index, angle)
                                            </h3>
                                            <p className="mb-4">Instantly moves the specified servo to a target angle (0-180°).</p>
                                            <CodeBlock language="cpp" code={`integrall.setServo(claw, 180); // Snap claw open`} />
                                        </div>

                                        <div className="group">
                                            <h3 className="text-white uppercase tracking-widest text-sm font-black mb-4 flex items-center gap-2">
                                                <div className="size-2 rounded-full bg-[#ff00e5]" />
                                                easeTo(index, angle, speed_ms)
                                            </h3>
                                            <p className="mb-4">Moves the motor <strong className="text-white">non-blockingly</strong> to an angle over time. Perfect for human-like robotic movement.</p>
                                            <ul className="list-disc pl-5 space-y-2 text-sm">
                                                <li><code className="text-magenta-400">speed_ms</code>: Delay between each degree increment (default: 15ms).</li>
                                                <li>Code continues to the next line immediately while the motor rotates in the background.</li>
                                            </ul>
                                            <CodeBlock language="cpp" code={`integrall.easeServo(claw, 0, 30); // Slowly close claw while checking sensors`} />
                                        </div>

                                        <div className="group">
                                            <h3 className="text-white uppercase tracking-widest text-sm font-black mb-4 flex items-center gap-2">
                                                <div className="size-2 rounded-full bg-[#ff00e5]" />
                                                sweep(index, speed_ms)
                                            </h3>
                                            <p className="mb-4">Starts a continuous background sweep from 0° to 180° and back.</p>
                                            <CodeBlock language="cpp" code={`integrall.sweepServo(radarServo, 20); // Automated sonar rotation`} />
                                        </div>

                                        <div className="p-8 rounded-3xl bg-gradient-to-br from-magenta-500/5 to-transparent border border-white/5">
                                            <h4 className="text-white text-xs font-bold uppercase tracking-widest mb-4 flex items-center gap-2">
                                                <Terminal className="size-4" /> The Potentiometer Trick
                                            </h4>
                                            <p className="text-sm mb-4 text-white/50">One-liner to map an analog knob (0-1023) directly to motor movement (0-180).</p>
                                            <CodeBlock language="cpp" code={`integrall.setServoFromAnalog(claw, A0);`} />
                                        </div>

                                        <div className="group">
                                            <h3 className="text-white uppercase tracking-widest text-sm font-black mb-4 flex items-center gap-2">
                                                <div className="size-2 rounded-full bg-[#ff00e5]" />
                                                handle()
                                            </h3>
                                            <p className="mb-4 text-[#00f2ff] font-bold">MANDATORY FUNCTION.</p>
                                            <p className="mb-4">Calculates and sends PWM signals for background animations (Ease/Sweep). Must be in the main loop.</p>
                                            <CodeBlock language="cpp" code={`void loop() {\n  integrall.handle(); // Keeps the motors moving smoothly\n}`} />
                                        </div>
                                    </div>

                                    {/* Final Example */}
                                    <div className="pt-12 border-t border-white/5">
                                        <h3 className="text-xl font-bold text-white mb-6">Multi-Servo Example</h3>
                                        <CodeBlock language="cpp" code={`#define INTEGRALL_ENABLE_SERVO\n#include <Integrall.h>\n\nIntegrall::System integrall;\nint base, arm;\n\nvoid setup() {\n  integrall.begin();\n  base = integrall.enableServo(18);\n  arm = integrall.enableServo(19, 90);\n\n  integrall.sweepServo(base, 25); // Rotate base continuously\n}\n\nvoid loop() {\n  integrall.easeServo(arm, 180, 10); // Target angle in background\n  integrall.handle(); \n}`} />
                                    </div>
                                </div>
                            </section>

                            {/* Sensor Module Documentation */}
                            <section id="module-sensors" className="relative pt-16">
                                <div className="absolute left-0 top-0 w-12 h-px bg-yellow-500/50" />
                                <h2 className="text-3xl font-black uppercase tracking-tighter mb-8 flex items-center gap-4">
                                    <span className="text-white/10 shrink-0">07</span>
                                    Sensor Module Integration
                                </h2>

                                <div className="prose prose-invert prose-cyan max-w-none text-white/60 space-y-12">
                                    <div>
                                        <p className="text-lg leading-relaxed">
                                            The <code className="text-[#D4FF33]">SensorModule</code> provides clean abstractions for reading various IoT sensors.
                                            It handles the complex math and timing required for ultrasonic distance pulses, mapping raw analog signals to readable percentages, and reading the DHT environment sensors without blocking your main loop.
                                        </p>
                                    </div>

                                    {/* Function List */}
                                    <div className="space-y-16">
                                        <div className="group">
                                            <h3 className="text-white uppercase tracking-widest text-sm font-black mb-4 flex items-center gap-2">
                                                <div className="size-2 rounded-full bg-[#D4FF33]" />
                                                readAnalogPercent(pin)
                                            </h3>
                                            <p className="mb-4">Standardizes raw 10-bit analog data (0-1023) into a professional <strong className="text-white">0 to 100%</strong> scale.</p>
                                            <CodeBlock language="cpp" code={`int fuelLevel = integrall.readAnalogPercent(A0); // Returns 0-100`} />
                                        </div>

                                        <div className="group">
                                            <h3 className="text-white uppercase tracking-widest text-sm font-black mb-4 flex items-center gap-2">
                                                <div className="size-2 rounded-full bg-[#D4FF33]" />
                                                readLightPercent(pin, reverse)
                                            </h3>
                                            <p className="mb-4">Optimized for LDRs. If <code className="text-white">reverse</code> is true, it accounts for pull-up resistor configurations where higher voltage means less light.</p>
                                            <CodeBlock language="cpp" code={`int light = integrall.readLightPercent(A1, true);`} />
                                        </div>

                                        <div className="group">
                                            <h3 className="text-white uppercase tracking-widest text-sm font-black mb-4 flex items-center gap-2">
                                                <div className="size-2 rounded-full bg-[#D4FF33]" />
                                                readDistanceCM(trig, echo, samples)
                                            </h3>
                                            <p className="mb-4">Advanced HC-SR04 handling with <strong className="text-white">built-in noise filtering</strong>. It takes multiple samples and averages them to prevent jitter.</p>
                                            <ul className="list-disc pl-5 space-y-2 text-sm">
                                                <li>Returns distance in centimeters (float).</li>
                                                <li><code className="text-white">samples</code>: Number of bursts to average (default: 3).</li>
                                            </ul>
                                            <CodeBlock language="cpp" code={`float dist = integrall.readDistanceCM(12, 11); // Trig: 12, Echo: 11`} />
                                        </div>

                                        <div className="group">
                                            <h3 className="text-white uppercase tracking-widest text-sm font-black mb-4 flex items-center gap-2">
                                                <div className="size-2 rounded-full bg-[#D4FF33]" />
                                                isWithinRange(trig, echo, min, max)
                                            </h3>
                                            <p className="mb-4">Perfect for trigger zones. Returns true if an object enters the specified CM range.</p>
                                            <CodeBlock language="cpp" code={`if (integrall.isWithinRange(12, 11, 5.0, 30.0)) {\n  // Someone is at the door!\n}`} />
                                        </div>

                                        <div className="group">
                                            <h3 className="text-white uppercase tracking-widest text-sm font-black mb-4 flex items-center gap-2">
                                                <div className="size-2 rounded-full bg-[#D4FF33]" />
                                                readTemperature / readHumidity (DHT)
                                            </h3>
                                            <p className="mb-4">One-line interaction with DHT11/22 sensors. Requires the <code className="text-white">Adafruit DHT</code> library.</p>
                                            <CodeBlock language="cpp" code={`float temp = integrall.readTemperature(4, DHT11); // Pin 4, DHT11 type`} />
                                        </div>

                                        <div className="group">
                                            <h3 className="text-white uppercase tracking-widest text-sm font-black mb-4 flex items-center gap-2">
                                                <div className="size-2 rounded-full bg-[#D4FF33]" />
                                                readProbeTemp (DS18B20)
                                            </h3>
                                            <p className="mb-4">Standardized reading for Dallas OneWire waterproof temperature probes. Ideal for liquids or harsh environments.</p>
                                            <CodeBlock language="cpp" code={`float waterTemp = integrall.readProbeTemp(15); // GPIO 15`} />
                                        </div>

                                        <div className="group">
                                            <h3 className="text-white uppercase tracking-widest text-sm font-black mb-4 flex items-center gap-2">
                                                <div className="size-2 rounded-full bg-[#D4FF33]" />
                                                readEnvironment (BME280)
                                            </h3>
                                            <p className="mb-4">High-precision I2C reading. Updates temperature, humidity, and barometric pressure in one call.</p>
                                            <CodeBlock language="cpp" code={`float t, h, p;\nintegrall.readEnvironment(0x76, t, h, p); // I2C Addr, temp, hum, pres`} />
                                        </div>

                                        <div className="group">
                                            <h3 className="text-white uppercase tracking-widest text-sm font-black mb-4 flex items-center gap-2">
                                                <div className="size-2 rounded-full bg-[#D4FF33]" />
                                                readGasLevel (MQ)
                                            </h3>
                                            <p className="mb-4">Reads MQ-series gas sensors (Smoke, CO, LPG). Returns a normalized parts-per-million (PPM) approximation or raw analog percentage.</p>
                                            <CodeBlock language="cpp" code={`int gas = integrall.readAnalogPercent(A2); // MQ-2 on A2\nif (gas > 40) integrall.buzzer.alert();`} />
                                        </div>

                                        <div className="group">
                                            <h3 className="text-white uppercase tracking-widest text-sm font-black mb-4 flex items-center gap-2">
                                                <div className="size-2 rounded-full bg-[#D4FF33]" />
                                                motionDetected (PIR)
                                            </h3>
                                            <p className="mb-4">Alias for <code className="text-white">isTriggered</code>. Semantic sugar for motion detection projects.</p>
                                            <CodeBlock language="cpp" code={`if (integrall.motionDetected(5)) {\n  integrall.println("Trespasser detected!");\n}`} />
                                        </div>
                                    </div>

                                    {/* Final Example */}
                                    <div className="pt-12 border-t border-white/5">
                                        <h3 className="text-xl font-bold text-white mb-6">Environmental Monitor Example</h3>
                                        <CodeBlock language="cpp" code={`#define INTEGRALL_ENABLE_SENSORS\n#include <Integrall.h>\n\nIntegrall::System integrall;\n\nvoid setup() {\n  integrall.begin();\n}\n\nvoid loop() {\n  float t = integrall.readTemperature(4);\n  float h = integrall.readHumidity(4);\n  \n  if (t > 30.0) {\n     // High temp logic\n  }\n  delay(2000);\n}`} />
                                    </div>
                                </div>
                            </section>

                            {/* Relay Module Documentation */}
                            <section id="module-relay" className="relative pt-16">
                                <div className="absolute left-0 top-0 w-12 h-px bg-red-500/50" />
                                <h2 className="text-3xl font-black uppercase tracking-tighter mb-8 flex items-center gap-4">
                                    <span className="text-white/10 shrink-0">08</span>
                                    Relay Module & Industrial Safety
                                </h2>

                                <div className="prose prose-invert prose-cyan max-w-none text-white/60 space-y-12">
                                    <p className="text-lg leading-relaxed">
                                        The <code className="text-[#D4FF33]">RelayModule</code> is designed for reliable and safe high-voltage switching. Unlike standard Arduino code, it includes <strong className="text-white">Industrial Safety Features</strong> such as interlock groups (preventing shorts on motors) and auto-shutdown timers to protect hardware like water pumps or heaters.
                                    </p>

                                    {/* Initialization */}
                                    <div className="space-y-6">
                                        <h3 className="text-white uppercase tracking-widest text-sm font-black flex items-center gap-2">
                                            <div className="size-2 rounded-full bg-red-500" />
                                            1. Initialization & Setup
                                        </h3>
                                        <p>Initialize the module in your <code className="text-white">setup()</code> and add your relay pins. Most hobbyist relay modules are <strong className="text-white">Active Low</strong> (on when pin is 0), which Integrall handles by default.</p>
                                        <CodeBlock language="cpp" code={`integrall.relay.begin(4); // Max 4 relays\nintegrall.relay.addRelay(0, 5, true, "Main Pump"); // Index 0, GPIO 5, Active Low`} />
                                    </div>

                                    {/* Basic Control */}
                                    <div className="space-y-6">
                                        <h3 className="text-white uppercase tracking-widest text-sm font-black flex items-center gap-2">
                                            <div className="size-2 rounded-full bg-red-500" />
                                            2. Core Control Functions
                                        </h3>
                                        <div className="grid md:grid-cols-2 gap-4 not-prose">
                                            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
                                                <code className="text-[#D4FF33] text-xs">on(index) / off(index)</code>
                                                <p className="text-[11px] mt-2 text-white/40">Directly switch the relay state.</p>
                                            </div>
                                            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
                                                <code className="text-[#D4FF33] text-xs">toggle(index)</code>
                                                <p className="text-[11px] mt-2 text-white/40">Flip the current state of the relay.</p>
                                            </div>
                                            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
                                                <code className="text-[#D4FF33] text-xs">allOff() / allOn()</code>
                                                <p className="text-[11px] mt-2 text-white/40">Bulk control for emergency stop or power-up.</p>
                                            </div>
                                            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
                                                <code className="text-[#D4FF33] text-xs">isOn(index)</code>
                                                <p className="text-[11px] mt-2 text-white/40">Returns true if the relay is currently active.</p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Safety Features */}
                                    <div className="space-y-8">
                                        <h3 className="text-white uppercase tracking-widest text-sm font-black flex items-center gap-2">
                                            <div className="size-2 rounded-full bg-red-500" />
                                            3. Advanced Safety Protocols
                                        </h3>

                                        <div className="space-y-4">
                                            <h4 className="text-white font-bold text-sm">Safety Timeouts (Auto-Off)</h4>
                                            <p className="text-sm">Prevent hardware damage by setting a maximum "ON" duration. Integrall automatically turns the relay off once the timer expires.</p>
                                            <CodeBlock language="cpp" code={`// Turn off Relay #0 automatically after 10 seconds of activity\nintegrall.relay.setSafetyTimeout(0, 10000);`} />
                                        </div>

                                        <div className="space-y-4">
                                            <h4 className="text-white font-bold text-sm">Safety Interlocks</h4>
                                            <p className="text-sm">Crucial for motor H-bridges or 2-way valves. Grouping relays prevents them from being active simultaneously. Turning one ON will automatically turn others in the group OFF.</p>
                                            <CodeBlock language="cpp" code={`integrall.relay.setInterlockGroup(0, 1); // "Forward" in Group 1\nintegrall.relay.setInterlockGroup(1, 1); // "Reverse" in Group 1`} />
                                        </div>
                                    </div>

                                    {/* Physical Triggers */}
                                    <div className="space-y-6">
                                        <h3 className="text-white uppercase tracking-widest text-sm font-black flex items-center gap-2">
                                            <div className="size-2 rounded-full bg-red-500" />
                                            4. Manual Physical Triggers
                                        </h3>
                                        <p className="text-sm">Connect physical buttons directly to relays. Integrall handles the <strong className="text-white">software debouncing</strong> and toggle intervals in the background.</p>
                                        <CodeBlock language="cpp" code={`// Use GPIO 12 as a physical button to toggle Relay #0\nintegrall.relay.attachTrigger(0, 12, true); // true = Active Low button`} />
                                    </div>

                                    {/* Stats */}
                                    <div className="space-y-6">
                                        <h3 className="text-white uppercase tracking-widest text-sm font-black flex items-center gap-2">
                                            <div className="size-2 rounded-full bg-red-500" />
                                            5. Statistics & Health Monitoring
                                        </h3>
                                        <p className="text-sm">Monitor lifespan and power usage by tracking toggle counts and total active time.</p>
                                        <CodeBlock language="cpp" code={`uint32_t activeMillis = integrall.relay.getTotalOnTime(0);\nuint8_t clicks = integrall.relay.getToggleCount(0);`} />
                                    </div>

                                    {/* Mandatory Handle */}
                                    <div className="p-6 rounded-2xl bg-red-500/10 border border-red-500/20">
                                        <h4 className="text-white font-bold text-sm mb-2">Crucial Requirement: handle()</h4>
                                        <p className="text-xs text-red-100/60 leading-relaxed">
                                            The safety features (timeouts, triggers) rely on the <code className="text-white">integrall.handle()</code> function being called in your main loop. Without this, timers will not run and buttons will not respond.
                                        </p>
                                    </div>
                                </div>
                            </section>

                            {/* Keypad Module Documentation */}
                            <section id="module-keypad" className="relative pt-16">
                                <div className="absolute left-0 top-0 w-12 h-px bg-cyan-500/50" />
                                <h2 className="text-3xl font-black uppercase tracking-tighter mb-8 flex items-center gap-4">
                                    <span className="text-white/10 shrink-0">09</span>
                                    Keypad Matrix Control
                                </h2>
                                <div className="prose prose-invert prose-cyan max-w-none text-white/60 space-y-12">
                                    <p className="text-lg leading-relaxed">
                                        The <code className="text-[#D4FF33]">KeypadModule</code> simplifies 4x4 or 4x3 matrix inputs. It abstracts pin mapping and provides a <strong className="text-white">Secure Buffer Mode</strong> for password entry, handling all debouncing (50ms) automatically.
                                    </p>

                                    <div className="space-y-8">
                                        <div className="group">
                                            <h3 className="text-white uppercase tracking-widest text-sm font-black mb-4 flex items-center gap-2">
                                                <div className="size-2 rounded-full bg-cyan-500" />
                                                1. Setup & Keymaps
                                            </h3>
                                            <p className="text-sm">Define your row and column pins. Standard 4x4 (1-9, A-D, *, #) and 4x3 (1-9, *, #) layouts are built-in.</p>
                                            <CodeBlock language="cpp" code={`uint8_t rows[] = {13, 12, 14, 27};\nuint8_t cols[] = {26, 25, 33, 32};\n\nintegrall.keypad.begin(rows, cols, 4, 4); // Initialize 4x4`} />
                                        </div>

                                        <div className="group">
                                            <h3 className="text-white uppercase tracking-widest text-sm font-black mb-4 flex items-center gap-2">
                                                <div className="size-2 rounded-full bg-cyan-500" />
                                                2. Secure PIN Entry (Buffer Mode)
                                            </h3>
                                            <p className="text-sm">Use <code className="text-white">captureString()</code> in your loop. It automatically manages a character buffer, supports <code className="text-white">*</code> for backspace, and <code className="text-white">#</code> for submission.</p>
                                            <CodeBlock language="cpp" code={`void loop() {\n  const char* input = integrall.keypad.captureString();\n  \n  if (integrall.keypad.isSubmitted()) {\n    if (integrall.keypad.checkPin("1234")) {\n       integrall.lcd.print("ACCESS GRANTED", 0, 1);\n    }\n    integrall.keypad.clearBuffer();\n  }\n}`} />
                                        </div>

                                        <div className="group">
                                            <h3 className="text-white uppercase tracking-widest text-sm font-black mb-4 flex items-center gap-2">
                                                <div className="size-2 rounded-full bg-cyan-500" />
                                                3. Single Key Capture
                                            </h3>
                                            <p className="text-sm">For simple navigation or menu selection, use <code className="text-white">getKey()</code> to receive character inputs as they happen.</p>
                                            <CodeBlock language="cpp" code={`char key = integrall.keypad.getKey();\nif (key == 'A') menuUp();\nif (key == 'B') menuDown();`} />
                                        </div>
                                    </div>
                                </div>
                            </section>

                            {/* OLED Module Documentation */}
                            <section id="module-oled" className="relative pt-16">
                                <div className="absolute left-0 top-0 w-12 h-px bg-magenta-500/50" />
                                <h2 className="text-3xl font-black uppercase tracking-tighter mb-8 flex items-center gap-4">
                                    <span className="text-white/10 shrink-0">10</span>
                                    OLED Graphics (SSD1306)
                                </h2>
                                <div className="prose prose-invert prose-cyan max-w-none text-white/60 space-y-12">
                                    <p className="text-lg leading-relaxed">
                                        The <code className="text-[#D4FF33]">OLEDModule</code> provides high-level abstractions for the SSD1306 I2C display. It features smart text positioning, numeric label formatting, and real-time visual progress components.
                                    </p>

                                    <div className="space-y-8">
                                        <div className="group">
                                            <h3 className="text-white uppercase tracking-widest text-sm font-black mb-4 flex items-center gap-2">
                                                <div className="size-2 rounded-full bg-magenta-500" />
                                                Visual Components: drawBar()
                                            </h3>
                                            <p className="text-sm">Render hardware-accelerated progress bars for displaying sensor ranges or process steps.</p>
                                            <CodeBlock language="cpp" code={`integrall.oled.drawBar(75, 56); // Percent: 75, Y-Pixel: 56`} />
                                        </div>

                                        <div className="group">
                                            <h3 className="text-white uppercase tracking-widest text-sm font-black mb-4 flex items-center gap-2">
                                                <div className="size-2 rounded-full bg-magenta-500" />
                                                Formatted Telemetry: printValue()
                                            </h3>
                                            <p className="text-sm">Print a label followed by a formatted float value automatically. Perfect for monitoring.</p>
                                            <CodeBlock language="cpp" code={`integrall.oled.printValue("TEMP: ", 24.5, 0); // Label, value, row`} />
                                        </div>

                                        <div className="group">
                                            <h3 className="text-white uppercase tracking-widest text-sm font-black mb-4 flex items-center gap-2">
                                                <div className="size-2 rounded-full bg-magenta-500" />
                                                Direct GFX Access
                                            </h3>
                                            <p className="text-sm">Access the underlying <code className="text-white">Adafruit_SSD1306</code> instance for drawing lines, circles, or custom bitmaps.</p>
                                            <CodeBlock language="cpp" code={`integrall.oled.getRaw()->drawCircle(64, 32, 10, WHITE);`} />
                                        </div>
                                    </div>
                                </div>
                            </section>

                            {/* Connectivity Documentation Placeholder */}

                            {/* Buzzer Module Documentation */}
                            <section id="module-buzzer" className="relative pt-16">
                                <div className="absolute left-0 top-0 w-12 h-px bg-white/30" />
                                <h2 className="text-3xl font-black uppercase tracking-tighter mb-8 flex items-center gap-4">
                                    <span className="text-white/10 shrink-0">11</span>
                                    Professional Audio Alerts
                                </h2>
                                <div className="prose prose-invert prose-cyan max-w-none text-white/60 space-y-12">
                                    <p className="text-lg leading-relaxed">
                                        The <code className="text-[#D4FF33]">BuzzerModule</code> replaces blocking <code className="text-white">delay()</code> tones with a non-blocking state machine. Generate patterns, melodic success sequences, and custom frequencies while keeping your device responsive.
                                    </p>

                                    <div className="space-y-8">
                                        <div className="group">
                                            <h3 className="text-white uppercase tracking-widest text-sm font-black mb-4 flex items-center gap-2">
                                                <div className="size-2 rounded-full bg-white" />
                                                Standard Alerts (Presets)
                                            </h3>
                                            <p className="text-sm">Use optimized presets for common UI feedback. The <code className="text-white">success()</code> preset features a melodic frequency jump.</p>
                                            <CodeBlock language="cpp" code={`integrall.buzzer.success(); // High pitched melodic tone\nintegrall.buzzer.alert();   // Rapid 3-beep alarm\nintegrall.buzzer.failure(); // Low heavy tone\nintegrall.buzzer.beep(50);  // Short UI click click`} />
                                        </div>

                                        <div className="group">
                                            <h3 className="text-white uppercase tracking-widest text-sm font-black mb-4 flex items-center gap-2">
                                                <div className="size-2 rounded-full bg-white" />
                                                Non-Blocking Patterns
                                            </h3>
                                            <p className="text-sm">Design complex beep-gap patterns. The logic runs in the background using the <code className="text-white">handle()</code> method.</p>
                                            <CodeBlock language="cpp" code={`// Beep 5 times, 200ms ON, 200ms OFF, at 1.5kHz frequency\nintegrall.buzzer.pattern(5, 200, 200, 1500);`} />
                                        </div>
                                    </div>

                                    {/* Requirement */}
                                    <div className="p-6 rounded-2xl bg-white/[0.05] border border-white/10">
                                        <h4 className="text-white font-bold text-sm mb-2 uppercase tracking-tighter italic">Mandatory handle()</h4>
                                        <p className="text-xs text-white/40 leading-relaxed">
                                            Just like the Servo and Relay modules, the Buzzer requires <code className="text-white">integrall.handle()</code> to be called in your main loop to process its pattern timers.
                                        </p>
                                    </div>
                                </div>
                            </section>

                            {/* Rich Audio Module Documentation */}
                            <section id="module-audio-rich" className="relative pt-16">
                                <div className="absolute left-0 top-0 w-12 h-px bg-purple-500/50" />
                                <h2 className="text-3xl font-black uppercase tracking-tighter mb-8 flex items-center gap-4">
                                    <span className="text-white/10 shrink-0">12</span>
                                    Rich Audio (MP3 & Voice)
                                </h2>
                                <div className="prose prose-invert prose-cyan max-w-none text-white/60 space-y-12">
                                    <p className="text-lg leading-relaxed">
                                        The <code className="text-[#D4FF33]">AudioModule</code> provides high-fidelity sound playback via the <strong className="text-white">DFPlayer Mini</strong>. Unlike basic buzzers, this module allows for real voice alerts, music, and sound effects stored on a MicroSD card.
                                    </p>

                                    <div className="space-y-8">
                                        <div className="group">
                                            <h3 className="text-white uppercase tracking-widest text-sm font-black mb-4 flex items-center gap-2">
                                                <div className="size-2 rounded-full bg-purple-500" />
                                                MP3 Playback (DFPlayer)
                                            </h3>
                                            <p className="text-sm">Initiate a serial connection to the player and control tracks by their folder index.</p>
                                            <CodeBlock language="cpp" code={`integrall.audioBeginDF(Serial2, 16, 17); // Port, RX, TX\nintegrall.audioPlay(1); // Play track 0001.mp3\nintegrall.audioVolume(25); // Set loudness (0-30)`} />
                                        </div>

                                        <div className="group">
                                            <h3 className="text-white uppercase tracking-widest text-sm font-black mb-4 flex items-center gap-2">
                                                <div className="size-2 rounded-full bg-purple-500" />
                                                Sound Level Monitoring
                                            </h3>
                                            <p className="text-sm">Read environmental noise levels using I2S or Analog microphones for sound-reactive triggers.</p>
                                            <CodeBlock language="cpp" code={`int loudness = integrall.audioSoundLevel(34); // Returns 0-100 percentage`} />
                                        </div>
                                    </div>
                                </div>
                            </section>

                            {/* RGB Module Documentation */}
                            <section id="module-rgb" className="relative pt-16">
                                <div className="absolute left-0 top-0 w-12 h-px bg-gradient-to-r from-red-500 via-green-500 to-blue-500" />
                                <h2 className="text-3xl font-black uppercase tracking-tighter mb-8 flex items-center gap-4">
                                    <span className="text-white/10 shrink-0">13</span>
                                    RGB LED Control
                                </h2>
                                <div className="prose prose-invert prose-cyan max-w-none text-white/60 space-y-12">
                                    <p className="text-lg leading-relaxed">
                                        The <code className="text-[#D4FF33]">RGBModule</code> provides high-level color management for standard 4-pin RGB LEDs. It abstracts the difference between <strong className="text-white">Common Anode</strong> and <strong className="text-white">Common Cathode</strong> hardware with a single initialization flag.
                                    </p>

                                    <div className="space-y-8">
                                        <div className="group">
                                            <h3 className="text-white uppercase tracking-widest text-sm font-black mb-4 flex items-center gap-2">
                                                <div className="size-2 rounded-full bg-red-500" />
                                                1. Setup & Polarity
                                            </h3>
                                            <p className="text-sm">Initialize with R, G, B pins. Set the last parameter to <code className="text-white">true</code> if using Common Anode LEDs.</p>
                                            <CodeBlock language="cpp" code={`integrall.rgb.begin(14, 12, 13, false); // R, G, B, isCommonAnode`} />
                                        </div>

                                        <div className="group">
                                            <h3 className="text-white uppercase tracking-widest text-sm font-black mb-4 flex items-center gap-2">
                                                <div className="size-2 rounded-full bg-green-500" />
                                                2. Color Named Presets
                                            </h3>
                                            <p className="text-sm">Don't remember hex codes? Use built-in string names for industrial signaling.</p>
                                            <CodeBlock language="cpp" code={`integrall.rgb.setColor("orange"); // Presets: red, green, blue, yellow, cyan, white, orange, purple`} />
                                        </div>

                                        <div className="group">
                                            <h3 className="text-white uppercase tracking-widest text-sm font-black mb-4 flex items-center gap-2">
                                                <div className="size-2 rounded-full bg-blue-500" />
                                                3. Direct Control & Blinking
                                            </h3>
                                            <p className="text-sm">Use raw PWM values (0-255) or the non-blocking blinker for status heartbeats.</p>
                                            <CodeBlock language="cpp" code={`integrall.rgb.set(255, 128, 0); // Custom Amber\nintegrall.rgb.updateBlink(0, 255, 0, 1000); // Blink Green ever 1s (Non-blocking)`} />
                                        </div>
                                    </div>
                                </div>
                            </section>

                            {/* Blinker Module Documentation */}
                            <section id="module-blinker" className="relative pt-16">
                                <div className="absolute left-0 top-0 w-12 h-px bg-yellow-400/50" />
                                <h2 className="text-3xl font-black uppercase tracking-tighter mb-8 flex items-center gap-4">
                                    <span className="text-white/10 shrink-0">14</span>
                                    Blinker System
                                </h2>
                                <div className="prose prose-invert prose-cyan max-w-none text-white/60 space-y-12">
                                    <p className="text-lg leading-relaxed">
                                        The <code className="text-[#D4FF33]">BlinkerModule</code> is a professional alternative to the classic "Blink" sketch. By utilizing a non-blocking state machine, it allows users to flash LEDs or trigger periodic GPIO events without stopping the CPU with <code className="text-white">delay()</code>.
                                    </p>

                                    <div className="space-y-4">
                                        <h4 className="text-white font-bold text-sm">Minimal Usage</h4>
                                        <CodeBlock language="cpp" code={`// Flash an LED on GPIO 2 every 500ms\nintegrall.blinker.begin(2, 500);\n\n// In loop():\nintegrall.handle();`} />
                                    </div>

                                    <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5">
                                        <h5 className="text-white font-bold text-xs uppercase mb-2">Why use it?</h5>
                                        <ul className="list-disc pl-5 space-y-2 text-[11px] leading-relaxed">
                                            <li>Prevent loop hanging during hardware status signalling.</li>
                                            <li>Manage heartbeats for multiple sensors simultaneously.</li>
                                            <li>Automatically clean up GPIO states when stopped via <code className="text-white">stop()</code>.</li>
                                        </ul>
                                    </div>
                                </div>
                            </section>

                            {/* Camera Module Documentation */}
                            <section id="module-camera" className="relative pt-16">
                                <div className="absolute left-0 top-0 w-12 h-px bg-rose-500/50" />
                                <h2 className="text-3xl font-black uppercase tracking-tighter mb-8 flex items-center gap-4">
                                    <span className="text-white/10 shrink-0">15</span>
                                    ESP32-CAM (Vision)
                                </h2>
                                <div className="prose prose-invert prose-cyan max-w-none text-white/60 space-y-12">
                                    <p className="text-lg leading-relaxed">
                                        The <code className="text-[#D4FF33]">CameraModule</code> turns any AI-Thinker or Wrover board into a headless MJPEG server in seconds. It handles board-specific pin mapping (Vsync, PWDN, Reset) and JPEG buffer optimization in PSRAM automatically.
                                    </p>

                                    <div className="space-y-4">
                                        <h4 className="text-white font-bold text-sm">Activation Flow</h4>
                                        <CodeBlock language="cpp" code={`#define INTEGRALL_ENABLE_CAMERA\n#include <Integrall.h>\n\nvoid setup() {\n  integrall.begin();\n  integrall.camera.begin(); // Starts hardware & MJPEG server\n}`} />
                                    </div>

                                    <div className="grid md:grid-cols-2 gap-6 not-prose mt-8">
                                        <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5">
                                            <h5 className="text-white font-bold text-xs uppercase mb-2">VGA Baseline</h5>
                                            <p className="text-[11px] leading-relaxed">Optimized for speed (640x480). Auto-detects if PSRAM is available to increase JPEG quality.</p>
                                        </div>
                                        <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5">
                                            <h5 className="text-white font-bold text-xs uppercase mb-2">MJPEG Server</h5>
                                            <p className="text-[11px] leading-relaxed">Automatically starts a streaming server on Port 80 if WiFi is connected during initialization.</p>
                                        </div>
                                    </div>
                                </div>
                            </section>

                            {/* Input UI Documentation */}
                            <section id="module-input" className="relative pt-16">
                                <div className="absolute left-0 top-0 w-12 h-px bg-blue-500/50" />
                                <h2 className="text-3xl font-black uppercase tracking-tighter mb-8 flex items-center gap-4">
                                    <span className="text-white/10 shrink-0">16</span>
                                    Input UI & User Interaction
                                </h2>
                                <div className="prose prose-invert prose-cyan max-w-none text-white/60 space-y-12">
                                    <p className="text-lg leading-relaxed">
                                        The <code className="text-[#D4FF33]">InputModule</code> manages everything from basic tactile buttons to sophisticated authorization hardware. It includes software debouncing and unified event handling.
                                    </p>
                                    <div className="space-y-8">
                                        <div className="group">
                                            <h3 className="text-white uppercase tracking-widest text-sm font-black mb-4 flex items-center gap-2 font-mono text-[10px]">AUTH & SECURITY</h3>
                                            <CodeBlock language="cpp" code={`String cardID = integrall.inputReadRFID(5, 0); // SS Pin 5, RST Pin 0\nuint32_t irSignal = integrall.inputReadIR(14); // IR Receiver on Pin 14`} />
                                        </div>
                                        <div className="group">
                                            <h3 className="text-white uppercase tracking-widest text-sm font-black mb-4 flex items-center gap-2 font-mono text-[10px]">UX CONTROLS</h3>
                                            <CodeBlock language="cpp" code={`int dir = integrall.inputReadEncoder(25, 26); // CLK, DT\nint joyX = integrall.inputReadJoystick(34, 512, 50); // Pin, Center, Deadzone`} />
                                        </div>
                                    </div>
                                </div>
                            </section>

                            {/* Storage Systems Documentation */}
                            <section id="module-storage" className="relative pt-16">
                                <div className="absolute left-0 top-0 w-12 h-px bg-emerald-500/50" />
                                <h2 className="text-3xl font-black uppercase tracking-tighter mb-8 flex items-center gap-4">
                                    <span className="text-white/10 shrink-0">17</span>
                                    Storage & Persistence
                                </h2>
                                <div className="prose prose-invert prose-cyan max-w-none text-white/60 space-y-12">
                                    <p className="text-lg leading-relaxed">
                                        Data persistence is key for edge devices. Integrall handles both <strong className="text-white">Internal EEPROM</strong> for settings and <strong className="text-white">SD Card SPI</strong> for high-volume data logging.
                                    </p>
                                    <CodeBlock language="cpp" code={`// Settings persistence\nintegrall.storageWriteInt(0, 42);\nint val = integrall.storageReadInt(0);\n\n// SD Card Logging\nintegrall.storageLog("/data.txt", "Sensor update: 24.5C", 5); // Message, CS Pin`} />
                                </div>
                            </section>

                            {/* Time & GPS Documentation */}
                            <section id="module-time" className="relative pt-16">
                                <div className="absolute left-0 top-0 w-12 h-px bg-indigo-500/50" />
                                <h2 className="text-3xl font-black uppercase tracking-tighter mb-8 flex items-center gap-4">
                                    <span className="text-white/10 shrink-0">18</span>
                                    Time & GPS Location
                                </h2>
                                <div className="prose prose-invert prose-cyan max-w-none text-white/60 space-y-12">
                                    <p className="text-lg leading-relaxed">
                                        Keep precise track of when and where events occur. Integrall supports hardware <strong className="text-white">DS3231 RTC</strong>, network <strong className="text-white">NTP Sync</strong>, and outdoor <strong className="text-white">GPS Coordinate</strong> parsing.
                                    </p>
                                    <CodeBlock language="cpp" code={`// Network Time\nintegrall.timeSetupNTP("pool.ntp.org", 3600); // 1hr offset\nString time = integrall.timeGetStr(); // HH:MM:SS\n\n// Positioning\nfloat lat, lng;\nintegrall.timeGetGPS(Serial2, lat, lng); // Access live satellite data`} />
                                </div>
                            </section>

                            {/* Wireless & Comms Documentation */}
                            <section id="module-comm" className="relative pt-16">
                                <div className="absolute left-0 top-0 w-12 h-px bg-cyan-500/50" />
                                <h2 className="text-3xl font-black uppercase tracking-tighter mb-8 flex items-center gap-4">
                                    <span className="text-white/10 shrink-0">19</span>
                                    Wireless & Comms (BLE / LoRa)
                                </h2>
                                <div className="prose prose-invert prose-cyan max-w-none text-white/60 space-y-12">
                                    <p className="text-lg leading-relaxed">
                                        Go beyond WiFi. Integrall provides simplified wrappers for <strong className="text-white">Bluetooth Low Energy (BLE)</strong> advertising and long-range <strong className="text-white">LoRa Radio</strong> communication.
                                    </p>
                                    <CodeBlock language="cpp" code={`// Bluetooth Start\nintegrall.commBeginBLE("Integrall-Node-01");\nintegrall.commUpdateBLE(relayState); // Send state to mobile apps\n\n// LoRa Transmission\nintegrall.commBeginLoRa(868E6); // 868MHz (EU)\nintegrall.commPushLoRa("SOS: Low Battery");`} />
                                </div>
                            </section>

                            {/* Power & Battery Documentation */}
                            <section id="module-power" className="relative pt-16">
                                <div className="absolute left-0 top-0 w-12 h-px bg-green-500/50" />
                                <h2 className="text-3xl font-black uppercase tracking-tighter mb-8 flex items-center gap-4">
                                    <span className="text-white/10 shrink-0">20</span>
                                    Power & Battery Optimization
                                </h2>
                                <div className="prose prose-invert prose-cyan max-w-none text-white/60 space-y-12">
                                    <p className="text-lg leading-relaxed">
                                        Monitor your energy budget and extend battery life. Includes <strong className="text-white">INA219 fuel gauging</strong> and high-level <strong className="text-white">Deep Sleep</strong> management for ESP32.
                                    </p>
                                    <CodeBlock language="cpp" code={`float current = integrall.powerGetCurrent(); // In mA\nint battery = integrall.powerGetBattery(4.15); // Percentage based on LiPo curve\n\n// Enter low-power mode for 10 minutes\nintegrall.powerDeepSleep(600);`} />
                                </div>
                            </section>

                            {/* Stepper Motor Documentation */}
                            <section id="module-stepper" className="relative pt-16">
                                <div className="absolute left-0 top-0 w-12 h-px bg-teal-500/50" />
                                <h2 className="text-3xl font-black uppercase tracking-tighter mb-8 flex items-center gap-4">
                                    <span className="text-white/10 shrink-0">21</span>
                                    Stepper Motor Control
                                </h2>
                                <div className="prose prose-invert prose-cyan max-w-none text-white/60 space-y-12">
                                    <p className="text-lg leading-relaxed">
                                        Precise motion control for robotics or 3D mechanisms. Integrall provides a simplified wrapper around the standard stepper logic for 4-wire drivers (ULN2003, L298N).
                                    </p>
                                    <CodeBlock language="cpp" code={`integrall.stepperBegin(2048, 13, 12, 14, 27); // Steps/Rev, P1..P4\nintegrall.stepperSpeed(15); // RPM\nintegrall.stepperMove(90);  // Rotate 90 degrees`} />
                                </div>
                            </section>

                            {/* Project Presets Section */}
                            <section id="project-presets" className="relative pt-16">
                                <div className="absolute left-0 top-0 w-12 h-px bg-cyan-400/50" />
                                <h2 className="text-3xl font-black uppercase tracking-tighter mb-8 flex items-center gap-4">
                                    <span className="text-white/10 shrink-0">22</span>
                                    Project Presets
                                </h2>
                                <div className="prose prose-invert prose-cyan max-w-none text-white/60 space-y-16">
                                    <p className="text-lg leading-relaxed">
                                        Integrall comes with <strong className="text-white">High-Level Presets</strong>—pre-architected systems that combine multiple modules into a single logical entity. Instead of writing complex state machines, you just configure and update.
                                    </p>

                                    {/* 1. Smart Lock */}
                                    <div className="space-y-6">
                                        <div className="flex items-center gap-3">
                                            <div className="size-8 rounded bg-cyan-500/20 flex items-center justify-center text-cyan-400 font-bold text-xs border border-cyan-500/20">L</div>
                                            <h3 className="text-white uppercase tracking-widest text-sm font-black m-0">1. Smart Lock System</h3>
                                        </div>
                                        <p className="text-sm">Combines Keypad, Relay, and (optionally) LCD for a professional secure entry point.</p>
                                        <CodeBlock language="cpp" code={`// Setup: PIN, Relay Index, Unlock Duration, Max Retries\nintegrall.lockSetup("1234", doorRelay, 3000, 3);\n\n// Loop:\nintegrall.lockUpdate();`} />
                                    </div>

                                    {/* 2. Security Alarm */}
                                    <div className="space-y-6">
                                        <div className="flex items-center gap-3">
                                            <div className="size-8 rounded bg-red-500/20 flex items-center justify-center text-red-400 font-bold text-xs border border-red-500/20">A</div>
                                            <h3 className="text-white uppercase tracking-widest text-sm font-black m-0">2. Security Alarm</h3>
                                        </div>
                                        <p className="text-sm">Triggers a relay (Siren/Light) on motion detection with built-in cooldown logic and cloud event logging.</p>
                                        <CodeBlock language="cpp" code={`// Setup: PIR Pin, Relay Index, Cooldown (ms)\nintegrall.alarmSetup(15, sirenRelay, 10000);\n\n// Loop:\nintegrall.alarmUpdate();`} />
                                    </div>

                                    {/* 3. Parking / Proximity Sensor */}
                                    <div className="space-y-6">
                                        <div className="flex items-center gap-3">
                                            <div className="size-8 rounded bg-yellow-500/20 flex items-center justify-center text-yellow-400 font-bold text-xs border border-yellow-500/20">P</div>
                                            <h3 className="text-white uppercase tracking-widest text-sm font-black m-0">3. Parking Proximity</h3>
                                        </div>
                                        <p className="text-sm">Real-time ultrasonic distance tracking with visual LCD feedback and buzzer-based proximity beeps.</p>
                                        <CodeBlock language="cpp" code={`// Setup: Trig, Echo, Warn Distance, Stop Distance\nintegrall.parkingSetup(13, 12, 50.0, 20.0);\n\n// Loop:\nintegrall.parkingUpdate();`} />
                                    </div>

                                    {/* 4. Weather Station */}
                                    <div className="space-y-6">
                                        <div className="flex items-center gap-3">
                                            <div className="size-8 rounded bg-blue-500/20 flex items-center justify-center text-blue-400 font-bold text-xs border border-blue-500/20">W</div>
                                            <h3 className="text-white uppercase tracking-widest text-sm font-black m-0">4. IoT Weather Station</h3>
                                        </div>
                                        <p className="text-sm">Automatic DHT reading, LCD visualization, and periodic telemetry syncing to the Integrall Cloud.</p>
                                        <CodeBlock language="cpp" code={`// Setup: DHT Pin, DHT Type, Interval (Seconds)\nintegrall.weatherSetup(4, 22, 60);\n\n// Loop:\nintegrall.weatherUpdate();`} />
                                    </div>
                                </div>
                            </section>

                            {/* IoT Cloud & Backend Section */}
                            <section id="iot-cloud-and-backend" className="relative pt-16">
                                <div className="absolute left-0 top-0 w-12 h-px bg-magenta-500/50" />
                                <h2 className="text-3xl font-black uppercase tracking-tighter mb-8 flex items-center gap-4">
                                    <span className="text-white/10 shrink-0">23</span>
                                    IoT & Easy HTTP
                                </h2>
                                <div className="prose prose-invert prose-cyan max-w-none text-white/60 space-y-12">
                                    <p className="text-lg leading-relaxed">
                                        Integrall bridges physical hardware to the digital world through three primary channels: <strong className="text-white">Blynk</strong> for mobile UI, <strong className="text-white">MQTT</strong> for local automation, and the <strong className="text-white">Integrall HTTP Engine</strong> for scalable web requests.
                                    </p>

                                    <div className="space-y-16">
                                        {/* Easy HTTP */}
                                        <div className="group">
                                            <h3 className="text-white uppercase tracking-widest text-sm font-black mb-4 flex items-center gap-2">
                                                <div className="size-2 rounded-full bg-[#ff00e5]" />
                                                1. Easy HTTP (Native API Calls)
                                            </h3>
                                            <p className="mb-4">
                                                Say goodbye to <code className="text-white">HTTPClient</code> loops, header management, and memory leaks. The <code className="text-magenta-400">Easy HTTP</code> engine handles connection allocation natively and returns parsed strings immediately.
                                            </p>

                                            <div className="grid md:grid-cols-2 gap-8 not-prose mb-6">
                                                <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5">
                                                    <h4 className="text-white text-xs font-bold uppercase tracking-widest mb-4">httpGet(url)</h4>
                                                    <p className="text-xs mb-4 text-white/40">Performs a GET request and returns the response body as a String.</p>
                                                    <CodeBlock language="cpp" code={`String json = integrall.httpGet("http://api.scantool.com/status");`} />
                                                </div>
                                                <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5">
                                                    <h4 className="text-white text-xs font-bold uppercase tracking-widest mb-4">httpPost(url, payload)</h4>
                                                    <p className="text-xs mb-4 text-white/40">Sends JSON data to a server and returns the HTTP status code.</p>
                                                    <CodeBlock language="cpp" code={`int code = integrall.httpPost("http://api.server.com/ack", "{\\"id\\": 1}");`} />
                                                </div>
                                            </div>
                                        </div>

                                        {/* Integrall Custom Backend */}
                                        <div className="group">
                                            <h3 className="text-white uppercase tracking-widest text-sm font-black mb-4 flex items-center gap-2">
                                                <div className="size-2 rounded-full bg-[#D4FF33]" />
                                                2. Auto-Telemetry Backend
                                            </h3>
                                            <p className="text-sm">Initialize with your Backend URL to automatically register your device and send automated telemetry JSON objects.</p>
                                            <CodeBlock language="cpp" code={`// The framework handles headers and background retries!\nintegrall.begin("SSID", "PASS", "http://your-server.com:8000");\n\nStaticJsonDocument<64> doc;\ndoc["status"] = "operating";\nintegrall.sendTelemetry(doc);`} />
                                        </div>

                                        <div className="p-6 rounded-2xl bg-cyan-500/5 border border-cyan-500/10">
                                            <h4 className="text-white font-bold text-xs uppercase mb-2">MQTT & Webhooks</h4>
                                            <p className="text-[11px] leading-relaxed">For advanced webhooks, Integrall <code className="text-white">DeviceManager</code> exposes connection state securely, allowing you to use standard <code className="text-white">WebServer</code> classes natively without blocking.</p>
                                        </div>
                                    </div>
                                </div>
                            </section>

                            {/* Debugging Section */}
                            <section id="debugging" className="relative pt-16">
                                <div className="absolute left-0 top-0 w-12 h-px bg-orange-500/50" />
                                <h2 className="text-3xl font-black uppercase tracking-tighter mb-8 flex items-center gap-4">
                                    <span className="text-white/10 shrink-0">24</span>
                                    Framework Debugging
                                </h2>
                                <div className="prose prose-invert prose-cyan max-w-none text-white/60 space-y-12">
                                    <p className="text-lg leading-relaxed">
                                        Integrall features a centralized <code className="text-[#D4FF33]">Logger</code> engine. It uses <strong className="text-white">Flash String Optimization</strong> to ensure debug messages don't consume your precious RAM.
                                    </p>

                                    <div className="space-y-6">
                                        <h4 className="text-white font-bold text-sm uppercase tracking-widest">Debug Levels</h4>
                                        <p className="text-sm">Set the verbosity of the framework by defining <code className="text-white">INTEGRALL_DEBUG_LEVEL</code> in your sketch.</p>
                                        <div className="grid grid-cols-2 md:grid-cols-5 gap-2 text-[10px] font-bold text-center">
                                            <div className="p-3 bg-white/5 rounded border border-white/5">0: SILENT</div>
                                            <div className="p-3 bg-red-500/10 text-red-400 rounded border border-red-500/20">1: ERROR</div>
                                            <div className="p-3 bg-yellow-500/10 text-yellow-400 rounded border border-yellow-500/20">2: WARN</div>
                                            <div className="p-3 bg-cyan-500/10 text-cyan-400 rounded border border-cyan-500/20">3: INFO</div>
                                            <div className="p-3 bg-magenta-500/10 text-magenta-400 rounded border border-magenta-500/20">4: VERBOSE</div>
                                        </div>
                                    </div>

                                    <CodeBlock language="cpp" code={`#define INTEGRALL_DEBUG_LEVEL 4 // Set to Verbose\n#include <Integrall.h>\n\nvoid setup() {\n  integrall.begin(115200); // Start serial at 115200 baud\n  integrall.logger.printMemoryStats(); // Print ESP32 Heap Status\n}`} />
                                </div>
                            </section>

                            {/* Configuration Flags Section */}
                            <section id="configuration" className="relative pt-16">
                                <div className="absolute left-0 top-0 w-12 h-px bg-white/10" />
                                <h2 className="text-3xl font-black uppercase tracking-tighter mb-8 flex items-center gap-4">
                                    <span className="text-white/10 shrink-0">25</span>
                                    Configuration Flags
                                </h2>
                                <div className="prose prose-invert prose-cyan max-w-none text-white/60 space-y-8">
                                    <p>Integrall is designed to be <strong className="text-white">Pay-Only-For-What-You-Use</strong>. By disabling modules you don't need, you can significantly reduce binary size and RAM usage.</p>

                                    <div className="bg-black/40 border border-white/10 rounded-2xl p-6">
                                        <h5 className="text-white font-bold text-xs uppercase mb-4 tracking-widest">Global Module Registry</h5>
                                        <div className="grid md:grid-cols-2 gap-x-12 gap-y-2 font-mono text-[10px]">
                                            <div className="flex justify-between border-b border-white/5 py-2"><span>INTEGRALL_ENABLE_WIFI</span> <span className="text-cyan-400">OFF</span></div>
                                            <div className="flex justify-between border-b border-white/5 py-2"><span>INTEGRALL_ENABLE_RELAY</span> <span className="text-cyan-400">OFF</span></div>
                                            <div className="flex justify-between border-b border-white/5 py-2"><span>INTEGRALL_ENABLE_SERVO</span> <span className="text-cyan-400">OFF</span></div>
                                            <div className="flex justify-between border-b border-white/5 py-2"><span>INTEGRALL_ENABLE_LCD</span> <span className="text-cyan-400">OFF</span></div>
                                            <div className="flex justify-between border-b border-white/5 py-2"><span>INTEGRALL_ENABLE_OLED</span> <span className="text-cyan-400">OFF</span></div>
                                            <div className="flex justify-between border-b border-white/5 py-2"><span>INTEGRALL_ENABLE_KEYPAD</span> <span className="text-cyan-400">OFF</span></div>
                                            <div className="flex justify-between border-b border-white/5 py-2"><span>INTEGRALL_ENABLE_INPUT</span> <span className="text-cyan-400">OFF</span></div>
                                            <div className="flex justify-between border-b border-white/5 py-2"><span>INTEGRALL_ENABLE_STORAGE</span> <span className="text-cyan-400">OFF</span></div>
                                            <div className="flex justify-between border-b border-white/5 py-2"><span>INTEGRALL_ENABLE_TIME</span> <span className="text-cyan-400">OFF</span></div>
                                            <div className="flex justify-between border-b border-white/5 py-2"><span>INTEGRALL_ENABLE_COMM</span> <span className="text-cyan-400">OFF</span></div>
                                            <div className="flex justify-between border-b border-white/5 py-2"><span>INTEGRALL_ENABLE_POWER</span> <span className="text-cyan-400">OFF</span></div>
                                            <div className="flex justify-between border-b border-white/5 py-2"><span>INTEGRALL_ENABLE_AUDIO</span> <span className="text-cyan-400">OFF</span></div>
                                            <div className="flex justify-between border-b border-white/5 py-2"><span>INTEGRALL_ENABLE_STEPPER</span> <span className="text-cyan-400">OFF</span></div>
                                            <div className="flex justify-between border-b border-white/5 py-2"><span>INTEGRALL_ENABLE_CAMERA</span> <span className="text-cyan-400">OFF</span></div>
                                            <div className="flex justify-between border-b border-white/5 py-2"><span>INTEGRALL_DEBUG_LEVEL</span> <span className="text-cyan-400">2</span></div>
                                        </div>
                                    </div>

                                    <div className="p-6 rounded-2xl bg-yellow-500/5 border border-yellow-500/10">
                                        <p className="text-xs italic">Note: These flags MUST be defined before you include the main Header file.</p>
                                    </div>
                                </div>
                            </section>
                        </div>
                    </FadeInView>
                </main>
            </div>

            {/* Floating Back to Top Button */}
            <button
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="fixed bottom-8 right-8 size-12 bg-white text-black font-black flex items-center justify-center text-xs hover:bg-[#D4FF33] transition-all z-50 shadow-2xl shadow-black/50"
            >
                TOP
            </button>

            <footer className="mt-40 py-20 border-t border-white/5">
                <div className="mx-auto max-max-w-7xl px-6 flex flex-col md:flex-row justify-between items-center gap-8">
                    <div className="flex items-center gap-3">
                        <div className="size-10 bg-white text-black font-black flex items-center justify-center text-xs">V1</div>
                        <div className="text-[10px] font-bold uppercase tracking-widest text-white/30">
                            Documentation / Integrall IoT / 2026
                        </div>
                    </div>
                    <div className="flex gap-8 text-[10px] font-bold uppercase tracking-[0.3em] text-white/40">
                        <a href="#" className="hover:text-[#00f2ff] transition-colors">Discord</a>
                        <a href="#" className="hover:text-[#00f2ff] transition-colors">Twitter</a>
                        <a href="https://github.com/Tigo-cmd/INTEGRALL" className="hover:text-[#00f2ff] transition-colors">GitHub</a>
                    </div>
                </div>
            </footer>
        </div>
    );
}
