import type { Lesson } from '../lesson-types'

export const element3Lesson: Lesson = {
  element: 3,
  intro:
    'Element 3 is where the exam becomes technical. You do not need an engineering degree, but you do need to be comfortable with units, Ohm’s law, series and parallel circuits, and the way capacitors and inductors behave at different frequencies. Most of the math is one-step substitution — the challenge is choosing the right formula and converting units first.',
  examNote:
    'Expect direct formula questions, unit conversions, series/parallel totals, resistor color codes, reactance, resonance, and instrument connections. The most common traps are milliamps and kilo-ohms, capacitor/inductor behavior being reversed, and using the wrong power formula.',
  sections: [
    {
      id: 'charge-and-current',
      title: 'Charge, current, and the atom',
      blocks: [
        {
          type: 'p',
          text: 'Matter is made of atoms. An atom has a nucleus of protons (positive) and neutrons (neutral), surrounded by electrons (negative). Like charges repel; opposite charges attract. The coulomb is the unit of electrical charge. One coulomb is the quantity of electricity that passes in one second through a circuit carrying one ampere.',
        },
        {
          type: 'p',
          text: 'Current is the movement of electrical charge, measured in amperes. Voltage is the electrical force or potential difference that drives the current, measured in volts. Resistance is the opposition to current, measured in ohms. Conductance is the inverse of resistance, measured in siemens (also called mhos).',
        },
        {
          type: 'table',
          head: ['Quantity', 'Symbol', 'Unit', 'Measured with', 'Connection'],
          rows: [
            ['Charge', 'Q', 'coulomb (C)', '—', '—'],
            ['Current', 'I', 'ampere (A)', 'ammeter', 'series'],
            ['Voltage', 'V or E', 'volt (V)', 'voltmeter', 'parallel'],
            ['Resistance', 'R', 'ohm (Ω)', 'ohmmeter', 'circuit off'],
            ['Power', 'P', 'watt (W)', 'wattmeter', 'between source and load'],
            ['Conductance', 'G', 'siemens (S)', '—', '—'],
          ],
        },
        {
          type: 'p',
          text: 'Materials are classified by how tightly they hold their outer electrons. Conductors such as silver, copper, and most metals have loose outer electrons and pass current freely. Insulators such as rubber, glass, and plastic hold their electrons tightly. Semiconductors such as silicon and germanium sit between the two and can be made to conduct by adding impurities — a process called doping.',
        },
        {
          type: 'callout',
          tone: 'trap',
          title: 'Current through, voltage across',
          text: 'An ammeter is connected in series so the current passes through it. A voltmeter is connected in parallel so it measures the difference across a component. Reversing these connections is a classic exam distractor.',
        },
      ],
    },
    {
      id: 'ohms-law-and-power',
      title: 'Ohm’s law and power',
      blocks: [
        {
          type: 'p',
          text: 'Ohm’s law states that current is directly proportional to voltage and inversely proportional to resistance. Any one quantity can be found if the other two are known.',
        },
        { type: 'formula', label: 'Ohm’s law', expression: 'V = I × R', note: 'Also I = V / R and R = V / I.' },
        {
          type: 'formula',
          label: 'Power law',
          expression: 'P = V × I = I² × R = V² / R',
          note: 'Use I²R when you know current and resistance; use V²/R when you know voltage and resistance.',
        },
        {
          type: 'p',
          text: 'Example: a 12 V supply across a 4 Ω resistor produces 3 A. The power dissipated is 12 V × 3 A = 36 W, or 3² × 4 = 36 W. Example: 2 mA through 10 kΩ produces 2 mA × 10,000 Ω = 20 V.',
        },
        {
          type: 'table',
          head: ['Prefix', 'Symbol', 'Multiplier', 'Example'],
          rows: [
            ['giga', 'G', '10⁹', '3 GHz = 3,000,000,000 Hz'],
            ['mega', 'M', '10⁶', '2.5 MHz = 2,500,000 Hz'],
            ['kilo', 'k', '10³', '10 kΩ = 10,000 Ω'],
            ['milli', 'm', '10⁻³', '20 mA = 0.020 A'],
            ['micro', 'µ', '10⁻⁶', '4 µF = 0.000004 F'],
            ['nano', 'n', '10⁻⁹', '100 nF = 0.0000001 F'],
            ['pico', 'p', '10⁻¹²', '6 pF = 0.000000000006 F'],
          ],
        },
        {
          type: 'callout',
          tone: 'trap',
          title: 'Convert before you calculate',
          text: 'The most common arithmetic error is mixing milliamps with amps or kilo-ohms with ohms. Convert every value to base units first, then substitute.',
        },
      ],
    },
    {
      id: 'series-and-parallel',
      title: 'Series and parallel circuits',
      blocks: [
        {
          type: 'p',
          text: 'In a series circuit, components are connected end to end. The same current flows through every component, the voltages add, and the total resistance is the sum of the individual resistances. In a parallel circuit, components are connected across the same two points. The voltage is the same across every component, the currents add, and the total resistance is found from the reciprocal sum.',
        },
        {
          type: 'table',
          head: ['Component', 'Series', 'Parallel'],
          rows: [
            ['Resistor', 'R = R1 + R2 + …', '1/R = 1/R1 + 1/R2 + …'],
            ['Inductor', 'L = L1 + L2 + …', '1/L = 1/L1 + 1/L2 + …'],
            ['Capacitor', '1/C = 1/C1 + 1/C2 + …', 'C = C1 + C2 + …'],
            ['Battery', 'Voltage adds', 'Capacity/current adds'],
          ],
        },
        {
          type: 'p',
          text: 'Example: 10 kΩ, 15 kΩ, and 30 kΩ in parallel give 1/R = 1/10 + 1/15 + 1/30 = 0.2, so R = 5 kΩ. Three 30 mH inductors in parallel give 10 mH; three capacitors of 6 pF, 6 pF, and 12 pF in parallel give 24 pF.',
        },
        {
          type: 'callout',
          tone: 'trap',
          title: 'Capacitors are the exception',
          text: 'Capacitors behave opposite to resistors and inductors: parallel capacitors add directly, and series capacitors use the reciprocal formula. If a question feels backwards, check whether it is asking about capacitance.',
        },
        {
          type: 'formula',
          label: 'Voltage divider',
          expression: 'Vout = Vin × R2 / (R1 + R2)',
          note: 'The output is taken across R2.',
        },
      ],
    },
    {
      id: 'ac-and-wavelength',
      title: 'AC, frequency, and wavelength',
      blocks: [
        {
          type: 'p',
          text: 'Direct current flows in one direction; alternating current changes direction periodically. Frequency is the number of complete cycles per second, measured in hertz. Period is the time for one cycle and is the reciprocal of frequency: T = 1/f. A 60 Hz wave has a period of about 16.7 ms.',
        },
        {
          type: 'formula',
          label: 'Wavelength',
          expression: 'λ (metres) = 300 / f (MHz)',
          note: 'For radio waves, using 300,000,000 m/s. Example: 75 MHz → 4 m; 150 MHz → 2 m.',
        },
        {
          type: 'p',
          text: 'The electromagnetic spectrum runs from audio (roughly 20 Hz to 20 kHz) through radio, microwave, infrared, visible light, ultraviolet, X-rays, and gamma rays. HF is 3–30 MHz, VHF is 30–300 MHz, UHF is 300 MHz–3 GHz, and SHF is 3–30 GHz.',
        },
        {
          type: 'p',
          text: 'For a sine wave, the root-mean-square (RMS) value is 0.707 times the peak value. RMS is the effective value used for power calculations. Peak is 1.414 times RMS. Mains power is specified in RMS: 220 V RMS has a peak of about 311 V.',
        },
        {
          type: 'callout',
          tone: 'key',
          title: 'Two formulas, two units',
          text: 'λ = 300/f gives metres when f is in MHz. The half-wave dipole formula 468/f gives feet when f is in MHz, and 142.5/f gives metres. Do not mix them.',
        },
      ],
    },
    {
      id: 'reactance-and-resonance',
      title: 'Reactance, impedance, and resonance',
      blocks: [
        {
          type: 'p',
          text: 'A resistor opposes current at every frequency. A capacitor blocks DC and passes AC; its capacitive reactance decreases as frequency rises. An inductor passes DC and opposes AC; its inductive reactance increases as frequency rises. Both reactances are measured in ohms.',
        },
        { type: 'formula', label: 'Inductive reactance', expression: 'XL = 2πfL', note: 'f in hertz, L in henrys.' },
        { type: 'formula', label: 'Capacitive reactance', expression: 'XC = 1 / (2πfC)', note: 'f in hertz, C in farads.' },
        {
          type: 'formula',
          label: 'Impedance',
          expression: 'Z = √(R² + (XL − XC)²)',
          note: 'Reactances have opposite signs; at resonance they cancel.',
        },
        {
          type: 'formula',
          label: 'Resonant frequency',
          expression: 'f = 1 / (2π√(LC))',
          note: 'The frequency at which XL = XC.',
        },
        {
          type: 'p',
          text: 'Example: a 150 mH coil across a 50 Hz supply has XL = 2 × 3.14 × 50 × 0.150 = 47.1 Ω. At 100 V, the current is 2.12 A. A 4 µF capacitor across 220 V at 60 Hz has XC = 663.5 Ω and draws about 332 mA.',
        },
        {
          type: 'p',
          text: 'At resonance, inductive and capacitive reactances are equal and cancel. A series resonant circuit has minimum impedance and maximum current. A parallel resonant circuit (a tank) has maximum impedance. Energy oscillates between the inductor’s magnetic field and the capacitor’s electric field.',
        },
        {
          type: 'callout',
          tone: 'trap',
          title: 'One goes up, one goes down',
          text: 'As frequency increases, XL increases and XC decreases. If you remember only one thing, remember that they move in opposite directions.',
        },
      ],
    },
    {
      id: 'components',
      title: 'Components and color codes',
      blocks: [
        {
          type: 'p',
          text: 'A resistor is a passive two-terminal component that limits current. Common types include carbon composition, carbon film, metal oxide film, metal film, and wire-wound. A capacitor stores energy in an electrostatic field and is measured in farads. An inductor stores energy in a magnetic field and is measured in henrys. A transformer couples AC between windings and can step voltage up or down.',
        },
        {
          type: 'table',
          head: ['Color', 'Digit', 'Multiplier', 'Tolerance'],
          rows: [
            ['Black', '0', '×1', '—'],
            ['Brown', '1', '×10', '±1%'],
            ['Red', '2', '×100', '±2%'],
            ['Orange', '3', '×1,000', '—'],
            ['Yellow', '4', '×10,000', '—'],
            ['Green', '5', '×100,000', '±0.5%'],
            ['Blue', '6', '×1,000,000', '±0.25%'],
            ['Violet', '7', '×10,000,000', '±0.1%'],
            ['Gray', '8', '×100,000,000', '—'],
            ['White', '9', '×1,000,000,000', '—'],
            ['Gold', '—', '×0.1', '±5%'],
            ['Silver', '—', '×0.01', '±10%'],
          ],
        },
        {
          type: 'p',
          text: 'For a four-band resistor, the first two bands are digits, the third is the multiplier, and the fourth is tolerance. Yellow-violet-orange is 4-7 × 1,000 = 47 kΩ. Green-blue-red-gold is 5-6 × 100 = 5.6 kΩ at ±5%. No fourth band usually means ±20%.',
        },
        {
          type: 'p',
          text: 'A diode conducts in one direction and is used for rectification, protection, and detection. An LED emits light when forward-biased. A transistor amplifies or switches. An integrated circuit combines many components on one substrate. A varactor is a voltage-variable capacitor; a thermistor changes resistance with temperature.',
        },
        {
          type: 'callout',
          tone: 'trap',
          title: 'The multiplier is not a digit',
          text: 'In a four-band code, only the first two bands are digits. The third band tells you how many zeros to add. Reading it as a third digit is the most common color-code mistake.',
        },
      ],
    },
    {
      id: 'circuits-and-filters',
      title: 'Basic circuits and filters',
      blocks: [
        {
          type: 'p',
          text: 'A rectifier converts AC to pulsating DC. A half-wave rectifier uses one diode and conducts on one half of the cycle. A full-wave rectifier uses two or four diodes and conducts on both halves. A filter capacitor smooths the ripple, and a regulator holds the output voltage steady under load.',
        },
        {
          type: 'p',
          text: 'Filters are named for what they pass. A low-pass filter passes low frequencies and blocks high frequencies. A high-pass filter does the opposite. A band-pass filter passes a range and rejects above and below it. A notch filter rejects one narrow frequency. A series resonant circuit is a low impedance at resonance; a parallel resonant circuit is a high impedance.',
        },
        {
          type: 'formula',
          label: 'Transformer voltage ratio',
          expression: 'Vp / Vs = Np / Ns',
          note: 'Impedance ratio is the square of the turns ratio: Zp/Zs = (Np/Ns)².',
        },
        {
          type: 'p',
          text: 'A step-down transformer has fewer secondary turns and lower secondary voltage; a step-up transformer has more. Transformers work on AC, not steady DC. A center-tapped transformer is commonly used in full-wave power supplies.',
        },
        {
          type: 'callout',
          tone: 'key',
          title: 'Filters pass, they do not block',
          text: 'A low-pass filter is named for the low frequencies it passes. If a question asks which filter removes high-frequency interference, the answer is a low-pass filter.',
        },
      ],
    },
    {
      id: 'instruments',
      title: 'Meters and measurements',
      blocks: [
        {
          type: 'p',
          text: 'A multimeter, or VOM, combines voltmeter, ammeter, and ohmmeter functions. A voltmeter goes in parallel across the component. An ammeter goes in series so the current passes through it. An ohmmeter measures resistance with the circuit de-energized. A wattmeter measures power and is inserted between the source and the load.',
        },
        {
          type: 'list',
          items: [
            'Oscilloscope: displays a waveform and shows how voltage changes over time.',
            'Frequency counter: counts cycles and displays frequency.',
            'SWR meter: shows the standing-wave ratio between transmitter and antenna.',
            'Dummy load: a non-radiating 50 Ω load used for transmitter tests.',
            'Logic probe: indicates high and low logic states in digital circuits.',
            'Signal generator: produces a known test signal.',
            'Field-strength meter: indicates the strength of radiated RF.',
          ],
        },
        {
          type: 'p',
          text: 'A voltmeter should have high input impedance so it does not load the circuit. An ammeter should have low resistance so it does not drop voltage. An ohmmeter supplies its own small current; never use it on a live circuit.',
        },
        {
          type: 'callout',
          tone: 'trap',
          title: 'Ohmmeter, power off',
          text: 'Resistance is measured with the circuit unpowered and, ideally, with the component isolated. Measuring resistance in a live circuit can damage the meter and give a false reading.',
        },
      ],
    },
    {
      id: 'decibels',
      title: 'Decibels and signal levels',
      blocks: [
        {
          type: 'p',
          text: 'The decibel is a logarithmic ratio used to compare power or voltage. A gain of +3 dB is approximately double the power; −3 dB is half. A +10 dB gain is ten times the power. For voltage, +6 dB is approximately double the voltage, which is four times the power.',
        },
        { type: 'formula', label: 'Power ratio in dB', expression: 'dB = 10 log₁₀(P2 / P1)' },
        { type: 'formula', label: 'Voltage ratio in dB', expression: 'dB = 20 log₁₀(V2 / V1)' },
        {
          type: 'p',
          text: 'An S-meter report runs from S1 to S9, with each S unit representing about 6 dB. S9 is the reference level on most meters; stronger signals are reported as S9+10, S9+20, and so on. A 6 dB increase is roughly four times the power, or double the voltage.',
        },
        {
          type: 'callout',
          tone: 'trap',
          title: '3 dB is power, 6 dB is voltage',
          text: 'Do not use 3 dB for a voltage doubling. The power ratio and voltage ratio formulas differ by a factor of two in the logarithm: 10 log for power, 20 log for voltage.',
        },
      ],
    },
    {
      id: 'exam-traps',
      title: 'Element 3 exam traps',
      blocks: [
        {
          type: 'list',
          items: [
            'Convert mA to A and kΩ to Ω before substituting into Ohm’s law.',
            'Series current is the same everywhere; parallel voltage is the same everywhere.',
            'Capacitors in parallel add; capacitors in series use reciprocals.',
            'Inductors in series add; inductors in parallel use reciprocals.',
            'XL rises with frequency; XC falls with frequency.',
            'Resonance means XL = XC, not R = 0.',
            'Use P = I²R when current is known, P = V²/R when voltage is known.',
            'A voltmeter is parallel; an ammeter is series.',
            'An ohmmeter is used only on a de-energized circuit.',
            'The third resistor band is a multiplier, not a third digit.',
          ],
        },
        {
          type: 'callout',
          tone: 'key',
          title: 'Slow down on units',
          text: 'Most missed Element 3 items are not conceptual. They are unit conversions, reciprocal formulas, or a formula chosen from the wrong known values. Write the units next to every number before you calculate.',
        },
      ],
    },
  ],
}
