import React, { useCallback, useEffect, useRef, useState } from 'react'
import { Button } from '@/components/ui/button'
import { InfiniteSlider } from '@/components/ui/infinite-slider'
import { ProgressiveBlur } from '@/components/ui/progressive-blur'
import { cn } from '@/lib/utils'
import { Menu, X, Cpu, Wifi, Shield, Zap, Github, Terminal, Book } from 'lucide-react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

export function HeroSection() {
    const [mouse, setMouse] = useState({ x: 0, y: 0 });
    const heroRef = useRef<HTMLDivElement>(null);

    const handleMouseMove = useCallback((e: MouseEvent) => {
        if (!heroRef.current) return;
        const rect = heroRef.current.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
        const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
        setMouse({ x, y });
    }, []);

    useEffect(() => {
        const el = heroRef.current;
        if (!el) return;
        el.addEventListener('mousemove', handleMouseMove);
        return () => el.removeEventListener('mousemove', handleMouseMove);
    }, [handleMouseMove]);

    return (
        <>
            <HeroHeader />
            <main className="overflow-x-hidden">
                {/* Hero */}
                <section ref={heroRef} className="relative min-h-screen flex items-center" style={{ background: '#050505' }}>
                    {/* Radial glow background */}
                    <div
                        className="pointer-events-none absolute inset-0"
                        style={{
                            background: [
                                'radial-gradient(ellipse 60% 50% at 25% 50%, rgba(0, 242, 255, .12) 0%, transparent 70%)',
                                'radial-gradient(ellipse 50% 40% at 75% 60%, rgba(255, 0, 229, .08) 0%, transparent 70%)',
                            ].join(', '),
                        }}
                    />

                    {/* Floating glass shapes with mouse parallax */}
                    <div className="pointer-events-none absolute inset-0 overflow-hidden">
                        <div
                            className="absolute top-[15%] left-[8%] w-40 h-40 rounded-3xl rotate-12"
                            style={{
                                background: 'rgba(255,255,255,0.015)',
                                border: '1px solid rgba(255,255,255,0.05)',
                                backdropFilter: 'blur(8px)',
                                transform: `translate(${mouse.x * 15}px, ${mouse.y * 10}px) rotate(12deg)`,
                                transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                            }}
                        />
                        <div
                            className="absolute bottom-[20%] right-[10%] w-56 h-56 rounded-full"
                            style={{
                                background: 'rgba(255,255,255,0.01)',
                                border: '1px solid rgba(255,255,255,0.04)',
                                backdropFilter: 'blur(6px)',
                                transform: `translate(${mouse.x * -20}px, ${mouse.y * -12}px) rotate(-6deg)`,
                                transition: 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
                            }}
                        />
                        <div
                            className="absolute top-[60%] left-[55%] w-24 h-24 rounded-2xl"
                            style={{
                                background: 'rgba(0, 242, 255, 0.02)',
                                border: '1px solid rgba(0, 242, 255, 0.06)',
                                transform: `translate(${mouse.x * 10}px, ${mouse.y * -8}px) rotate(45deg)`,
                                transition: 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
                            }}
                        />
                        <div
                            className="absolute top-[35%] right-[25%] w-16 h-16 rounded-xl"
                            style={{
                                background: 'rgba(255, 0, 229, 0.015)',
                                border: '1px solid rgba(255, 0, 229, 0.05)',
                                transform: `translate(${mouse.x * -12}px, ${mouse.y * 15}px) rotate(20deg)`,
                                transition: 'transform 0.45s cubic-bezier(0.16, 1, 0.3, 1)',
                            }}
                        />
                    </div>

                    <div className="relative z-10 mx-auto grid max-w-6xl items-center gap-12 px-6 pt-32 pb-20 lg:grid-cols-2 lg:gap-16">
                        {/* Left: text content */}
                        <motion.div
                            className="text-center lg:text-left"
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                        >
                            {/* Status pill */}
                            <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm"
                                style={{
                                    background: 'rgba(255,255,255,0.025)',
                                    border: '1px solid rgba(255,255,255,0.08)',
                                    backdropFilter: 'blur(12px)',
                                }}>
                                <span className="inline-block h-2 w-2 rounded-full il-pulse" style={{ background: '#00f2ff', boxShadow: '0 0 8px rgba(0, 242, 255, .6)' }} />
                                <span style={{ fontFamily: "'Space Grotesk', monospace", fontSize: '.78rem', fontWeight: 600, letterSpacing: '.1em', textTransform: 'uppercase' as const, color: 'rgba(255,255,255,.6)' }}>
                                    System Active — v1.0
                                </span>
                            </div>

                            {/* Headline */}
                            <h1
                                className="mt-8 max-w-xl text-balance"
                                style={{
                                    fontFamily: "'Cabinet Grotesk', system-ui, sans-serif",
                                    fontSize: 'clamp(3rem, 6vw, 5rem)',
                                    fontWeight: 900,
                                    textTransform: 'uppercase' as const,
                                    letterSpacing: '-0.05em',
                                    lineHeight: 1,
                                    color: '#f0f0f0',
                                }}
                            >
                                IoT Dev,{' '}
                                <span style={{ color: 'var(--il-lime)', textShadow: '0 0 20px rgba(212, 255, 51, 0.3)' }}>Simplified.</span>
                            </h1>

                            <p className="mt-6 max-w-xl text-pretty text-base sm:text-lg" style={{ color: 'rgba(255,255,255,.5)', lineHeight: 1.7 }}>
                                An Arduino framework that turns complex hardware integrations into one-line function calls. Build low-code mobile apps and manage device fleets with native cloud connectivity.
                            </p>

                            {/* CTA buttons */}
                            <motion.div
                                className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row lg:justify-start"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                            >
                                <Button asChild size="lg" className="px-7 text-base font-semibold" style={{
                                    background: 'var(--il-lime)',
                                    color: '#050505',
                                    border: '1px solid var(--il-lime)',
                                    fontFamily: "'Space Grotesk', monospace",
                                    letterSpacing: '.05em',
                                    textTransform: 'uppercase' as const,
                                }}>
                                    <a href="#install">
                                        <Terminal className="size-4 mr-1" />
                                        <span className="text-nowrap">Get Started</span>
                                    </a>
                                </Button>
                                <Button asChild size="lg" variant="outline" className="px-7 text-base gap-2" style={{
                                    background: 'rgba(255,255,255,0.03)',
                                    border: '1px solid rgba(255,255,255,0.1)',
                                    color: 'rgba(255,255,255,.7)',
                                    fontFamily: "'Space Grotesk', monospace",
                                    letterSpacing: '.05em',
                                    textTransform: 'uppercase' as const,
                                }}>
                                    <a href="https://github.com/emmanueltigo/integrall" target="_blank" rel="noopener noreferrer">
                                        <Github className="size-4" />
                                        <span className="text-nowrap">View on GitHub</span>
                                    </a>
                                </Button>
                            </motion.div>
                        </motion.div>

                        {/* Right: animated logo */}
                        <motion.div
                            className="flex items-center justify-center lg:justify-end"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                        >
                            <div className="relative">
                                {/* Pulsing glow ring */}
                                <motion.div
                                    className="absolute inset-0 rounded-full"
                                    style={{
                                        background: 'radial-gradient(circle, rgba(0, 242, 255, .12) 0%, transparent 70%)',
                                        filter: 'blur(40px)',
                                    }}
                                    animate={{
                                        scale: [1.4, 1.6, 1.4],
                                        opacity: [0.6, 1, 0.6],
                                    }}
                                    transition={{
                                        duration: 4,
                                        repeat: Infinity,
                                        ease: 'easeInOut',
                                    }}
                                />
                                {/* Orbiting ring */}
                                <motion.div
                                    className="absolute inset-[-20px] rounded-full"
                                    style={{
                                        border: '1px solid rgba(0, 242, 255, .1)',
                                    }}
                                    animate={{ rotate: 360 }}
                                    transition={{
                                        duration: 20,
                                        repeat: Infinity,
                                        ease: 'linear',
                                    }}
                                >
                                    <div
                                        className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full"
                                        style={{ background: 'var(--il-cyan)', boxShadow: '0 0 10px rgba(0, 242, 255, .6)' }}
                                    />
                                </motion.div>
                                {/* Second orbiting ring */}
                                <motion.div
                                    className="absolute inset-[-40px] rounded-full"
                                    style={{
                                        border: '1px solid rgba(255, 0, 229, .06)',
                                    }}
                                    animate={{ rotate: -360 }}
                                    transition={{
                                        duration: 30,
                                        repeat: Infinity,
                                        ease: 'linear',
                                    }}
                                >
                                    <div
                                        className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-1.5 h-1.5 rounded-full"
                                        style={{ background: 'var(--il-magenta)', boxShadow: '0 0 8px rgba(255, 0, 229, .5)' }}
                                    />
                                </motion.div>
                                {/* Main logo with float + slow rotation */}
                                <motion.img
                                    className="relative h-64 w-64 object-contain sm:h-80 sm:w-80 lg:h-96 lg:w-96"
                                    src="/integrall-logo.png"
                                    alt="Integrall IoT Framework"
                                    animate={{
                                        y: [0, -12, 0],
                                        rotate: [0, 3, 0, -3, 0],
                                        scale: [1, 1.03, 1],
                                    }}
                                    transition={{
                                        duration: 8,
                                        repeat: Infinity,
                                        ease: 'easeInOut',
                                    }}
                                />
                            </div>
                        </motion.div>
                    </div>
                </section>

                {/* Platform slider */}
                <section style={{ background: '#050505', borderTop: '1px solid rgba(255,255,255,.06)' }} className="pb-16 md:pb-24">
                    <div className="group relative m-auto max-w-6xl px-6">
                        <div className="flex flex-col items-center md:flex-row">
                            <div className="md:max-w-44 md:border-r md:pr-6" style={{ borderColor: 'rgba(255,255,255,.08)' }}>
                                <p className="text-end text-sm" style={{
                                    fontFamily: "'Space Grotesk', monospace",
                                    fontSize: '.72rem',
                                    fontWeight: 600,
                                    letterSpacing: '.15em',
                                    textTransform: 'uppercase' as const,
                                    color: 'rgba(255,255,255,.35)',
                                }}>
                                    Built for every board
                                </p>
                            </div>
                            <div className="relative py-6 md:w-[calc(100%-11rem)]">
                                <InfiniteSlider durationOnHover={20} duration={40} gap={112}>
                                    {[
                                        { icon: Cpu, label: 'ESP32' },
                                        { icon: Wifi, label: 'ESP8266' },
                                        { icon: Shield, label: 'Arduino Uno' },
                                        { icon: Zap, label: 'PlatformIO' },
                                        { icon: Cpu, label: 'Arduino Mega' },
                                        { icon: Wifi, label: 'FastAPI Backend' },
                                        { icon: Shield, label: 'Arduino Nano' },
                                        { icon: Zap, label: 'Arduino IDE' },
                                    ].map((item) => (
                                        <div key={item.label} className="flex items-center gap-2" style={{ color: 'rgba(255,255,255,.3)' }}>
                                            <item.icon className="h-5 w-5" />
                                            <span className="text-sm font-medium whitespace-nowrap" style={{
                                                fontFamily: "'Space Grotesk', monospace",
                                                letterSpacing: '.05em',
                                            }}>
                                                {item.label}
                                            </span>
                                        </div>
                                    ))}
                                </InfiniteSlider>
                                <div className="absolute inset-y-0 left-0 w-20" style={{ background: 'linear-gradient(to right, #050505, transparent)' }} />
                                <div className="absolute inset-y-0 right-0 w-20" style={{ background: 'linear-gradient(to left, #050505, transparent)' }} />
                                <ProgressiveBlur className="pointer-events-none absolute left-0 top-0 h-full w-20" direction="left" blurIntensity={1} />
                                <ProgressiveBlur className="pointer-events-none absolute right-0 top-0 h-full w-20" direction="right" blurIntensity={1} />
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </>
    )
}

