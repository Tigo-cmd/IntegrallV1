// Module reference and "Reference" sections (Integrall v1.2).
import { ApiTable, C, Callout, CodeBlock, Sub } from './ui';

const Flag = ({ name, boards = 'all boards' }: { name: string; boards?: string }) => (
    <p className="text-xs uppercase tracking-widest text-white/30">
        Enable with <C>#define {name}</C> · {boards}
    </p>
);

export function Relay() {
    return (
        <>
            <Flag name="INTEGRALL_ENABLE_RELAY" boards="up to 8 relays (4 on Uno/Nano)" />
            <CodeBlock code={`int pump = integrall.enableRelay(26, true, "pump");   // pin, active-low board?, name
integrall.relayOn(pump);
integrall.relaySetTimeout(pump, 60000);                 // auto-off after 60 s
integrall.relayAttachButton(pump, 14);                  // a wall button toggles it
int fwd = integrall.enableRelay(27), rev = integrall.enableRelay(25);
integrall.relaySetInterlock(fwd, 1);                    // fwd and rev can never both be on
integrall.relaySetInterlock(rev, 1);`} />
            <ApiTable rows={[
                ['enableRelay(pin, activeLow=true, name)', 'Returns the relay index (or -1). Most blue relay boards are active-low.'],
                ['relayOn / relayOff / relayToggle(i)', 'Switch a relay. setRelay(i, on) does the same in one call.'],
                ['relayIsOn(i)', 'Current state.'],
                ['relaySetTimeout(i, ms)', 'Turn off automatically after ms once switched on.'],
                ['relaySetInterlock(i, group)', 'Relays in the same group are mutually exclusive (motor direction, valves).'],
                ['relayAttachButton(i, pin)', 'Debounced push button that toggles the relay.'],
                ['allRelaysOff() / allRelaysOn()', 'All at once (the interlock still applies).'],
                ['relayGetOnTime(i) / relayGetToggleCount(i)', 'Usage statistics.'],
            ]} />
            <p>With the cloud link, every relay appears as a writable <C>relay&lt;N&gt;</C> switch. Changes made anywhere (button, timeout, sketch or cloud) are re-published automatically.</p>
        </>
    );
}

export function Buzzer() {
    return (
        <>
            <Flag name="INTEGRALL_ENABLE_BUZZER" />
            <CodeBlock code={`integrall.enableBuzzer(25);          // passive buzzer / piezo (tone)
integrall.enableBuzzer(25, true);    // active buzzer module (on/off)
integrall.buzzerOn();                // latch on ...
integrall.buzzerOff();               // ... until off
integrall.buzzerBeep(100);           // one beep, returns immediately
integrall.buzzerPattern(3, 150, 100);// 3 beeps: 150 ms on, 100 ms off
integrall.buzzerAlert(); integrall.buzzerSuccess(); integrall.buzzerFail();`} />
            <ApiTable rows={[
                ['enableBuzzer(pin, activeBuzzer=false)', 'active = module that sounds on plain HIGH; passive = driven with tone().'],
                ['buzzerOn(freq=2000) / buzzerOff()', 'Continuous sound until off (frequency ignored on active buzzers).'],
                ['buzzerIsOn()', 'true while latched on.'],
                ['buzzerBeep(ms) / buzzerTone(freq, ms)', 'Single timed sound. Cancels a latched buzzerOn().'],
                ['buzzerPattern(n, onMs, offMs)', 'Repeating pattern, timed in handle().'],
                ['buzzerAlert / buzzerSuccess / buzzerFail', 'Presets: 3 fast beeps, rising two-tone, long low tone.'],
                ['buzzerIsActive()', 'true while anything is sounding (pattern or latched).'],
            ]} />
            <p>Cloud: <C>buzzer.beep {'{ms}'}</C>, <C>buzzer.on {'{freq}'}</C> and <C>buzzer.off</C> are built in. For a dashboard switch, use <C>addCloudSwitch()</C> as in the first project.</p>
        </>
    );
}

