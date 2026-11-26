import type { ElementId } from './elements'

export type LessonBlock =
  | { type: 'p'; text: string }
  | { type: 'list'; items: string[] }
  | { type: 'steps'; items: string[] }
  | { type: 'table'; head: string[]; rows: string[][]; caption?: string }
  | { type: 'formula'; label: string; expression: string; note?: string }
  | { type: 'callout'; tone: 'key' | 'trap' | 'note'; title: string; text: string }
  | { type: 'terms'; items: { term: string; def: string }[] }

export interface LessonSection {
  id: string
  title: string
  blocks: LessonBlock[]
}

export interface Lesson {
  element: ElementId
  intro: string
  examNote: string
  sections: LessonSection[]
}
