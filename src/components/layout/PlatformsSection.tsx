import React from 'react';
import { Cpu, Wifi, CircuitBoard, Wrench, Code } from 'lucide-react';
import { FadeInView, StaggerChildren, StaggerItem } from '@/components/ui/fade-in-view';

const platforms = [
    { Icon: Cpu, name: 'ESP32', note: 'Full features' },
    { Icon: Wifi, name: 'ESP8266', note: 'WiFi + backend' },
    { Icon: CircuitBoard, name: 'Arduino Uno/Mega', note: 'Offline mode' },
    { Icon: Wrench, name: 'PlatformIO', note: 'Recommended' },
    { Icon: Code, name: 'Arduino IDE', note: 'Supported' },
];

export const PlatformsSection = () => (
    <section className="il-section il-platforms">
        <div className="il-container">
            <FadeInView className="il-text-center">
                <span className="il-section-label">Platform Support</span>
                <h2 className="il-section-title">Works where you work</h2>
                <p className="il-section-desc">Full networking on ESP32 and ESP8266. Offline mode on classic Arduino boards. Build with your preferred IDE.</p>
            </FadeInView>
            <StaggerChildren className="il-platforms-row" stagger={0.1}>
                {platforms.map((p) => (
                    <StaggerItem key={p.name}>
                        <div className="il-platform-item">
                            <div className="il-platform-icon">
                                <p.Icon className="size-7" style={{ color: 'var(--il-cyan)' }} />
                            </div>
                            <span className="il-platform-name">{p.name}</span>
                            <span className="il-platform-note">{p.note}</span>
                        </div>
                    </StaggerItem>
                ))}
            </StaggerChildren>
        </div>
    </section>
);
