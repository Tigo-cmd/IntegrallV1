import React from 'react';
import { Power, Monitor, ScreenShare, Settings, Radio, Grid3X3, Volume2, Lightbulb, Camera, Sparkles } from 'lucide-react';
import { FadeInView, StaggerChildren, StaggerItem } from '@/components/ui/fade-in-view';
import { AnimatedHeading } from '@/components/ui/animated-heading';

const modules = [
    { Icon: Power, title: 'Relay Control', desc: 'Up to 4 relays with safety timeouts, interlock groups, and physical button triggers.', code: <><span className="tk-keyword">int</span> r = integrall.<span className="tk-function">enableRelay</span>(<span className="tk-number">5</span>, <span className="tk-keyword">true</span>, <span className="tk-string">"Pump"</span>);</> },
    { Icon: Monitor, title: 'LCD Display', desc: 'I2C 16x2 LCD with auto-scrolling for long text, custom characters, and cursor control.', code: <>integrall.<span className="tk-function">lcdPrint</span>(<span className="tk-string">"Hello World!"</span>, <span className="tk-number">0</span>, <span className="tk-number">0</span>);</> },
    { Icon: ScreenShare, title: 'OLED Display', desc: 'SSD1306 128x64 OLED with text, labeled values, and progress bar drawing.', code: <>integrall.<span className="tk-function">oledPrintValue</span>(<span className="tk-string">"Temp: "</span>, <span className="tk-number">24.5</span>, <span className="tk-number">0</span>);</> },
    { Icon: Settings, title: 'Servo Motors', desc: 'Up to 4 servos with instant set, non-blocking sweep, smooth easing, and analog mapping.', code: <>integrall.<span className="tk-function">easeServo</span>(arm, <span className="tk-number">180</span>, <span className="tk-number">15</span>);</> },
    { Icon: Radio, title: 'Sensors', desc: 'Ultrasonic distance, PIR motion, analog %, LDR light, and DHT temperature/humidity.', code: <><span className="tk-keyword">float</span> cm = integrall.<span className="tk-function">readDistance</span>(<span className="tk-number">5</span>, <span className="tk-number">6</span>);</> },
    { Icon: Grid3X3, title: 'Matrix Keypad', desc: '4x4 and 4x3 keypads with buffer capture, backspace, submit, and PIN validation.', code: <><span className="tk-keyword">bool</span> ok = integrall.<span className="tk-function">keypadCheckPin</span>(<span className="tk-string">"1234"</span>);</> },
    { Icon: Volume2, title: 'Buzzer Alerts', desc: 'Non-blocking beeps, patterns, and melodic feedback — alert, success, and failure tones.', code: <>integrall.<span className="tk-function">buzzerSuccess</span>();</> },
    { Icon: Lightbulb, title: 'RGB LED', desc: 'Common anode/cathode support with named color presets and non-blocking blink.', code: <>integrall.<span className="tk-function">setColor</span>(<span className="tk-string">"blue"</span>);</> },
    { Icon: Camera, title: 'ESP32-CAM', desc: 'MJPEG streaming with PSRAM auto-detection. Supports 15+ camera board models.', code: <>integrall.<span className="tk-function">enableCamera</span>(); <span className="tk-comment">// That's it.</span></> },
    { Icon: Sparkles, title: 'Non-Blocking Blinker', desc: 'Replace delay()-based blink with a background-running LED toggle.', code: <>integrall.<span className="tk-function">blink</span>(<span className="tk-number">2</span>, <span className="tk-number">500</span>);</> },
];

export const ModulesSection = () => (
    <section className="il-section il-modules" id="modules">
        <div className="il-container">
            <FadeInView className="il-text-center">
                <span className="il-section-label">Hardware Modules</span>
                <AnimatedHeading text="10 modules. One include." className="justify-center mb-4" />
                <p className="il-section-desc">Enable only what you need. Each module compiles to zero overhead when disabled — perfect for memory-constrained boards.</p>
            </FadeInView>
            <StaggerChildren className="il-modules-grid" stagger={0.06}>
                {modules.map((m) => (
                    <StaggerItem key={m.title}>
                        <div className="il-module-card">
                            <div className="il-module-card-header">
                                <div className="il-module-icon">
                                    <m.Icon className="size-5" />
                                </div>
                                <AnimatedHeading text={m.title} className="text-lg normal-case" />
                            </div>
                            <p>{m.desc}</p>
                            <div className="il-module-code">
                                <div className="il-terminal-header">
                                    <div className="il-terminal-dot red" />
                                    <div className="il-terminal-dot yellow" />
                                    <div className="il-terminal-dot green" />
                                </div>
                                {m.code}
                            </div>
                        </div>
                    </StaggerItem>
                ))}
            </StaggerChildren>
        </div>
    </section>
);
