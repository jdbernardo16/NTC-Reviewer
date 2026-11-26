import type { ElementId, LicenseTrack, Question } from '~/data/elements'
import { EXAM_RULES, TRACKS, trackById } from '~/data/elements'
import { questionById, questionsByElement } from '~/data/questions'

export interface ExamConfig {
  name: string
  email: string
  track: LicenseTrack
  examDate: string
  location: string
}

export interface ElementAttempt {
  element: ElementId
  questionIds: string[]
  answers: Record<string, number | null>
  flagged: string[]
  cursor: number
  startedAt: number
  endsAt: number
  submittedAt: number | null
}

export interface ExamSession {
  version: 1
  config: ExamConfig
  elements: ElementAttempt[]
  current: number
  status: 'active' | 'complete'
  createdAt: number
}

export interface QuestionResult {
  questionId: string
  element: ElementId
  chosen: number | null
  correct: boolean
}

export interface ElementResult {
  element: ElementId
  correct: number
  total: number
  answered: number
  percent: number
  floorPassed: boolean
  passed: boolean
  timeUsedSec: number
}

export interface WeakTopic {
  topic: string
  wrong: number
  total: number
}

export type ExamOutcome = 'pass' | 'fail' | 'class-d-eligible'

export interface ExamResult {
  version: 1
  config: ExamConfig
  track: LicenseTrack
  completedAt: string
  elements: ElementResult[]
  overall: number
  outcome: ExamOutcome
  durationSec: number
  questionResults: QuestionResult[]
  weakTopics: WeakTopic[]
}

export const SESSION_KEY = 'ntc-reviewer:session:v1'
export const RESULT_KEY = 'ntc-reviewer:result:v1'

export const elementMinutes = EXAM_RULES.minutesPerElement

export function shuffle<T>(items: readonly T[]): T[] {
  const copy = [...items]
  for (let index = copy.length - 1; index > 0; index -= 1) {
    const swap = Math.floor(Math.random() * (index + 1))
    ;[copy[index], copy[swap]] = [copy[swap]!, copy[index]!]
  }
  return copy
}

export function pickQuestions(element: ElementId, count = EXAM_RULES.itemsPerElement): Question[] {
  return shuffle(questionsByElement(element)).slice(0, count)
}

export function buildSession(config: ExamConfig): ExamSession {
  const track = trackById(config.track)
  const now = Date.now()
  const elements: ElementAttempt[] = track.elements.map((element, index) => {
    const selected = pickQuestions(element)
    return {
      element,
      questionIds: selected.map((question) => question.id),
      answers: Object.fromEntries(selected.map((question) => [question.id, null])),
      flagged: [],
      cursor: 0,
      startedAt: index === 0 ? now : 0,
      endsAt: index === 0 ? now + elementMinutes * 60 * 1000 : 0,
      submittedAt: null,
    }
  })

  return {
    version: 1,
    config,
    elements,
    current: 0,
    status: 'active',
    createdAt: now,
  }
}

export function startElement(session: ExamSession, index: number): ExamSession {
  const element = session.elements[index]
  if (!element) return session
  if (element.startedAt && element.endsAt) return session

  const now = Date.now()
  element.startedAt = now
  element.endsAt = now + elementMinutes * 60 * 1000
  session.current = index
  return session
}

