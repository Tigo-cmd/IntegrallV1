// "Start here" and "Cloud" documentation sections (Integrall v1.2).
import { ApiTable, B, C, Callout, CodeBlock, Steps, Sub } from './ui';

export const REPO = 'https://github.com/Tigo-cmd/INTEGRALL';

export function Overview() {
    return (
        <>
            <p>
                Integrall is an Arduino library for <B>ESP32, ESP8266 and Arduino Uno/Nano</B>. It wraps relays, buzzers,
                displays, 30+ sensors, motors, cameras and networking behind one object, <C>integrall</C>. It also connects
                your boards to a cloud dashboard over MQTT.
            </p>
            <p>Three rules hold everywhere in the library:</p>
            <ul className="list-disc pl-6 space-y-2">
                <li><B>Nothing blocks.</B> WiFi, MQTT, slow sensors, steppers, buzzer patterns and the LCD all run in the background from <C>integrall.handle()</C>. Your <C>loop()</C> keeps running.</li>
                <li><B>Pay for what you use.</B> Each module is switched on with a <C>#define</C>. Modules you don't enable aren't compiled, and networking is off unless you ask for it.</li>
                <li><B>Missing parts are reported, not fatal.</B> A sensor that isn't wired returns <C>NAN</C>, and <C>selfTest()</C> tells you which parts actually answered.</li>
            </ul>
            <CodeBlock title="the shape of every sketch" code={`#define INTEGRALL_ENABLE_RELAY      // 1. switch on the modules you need
#define INTEGRALL_ENABLE_SENSORS
#include <Integrall.h>              // 2. then include the library

Integrall::System integrall;

void setup() {
    integrall.begin();              // 3. start (Serial at 115200, offline)
    integrall.enableRelay(26);
}

void loop() {
    integrall.handle();             // 4. call every loop, never delay()
}`} />
        </>
    );
}

export function Install() {
    return (
        <>
            <Sub>PlatformIO (recommended)</Sub>
            <p>Clone the repository next to your project (<C>git clone {REPO}</C>), then add Integrall and its two core dependencies to <C>platformio.ini</C>. <C>deep+</C> lets PlatformIO's dependency finder honour the optional-driver checks, so only the libraries you use get linked.</p>
            <CodeBlock language="ini" title="platformio.ini" code={`[env:esp32dev]
platform = espressif32
board = esp32dev
framework = arduino
monitor_speed = 115200
lib_ldf_mode = deep+
lib_deps =
    symlink://../INTEGRALL/firmware/Integrall         ; path to your clone of the repo
    bblanchon/ArduinoJson@^7
    bertmelis/espMqttClient@^1.7.3                    ; only needed for the cloud link
build_flags =
    -D INTEGRALL_ENABLE_RELAY                         ; module flags can live here too`} />
            <Callout title="Module flags with PlatformIO">
                <p>In a single <C>.ino</C>/<C>main.cpp</C>, <C>#define</C> the flags before <C>#include &lt;Integrall.h&gt;</C>. If your project has several <C>.cpp</C> files, put the flags in <C>build_flags</C> instead, so every file sees the same set.</p>
            </Callout>

            <Sub>Arduino IDE</Sub>
            <Steps items={[
                <>Download the repository as a ZIP and use <B>Sketch → Include Library → Add .ZIP Library</B>, choosing the <C>firmware/Integrall</C> folder. Alternatively, clone it into <C>~/Arduino/libraries/Integrall</C>.</>,
                <>In <B>Library Manager</B>, install <B>ArduinoJson</B> (v7). For the cloud link, also install <B>espMqttClient</B>, plus <B>ESPAsyncTCP</B> on ESP8266.</>,
                <>Install the driver library for each module you enable. The Dependencies table below lists them.</>,
            ]} />
            <Callout kind="warn" title="Old copies">
                <p>If you installed v1.1 before, delete the old <C>Arduino/libraries/Integrall</C> folder or replace it with a symlink to the repo. A stale copy silently takes priority.</p>
            </Callout>

            <Sub>Dependencies</Sub>
            <ApiTable head={['Library', 'Needed for']} rows={[
                ['ArduinoJson ≥ 7', 'Always (telemetry, cloud commands, self-test report)'],
                ['espMqttClient', 'INTEGRALL_ENABLE_MQTT (ESP8266 also needs ESPAsyncTCP)'],
                ['LiquidCrystal_I2C', 'INTEGRALL_ENABLE_LCD'],
                ['Adafruit SSD1306 + GFX', 'INTEGRALL_ENABLE_OLED'],
                ['DHT sensor library + Adafruit Unified Sensor', 'readTemperature / readHumidity (DHT11/22)'],
                ['OneWire + DallasTemperature', 'readProbeTemp (DS18B20)'],
                ['Adafruit BME280 / BMP280', 'readEnvironment / readPressure'],
                ['Adafruit MPU6050', 'INTEGRALL_ENABLE_IMU'],
                ['Adafruit_VL53L0X', 'readLaserDistanceMM'],
                ['Adafruit INA219', 'INTEGRALL_ENABLE_POWER'],
                ['Keypad (Chris--A)', 'INTEGRALL_ENABLE_KEYPAD'],
                ['DFRobotDFPlayerMini', 'INTEGRALL_ENABLE_AUDIO'],
                ['RTClib, TinyGPSPlus', 'INTEGRALL_ENABLE_TIME (RTC / GPS)'],
                ['MFRC522', 'inputReadRFID'],
                ['LoRa (Sandeep Mistry)', 'INTEGRALL_ENABLE_COMM (LoRa)'],
            ]} />
            <p>Sensor drivers are optional. If a library isn't installed, the matching call compiles to a stub that returns <C>NAN</C>, so a missing library never breaks a build that doesn't use it.</p>
        </>
    );
}

