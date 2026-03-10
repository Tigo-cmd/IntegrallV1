import React, { useEffect, useRef, useState } from 'react';
import { FadeInView, StaggerChildren, StaggerItem } from '@/components/ui/fade-in-view';

const stats = [
    { value: 10, suffix: '', label: 'Hardware Modules', color: 'var(--il-lime)' },
    { value: 5, suffix: '+', label: 'Ready Projects', color: 'var(--il-magenta)' },
    { value: 3, suffix: '', label: 'Platforms', color: 'var(--il-cyan)' },
    { value: 1, suffix: '', label: 'Unified Include', color: 'var(--il-lime)' },
    { value: 100, suffix: '%', label: 'Mobile Ready', color: 'var(--il-magenta)' },
];

const CountUp: React.FC<{ target: number; suffix: string; duration?: number }> = ({
    target,
    suffix,
    duration = 1800,
}) => {
    const [count, setCount] = useState(0);
    const ref = useRef<HTMLSpanElement>(null);
    const started = useRef(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !started.current) {
                    started.current = true;
                    const startTime = performance.now();
                    const animate = (now: number) => {
                        const elapsed = now - startTime;
                        const progress = Math.min(elapsed / duration, 1);
                        const eased = 1 - Math.pow(1 - progress, 3);
                        setCount(Math.round(eased * target));
                        if (progress < 1) requestAnimationFrame(animate);
                    };
                    requestAnimationFrame(animate);
                }
            },
            { threshold: 0.3 }
        );
        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, [target, duration]);

    return (
        <span ref={ref} style={{
            fontFamily: "'Space Grotesk', monospace",
            fontSize: 'clamp(2.5rem, 5vw, 3.5rem)',
            fontWeight: 700,
            letterSpacing: '0.05em',
            lineHeight: 1,
        }}>
            {count}{suffix}
        </span>
    );
};

export const StatsSection = () => (
    <section className="il-section" style={{ background: 'var(--il-bg)', borderBottom: '1px solid var(--il-border)' }}>
        <div className="il-container">
            <StaggerChildren className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 lg:gap-12" stagger={0.12}>
                {stats.map((s) => (
                    <StaggerItem key={s.label}>
                        <div className="text-center">
                            <div style={{ color: s.color }}>
                                <CountUp target={s.value} suffix={s.suffix} />
                            </div>
                            <div style={{
                                fontFamily: "'Space Grotesk', monospace",
                                fontSize: '.7rem',
                                fontWeight: 700,
                                letterSpacing: '.2em',
                                textTransform: 'uppercase' as const,
                                color: 'var(--il-text-secondary)',
                                marginTop: '12px',
                            }}>
                                {s.label}
                            </div>
                        </div>
                    </StaggerItem>
                ))}
            </StaggerChildren>
        </div>
    </section>
);
