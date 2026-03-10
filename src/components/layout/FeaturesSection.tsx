import React from 'react';
import { Zap, RefreshCw, Cloud } from 'lucide-react';
import { FadeInView, StaggerChildren, StaggerItem } from '@/components/ui/fade-in-view';
import { AnimatedHeading } from '@/components/ui/animated-heading';

export const FeaturesSection = () => (
    <section className="il-section il-features" id="features">
        <div className="il-container">
            <FadeInView className="il-text-center">
                <span className="il-section-label">Why Integrall</span>
                <AnimatedHeading text="Write logic, not boilerplate" className="justify-center mb-4" />
                <p className="il-section-desc">Integrall abstracts away hardware complexity so you can focus on building what matters.</p>
            </FadeInView>
            <StaggerChildren className="il-features-grid" stagger={0.1}>
                <StaggerItem>
                    <div className="il-feature-card">
                        <div className="il-feature-icon lime">
                            <Zap className="size-6" style={{ color: 'var(--il-lime)' }} />
                        </div>
                        <AnimatedHeading text="One-Line Hardware" className="text-xl mb-2" />
                        <p>Control relays, LCDs, servos, and sensors with single function calls. No more 50-line initialization routines — just <code>integrall.enableRelay(5)</code> and you're done.</p>
                    </div>
                </StaggerItem>
                <StaggerItem>
                    <div className="il-feature-card">
                        <div className="il-feature-icon cyan">
                            <RefreshCw className="size-6" style={{ color: 'var(--il-cyan)' }} />
                        </div>
                        <AnimatedHeading text="Non-Blocking by Default" className="text-xl mb-2" />
                        <p>Every operation uses <code>millis()</code> timing. Servo sweeps, buzzer patterns, LCD scrolling — all run in the background while your WiFi and sensors stay responsive.</p>
                    </div>
                </StaggerItem>
                <StaggerItem>
                    <div className="il-feature-card">
                        <div className="il-feature-icon magenta">
                            <Cloud className="size-6" style={{ color: 'var(--il-magenta)' }} />
                        </div>
                        <AnimatedHeading text="Cloud-Native & App-Ready" className="text-xl mb-2" />
                        <p>Deploy to the cloud instantly. Native support for Blynk, MQTT, and FastAPI means your devices are controllable from anywhere via web and mobile apps.</p>
                    </div>
                </StaggerItem>
            </StaggerChildren>
        </div>
    </section>
);