export function CoreRules() {
    return (
        <>
            <Sub>handle() and non-blocking code</Sub>
            <p>
                <C>integrall.handle()</C> does a little work for every enabled module and returns immediately: the WiFi
                state machine, MQTT, relay timers, buzzer patterns, servo easing, stepper steps, LCD refresh and sensor
                sampling. Call it once per <C>loop()</C>, and keep the rest of <C>loop()</C> free of <C>delay()</C>.
                Use a timestamp instead:
            </p>
            <CodeBlock code={`unsigned long last = 0;

void loop() {
    integrall.handle();
    if (millis() - last >= 2000) {      // every 2 s, without stopping anything else
        last = millis();
        integrall.println("distance: %.1f cm", integrall.readDistance(5, 18));   // %f: ESP only
    }
}`} />

            <Sub>Readings that aren't ready, or parts that aren't there</Sub>
            <p>
                Float readers return <C>NAN</C> when a sensor is missing or hasn't produced a value yet. Integer
                readers return <C>-1</C>. Check with <C>Integrall::valid(x)</C>.
            </p>
            <p>
                Slow sensors are <B>asynchronous</B>: the call returns the latest value instantly and starts the next
                measurement in the background. These are <C>readDistance</C> (HC-SR04), <C>readProbeTemp</C> (DS18B20),
                <C>readLux</C>, <C>readSHT3x</C>, <C>readCO2PWM</C>, <C>readWaterFlowLPM</C> and <C>readWeightRaw</C>.
                The very first call returns <C>NAN</C>.
            </p>
            <CodeBlock code={`float t = integrall.readTemperature(4, 22);   // DHT22 on GPIO 4
if (Integrall::valid(t)) integrall.lcdPrintValue("Temp ", t);
else                     integrall.lcdPrint("sensor?");`} />
            <Callout title="Interrupt pins">
                <p>HC-SR04 echo, CO₂ PWM and flow meters are timed by interrupts. On Uno/Nano use <B>D2 or D3</B>; on ESP32/ESP8266 almost any GPIO works.</p>
            </Callout>

            <Sub>Starting up</Sub>
            <ApiTable rows={[
                ['begin()', 'Offline start: Serial at 115200, modules ready. No WiFi code is linked unless you enable it.'],
                ['begin(ssid, pass)', 'Join WiFi (needs INTEGRALL_ENABLE_WIFI). Returns immediately; the connection completes in the background with exponential back-off.'],
                ['begin(cfg)', 'Full DeviceConfig: WiFi, MQTT broker (backend_url = "mqtt://host:1883"), device token, TLS.'],
                ['beginAP(name, pass)', 'Start as a WiFi access point.'],
                ['onConnectionChange(cb)', 'cb(bool connected) whenever WiFi comes up or drops.'],
                ['setI2CPins(sda, scl)', 'Use non-default I2C pins (call before enabling I2C parts).'],
                ['getDeviceId()', '"INT_" + 12 hex digits from the chip MAC; also the device\'s cloud identity.'],
                ['print / println(fmt, ...)', 'printf-style Serial output; F("...") format strings save RAM on Uno. AVR\'s printf has no %f: print floats with lcdPrintValue() or Util::fmtFloat().'],
            ]} />
        </>
    );
}

