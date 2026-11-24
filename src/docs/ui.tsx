// Building blocks for the documentation page (same look as the rest of the site).
import React from 'react';
import { Check, Copy, Info, TriangleAlert } from 'lucide-react';

export function CodeBlock({ code, language = 'cpp', title }: { code: string; language?: string; title?: string }) {
    const [copied, setCopied] = React.useState(false);
    const copy = () => {
        navigator.clipboard?.writeText(code).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 1500);
        }).catch(() => { /* clipboard blocked: nothing to do */ });
    };
    return (
        <div className="relative group my-6 not-prose">
            <div className="relative bg-[#080810] border border-white/5 rounded-xl overflow-hidden shadow-2xl">
                <div className="flex items-center justify-between px-4 py-2 bg-white/[0.03] border-b border-white/5">
                    <span className="font-mono text-[9px] uppercase tracking-widest text-white/30">{title ?? language}</span>
                    <button onClick={copy} aria-label="Copy code" className="text-white/30 hover:text-[#00f2ff] transition-colors p-1">
                        {copied ? <Check className="size-3" /> : <Copy className="size-3" />}
                    </button>
                </div>
                <pre className="p-5 font-mono text-[13px] leading-relaxed overflow-x-auto text-white/75"><code>{code}</code></pre>
            </div>
        </div>
    );
}

/** Inline code. */
export const C = ({ children }: { children: React.ReactNode }) => (
    <code className="text-[#D4FF33] bg-white/[0.04] px-1.5 py-0.5 rounded text-[0.9em] break-words">{children}</code>
);

export const B = ({ children }: { children: React.ReactNode }) => <strong className="text-white">{children}</strong>;

export const Sub = ({ children }: { children: React.ReactNode }) => (
    <h3 className="text-white uppercase tracking-widest text-sm font-black mt-12 mb-4 flex items-center gap-2">
        <span className="size-2 rounded-full bg-[#D4FF33] shrink-0" />
        {children}
    </h3>
);

export function Callout({ kind = 'info', title, children }: { kind?: 'info' | 'warn'; title?: string; children: React.ReactNode }) {
    const warn = kind === 'warn';
    const Icon = warn ? TriangleAlert : Info;
    return (
        <div className={`my-6 p-5 rounded-2xl border not-prose ${warn ? 'bg-yellow-500/5 border-yellow-500/20' : 'bg-cyan-500/5 border-cyan-500/15'}`}>
            <div className={`flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest mb-2 ${warn ? 'text-yellow-300' : 'text-cyan-300'}`}>
                <Icon className="size-3.5" /> {title ?? (warn ? 'Careful' : 'Note')}
            </div>
            <div className="text-sm text-white/60 leading-relaxed space-y-2">{children}</div>
        </div>
    );
}

/** Two- or three-column reference table; first column rendered as code. */
export function ApiTable({ rows, head = ['Call', 'What it does'] }: { rows: React.ReactNode[][]; head?: string[] }) {
    return (
        <div className="overflow-x-auto my-6 not-prose rounded-xl border border-white/5">
            <table className="w-full text-left text-sm border-collapse min-w-[520px]">
                <thead>
                    <tr className="border-b border-white/10 bg-white/[0.02] text-white font-bold uppercase tracking-[0.2em] text-[10px]">
                        {head.map((h) => <th key={h} className="py-3 px-4">{h}</th>)}
                    </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                    {rows.map((r, i) => (
                        <tr key={i} className="align-top">
                            {r.map((cell, j) => (
                                <td key={j} className={`py-3 px-4 ${j === 0 ? 'font-mono text-[12px] text-[#D4FF33] whitespace-nowrap' : 'text-white/60'}`}>{cell}</td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export function Steps({ items }: { items: React.ReactNode[] }) {
    return (
        <ol className="my-6 space-y-4 not-prose">
            {items.map((it, i) => (
                <li key={i} className="flex gap-4">
                    <span className="shrink-0 size-7 rounded-full border border-[#D4FF33]/40 text-[#D4FF33] text-xs font-bold flex items-center justify-center">{i + 1}</span>
                    <div className="text-sm text-white/60 leading-relaxed pt-1 min-w-0 flex-1">{it}</div>
                </li>
            ))}
        </ol>
    );
}

export function Section({ id, num, title, accent = 'bg-cyan-500/50', children }: {
    id: string; num: number; title: string; accent?: string; children: React.ReactNode;
}) {
    return (
        <section id={id} className="relative pt-16 scroll-mt-8">
            <div className={`absolute left-0 top-0 w-12 h-px ${accent}`} />
            <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tighter mb-8 flex items-baseline gap-4">
                <span className="text-white/10 shrink-0 tabular-nums">{String(num).padStart(2, '0')}</span>
                <a href={`#${id}`} className="hover:text-[#D4FF33] transition-colors no-underline">{title}</a>
            </h2>
            <div className="max-w-none text-white/60 space-y-5 leading-relaxed text-[15px]">{children}</div>
        </section>
    );
}
