import React, { useEffect, useState } from 'react';
import { HeroSection } from '@/components/ui/hero-section-4';
import { StatsSection } from '@/components/layout/StatsSection';
import { FeaturesSection } from '@/components/layout/FeaturesSection';
import { ModulesSection } from '@/components/layout/ModulesSection';
import { ScaleSection } from '@/components/layout/ScaleSection';
import { ProjectsSection } from '@/components/layout/ProjectsSection';
import { PlatformsSection } from '@/components/layout/PlatformsSection';
import { CloudSection } from '@/components/layout/CloudSection';
import { InstallSection } from '@/components/layout/InstallSection';
import { CtaBanner, Footer } from '@/components/layout/CtaBannerAndFooter';
import { AsciiFooter } from '@/components/layout/AsciiFooter';
import { ToastProvider } from '@/components/ui/toast-provider';

const ScrollProgressBar = () => {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.scrollY;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            setProgress(docHeight > 0 ? (scrollTop / docHeight) * 100 : 0);
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div
            className="il-scroll-progress"
            style={{ width: `${progress}%` }}
        />
    );
};

const ScanlineOverlay = () => (
    <div className="il-scanline" aria-hidden="true" />
);

export const LandingPage = () => (
    <div>
        <ScrollProgressBar />
        <ScanlineOverlay />
        <HeroSection />
        <StatsSection />
        <FeaturesSection />
        <ModulesSection />
        <ScaleSection />
        <ProjectsSection />
        <PlatformsSection />
        <CloudSection />
        <InstallSection />
        <CtaBanner />
        <Footer />
        <AsciiFooter />
    </div>
);
