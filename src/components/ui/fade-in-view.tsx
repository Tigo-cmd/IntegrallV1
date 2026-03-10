import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

interface FadeInViewProps {
    children: React.ReactNode;
    className?: string;
    delay?: number;
    duration?: number;
    y?: number;
}

export const FadeInView: React.FC<FadeInViewProps> = ({
    children,
    className,
    delay = 0,
    duration = 0.6,
    y = 30,
}) => {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: '-60px' });

    return (
        <motion.div
            ref={ref}
            className={className}
            initial={{ opacity: 0, y }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y }}
            transition={{
                duration,
                delay,
                ease: [0.16, 1, 0.3, 1],
            }}
        >
            {children}
        </motion.div>
    );
};

interface StaggerChildrenProps {
    children: React.ReactNode;
    className?: string;
    stagger?: number;
    baseDelay?: number;
}

export const StaggerChildren: React.FC<StaggerChildrenProps> = ({
    children,
    className,
    stagger = 0.08,
    baseDelay = 0,
}) => {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: '-60px' });

    return (
        <motion.div
            ref={ref}
            className={className}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            variants={{
                hidden: {},
                visible: {
                    transition: {
                        staggerChildren: stagger,
                        delayChildren: baseDelay,
                    },
                },
            }}
        >
            {children}
        </motion.div>
    );
};

export const StaggerItem: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className }) => (
    <motion.div
        className={className}
        variants={{
            hidden: { opacity: 0, y: 24 },
            visible: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
            },
        }}
    >
        {children}
    </motion.div>
);