export function FirstProject() {
    return (
        <>
            <p>
                The quickest end-to-end test: <B>a push button that turns a buzzer on and off</B>. That buzzer is also a
                switch in your dashboard. It runs on an ESP32 DevKit with two parts, and it's the
                <C>ButtonBuzzer</C> example in the library.
            </p>
            <Sub>Wiring</Sub>
            <ApiTable head={['Part', 'Connect']} rows={[
                ['Push button', 'one leg → GPIO 14, other leg → GND (internal pull-up, no resistor)'],
                ['Buzzer', '+ → GPIO 25, − → GND'],
                ['On-board LED', 'GPIO 2, mirrors the buzzer (built in)'],
            ]} />
            <Callout title="Active or passive buzzer?">
                <p>An <B>active</B> buzzer module beeps by itself when you connect it to 3.3 V; use <C>enableBuzzer(pin, true)</C>. A <B>passive</B> buzzer or bare piezo needs a tone; use <C>enableBuzzer(pin)</C>. If yours stays silent, flip <C>ACTIVE_BUZZER</C>.</p>
            </Callout>
            <Sub>The sketch</Sub>
            <CodeBlock code={`#define INTEGRALL_ENABLE_MQTT        // cloud link (implies WiFi); remove for offline
#define INTEGRALL_ENABLE_BUZZER
#define INTEGRALL_ENABLE_INPUT
#include <Integrall.h>

Integrall::System integrall;

void setBuzzer(bool on) {
    if (on) integrall.buzzerOn(); else integrall.buzzerOff();
    digitalWrite(2, on);                                  // LED mirrors it
}

void setup() {
    Integrall::DeviceConfig cfg;
    cfg.wifi_ssid     = "YourWiFi";
    cfg.wifi_password = "YourPassword";
    cfg.backend_url   = "mqtt://192.168.1.10:1883";       // your broker
    cfg.api_key       = "device-token";                   // from integrall_devices.py
    integrall.begin(cfg);                                 // returns immediately

    pinMode(2, OUTPUT);
    integrall.enableBuzzer(25, true);                     // true = active buzzer

    // Show the buzzer in the dashboard as an on/off switch called "buzzer"
    integrall.addCloudSwitch("buzzer",
        [] { return integrall.buzzerIsOn(); },
        [](bool on) { setBuzzer(on); });
}

void loop() {
    integrall.handle();
    if (integrall.inputButtonPressed(14)) {               // debounced, once per press
        setBuzzer(!integrall.buzzerIsOn());
        integrall.sendEvent("button", integrall.buzzerIsOn() ? "on" : "off");
    }
}`} />
            <Sub>Flash it with PlatformIO</Sub>
            <CodeBlock language="bash" code={`cd firmware/projects/ButtonBuzzer
cp include/secrets.h.example include/secrets.h   # WiFi, broker, token (git-ignored)
pio run -t upload && pio device monitor`} />
            <Steps items={[
                <><B>Offline first.</B> Leave <C>WIFI_SSID</C> empty and flash. Each press should toggle the buzzer and the LED. The Serial Monitor prints <C>Button -&gt; buzzer ON</C> and the device ID.</>,
                <><B>Register the device</B> in your cloud with that ID (see <a className="text-cyan-300" href="#cloud-devices">Register devices</a>). Put the printed token, your WiFi details and the broker address in <C>secrets.h</C>, then flash again.</>,
                <><B>Open OpenRemote.</B> The asset <C>Button buzzer</C> appears, with a <C>buzzer</C> switch, <C>presses</C> and <C>lastEvent</C>. Press the button and the switch follows; flip the switch and the buzzer follows.</>,
            ]} />
        </>
    );
}

