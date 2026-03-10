import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

interface AnimatedHeadingProps {
    text: string;
    className?: string;
    delay?: number;
}

/**
 * H3 heading component styled with Tailwind CSS.
 * Includes responsive font sizing, tight letter tracking, and smooth color transitions.
 * Features a complex animation that fades in, slides up, and reduces blur for each letter.
 */
export const AnimatedHeading: React.FC<AnimatedHeadingProps> = ({
    text,
    className = "",
    delay = 0
}) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-10%" });

    // Split text into characters
    const characters = text.split("");

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: (i: number = 1) => ({
            opacity: 1,
            transition: {
                staggerChildren: 0.03,
                delayChildren: delay * i
            },
        }),
    };

    const childVariants: any = {
        visible: {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            transition: {
                type: "spring" as const,
                damping: 12,
                stiffness: 100,
            },
        },
        hidden: {
            opacity: 0,
            y: 20,
            filter: "blur(10px)",
            transition: {
                type: "spring" as const,
                damping: 12,
                stiffness: 100,
            },
        },
    };

    return (
        <motion.h3
            ref={ref}
            style={{ display: "flex", flexWrap: "wrap" }}
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className={`text-2xl md:text-3xl lg:text-4xl font-black uppercase tracking-tighter text-white transition-colors duration-500 hover:text-cyan-400 ${className}`}
        >
            {characters.map((char, index) => (
                <motion.span
                    key={index}
                    variants={childVariants}
                    style={{ display: "inline-block", whiteSpace: char === " " ? "pre" : "normal" }}
                >
                    {char}
                </motion.span>
            ))}
        </motion.h3>
    );
};
