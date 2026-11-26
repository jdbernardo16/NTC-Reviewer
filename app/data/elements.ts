export type ElementId = 2 | 3 | 4
export type LicenseTrack = 'D' | 'C'

export interface Question {
  id: string
  element: ElementId
  topic: string
  prompt: string
  choices: [string, string, string, string]
  answer: 0 | 1 | 2 | 3
  explanation: string
  ref?: string
}

export interface ElementMeta {
  id: ElementId
  slug: string
  code: string
  name: string
  shortName: string
  kicker: string
  description: string
  accent: 'signal' | 'teal' | 'gold'
  requiredFor: LicenseTrack[]
  topics: string[]
  badgeClass: string
  dotClass: string
  textClass: string
  softClass: string
  borderClass: string
}

export interface TrackMeta {
  id: LicenseTrack
  name: string
  label: string
  description: string
  elements: ElementId[]
  items: number
  minutes: number
}

export const EXAM_RULES = {
  itemsPerElement: 25,
  minutesPerElement: 40,
  passAverage: 70,
  elementFloor: 50,
} as const

export const ELEMENTS: ElementMeta[] = [
  {
    id: 2,
    slug: 'element-2',
    code: 'E2',
    name: 'Rules & Regulations',
    shortName: 'Rules',
    kicker: 'The Class D decider',
    description:
      'Radio law, licensing, station privileges, operating rules, and emergency procedure. This is the only written element required for a Class D license.',
    accent: 'signal',
    requiredFor: ['D', 'C'],
    topics: [
      'RA 3846 and NTC authority',
      'Licensing and renewal',
      'Call signs and districts',
      'Permits and station papers',
      'Operating and identification rules',
      'Emergency and distress traffic',
      'Amateur bands and privileges',
      'Penalties and inspection',
    ],
    badgeClass: 'bg-signal-100 text-signal-600',
    dotClass: 'bg-signal-500',
    textClass: 'text-signal-600',
    softClass: 'bg-signal-100',
    borderClass: 'border-signal-500',
  },
  {
    id: 3,
    slug: 'element-3',
    code: 'E3',
    name: 'Fundamentals of Electronics & Electricity',
    shortName: 'Fundamentals',
    kicker: 'The math element',
    description:
      'Ohm\u2019s law, power, series and parallel circuits, AC, reactance, resonance, components, and test instruments. The most formula-heavy part of the Class C exam.',
    accent: 'teal',
    requiredFor: ['C'],
    topics: [
      'Charge, current, voltage, resistance',
      'Ohm\u2019s law and power law',
      'Series and parallel circuits',
      'AC, frequency, and wavelength',
      'Reactance and impedance',
      'Resonance and tuned circuits',
      'Components and color codes',
      'Meters and measurements',
    ],
    badgeClass: 'bg-teal-500/10 text-teal-500',
    dotClass: 'bg-teal-500',
    textClass: 'text-teal-500',
    softClass: 'bg-teal-500/10',
    borderClass: 'border-teal-500',
  },
  {
    id: 4,
    slug: 'element-4',
    code: 'E4',
    name: 'Amateur Radio Practice',
    shortName: 'Practice',
    kicker: 'The station element',
    description:
      'Antennas, feedlines, SWR, station setup, operating procedure, interference, and safety. The practical bridge between the exam and your first contact.',
    accent: 'gold',
    requiredFor: ['C'],
    topics: [
      'Station setup and controls',
      'Antennas and feedlines',
      'SWR, ATUs, and dummy loads',
      'Modes and modulation',
      'Receivers and filters',
      'Interference and TVI',
      'Operating procedure and Q codes',
      'Electrical and RF safety',
    ],
    badgeClass: 'bg-gold-500/15 text-ink-800',
    dotClass: 'bg-gold-500',
    textClass: 'text-ink-700',
    softClass: 'bg-gold-500/15',
    borderClass: 'border-gold-500',
  },
]

export const TRACKS: TrackMeta[] = [
  {
    id: 'D',
    name: 'Class D',
    label: 'Foundation',
    description:
      'Element 2 only. VHF 144\u2013146 MHz, up to 50 W fixed and 10 W mobile or portable. The fastest path to a DY call sign.',
    elements: [2],
    items: 25,
    minutes: 40,
  },
  {
    id: 'C',
    name: 'Class C',
    label: 'Technician',
    description:
      'Elements 2, 3, and 4. Adds selected HF bands plus VHF/UHF, up to 100 W on VHF and 200 W PEP on HF. The usual first full license.',
    elements: [2, 3, 4],
    items: 75,
    minutes: 120,
  },
]

export const elementById = (id: ElementId) => ELEMENTS.find((element) => element.id === id)!
export const elementBySlug = (slug: string) => ELEMENTS.find((element) => element.slug === slug)
export const trackById = (id: LicenseTrack) => TRACKS.find((track) => track.id === id)!