export function Input() {
    return (
        <>
            <Flag name="INTEGRALL_ENABLE_INPUT" />
            <ApiTable rows={[
                ['inputButtonPressed(pin, activeLow=true)', 'true once per press (debounced). Wire the button to GND; the pull-up is internal.'],
                ['inputButtonHeld(pin)', 'true while held down.'],
                ['inputReadJoystick(pin, center=512, deadzone=50)', 'Axis as -100…100 with a dead zone (ESP32 12-bit ADC handled).'],
                ['inputReadEncoder(clk, dt)', 'Rotary encoder position, counted by interrupts.'],
                ['inputTouchActive(pin)', 'TTP223 capacitive touch module.'],
                ['inputReadRFID(ss, rst) / inputReadIR(pin)', 'MFRC522 card UID / IR remote code.'],
            ]} />
            <CodeBlock code={`if (integrall.inputButtonPressed(14)) integrall.relayToggle(pump);`} />
        </>
    );
}

export function Lcd() {
    return (
        <>
            <Flag name="INTEGRALL_ENABLE_LCD" boards="I2C 16x2 / 20x4 with PCF8574 backpack" />
            <CodeBlock code={`if (!integrall.enableLCD()) integrall.println("no LCD");   // auto-detects 0x27 / 0x3F
integrall.lcdPrint("Temp:", 0, 0);            // col 0 replaces the line
integrall.lcdPrintValue("", t, 6, 0);          // col > 0 writes in place: "Temp: 24.5"
integrall.lcdScrollText("Long text scrolls by itself", 1);`} />
            <p>The LCD keeps a screen buffer and only re-sends a row over I2C when its contents actually change. Calling <C>lcdPrint()</C> every loop is therefore cheap and doesn't flicker.</p>
            <ApiTable rows={[
                ['enableLCD(addr=0, cols=16, rows=2)', 'addr 0 = auto-detect. Returns false if nothing answers.'],
                ['lcdPrint(text, col, row)', 'Column 0 replaces the line; other columns write in place. Text that doesn\'t fit scrolls.'],
                ['lcdPrintValue(label, value, col, row, decimals=1)', 'Label + float (works on AVR, no %f needed).'],
                ['lcdScrollText(text, row, speedMs)', 'Non-blocking ticker.'],
                ['lcdClear / lcdBacklight(on) / lcdCursor(visible, blink)', 'Display control.'],
                ['lcdCreateChar(slot, bitmap)', 'Custom glyph 0-7.'],
                ['lcdShowNetworkStatus(row)', 'Opt-in: show WiFi status on a row (never written unless you ask).'],
                ['lcdPresent()', 'true if the LCD answered.'],
            ]} />
        </>
    );
}

export function Oled() {
    return (
        <>
            <Flag name="INTEGRALL_ENABLE_OLED" boards="SSD1306 128x64, I2C" />
            <CodeBlock code={`integrall.enableOLED();                 // auto-detects 0x3C / 0x3D
integrall.oledPrint("Hello", 0, 0, true);  // clear first
integrall.oledPrintValue("Temp", t, 2);
integrall.oledBar(65);                   // progress bar, %
integrall.oledFlush();                   // push the frame`} />
            <p>For full graphics, <C>integrall.oled()</C> gives you the Adafruit_SSD1306 object.</p>
        </>
    );
}

export function Sensors() {
    return (
        <>
            <Flag name="INTEGRALL_ENABLE_SENSORS" boards="30+ sensors; floats return NAN when missing" />
            <ApiTable head={['Call', 'Sensor']} rows={[
                ['readTemperature(pin, 11|22) / readHumidity', 'DHT11 / DHT22 (cached, safe to call every loop)'],
                ['readProbeTemp(pin)', 'DS18B20 waterproof probe (async)'],
                ['readEnvironment(addr, t, h, p) / readPressure', 'BME280 / BMP280'],
                ['readSHT3x(addr, t, h) / readLux(addr)', 'SHT3x / BH1750 (async)'],
                ['readThermistorC / readLM35C / readTMP36C', 'Analog temperature'],
                ['readDistance(trig, echo) / isNear / isWithinRange', 'HC-SR04 ultrasonic (async, interrupt echo)'],
                ['readLaserDistanceMM() / readIRDistanceCM(pin)', 'VL53L0X / Sharp IR'],
                ['motionDetected / flameDetected / tiltDetected / soundDetected / doorOpen …', 'Digital modules (PIR, flame, tilt, sound, reed)'],
                ['readSoilMoisture / readRainPercent / isRaining', 'Garden'],
                ['readGasPPM / readDustDensity / readCO2PWM', 'Air quality (MQ-x, GP2Y10, MH-Z19 PWM)'],
                ['readTDS / readPH / readTurbidityNTU / readWaterFlowLPM', 'Water'],
                ['readWeightRaw / readWeightGrams', 'HX711 load cell (async)'],
                ['readCurrentDC / readCurrentAC / readVoltageDivider', 'ACS712, dividers'],
                ['readLightPercent / readAnalogPercent / readPinVoltage', 'Generic analog'],
            ]} />
            <Sub>IMU (MPU6050)</Sub>
            <Flag name="INTEGRALL_ENABLE_IMU" />
            <CodeBlock code={`integrall.enableIMU();                    // board's default I2C pins
float g = integrall.getImpactForce();      // total acceleration, g
const char* p = integrall.getPosture();    // "Standing" / "Sitting" / "Fallen"
float pitch = integrall.getPitch(), roll = integrall.getRoll();`} />
        </>
    );
}

