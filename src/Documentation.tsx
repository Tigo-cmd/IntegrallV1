import React from 'react';
import { ArrowLeft, Book, ChevronRight, Cloud, Github, Rocket, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
import { AnimatedHeading } from '@/components/ui/animated-heading';
import { FadeInView } from '@/components/ui/fade-in-view';
import { Section } from './docs/ui';
import * as Start from './docs/start';
import * as M from './docs/modules';

type Entry = { id: string; title: string; render: () => React.ReactNode; accent?: string };
type Group = { label: string; color: string; entries: Entry[] };

const GROUPS: Group[] = [
    {
        label: 'Start here', color: 'text-[#D4FF33]', entries: [
            { id: 'overview', title: 'What is Integrall', render: Start.Overview, accent: 'bg-[#D4FF33]/50' },
            { id: 'install', title: 'Install', render: Start.Install, accent: 'bg-[#D4FF33]/50' },
            { id: 'core-rules', title: 'Core rules', render: Start.CoreRules, accent: 'bg-[#D4FF33]/50' },
            { id: 'first-project', title: 'First project: button + buzzer', render: Start.FirstProject, accent: 'bg-[#D4FF33]/50' },
            { id: 'hardware-check', title: 'Is my part connected?', render: Start.HardwareCheck, accent: 'bg-[#D4FF33]/50' },
        ],
    },
    {
        label: 'Modules', color: 'text-[#ff00e5]', entries: [
            { id: 'module-relay', title: 'Relays', render: M.Relay },
            { id: 'module-buzzer', title: 'Buzzer', render: M.Buzzer },
            { id: 'module-input', title: 'Buttons & input', render: M.Input },
            { id: 'module-lcd', title: 'LCD', render: M.Lcd },
            { id: 'module-oled', title: 'OLED', render: M.Oled },
            { id: 'module-sensors', title: 'Sensors & IMU', render: M.Sensors },
            { id: 'module-motion', title: 'Servo & stepper', render: M.Motion },
            { id: 'module-keypad', title: 'Keypad & lock', render: M.Keypad },
            { id: 'module-misc', title: 'RGB, time, storage, power, audio, cellular', render: M.Misc },
            { id: 'module-camera', title: 'Camera', render: M.Camera },
            { id: 'module-web', title: 'HTTP, web server, WebSockets', render: M.Web },
        ].map((e) => ({ ...e, accent: 'bg-[#ff00e5]/40' })),
    },
    {
        label: 'Cloud & dashboard', color: 'text-cyan-400', entries: [
            { id: 'cloud-overview', title: 'How the cloud works', render: Start.CloudOverview },
            { id: 'cloud-run', title: 'Run the cloud', render: Start.CloudRun },
            { id: 'cloud-devices', title: 'Register devices', render: Start.CloudDevices },
            { id: 'cloud-openremote', title: 'The OpenRemote dashboard', render: Start.CloudOpenRemote },
            { id: 'cloud-firmware', title: 'Telemetry, commands & switches', render: Start.CloudFirmware },
            { id: 'cloud-contract', title: 'MQTT topics', render: Start.CloudContract },
        ].map((e) => ({ ...e, accent: 'bg-cyan-500/50' })),
    },
    {
        label: 'Reference', color: 'text-white/50', entries: [
            { id: 'configuration', title: 'Configuration flags', render: M.Configuration },
            { id: 'testing', title: 'Testing & debugging', render: M.Testing },
            { id: 'migrating', title: 'Upgrading from v1.1', render: M.Migrating },
        ].map((e) => ({ ...e, accent: 'bg-white/30' })),
    },
];

const ALL = GROUPS.flatMap((g) => g.entries);
const NUMBER = new Map(ALL.map((e, i) => [e.id, i + 1]));

/** Highlights the section currently on screen (IntersectionObserver: no scroll polling). */
function useActiveSection(): string {
    const [active, setActive] = React.useState(ALL[0].id);
    React.useEffect(() => {
        const seen = new Map<string, number>();
        const obs = new IntersectionObserver((items) => {
            for (const it of items) seen.set(it.target.id, it.isIntersecting ? it.boundingClientRect.top : Infinity);
            let best = '', top = Infinity;
            for (const [id, t] of seen) if (t < top) { top = t; best = id; }
            if (best) setActive(best);
        }, { rootMargin: '-10% 0px -70% 0px' });
        ALL.forEach((e) => { const el = document.getElementById(e.id); if (el) obs.observe(el); });
        return () => obs.disconnect();
    }, []);
    return active;
}

export default function DocumentationPage() {
    const active = useActiveSection();

    React.useEffect(() => {           // deep links (/docs#first-project) after first render
        const id = decodeURIComponent(window.location.hash.slice(1));
        if (id) document.getElementById(id)?.scrollIntoView();
    }, []);

    return (
        <div className="min-h-screen bg-[#050505] text-white selection:bg-cyan-500/30 overflow-x-clip">
            <div className="fixed inset-0 pointer-events-none" aria-hidden>
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-cyan-500/5 blur-[120px]" />
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-fuchsia-500/5 blur-[120px]" />
            </div>

            <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 py-16 lg:py-24 lg:grid lg:grid-cols-12 lg:gap-16">
                {/* Sidebar */}
                <aside className="hidden lg:block lg:col-span-3 self-start sticky top-8 h-[calc(100vh-4rem)] overflow-y-auto pr-2 custom-scrollbar">
                    <Link to="/" className="flex items-center gap-2 text-white/40 hover:text-white transition-colors mb-10 group no-underline">
                        <ArrowLeft className="size-4 group-hover:-translate-x-1 transition-transform" />
                        <span className="text-[10px] font-bold uppercase tracking-[0.2em]">Back to Home</span>
                    </Link>
                    <nav className="space-y-8" aria-label="Documentation">
                        {GROUPS.map((g) => (
                            <div key={g.label}>
                                <h5 className={`text-[10px] font-bold uppercase tracking-[0.3em] mb-3 px-2 ${g.color}`}>{g.label}</h5>
                                <ul className="space-y-0.5">
                                    {g.entries.map((e) => (
                                        <li key={e.id}>
                                            <a href={`#${e.id}`} aria-current={active === e.id ? 'location' : undefined}
                                               className={`flex items-center gap-3 px-3 py-1.5 text-[13px] rounded-lg transition-colors border no-underline ${active === e.id
                                                   ? 'text-white bg-white/[0.06] border-white/10'
                                                   : 'text-white/45 border-transparent hover:text-white hover:bg-white/5'}`}>
                                                <span className="text-[10px] text-white/20 font-mono w-4 shrink-0">{String(NUMBER.get(e.id)).padStart(2, '0')}</span>
                                                <span className="truncate">{e.title}</span>
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </nav>
                </aside>

                {/* Main */}
                <main className="lg:col-span-9 min-w-0">
                    <Link to="/" className="inline-flex lg:hidden items-center gap-2 text-white/40 hover:text-white transition-colors mb-10 group no-underline">
                        <ArrowLeft className="size-4" />
                        <span className="text-[10px] font-bold uppercase tracking-[0.2em]">Back to Home</span>
                    </Link>

                    <FadeInView>
                        <div className="flex items-center gap-3 mb-8">
                            <Book className="size-5 text-[var(--il-lime)]" />
                            <span className="text-[10px] font-bold uppercase tracking-[0.5em] text-white/30">Release v1.2.0</span>
                        </div>
                        <AnimatedHeading text="Documentation" className="text-[2.5rem] sm:text-5xl lg:text-7xl mb-8" />
                        <p className="text-lg text-white/50 max-w-2xl leading-relaxed mb-10">
                            Everything you need to build with Integrall on ESP32, ESP8266 and Arduino: install it, wire your first project,
                            check your parts, and connect your devices to a live dashboard.
                        </p>

                        {/* Mobile jump menu */}
                        <label className="lg:hidden block mb-10">
                            <span className="sr-only">Jump to section</span>
                            <select
                                className="w-full bg-white/[0.04] border border-white/10 rounded-xl px-4 py-3 text-sm text-white"
                                value={active}
                                onChange={(ev) => document.getElementById(ev.target.value)?.scrollIntoView({ behavior: 'smooth' })}>
                                {GROUPS.map((g) => (
                                    <optgroup key={g.label} label={g.label}>
                                        {g.entries.map((e) => <option key={e.id} value={e.id}>{e.title}</option>)}
                                    </optgroup>
                                ))}
                            </select>
                        </label>

                        {/* Quick actions */}
                        <div className="grid sm:grid-cols-3 gap-4 mb-12">
                            {[
                                { href: '#first-project', icon: Rocket, title: 'First project', text: 'Button + buzzer, offline then in the cloud. Ten minutes, two parts.', color: 'text-[var(--il-lime)]', bg: 'bg-[var(--il-lime)]/10' },
                                { href: '#cloud-run', icon: Cloud, title: 'Run the cloud', text: 'Broker, backend and the OpenRemote dashboard with Docker.', color: 'text-cyan-300', bg: 'bg-cyan-500/10' },
                                { href: Start.REPO, icon: Github, title: 'Source on GitHub', text: 'Library, examples, cloud backend and tests.', color: 'text-[#ff00e5]', bg: 'bg-fuchsia-500/10', external: true },
                            ].map((c) => (
                                <a key={c.title} href={c.href} {...(c.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                                   className="group p-5 bg-white/[0.02] border border-white/5 rounded-2xl hover:bg-white/[0.04] transition-colors no-underline">
                                    <div className="flex items-center gap-3 mb-3">
                                        <div className={`p-2 rounded-lg ${c.bg} ${c.color}`}><c.icon className="size-4" /></div>
                                        <h4 className="font-bold uppercase tracking-tight text-sm">{c.title}</h4>
                                    </div>
                                    <p className="text-sm text-white/40 leading-relaxed">{c.text}</p>
                                    <div className={`mt-3 flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest ${c.color} opacity-70 group-hover:opacity-100 transition-opacity`}>
                                        Open <ChevronRight className="size-3" />
                                    </div>
                                </a>
                            ))}
                        </div>

                        {/* What's new */}
                        <div className="p-6 rounded-2xl bg-gradient-to-r from-[var(--il-lime)]/10 via-cyan-500/5 to-transparent border border-[var(--il-lime)]/20 mb-8">
                            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[var(--il-lime)] mb-3">
                                <Zap className="size-4" /> New in v1.2.0
                            </div>
                            <div className="grid sm:grid-cols-2 gap-3 text-[13px] text-white/60 leading-relaxed">
                                <div>• <strong className="text-white">MQTT cloud link:</strong> data and commands are pushed instantly, with no polling, last-will offline detection, and commands that are never replayed.</div>
                                <div>• <strong className="text-white">OpenRemote dashboard:</strong> every device becomes an asset with history, rules and switches.</div>
                                <div>• <strong className="text-white">selfTest():</strong> a report of which parts actually answered, with wiring hints.</div>
                                <div>• <strong className="text-white">Truly non-blocking:</strong> async sensors, steppers, SMS and WiFi. <code className="text-cyan-300">NAN</code> for missing readings.</div>
                            </div>
                        </div>

                        <div className="space-y-24">
                            {ALL.map((e) => (
                                <Section key={e.id} id={e.id} num={NUMBER.get(e.id)!} title={e.title} accent={e.accent}>
                                    {e.render()}
                                </Section>
                            ))}
                        </div>
                    </FadeInView>
                </main>
            </div>

            <button
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                aria-label="Back to top"
                className="fixed bottom-6 right-6 size-11 bg-white text-black font-black flex items-center justify-center text-[10px] hover:bg-[#D4FF33] transition-colors z-50 shadow-2xl shadow-black/50">
                TOP
            </button>

            <footer className="mt-32 py-16 border-t border-white/5">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="flex items-center gap-3">
                        <div className="size-10 bg-white text-black font-black flex items-center justify-center text-xs">V1.2</div>
                        <div className="text-[10px] font-bold uppercase tracking-widest text-white/30">Documentation / Integrall IoT</div>
                    </div>
                    <a href={Start.REPO} className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/40 hover:text-[#00f2ff] transition-colors">GitHub</a>
                </div>
            </footer>
        </div>
    );
}
