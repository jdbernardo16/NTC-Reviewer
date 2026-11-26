import { element2Lesson } from './element-2'
import { element3Lesson } from './element-3'
import { element4Lesson } from './element-4'
import type { ElementId } from '../elements'
import type { Lesson } from '../lesson-types'

export const LESSONS: Record<ElementId, Lesson> = {
  2: element2Lesson,
  3: element3Lesson,
  4: element4Lesson,
}

export const lessonByElement = (element: ElementId) => LESSONS[element]