export function Motion() {
    return (
        <>
            <Sub>Servo</Sub>
            <Flag name="INTEGRALL_ENABLE_SERVO" />
            <CodeBlock code={`int arm = integrall.enableServo(13, 90);   // pin, start angle
integrall.setServo(arm, 45);               // jump
integrall.easeServo(arm, 120, 15);         // glide there in the background (15 ms steps)
integrall.setServoFromAnalog(arm, 34);     // follow a potentiometer`} />
            <Sub>Stepper</Sub>
            <Flag name="INTEGRALL_ENABLE_STEPPER" boards="28BYJ-48 (ULN2003) or STEP/DIR drivers (A4988, DRV8825, TMC2208)" />
            <CodeBlock code={`integrall.stepperBegin(2048, 8, 10, 9, 11);       // 4-wire: steps/rev, IN1, IN3, IN2, IN4
// or: integrall.stepperBeginDriver(stepPin, dirPin, enablePin, 200);
integrall.stepperSpeed(12);                        // rpm
integrall.stepperMove(90);                         // degrees; returns immediately
if (!integrall.stepperIsMoving()) { /* arrived */ }`} />
            <p>Steps are issued from <C>handle()</C>, so top speed depends on how often <C>loop()</C> runs. Keep long work out of it.</p>
        </>
    );
}

export function Keypad() {
    return (
        <>
            <Flag name="INTEGRALL_ENABLE_KEYPAD" boards="4x4 / 4x3 membrane keypads" />
            <CodeBlock code={`byte rows[4] = {13, 12, 14, 27}, cols[4] = {26, 25, 33, 32};
integrall.enableKeypad(rows, cols);
// a PIN lock in one call: correct PIN -> relay on for 5 s, 3 wrong tries -> lockout
integrall.lockSetup("1234", doorRelay, 5000, 3);
// loop():  integrall.lockUpdate();`} />
            <ApiTable rows={[
                ['keypadGetKey()', 'Next key or 0. Keys are buffered, so presses aren\'t lost between calls.'],
                ['keypadCapture(maxLen) / keypadSubmitted()', 'Collect a code; # submits, * deletes the last key.'],
                ['keypadCheckPin(pin)', 'Compare the captured code.'],
                ['lockSetup / lockUpdate / lockReset', 'Complete keypad lock with LCD prompts and lock events.'],
            ]} />
        </>
    );
}