export function scoreSession(session: ExamSession): ExamResult {
  const questionResults: QuestionResult[] = []
  const topicTotals = new Map<string, { wrong: number; total: number }>()

  const elements: ElementResult[] = session.elements.map((attempt) => {
    let correct = 0
    let answered = 0

    for (const questionId of attempt.questionIds) {
      const question = questionById(questionId)
      if (!question) continue
      const chosen = attempt.answers[questionId] ?? null
      const isCorrect = chosen === question.answer
      if (chosen !== null) answered += 1
      if (isCorrect) correct += 1
      questionResults.push({
        questionId,
        element: attempt.element,
        chosen,
        correct: isCorrect,
      })

      const topic = topicTotals.get(question.topic) ?? { wrong: 0, total: 0 }
      topic.total += 1
      if (!isCorrect) topic.wrong += 1
      topicTotals.set(question.topic, topic)
    }

    const total = attempt.questionIds.length
    const percent = total > 0 ? Math.round((correct / total) * 100) : 0
    return {
      element: attempt.element,
      correct,
      total,
      answered,
      percent,
      floorPassed: percent >= EXAM_RULES.elementFloor,
      passed: percent >= EXAM_RULES.passAverage,
      timeUsedSec: attempt.submittedAt
        ? Math.max(0, Math.round((attempt.submittedAt - attempt.startedAt) / 1000))
        : 0,
    }
  })

  const overall =
    elements.length > 0
      ? Math.round(elements.reduce((sum, element) => sum + element.percent, 0) / elements.length)
      : 0

  const floorsPassed = elements.every((element) => element.floorPassed)
  const passed = overall >= EXAM_RULES.passAverage && floorsPassed
  const elementTwo = elements.find((element) => element.element === 2)
  const eligibleForD =
    session.config.track === 'C' &&
    !passed &&
    elementTwo !== undefined &&
    elementTwo.percent >= EXAM_RULES.elementFloor

  const outcome: ExamOutcome = passed ? 'pass' : eligibleForD ? 'class-d-eligible' : 'fail'

  const weakTopics: WeakTopic[] = [...topicTotals.entries()]
    .map(([topic, value]) => ({ topic, ...value }))
    .filter((topic) => topic.wrong > 0)
    .sort((a, b) => b.wrong - a.wrong || b.wrong / b.total - a.wrong / a.total)
    .slice(0, 6)

  return {
    version: 1,
    config: session.config,
    track: session.config.track,
    completedAt: new Date().toISOString(),
    elements,
    overall,
    outcome,
    durationSec: elements.reduce((sum, element) => sum + element.timeUsedSec, 0),
    questionResults,
    weakTopics,
  }
}

export function formatDuration(seconds: number): string {
  const safe = Math.max(0, Math.round(seconds))
  const hours = Math.floor(safe / 3600)
  const minutes = Math.floor((safe % 3600) / 60)
  const secs = safe % 60
  if (hours > 0) return `${hours}h ${minutes}m`
  return `${minutes}m ${secs.toString().padStart(2, '0')}s`
}

export function formatClock(seconds: number): string {
  const safe = Math.max(0, Math.ceil(seconds))
  const minutes = Math.floor(safe / 60)
  const secs = safe % 60
  return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
}

export function trackLabel(track: LicenseTrack): string {
  return TRACKS.find((item) => item.id === track)?.name ?? track
}

export function loadSession(): ExamSession | null {
  if (!import.meta.client) return null
  try {
    const raw = window.localStorage.getItem(SESSION_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw) as ExamSession
    if (parsed?.version !== 1 || !Array.isArray(parsed.elements)) return null
    return parsed
  } catch {
    return null
  }
}

export function saveSession(session: ExamSession) {
  if (!import.meta.client) return
  try {
    window.localStorage.setItem(SESSION_KEY, JSON.stringify(session))
  } catch {
    // Storage can fail in private mode or when the quota is full. The exam still works in memory.
  }
}

export function clearSession() {
  if (!import.meta.client) return
  window.localStorage.removeItem(SESSION_KEY)
}

export function loadResult(): ExamResult | null {
  if (!import.meta.client) return null
  try {
    const raw = window.localStorage.getItem(RESULT_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw) as ExamResult
    if (parsed?.version !== 1 || !Array.isArray(parsed.elements)) return null
    return parsed
  } catch {
    return null
  }
}

export function saveResult(result: ExamResult) {
  if (!import.meta.client) return
  try {
    window.localStorage.setItem(RESULT_KEY, JSON.stringify(result))
  } catch {
    // Ignore quota errors; the result page still has the in-memory value.
  }
}
