import { mergeWith } from 'lodash'

import { TCourse } from '@/shared/types/models/course'

// Merge Courses:
// Fallback to course when update is undefined/falsy
// To handle showing fallback array when update array is empty (because [] is truthy)
// u == false check is necessary
export const normalizeCourse = (course: TCourse, update: Partial<TCourse>) =>
  mergeWith(update, course, (u, c) => (u == false ? c : u))
