import type { ElementId, Question } from '../elements'
import { element2Questions } from './element-2'
import { element3Questions } from './element-3'
import { element4Questions } from './element-4'

function hashSeed(value: string) {
  let hash = 2166136261
  for (let index = 0; index < value.length; index += 1) {
    hash ^= value.charCodeAt(index)
    hash = Math.imul(hash, 16777619)
  }
  return hash >>> 0
}

function mulberry32(seed: number) {
  let state = seed
  return () => {
    state += 0x6d2b79f5
    let value = state
    value = Math.imul(value ^ (value >>> 15), value | 1)
    value ^= value + Math.imul(value ^ (value >>> 7), value | 61)
    return ((value ^ (value >>> 14)) >>> 0) / 4294967296
  }
}

/**
 * Deterministically shuffles the choices for each question. The source bank is
 * written in a natural order (often with the correct answer first); shuffling at
 * module load keeps the on-screen and PDF order stable across SSR and hydration
 * without maintaining four hand-balanced copies of every item.
 */
function prepareQuestion(question: Question): Question {
  const random = mulberry32(hashSeed(question.id))
  const choices = question.choices.map((text, index) => ({
    text,
    correct: index === question.answer,
  }))

  for (let index = choices.length - 1; index > 0; index -= 1) {
    const swap = Math.floor(random() * (index + 1))
    ;[choices[index], choices[swap]] = [choices[swap]!, choices[index]!]
  }

  return {
    ...question,
    choices: choices.map((choice) => choice.text) as Question['choices'],
    answer: choices.findIndex((choice) => choice.correct) as Question['answer'],
  }
}

export const QUESTIONS: Question[] = [
  ...element2Questions,
  ...element3Questions,
  ...element4Questions,
].map(prepareQuestion)

const byId = new Map(QUESTIONS.map((question) => [question.id, question]))

export const questionById = (id: string) => byId.get(id)

export const questionsByElement = (element: ElementId) =>
  QUESTIONS.filter((question) => question.element === element)

export const bankCounts = {
  2: element2Questions.length,
  3: element3Questions.length,
  4: element4Questions.length,
} as const

export const bankTotal = QUESTIONS.length

if (import.meta.dev) {
  const seen = new Set<string>()
  for (const question of QUESTIONS) {
    if (seen.has(question.id)) {
      throw new Error(`Duplicate question id: ${question.id}`)
    }
    seen.add(question.id)
    if (question.choices.length !== 4) {
      throw new Error(`Question ${question.id} must have exactly four choices`)
    }
    if (question.answer < 0 || question.answer > 3) {
      throw new Error(`Question ${question.id} has an invalid answer index`)
    }
  }
}
