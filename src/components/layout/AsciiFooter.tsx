import React, { useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';

const asciiArt = [
    "  _____ _   _ _______ ______ _____ _____            _      _      ",
    " |_   _| \\ | |__   __|  ____/ ____|  __ \\     /\\   | |    | |     ",
    "   | | |  \\| |  | |  | |__ | |  __| |__) |   /  \\  | |    | |     ",
    "   | | | . ` |  | |  |  __|| | |_ |  _  /   / /\\ \\ | |    | |     ",
    "  _| |_| |\\  |  | |  | |___| |__| | | \\ \\  / ____ \\| |____| |____ ",
    " |_____|_| \\_|  |_|  |______\\_____|_|  \\_\\/_/    \\_\\______|______|"
];

const Character = ({ char, delay }: { char: string; delay: number }) => {
    const [displayChar, setDisplayChar] = useState(char === ' ' ? ' ' : ' ');
    const [opacity, setOpacity] = useState(0);

    useEffect(() => {
        if (char === ' ') {
            setOpacity(1);
            return;
        }

        const timeout = setTimeout(() => {
            setOpacity(1);
            let iterations = 0;
            const interval = setInterval(() => {
                const randomChars = "!@#$%^&*()_+-=[]{}|;:,.<>?/";
                setDisplayChar(randomChars[Math.floor(Math.random() * randomChars.length)]);

                iterations++;
                if (iterations > 5) {
                    clearInterval(interval);
                    setDisplayChar(char);
                }
            }, 40);
        }, delay * 1000);

        return () => clearTimeout(timeout);
    }, [char, delay]);

    return (
        <span style={{ opacity, transition: 'opacity 0.2s', display: 'inline-block', width: '1ch' }}>
            {displayChar}
        </span>
    );
};

export const AsciiFooter = () => {
    const ref = React.useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    return (
        <section
            ref={ref}
            className="py-32 bg-[#050505] overflow-hidden border-t border-white/[0.03]"
        >
            <div className="il-container flex flex-col items-center justify-center">
                <div className="relative group my-32">
                    {/* Background Glow */}
                    <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-full bg-cyan-500/10 blur-[160px] group-hover:bg-cyan-500/20 transition-colors duration-1000" />

                    <pre className="relative z-10 font-mono text-[clamp(0.6rem,2vw,4.4rem)] leading-[0.9] tracking-[-0.25em] text-white/40 group-hover:text-cyan-400 group-hover:drop-shadow-[0_0_25px_rgba(34,211,238,0.7)] transition-all duration-700 select-none">
                        {isInView && asciiArt.map((line, lineIdx) => (
                            <div key={lineIdx} className="whitespace-pre flex justify-center">
                                {line.split('').map((char, charIdx) => (
                                    <Character
                                        key={charIdx}
                                        char={char}
                                        delay={(lineIdx * 0.05) + (charIdx * 0.005)}
                                    />
                                ))}
                            </div>
                        ))}
                    </pre>

                    {/* Scanline Effect */}
                    <motion.div
                        className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-500/20 to-transparent h-16 w-full z-20 pointer-events-none"
                        animate={{ top: ['-20%', '120%'] }}
                        transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
                    />
                </div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : {}}
                    transition={{ delay: 2, duration: 1 }}
                    className="mt-32 flex flex-col items-center gap-4"
                >
                    <div className="h-px w-48 bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent" />
                    <p className="text-xs font-mono uppercase tracking-[0.8em] text-cyan-500/40">
                        Hardwired for Excellence
                    </p>
                </motion.div>
            </div>
        </section>
    );
};
