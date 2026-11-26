import type { Lesson } from '../lesson-types'

export const element4Lesson: Lesson = {
  element: 4,
  intro:
    'Element 4 turns theory into a station. It covers antennas, feedlines, SWR, transceiver controls, modes, receivers, interference, operating procedure, and safety. The questions are practical: what does this control do, what connector is this, why is the SWR high, and what should you do before climbing the tower?',
  examNote:
    'Expect antenna length calculations, SWR and dummy-load questions, connector identification, mode and bandwidth comparisons, RST and Q codes, repeater offsets, and safety scenarios. The most common traps are mixing up the antenna formula, confusing an ATU with a dummy load, and reversing LSB and USB.',
  sections: [
    {
      id: 'station',
      title: 'The station',
      blocks: [
        {
          type: 'p',
          text: 'A basic amateur station is a transceiver, a power supply, an antenna, a feedline, and a way to monitor the signal. Add an SWR meter or antenna analyzer for tuning, a dummy load for testing, and a key or microphone for the mode you intend to use. The transmitter, feedline, and antenna should all be designed for the same impedance — 50 Ω is the amateur standard.',
        },
        {
          type: 'list',
          items: [
            'Volume: sets receive audio level.',
            'Squelch: mutes the receiver until a signal is strong enough to open it.',
            'RIT or clarifier: shifts the receive frequency without moving the transmit frequency.',
            'VFO: the variable frequency oscillator that sets the operating frequency; dual VFOs allow split operation.',
            'Memory channels: store frequently used frequencies and repeater settings.',
            'AGC: automatic gain control keeps loud and weak signals at a comfortable audio level.',
            'Noise blanker: reduces impulse noise such as ignition interference.',
            'Mic gain: sets microphone sensitivity; too high causes distortion and splatter.',
          ],
        },
        {
          type: 'p',
          text: 'Never transmit without a load connected. Testing into an antenna with a bad match, or with no antenna at all, can damage the transmitter’s final amplifier. Use a dummy load for adjustments and tests that should not radiate.',
        },
        {
          type: 'callout',
          tone: 'key',
          title: '50 ohms everywhere',
          text: 'Transmitter, feedline, antenna, SWR meter, and dummy load should all be 50 Ω. A mismatch at any point causes reflections and a higher SWR.',
        },
      ],
    },
    {
      id: 'antennas',
      title: 'Antennas',
      blocks: [
        {
          type: 'p',
          text: 'An antenna converts electrical RF energy into electromagnetic waves, and the same structure can receive waves and convert them back into electrical energy. This is called reciprocity. The half-wave dipole is the reference antenna: two equal conductors fed at the center, each about a quarter wavelength long.',
        },
        {
          type: 'formula',
          label: 'Half-wave dipole length',
          expression: 'Total length (m) = 142.5 / f (MHz)',
          note: 'Each leg is half the total. At 145 MHz: 0.983 m total, about 0.491 m per leg.',
        },
        {
          type: 'p',
          text: 'A vertical antenna is omnidirectional and radiates with vertical polarization. A beam or Yagi concentrates energy in one direction and has gain, but must be pointed. A mobile antenna is usually shortened and relies on the vehicle body as a counterpoise. Polarization matters: horizontal antennas work best with horizontal antennas, and vertical with vertical.',
        },
        {
          type: 'p',
          text: 'Height affects the takeoff angle. Higher is generally better for distance, but a very high antenna can radiate at a low angle and skip over nearby stations. Nearby metal, buildings, and terrain change the pattern and the feed-point impedance. That is why an antenna that is perfect on paper may need tuning in place.',
        },
        {
          type: 'callout',
          tone: 'trap',
          title: 'Total length, not per leg',
          text: 'The formula 142.5/f gives the total length of a half-wave dipole in metres. Each leg is half of that. Some exam questions ask for one leg; others ask for the total. Read carefully.',
        },
      ],
    },
    {
      id: 'feedlines',
      title: 'Feedlines and connectors',
      blocks: [
        {
          type: 'p',
          text: 'Coaxial cable has a center conductor, a dielectric, a metallic shield, and an outer jacket. The shield carries the return current and blocks external interference. Amateur coax is normally 50 Ω. Balanced feedline has two parallel conductors and is often used with a balun to match a balanced antenna to an unbalanced coax feedline.',
        },
        {
          type: 'table',
          head: ['Connector', 'Type', 'Typical use'],
          rows: [
            ['PL-259', 'UHF plug', 'HF and mobile coax; mates with SO-239'],
            ['SO-239', 'UHF socket', 'Chassis or antenna socket for a PL-259'],
            ['N-type', 'Constant impedance, weatherproof', 'VHF/UHF and outdoor feedlines'],
            ['BNC', 'Bayonet, quick connect', 'Test equipment and small VHF/UHF gear'],
            ['SMA', 'Miniature threaded', 'Handhelds and compact radios'],
          ],
        },
        {
          type: 'p',
          text: 'Loss increases with frequency and with cable length. Thin coax loses more than thick coax. Keep feedline runs as short as practical, use quality cable, and weatherproof every outdoor connection. A poor connector or water in the coax can produce a high SWR and intermittent operation.',
        },
        {
          type: 'p',
          text: 'Characteristic impedance is a property of the cable, not its resistance. A 50 Ω cable does not measure 50 Ω with an ohmmeter; the ohmmeter measures the center conductor’s DC resistance, which should be near zero on a good short run.',
        },
        {
          type: 'callout',
          tone: 'trap',
          title: 'Plug versus socket',
          text: 'The PL-259 is the male plug; the SO-239 is the female chassis socket. Exam items often show the names without pictures and expect you to know which is which.',
        },
      ],
    },
    {
      id: 'swr-and-power',
      title: 'SWR, ATUs, and power measurement',
      blocks: [
        {
          type: 'p',
          text: 'Standing-wave ratio (SWR) compares the forward power travelling toward the antenna with the power reflected back. A perfect match is 1:1. A ratio below 1.5:1 is generally good; 1.5:1 to 2:1 is usually acceptable; above 2:1 should be investigated. High SWR means less power reaches the antenna and more heat in the feedline and transmitter finals.',
        },
        {
          type: 'list',
          items: [
            'Common causes: antenna cut for the wrong frequency, a damaged or wet connector, a broken coax shield, a nearby conductor, or transmitting on the wrong band.',
            'An antenna tuner (ATU) matches the transmitter to the feedline and antenna. It protects the transmitter, but it does not repair a lossy cable or a badly designed antenna.',
            'A dummy load is a non-radiating 50 Ω resistor that absorbs the transmitter output. It should present a 1:1 SWR at the design frequency.',
            'An SWR meter is inserted in the feedline. Measure forward and reflected power, then compute the ratio.',
            'A wattmeter measures RF power. PEP is the peak envelope power of a modulated signal; average power is lower for SSB and CW.',
          ],
        },
        {
          type: 'p',
          text: 'For a standard power measurement, use a dummy load rated for the transmitter’s output, set the transmitter to the recommended drive and microphone gain, and confirm a 1:1 SWR. Measurements made into a mismatched antenna are not reliable.',
        },
        {
          type: 'callout',
          tone: 'key',
          title: 'ATU is not a dummy load',
          text: 'An ATU matches impedance and still radiates through the antenna. A dummy load absorbs the power and does not radiate. Use the dummy load when you do not want a signal on the air.',
        },
      ],
    },
    {
      id: 'modes',
      title: 'Modes and modulation',
      blocks: [
        {
          type: 'p',
          text: 'Modulation combines an information signal with an RF carrier. Demodulation recovers the information at the receiver. CW is an interrupted continuous wave keyed in Morse code. AM varies the amplitude of the carrier. FM varies the frequency. SSB transmits one sideband and suppresses the carrier, making it efficient for voice.',
        },
        {
          type: 'table',
          head: ['Mode', 'What varies', 'Approx. bandwidth', 'Notes'],
          rows: [
            ['CW', 'Carrier on/off', 'Narrow, about 500 Hz', 'Most efficient; works at low power'],
            ['SSB', 'Amplitude, one sideband', 'About 2.4–3 kHz', 'USB above 10 MHz, LSB below by convention'],
            ['AM', 'Amplitude, carrier plus sidebands', 'About 6 kHz', 'Simple, but wastes power on the carrier'],
            ['FM', 'Frequency', 'About 5 kHz on 2 m', 'Good audio; captures the strongest signal'],
            ['Data', 'Varies (FSK, PSK, etc.)', 'Depends on mode', 'Computer-generated; precise tuning required'],
          ],
        },
        {
          type: 'p',
          text: 'On the HF bands, lower-sideband (LSB) is the convention below 10 MHz and upper-sideband (USB) above 10 MHz. On VHF and UHF, USB is standard for SSB. A speech processor increases average talk power and readability; it does not increase peak envelope power. Too much microphone gain causes splatter and interference.',
        },
        {
          type: 'callout',
          tone: 'trap',
          title: 'LSB below, USB above',
          text: 'Convention: LSB on 40 m and lower HF bands, USB on 20 m and higher, and USB on VHF/UHF. An exam item may ask which sideband to use on 40 m — the answer is LSB.',
        },
      ],
    },
    {
      id: 'receivers',
      title: 'Receivers',
      blocks: [
        {
          type: 'p',
          text: 'Sensitivity is the ability to hear weak signals. Selectivity is the ability to separate a wanted signal from strong signals on nearby frequencies. Dynamic range is the ability to handle strong signals without distortion. A receiver can be sensitive but still unusable in a crowded band if its selectivity or dynamic range is poor.',
        },
        {
          type: 'list',
          items: [
            'AGC: automatic gain control smooths out signal-level changes.',
            'Filters: narrow filters improve selectivity for CW and crowded SSB; wider filters sound better for FM.',
            'Squelch: mutes audio when no signal is present.',
            'RIT/clarifier: fine-tunes the received signal without changing transmit frequency.',
            'Dual VFO: allows split operation, such as transmitting on one repeater input and listening on the output.',
            'S-meter: indicates received signal strength from S1 to S9; each S unit is about 6 dB.',
          ],
        },
        {
          type: 'p',
          text: 'An S-meter reading of S9 is stronger than S5 by about 24 dB. S9+20 means 20 dB above the S9 reference. Signal reports use RST: readability 1–5, strength 1–9, and tone 1–9 (tone is used for CW).',
        },
        {
          type: 'callout',
          tone: 'key',
          title: 'Sensitivity versus selectivity',
          text: 'Sensitivity is hearing weak signals. Selectivity is rejecting strong nearby signals. A receiver can hear a whisper but still be swamped by a loud station two channels away.',
        },
      ],
    },
    {
      id: 'interference',
      title: 'Interference',
      blocks: [
        {
          type: 'p',
          text: 'Interference can come from your own transmitter, from other stations, or from consumer electronics. Harmonics are multiples of your fundamental frequency. Intermodulation (intermod) occurs when two or more strong signals mix in a nonlinear device and produce new frequencies. Cross-modulation transfers the modulation of a strong unwanted carrier onto the wanted signal.',
        },
        {
          type: 'list',
          items: [
            'Fundamental overload: a strong signal at the receiver’s tuned frequency overwhelms the front end.',
            'Harmonic interference: your signal appears at 2×, 3×, or another multiple of the operating frequency.',
            'Adjacent-channel interference: a strong station just outside the passband.',
            'TVI/RFI: interference to televisions, audio equipment, or other electronics.',
            'Fixes: low-pass filter at the transmitter, ferrite chokes on cables, good station ground, shielded coax, correct antenna, reduced power, and band-pass filters at the receiver.',
          ],
        },
        {
          type: 'p',
          text: 'If interference disappears when you transmit into a dummy load, the problem is likely RF radiation or a nearby antenna, not spurious output from the transmitter. If it remains with a dummy load, investigate the transmitter, power supply, or feedline.',
        },
        {
          type: 'callout',
          tone: 'key',
          title: 'Dummy load as a diagnostic',
          text: 'Testing into a dummy load separates “the transmitter is generating garbage” from “the station is radiating in a way that causes interference.” It is the first step in most interference troubleshooting.',
        },
      ],
    },
    {
      id: 'operating',
      title: 'Operating procedure',
      blocks: [
        {
          type: 'p',
          text: 'Listening first is the first rule. To call, say “CQ CQ CQ” followed by your call sign, and stand by. To answer, give the other station’s call sign, then your own. Exchange signal reports, names, locations, and any other information. End with “73” and your call sign. Log in UTC so contacts are unambiguous across time zones.',
        },
        {
          type: 'table',
          head: ['Q code', 'Meaning', 'Q code', 'Meaning'],
          rows: [
            ['QRZ', 'Who is calling me?', 'QSL', 'Acknowledge receipt'],
            ['QRM', 'Man-made interference', 'QSO', 'A contact'],
            ['QRN', 'Static or natural noise', 'QSY', 'Change frequency'],
            ['QRT', 'Stop transmitting', 'QTH', 'Location'],
            ['QRX', 'Wait / stand by', 'QRL', 'Frequency is busy'],
            ['QSB', 'Signal fading', 'QTR', 'Time'],
          ],
        },
        {
          type: 'table',
          head: ['Letter', 'Word', 'Letter', 'Word'],
          rows: [
            ['A', 'Alfa', 'N', 'November'],
            ['B', 'Bravo', 'O', 'Oscar'],
            ['C', 'Charlie', 'P', 'Papa'],
            ['D', 'Delta', 'Q', 'Quebec'],
            ['E', 'Echo', 'R', 'Romeo'],
            ['F', 'Foxtrot', 'S', 'Sierra'],
            ['G', 'Golf', 'T', 'Tango'],
            ['H', 'Hotel', 'U', 'Uniform'],
            ['I', 'India', 'V', 'Victor'],
            ['J', 'Juliett', 'W', 'Whiskey'],
            ['K', 'Kilo', 'X', 'X-ray'],
            ['L', 'Lima', 'Y', 'Yankee'],
            ['M', 'Mike', 'Z', 'Zulu'],
          ],
        },
        {
          type: 'p',
          text: 'On 2 m FM, repeaters use a standard ±600 kHz offset: the repeater input is 600 kHz above or below the output. CTCSS tones open the repeater only when the correct sub-audible tone is present. Simplex operation uses one frequency for both directions. Nets are organized on a schedule with a net control station.',
        },
        {
          type: 'callout',
          tone: 'trap',
          title: 'UTC, not local time',
          text: 'Logs and schedules use Coordinated Universal Time. A contact at 8 p.m. Philippine time is 1200 UTC. Mixing local time into a log is a classic operating error.',
        },
      ],
    },
    {
      id: 'safety',
      title: 'Electrical and RF safety',
      blocks: [
        {
          type: 'p',
          text: 'Mains voltage can kill. Unplug equipment before servicing, use a fuse or circuit breaker of the correct rating, connect the metal chassis to earth, and use a residual current device where available. Keep one hand behind your back when working near live circuits. Do not work alone on high-voltage equipment.',
        },
        {
          type: 'list',
          items: [
            'RF burns: never touch an antenna or exposed feedline while transmitting. Disconnect the feedline before working on the antenna.',
            'Lightning: disconnect the antenna and the power leads. A surge arrestor helps, but disconnecting is the reliable protection.',
            'Antenna work: look up for power lines before raising a mast. Keep antennas away from overhead wires. Use fall protection and a second person.',
            'Batteries: lead-acid batteries can vent hydrogen; keep them ventilated and away from sparks. Do not short the terminals.',
            'Soldering: work in a ventilated area; lead solder and flux fumes are hazardous.',
            'RF exposure: keep antennas away from people, especially at high power. Do not stand in front of a directional antenna.',
          ],
        },
        {
          type: 'p',
          text: 'Station grounding has two purposes: electrical safety and RF performance. Bond equipment chassis to a common ground bus, then to earth. Keep ground leads short and direct. A long, thin ground wire can be worse than no ground at RF.',
        },
        {
          type: 'callout',
          tone: 'trap',
          title: 'Turning off is not enough',
          text: 'For lightning protection, disconnecting the antenna and power is more reliable than simply turning the radio off. A nearby strike can travel through the coax shield and the mains wiring.',
        },
      ],
    },
    {
      id: 'exam-traps',
      title: 'Element 4 exam traps',
      blocks: [
        {
          type: 'list',
          items: [
            '142.5/f is the total dipole length, not each leg.',
            'An ATU matches impedance but does not absorb power; a dummy load does.',
            'High SWR reduces radiated power and can damage the finals.',
            'PL-259 is the plug; SO-239 is the socket.',
            'LSB below 10 MHz, USB above; USB on VHF/UHF.',
            'Each S unit is about 6 dB.',
            'The standard 2 m repeater offset is ±600 kHz.',
            'A speech processor raises average power, not PEP.',
            'A dummy load is 50 Ω and should show 1:1 SWR.',
            'Disconnect the antenna and power for lightning protection.',
          ],
        },
        {
          type: 'callout',
          tone: 'key',
          title: 'Picture the station',
          text: 'Element 4 questions are easier when you picture the signal path: transceiver → SWR meter → feedline → antenna. Ask where the problem is, and what each device in the chain actually does.',
        },
      ],
    },
  ],
}
