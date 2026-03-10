import { FadeInView } from '@/components/ui/fade-in-view';
import { Link } from 'react-router-dom';

export const CtaBanner = () => (
    <section className="il-cta-banner">
        <div className="il-container">
            <FadeInView>
                <h2>Ready to simplify your IoT projects?</h2>
                <p>Integrall is open for <strong>contributions and collaborations</strong>. Join developers building smarter hardware with less code.</p>
                <div className="il-cta-buttons">
                    <a href="#install" className="il-btn il-btn-primary">Get Started Now</a>
                    <a href="https://github.com/Tigo-cmd/INTEGRALL" target="_blank" rel="noopener noreferrer" className="il-btn il-btn-ghost">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" /></svg>
                        Star on GitHub
                    </a>
                </div>
            </FadeInView>
        </div>
    </section>
);

export const Footer = () => (
    <footer className="il-footer">
        <div className="il-container">
            <div className="il-footer-grid">
                <div className="il-footer-brand">
                    <a href="#" className="il-footer-brand-name" style={{ display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'none' }}>
                        <img src="/integrall-logo.png" alt="Integrall" style={{ height: '28px', width: '28px', objectFit: 'contain' }} />
                        INTEGRALL
                    </a>
                    <p>An open-source IoT framework that simplifies hardware integration and cloud connectivity for ESP32, ESP8266, and Arduino boards.</p>
                </div>
                <div>
                    <h4>Documentation</h4>
                    <ul className="il-footer-links">
                        <li><Link to="/docs#getting-started">Getting Started</Link></li>
                        <li><Link to="/docs#hardware-modules">Hardware Modules</Link></li>
                        <li><Link to="/docs#lock-system">Lock System</Link></li>
                        <li><Link to="/docs">API Reference</Link></li>
                        <li><Link to="/docs">Backend Setup</Link></li>
                    </ul>
                </div>
                <div>
                    <h4>Resources</h4>
                    <ul className="il-footer-links">
                        <li><a href="#">Examples Gallery</a></li>
                        <li><a href="#">Release Notes</a></li>
                        <li><a href="#">Dependencies</a></li>
                        <li><a href="#">Troubleshooting</a></li>
                    </ul>
                </div>
                <div>
                    <h4>Community</h4>
                    <ul className="il-footer-links">
                        <li><a href="https://github.com/Tigo-cmd/INTEGRALL" target="_blank" rel="noopener noreferrer">GitHub</a></li>
                        <li><a href="https://github.com/Tigo-cmd/INTEGRALL/issues" target="_blank" rel="noopener noreferrer">Report Issue</a></li>
                        <li><a href="https://github.com/Tigo-cmd/INTEGRALL/blob/main/CONTRIBUTING.md" target="_blank" rel="noopener noreferrer">Contributing</a></li>
                        <li><a href="#">Discord</a></li>
                    </ul>
                </div>
            </div>
            <div className="il-footer-bottom">
                <span>Built by <strong>Emmanuel TIGO</strong> &middot; Open for <strong>Contributions & Collaborations</strong></span>
                <div className="il-footer-badges">
                    <span className="il-footer-badge">v1.0.0</span>
                    <span className="il-footer-badge">ESP32</span>
                    <span className="il-footer-badge">FastAPI</span>
                </div>
            </div>
        </div>
    </footer>
);
