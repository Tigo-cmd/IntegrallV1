import React, { useState } from 'react';
import { FadeInView } from '@/components/ui/fade-in-view';
import { useToast } from '@/components/ui/toast-provider';

export const InstallSection = () => {
    const [activeTab, setActiveTab] = useState<'platformio' | 'arduino' | 'manual'>('platformio');
    const { addToast } = useToast();

    const copyCode = (e: React.MouseEvent<HTMLButtonElement>) => {
        const panel = e.currentTarget.closest('.il-install-code');
        const pre = panel?.querySelector('pre') as HTMLPreElement | null;
        if (!pre) return;
        navigator.clipboard.writeText(pre.innerText);
        const btn = e.currentTarget;
        btn.textContent = 'Copied!';
        btn.classList.add('copied');
        addToast('Code copied to clipboard', 'success');
        setTimeout(() => { btn.textContent = 'Copy'; btn.classList.remove('copied'); }, 2000);
    };

    return (
        <section className="il-section il-install" id="install">
            <div className="il-container">
                <FadeInView className="il-text-center">
                    <span className="il-section-label">Get Started</span>
                    <h2 className="il-section-title">Up and running in 2 minutes</h2>
                    <p className="il-section-desc">Install the library, include the header, and start building.</p>
                </FadeInView>

                <FadeInView delay={0.2}>
                    <div className="il-install-tabs-wrapper">
                        <div className="il-install-tabs">
                            {(['platformio', 'arduino', 'manual'] as const).map((tab) => (
                                <button
                                    key={tab}
                                    className={`il-install-tab${activeTab === tab ? ' active' : ''}`}
                                    onClick={() => setActiveTab(tab)}
                                >
                                    {tab === 'platformio' ? 'PlatformIO' : tab === 'arduino' ? 'Arduino IDE' : 'Manual'}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className={`il-install-panel${activeTab === 'platformio' ? ' active' : ''}`}>
                        <div className="il-install-code">
                            <div className="il-terminal-header">
                                <div className="il-terminal-dot red" />
                                <div className="il-terminal-dot yellow" />
                                <div className="il-terminal-dot green" />
                            </div>
                            <button className="il-copy-btn" onClick={copyCode}>Copy</button>
                            <pre>{`; platformio.ini
[env:esp32dev]
platform = espressif32
board = esp32dev
framework = arduino
lib_deps =
    bblanchon/ArduinoJson @ ^6.21.3
    ; Copy the Integrall folder into your project's lib/ directory`}</pre>
                        </div>
                        <p className="il-install-note">Place the <code>Integrall/</code> folder inside your project's <code>lib/</code> directory, then build.</p>
                    </div>

                    <div className={`il-install-panel${activeTab === 'arduino' ? ' active' : ''}`}>
                        <div className="il-install-code">
                            <div className="il-terminal-header">
                                <div className="il-terminal-dot red" />
                                <div className="il-terminal-dot yellow" />
                                <div className="il-terminal-dot green" />
                            </div>
                            <button className="il-copy-btn" onClick={copyCode}>Copy</button>
                            <pre>{`// 1. Open Arduino IDE
// 2. Sketch → Include Library → Add .ZIP Library...
// 3. Select the Integrall_v1_0.zip file
// 4. Install "ArduinoJson" from Library Manager
// 5. Done! Now use it:

#define INTEGRALL_ENABLE_RELAY
#include <Integrall.h>

Integrall::System integrall;

void setup() { integrall.begin(); }
void loop()  { integrall.handle(); }`}</pre>
                        </div>
                        <p className="il-install-note">Install additional libraries (LCD, Keypad, Servo, etc.) from the Library Manager based on which modules you enable.</p>
                    </div>

                    <div className={`il-install-panel${activeTab === 'manual' ? ' active' : ''}`}>
                        <div className="il-install-code">
                            <div className="il-terminal-header">
                                <div className="il-terminal-dot red" />
                                <div className="il-terminal-dot yellow" />
                                <div className="il-terminal-dot green" />
                            </div>
                            <button className="il-copy-btn" onClick={copyCode}>Copy</button>
                            <pre>{`# Clone the repository
git clone https://github.com/emmanueltigo/integrall.git

# Copy the library into your Arduino libraries folder
cp -r integrall/firmware/Integrall ~/Arduino/libraries/

# Or for PlatformIO, copy into your project
cp -r integrall/firmware/Integrall your-project/lib/`}</pre>
                        </div>
                        <p className="il-install-note">
                            See <a href="https://github.com/emmanueltigo/integrall/blob/main/DEPENDENCIES.md">DEPENDENCIES.md</a> for the full list of optional libraries per module.
                        </p>
                    </div>
                </FadeInView>
            </div>
        </section>
    );
};