const menuItems = [
    { name: 'Docs', href: '/docs' },
    { name: 'Features', href: '#features' },
    { name: 'Modules', href: '#modules' },
    { name: 'Projects', href: '#projects' },
    { name: 'Install', href: '#install' },
]

const HeroHeader = () => {
    const [menuState, setMenuState] = React.useState(false)
    return (
        <header>
            <nav
                data-state={menuState ? 'active' : undefined}
                className="group fixed z-20 w-full"
                style={{
                    background: 'rgba(5, 5, 5, .8)',
                    backdropFilter: 'blur(16px)',
                    WebkitBackdropFilter: 'blur(16px)',
                    borderBottom: '1px solid rgba(255,255,255,.06)',
                }}
            >
                <div className="mx-auto max-w-6xl px-6 transition-all duration-300">
                    <div className="relative flex flex-wrap items-center justify-between gap-6 py-3 lg:gap-0 lg:py-4">
                        <div className="flex w-full items-center justify-between gap-12 lg:w-auto">
                            <Link to="/" aria-label="home" className="flex items-center space-x-2">
                                <Logo />
                            </Link>

                            <button
                                onClick={() => setMenuState(!menuState)}
                                aria-label={menuState ? 'Close Menu' : 'Open Menu'}
                                className="relative z-20 -m-2.5 -mr-4 block cursor-pointer p-2.5 lg:hidden"
                            >
                                <Menu className="group-data-[state=active]:rotate-180 group-data-[state=active]:scale-0 group-data-[state=active]:opacity-0 m-auto size-6 duration-200" style={{ color: 'rgba(255,255,255,.5)' }} />
                                <X className="group-data-[state=active]:rotate-0 group-data-[state=active]:scale-100 group-data-[state=active]:opacity-100 absolute inset-0 m-auto size-6 -rotate-180 scale-0 opacity-0 duration-200" style={{ color: 'rgba(255,255,255,.5)' }} />
                            </button>

                            <div className="hidden lg:block">
                                <ul className="flex gap-8 text-sm">
                                    {menuItems.map((item, index) => (
                                        <li key={index}>
                                            {item.href.startsWith('/') ? (
                                                <Link to={item.href} className="block duration-150 hover:text-white"
                                                    style={{
                                                        color: 'rgba(255,255,255,.45)',
                                                        fontFamily: "'Space Grotesk', monospace",
                                                        fontSize: '.82rem',
                                                        fontWeight: 600,
                                                        letterSpacing: '.08em',
                                                        textTransform: 'uppercase' as const,
                                                    }}>
                                                    <span>{item.name}</span>
                                                </Link>
                                            ) : (
                                                <a href={item.href} className="block duration-150 hover:text-white"
                                                    style={{
                                                        color: 'rgba(255,255,255,.45)',
                                                        fontFamily: "'Space Grotesk', monospace",
                                                        fontSize: '.82rem',
                                                        fontWeight: 600,
                                                        letterSpacing: '.08em',
                                                        textTransform: 'uppercase' as const,
                                                    }}>
                                                    <span>{item.name}</span>
                                                </a>
                                            )}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        <div className="group-data-[state=active]:block lg:group-data-[state=active]:flex mb-6 hidden w-full flex-wrap items-center justify-end space-y-8 rounded-3xl p-6 shadow-2xl md:flex-nowrap lg:m-0 lg:flex lg:w-fit lg:gap-6 lg:space-y-0 lg:border-transparent lg:bg-transparent lg:p-0 lg:shadow-none"
                            style={{
                                background: 'rgba(10,10,10,.95)',
                                border: '1px solid rgba(255,255,255,.08)',
                            }}>
                            <div className="lg:hidden">
                                <ul className="space-y-6 text-base">
                                    {menuItems.map((item, index) => (
                                        <li key={index}>
                                            <a href={item.href} className="block duration-150 hover:text-white" style={{ color: 'rgba(255,255,255,.45)' }}>
                                                <span>{item.name}</span>
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="flex w-full flex-col space-y-3 sm:flex-row sm:gap-3 sm:space-y-0 md:w-fit">
                                <Button asChild variant="outline" size="sm" style={{
                                    background: 'transparent',
                                    border: '1px solid rgba(255,255,255,.1)',
                                    color: 'rgba(255,255,255,.6)',
                                    fontFamily: "'Space Grotesk', monospace",
                                    fontSize: '.78rem',
                                    letterSpacing: '.08em',
                                    textTransform: 'uppercase' as const,
                                }}>
                                    <a href="https://github.com/Tigo-cmd/INTEGRALL" target="_blank" rel="noopener noreferrer">
                                        <Github className="size-4 mr-1" />
                                        <span>GitHub</span>
                                    </a>
                                </Button>
                                <Button asChild size="sm" style={{
                                    background: 'var(--il-lime)',
                                    color: '#050505',
                                    fontFamily: "'Space Grotesk', monospace",
                                    fontSize: '.78rem',
                                    fontWeight: 700,
                                    letterSpacing: '.08em',
                                    textTransform: 'uppercase' as const,
                                }}>
                                    <a href="#install">
                                        <span>Get Started</span>
                                    </a>
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        </header>
    )
}

const Logo = ({ className }: { className?: string }) => (
    <div className={cn('flex items-center gap-2', className)}>
        <img
            src="/integrall-logo.png"
            alt="Integrall"
            className="h-8 w-8 object-contain"
        />
        <span style={{
            fontFamily: "'Cabinet Grotesk', system-ui, sans-serif",
            fontSize: '1.05rem',
            fontWeight: 900,
            letterSpacing: '.12em',
            textTransform: 'uppercase' as const,
            color: '#f0f0f0',
        }}>
            INTEGRALL
        </span>
    </div>
)