export function HardwareCheck() {
    return (
        <>
            <p>
                You can check which parts are actually connected without writing any code. <C>selfTest()</C> scans the I2C bus,
                names every chip it recognises (LCD backpack, OLED, BME280, MPU6050, INA219, RTC...), and asks every
                enabled module whether its part responded.
            </p>
            <CodeBlock code={`void setup() {
    integrall.begin();
    integrall.enableLCD();          // auto-detects 0x27 / 0x3F
    integrall.enableIMU();
    int missing = integrall.selfTest();   // prints a table, returns how many parts didn't answer
}`} />
            <CodeBlock language="text" title="serial monitor" code={`=== Integrall self-test ===
  I2C 0x27  LCD (PCF8574)
  I2C 0x68  MPU6050 / DS3231
  [ OK ] lcd
  [ OK ] imu
  [MISS] oled  -> no OLED at 0x3C/0x3D
=== 1 part(s) missing ===`} />
            <p>
                The <C>HardwareCheck</C> example enables everything a typical starter kit has and prints this table,
                so you can test a board before building on it. With the cloud link on, the same report is published
                as the device's <C>health</C> (<C>partsMissing</C> in the dashboard). You can refresh it with the
                <C>health</C> command.
            </p>
            <Callout title="Uno / Nano">
                <p>HardwareCheck doesn't fit in an Uno's 2 KB of RAM in one go, so it runs in two groups. Flash it once as-is, then again with <C>#define CHECK_GROUP_B</C>.</p>
            </Callout>
        </>
    );
}

// ------------------------------------------------------------------ cloud --
export function CloudOverview() {
    return (
        <>
            <p>
                The cloud link is <B>MQTT</B>. Devices keep one connection open, data is pushed both ways, and nothing
                is polled. Commands reach a device in milliseconds, and a power cut shows up immediately through the
                broker's last-will message.
            </p>
            <CodeBlock language="text" title="architecture" code={`ESP32 / ESP8266 ──MQTT──▶ Mosquitto ──▶ Integrall backend ──▶ OpenRemote (dashboard)
  integrall.handle()        :1883       FastAPI + Postgres      assets, charts, rules
       ▲                                  device tokens            │
       └──────────── commands (relay.set, switch.set, ...) ◀────────┘ user flips a switch`} />
            <ApiTable head={['Piece', 'Role']} rows={[
                ['Mosquitto', 'Broker. Every device has its own login and may only use its own topics.'],
                ['Integrall backend', 'Registers devices and issues tokens, stores telemetry/events/commands, tracks online status, mirrors everything into OpenRemote.'],
                ['OpenRemote', 'Open-source IoT platform used as the UI: per-device assets, history charts, dashboards, rules, maps, users.'],
            ]} />
            <p>Uno/Nano boards have no WiFi. Use them offline, or attach them over serial to an ESP that acts as a gateway.</p>
        </>
    );
}