export function Misc() {
    return (
        <>
            <Sub>RGB LED & blink</Sub>
            <Flag name="INTEGRALL_ENABLE_RGB" />
            <CodeBlock code={`integrall.enableRGB(25, 26, 27);           // r, g, b pins (commonAnode = false)
integrall.setColor("orange");               // or setRGB(255, 120, 0)
integrall.rgbBlink(255, 0, 0, 300);         // blinks in handle()
integrall.blink(2, 500);                    // any pin, no flag needed; stopBlink()`} />
            <Sub>Time: NTP, RTC, GPS</Sub>
            <Flag name="INTEGRALL_ENABLE_TIME" />
            <CodeBlock code={`integrall.timeSetupNTP("pool.ntp.org", 3600);   // GMT offset in seconds
if (integrall.timeIsSynced()) integrall.println("%s", integrall.timeGetISO().c_str());
integrall.timeBeginRTC();                          // DS3231 / DS1307
integrall.timeRTCSyncFromNTP();`} />
            <Sub>Storage</Sub>
            <Flag name="INTEGRALL_ENABLE_STORAGE" />
            <CodeBlock code={`integrall.storageBeginEEPROM();
integrall.storageWriteInt(0, 42);
integrall.storageLog("/log.txt", "door opened");   // SD card (CS pin 5)`} />
            <Sub>Power</Sub>
            <Flag name="INTEGRALL_ENABLE_POWER" />
            <CodeBlock code={`integrall.powerBeginINA();                  // INA219 at 0x40
float v = integrall.powerGetVoltage(), mA = integrall.powerGetCurrent();
int pct = integrall.powerGetBattery(v);       // Li-ion %
integrall.powerDeepSleep(600);                // seconds (ESP)`} />
            <Sub>Audio (DFPlayer Mini)</Sub>
            <Flag name="INTEGRALL_ENABLE_AUDIO" />
            <CodeBlock code={`integrall.audioBeginDF(Serial2, 16, 17);
integrall.audioVolume(20);
integrall.audioPlay(1);`} />
            <Sub>Cellular (SIM800L)</Sub>
            <Flag name="INTEGRALL_ENABLE_CELLULAR" boards="ESP32 / ESP8266" />
            <CodeBlock code={`integrall.cellularBegin(16, 17);              // returns immediately; modem boots in background
integrall.onSMSResult([](bool ok) { /* sent? */ });
if (integrall.cellularReady()) integrall.sendSMS("+10000000000", "Alarm!");   // queued`} />
            <Sub>BLE & LoRa</Sub>
            <Flag name="INTEGRALL_ENABLE_COMM" />
            <CodeBlock code={`integrall.commBeginBLE("Integrall");  integrall.commUpdateBLE(value);
integrall.commBeginLoRa(868E6);        integrall.commPushLoRa("hello");`} />
        </>
    );
}

export function Camera() {
    return (
        <>
            <Flag name="INTEGRALL_ENABLE_CAMERA" boards="ESP32-CAM and 19 other camera boards; needs WiFi" />
            <CodeBlock code={`#define INTEGRALL_ENABLE_WIFI
#define INTEGRALL_ENABLE_CAMERA
#include <Integrall.h>
// setup():
integrall.begin("MyWiFi", "pass");
integrall.enableCamera(CAM_BOARD_AI_THINKER);
integrall.startCameraServer();                  // stream at http://<ip>:81/stream
camera_fb_t* fb = integrall.cameraCapture();   // one JPEG frame
integrall.cameraRelease(fb);`} />
            <Callout kind="warn"><p>The stream server has no password. Keep it on your own network.</p></Callout>
        </>
    );
}

export function Web() {
    return (
        <>
            <Flag name="INTEGRALL_ENABLE_WIFI" boards="ESP32 / ESP8266" />
            <Sub>HTTP client</Sub>
            <CodeBlock code={`String body = integrall.httpGet("https://api.example.com/v1/status");
int code = integrall.httpPost("https://api.example.com/v1/data", "{\\"t\\":24.5}");
integrall.setBearerToken("…");  integrall.setHttpTimeout(3000);`} />
            <Callout kind="warn" title="HTTP calls wait for the server">
                <p>An HTTP request is synchronous by nature, bounded by <C>setHttpTimeout()</C> (default 5 s). For data that flows continuously, use the MQTT cloud link, which never blocks.</p>
            </Callout>
            <Sub>Web server and HTML builder</Sub>
            <CodeBlock code={`integrall.webServerBegin();
integrall.webSetAuth("admin", "secret");            // optional basic auth
integrall.onGet("/", [] {
    String body = integrall.htmlCard("Pump", integrall.htmlToggle("Pump", "p", integrall.relayIsOn(pump), "/pump"));
    integrall.webSendHtml(integrall.htmlPage("My device", body));
});
integrall.onPost("/pump", [] { integrall.relayToggle(pump); integrall.webSendJson("{\\"ok\\":true}"); });`} />
            <p>Handler routes reject cross-site browser requests by default, and pages built with <C>htmlPage()</C> pass automatically. Use <C>webEnableCORS(origin)</C> to open an API to other sites.</p>
            <Sub>WebSockets</Sub>
            <CodeBlock code={`integrall.wsServerBegin(81);  integrall.wsBroadcast("{\\"t\\":24.5}");
integrall.wsConnect("wss://echo.example.com/");   // client, auto-reconnects`} />
        </>
    );
}

