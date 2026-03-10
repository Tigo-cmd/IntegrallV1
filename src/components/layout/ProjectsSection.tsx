import React from 'react';
import { Lock, Siren, Car, Thermometer, Lightbulb } from 'lucide-react';
import { FadeInView, StaggerChildren, StaggerItem } from '@/components/ui/fade-in-view';

const projects = [
    { Icon: Lock, title: 'PIN Lock System', lines: '12 lines', tags: ['Keypad', 'Relay', 'LCD'], desc: 'Complete door lock with keypad input, asterisk display on LCD, PIN validation, auto-lock relay, wrong-attempt counter, and lockout protection.' },
    { Icon: Siren, title: 'Alarm System', lines: '10 lines', tags: ['Sensors', 'Relay', 'Buzzer'], desc: 'PIR motion-triggered alarm with siren relay, cooldown timer, LCD alerts, and buzzer feedback. Automatic detection and recovery cycle.' },
    { Icon: Car, title: 'Parking Sensor', lines: '8 lines', tags: ['Sensors', 'LCD', 'Buzzer'], desc: 'Ultrasonic distance display with "Safe / Slow Down / STOP" status, buzzer proximity beeps, and live distance on LCD or OLED.' },
    { Icon: Thermometer, title: 'Weather Station', lines: '8 lines', tags: ['Sensors (DHT)', 'LCD', 'Cloud'], desc: 'DHT temperature and humidity monitoring with timed readings, LCD display, and automatic telemetry upload to your backend.' },
    { Icon: Lightbulb, title: 'Smart Switch', lines: '8 lines', tags: ['Relay', 'Sensors (PIR)'], desc: 'Motion-activated lighting with configurable auto-off timeout. Turns on when PIR detects movement, turns off after inactivity.' },
];

export const ProjectsSection = () => (
    <section className="il-section il-projects" id="projects">
        <div className="il-container">
            <FadeInView className="il-text-center">
                <span className="il-section-label">Ready-Made Projects</span>
                <h2 className="il-section-title">Complete systems in two function calls</h2>
                <p className="il-section-desc">Combine modules into professional IoT systems. Each project needs just one call in <code>setup()</code> and one in <code>loop()</code>.</p>
            </FadeInView>
            <StaggerChildren className="il-projects-grid" stagger={0.1}>
                {projects.map((p) => (
                    <StaggerItem key={p.title}>
                        <div className="il-project-card">
                            <div className="il-project-card-header">
                                <h3>
                                    <span style={{ color: ['var(--il-lime)', 'var(--il-magenta)', 'var(--il-cyan)'][projects.indexOf(p) % 3] }}>
                                        <p.Icon className="size-5" />
                                    </span>
                                    {p.title}
                                </h3>
                                <span className="il-project-lines">{p.lines}</span>
                            </div>
                            <p>{p.desc}</p>
                            <div className="il-project-tags">
                                {p.tags.map((t) => <span key={t} className="il-project-tag">{t}</span>)}
                            </div>
                        </div>
                    </StaggerItem>
                ))}
            </StaggerChildren>
        </div>
    </section>
);