export function CloudRun() {
    return (
        <>
            <Sub>1. Integrall backend + broker</Sub>
            <CodeBlock language="bash" code={`git clone ${REPO} && cd INTEGRALL/cloud
cp .env.example .env          # set every secret in it
docker compose up -d --build  # Postgres, Mosquitto :1883, API :8000 (docs at /docs)`} />
            <Sub>2. OpenRemote (the dashboard)</Sub>
            <CodeBlock language="bash" code={`mkdir -p ~/openremote && cd ~/openremote
curl -fsSLO https://raw.githubusercontent.com/openremote/core/1.34.1/docker-compose.yml
MANAGER_VERSION=1.34.1 OR_ADMIN_PASSWORD='change-me' docker compose -p openremote up -d
# UI: https://localhost   user: admin   (needs ~3 GB disk, ports 80/443/8883)`} />
            <Steps items={[
                <>In OpenRemote, open <B>Users → Service users → Add</B>, name it <C>integrall</C>, and give it at least <C>read:assets</C>, <C>write:assets</C> and <C>write:attributes</C>. Copy the secret.</>,
                <>Add to <C>cloud/.env</C>: <C>OR_URL=https://host.docker.internal</C>, <C>OR_CLIENT_ID=integrall</C>, <C>OR_CLIENT_SECRET=…</C>, and <C>OR_VERIFY_TLS=false</C> (the quick-start certificate is self-signed). Then run <C>docker compose up -d</C>.</>,
                <><C>GET http://localhost:8000/api/health</C> should now show <C>"openremote": true</C>.</>,
            ]} />
            <Callout kind="warn" title="Before going live">
                <p>The quick-start setup is for your LAN. For the internet, put the broker behind TLS (port 8883, <C>mqtts://</C> in the device), give OpenRemote a real certificate, and give the service user only the three roles above.</p>
            </Callout>
        </>
    );
}

export function CloudDevices() {
    return (
        <>
            <p>A device can only connect once it's registered. Registering creates its broker login, and the token is shown once.</p>
            <CodeBlock language="bash" code={`python cloud/tools/integrall_devices.py --email you@example.com signup      # first time
python cloud/tools/integrall_devices.py --email you@example.com add INT_A1B2C3D4E5F6 "Button buzzer"
#   registered INT_A1B2C3D4E5F6 (Button buzzer)
#   device token (shown once): 3q2-…
python cloud/tools/integrall_devices.py list
python cloud/tools/integrall_devices.py rotate INT_A1B2C3D4E5F6    # new token, old one stops working
python cloud/tools/integrall_devices.py remove INT_A1B2C3D4E5F6    # also deletes its OpenRemote asset`} />
            <p>
                The device ID is printed on the Serial Monitor at boot (<C>getDeviceId()</C>). Put the token in
                <C>cfg.api_key</C>. The device's asset appears in OpenRemote as soon as you register it, and it fills
                in once the device connects.
            </p>
            <Sub>Try it without hardware</Sub>
            <CodeBlock language="bash" code={`python cloud/e2e/fake_device.py --id INT_A1B2C3D4E5F6 --token <token> --host localhost`} />
        </>
    );
}

export function CloudOpenRemote() {
    return (
        <>
            <p>The backend creates one <B>ThingAsset</B> per device. These are its attributes:</p>
            <ApiTable head={['Attribute', 'Type', 'Comes from / does']} rows={[
                ['online', 'boolean, history', 'Connection status (last will on power loss)'],
                ['firmware, chip, board, ip, mac, modules', 'text', 'Device meta'],
                ['health, partsMissing, rssi, heap, uptime', 'JSON / number', 'selfTest() report'],
                ['<telemetry key>', 'number / boolean / text, history', 'sendTelemetry(), created on first sight'],
                ['lastEvent', 'text, history', 'sendEvent(type, detail) → "type: detail"'],
                ['relay0 … relay7', 'boolean, writable', 'Flip in the UI → relay.set on the device'],
                ['<switch name>', 'boolean, writable', 'addCloudSwitch(): flip in the UI → switch.set'],
                ['command', 'JSON, writable', 'Write {"action":"buzzer.beep","args":{"ms":200}} or just "ping"'],
                ['lastCommand', 'JSON', 'Result: acked / failed / expired, with the device\'s message'],
                ['notes, location', 'text / GeoJSON', 'Yours: set location to put the device on the map'],
            ]} />
            <ul className="list-disc pl-6 space-y-2">
                <li>A switch flipped in the UI <B>snaps back</B> if the device is offline or doesn't answer within 30 s, so the UI never shows a state the device isn't in.</li>
                <li>Telemetry keys that clash with the names above get a <C>t_</C> prefix (for example <C>t_relay0</C>).</li>
                <li>Charts come from <B>Insights</B>, automations from <B>Rules</B> (for example: when <C>temperature</C> &gt; 30, set <C>relay0</C> to true), and the map from the <C>location</C> attribute.</li>
            </ul>
        </>
    );
}

export function CloudFirmware() {
    return (
        <>
            <Sub>Sending data</Sub>
            <ApiTable rows={[
                ['sendTelemetry(doc)', 'Publish a JSON object of readings, e.g. {"temperature":24.5,"door":true}.'],
                ['sendTelemetry(key, value)', 'One number or string.'],
                ['sendEvent(type, detail)', 'Something happened (QoS 1): sendEvent("door", "opened").'],
                ['publishHealth()', 'Re-run selfTest() and publish it.'],
                ['isCloudConnected()', 'true while the MQTT session is up. Sends while offline are dropped, never queued.'],
            ]} />
            <Sub>Receiving commands</Sub>
            <p>These work with no code on your side:</p>
            <ApiTable head={['Action', 'Args', 'Effect']} rows={[
                ['ping', '-', 'Replies "pong"'],
                ['health', '-', 'Re-publish the self-test'],
                ['reboot', '-', 'Restart in 1 s'],
                ['relay.set / relay.toggle / relay.get', '{index, on}', 'Relays (interlocks respected)'],
                ['relay.all_off', '-', 'All relays off'],
                ['switch.set / switch.toggle / switch.get', '{name, on}', 'Cloud switches from addCloudSwitch()'],
                ['buzzer.beep / buzzer.on / buzzer.off', '{ms} / {freq}', 'Buzzer'],
                ['servo.set', '{index, angle}', 'Servo 0-180°'],
                ['lcd.print', '{text, col, row}', 'Write to the LCD'],
            ]} />
            <p>Add your own with <C>onCommand</C>. Leave <C>reply</C> untouched for anything you don't handle, and the built-ins still run:</p>
            <CodeBlock code={`void onCloudCommand(const char* action, JsonVariantConst args, Integrall::CommandReply& reply) {
    if (strcmp(action, "led.blink") == 0) {
        integrall.blink(2, args["interval"] | 300);
        reply.ok("blinking");                 // or reply.fail("why")
    }
}
// setup():  integrall.onCommand(onCloudCommand);`} />
            <Sub>Cloud switches</Sub>
            <p>
                <C>addCloudSwitch(name, getter, setter)</C> exposes any on/off thing as a switch: a buzzer, a pump
                behind a transistor, a mode flag. The library re-publishes its state whenever the getter's value
                changes, whether that's from a button, a timer or the cloud, so the dashboard always shows the real
                state. You can have up to 4 switches (<C>INTEGRALL_MAX_CLOUD_SWITCHES</C>).
            </p>
            <Callout title="Commands are never replayed">
                <p>A command sent while a device is offline is rejected straight away, never queued. A device coming back after an outage will not suddenly act on stale "turn on" commands.</p>
            </Callout>
        </>
    );
}

export function CloudContract() {
    return (
        <>
            <p>If you write your own backend or connect another platform directly to the broker, these are the topics (prefix <C>integrall</C>):</p>
            <CodeBlock language="text" code={`integrall/{id}/status      retained  "online" | "offline" (last will)
integrall/{id}/meta        retained  {fw, chip, board, ip, mac, modules[], relays[{index,name,on}], switches[{name,on}]}
integrall/{id}/health      retained  {parts{name:bool}, i2c[], heap, uptime_s, rssi, missing, fw}
integrall/{id}/telemetry   QoS 0     {ts?, <key>: number | bool | string, ...}
integrall/{id}/event       QoS 1     {ts?, type, detail}
integrall/{id}/cmd         to device {id, action, args}
integrall/{id}/cmd/ack     QoS 1     {id, ok, msg?, result?}`} />
            <p><C>ts</C> (epoch seconds) is included only once the device has synced its clock over NTP. Otherwise the receive time is used.</p>
        </>
    );
}