// --------------------------------------------------------------- reference --
export function Configuration() {
    const flags = ['WIFI', 'MQTT', 'RELAY', 'BUZZER', 'INPUT', 'LCD', 'OLED', 'SENSORS', 'IMU', 'SERVO', 'STEPPER',
        'KEYPAD', 'RGB', 'TIME', 'STORAGE', 'POWER', 'AUDIO', 'CELLULAR', 'COMM', 'CAMERA'];
    return (
        <>
            <p>Every flag is off by default, and each is a <C>#define</C> placed before <C>#include &lt;Integrall.h&gt;</C> (or a <C>-D</C> in <C>build_flags</C>). <C>MQTT</C> implies <C>WIFI</C>.</p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 font-mono text-[11px] not-prose">
                {flags.map((f) => <div key={f} className="px-3 py-2 rounded-lg bg-white/[0.03] border border-white/5 text-white/70 truncate">{f}</div>)}
            </div>
            <ApiTable head={['Setting', 'Default', 'Meaning']} rows={[
                ['INTEGRALL_DEBUG_LEVEL', '2', '0 silent · 1 errors · 2 + warnings · 3 + info · 4 verbose'],
                ['INTEGRALL_MAX_RELAYS', '8 (AVR 4)', 'Relay slots'],
                ['INTEGRALL_MAX_CLOUD_SWITCHES', '4', 'addCloudSwitch() slots'],
                ['INTEGRALL_LCD_MAX_COLS', '20', 'Widest LCD supported'],
                ['INTEGRALL_MQTT_PREFIX', '"integrall"', 'Topic prefix'],
            ]} />
        </>
    );
}

export function Testing() {
    return (
        <>
            <p>The repository can test itself without hardware. This is what keeps "it compiles and it doesn't block" true:</p>
            <ApiTable head={['Command', 'Checks']} rows={[
                ['firmware/ci/build_all.sh', 'Every example on ESP32 (core 2 + 3), ESP32-CAM, ESP8266 and Uno; fails on warnings in the library or RAM > 100%'],
                ['cd firmware/tests && pio test -e native', 'Host unit tests with a fake Arduino (relays, LCD, sensors, buzzer, stepper, modem)'],
                ['cd firmware/sim && pio run -e parking', 'Wokwi simulation of a full project (VS Code Wokwi extension)'],
                ['cd cloud/backend && pytest', 'Backend + OpenRemote sync'],
                ['python cloud/e2e/e2e_test.py', 'Real broker + backend, device simulated'],
                ['python cloud/e2e/openremote_e2e.py', 'Full loop through a live OpenRemote'],
            ]} />
            <Sub>When something doesn't work</Sub>
            <ul className="list-disc pl-6 space-y-2">
                <li>Set <C>#define INTEGRALL_DEBUG_LEVEL 3</C> and watch the Serial Monitor at 115200.</li>
                <li>Run <C>selfTest()</C>. A <C>[MISS]</C> line comes with a wiring hint.</li>
                <li>If a sensor always reads <C>NAN</C>: is its driver library installed, is the pin right, and (for async sensors) have you waited a moment?</li>
                <li>If the device never shows online: check the broker address (the PC's LAN IP, not <C>localhost</C>), the token, and that port 1883 is reachable from your WiFi.</li>
            </ul>
        </>
    );
}

export function Migrating() {
    return (
        <>
            <p>Changes in v1.2 that can affect a v1.1 sketch:</p>
            <ApiTable head={['v1.1', 'v1.2']} rows={[
                ['WiFi/HTTP always compiled', 'Opt in with INTEGRALL_ENABLE_WIFI (or MQTT). A relay-only ESP32 build drops from 938 KB to 273 KB.'],
                ['Errors as -999 / 0 / -1', 'Floats return NAN, ints return -1. Check with Integrall::valid(x).'],
                ['readDistance() etc. waited for the sensor', 'Asynchronous: the latest value is returned instantly (NAN until the first measurement).'],
                ['begin() waited for WiFi', 'Returns immediately; use onConnectionChange().'],
                ['HTTP "backend" telemetry', 'sendTelemetry() publishes over MQTT.'],
                ['stepperStep() blocked', 'Motion runs in handle(); check stepperIsMoving().'],
                ['sendSMS() blocked', 'Queued; the result comes via onSMSResult().'],
                ['lcdPrint(col > 0) cleared the line', 'Writes in place; column 0 still replaces the line.'],
                ['"WiFi Discon..." written to your LCD', 'Only with lcdShowNetworkStatus(row).'],
            ]} />
        </>
    );
}
