import { createAction, props } from '@ngrx/store';
import { Course } from '../../models/course.model';

// Actions describe WHAT happened — they are dispatched to the store

// Load courses
export const loadCourses = createAction('[Course] Load Courses');
export const loadCoursesSuccess = createAction('[Course] Load Courses Success', props<{ courses: Course[] }>());
export const loadCoursesFailure = createAction('[Course] Load Courses Failure', props<{ error: string }>());

// Add course
export const addCourse = createAction('[Course] Add Course', props<{ course: Omit<Course, 'id'> }>());
export const addCourseSuccess = createAction('[Course] Add Course Success', props<{ course: Course }>());

// Update course
export const updateCourse = createAction('[Course] Update Course', props<{ id: number; changes: Partial<Course> }>());
export const updateCourseSuccess = createAction('[Course] Update Course Success', props<{ course: Course }>());

// Delete course
export const deleteCourse = createAction('[Course] Delete Course', props<{ id: number }>());
export const deleteCourseSuccess = createAction('[Course] Delete Course Success', props<{ id: number }>());

// Toggle enrollment
export const toggleEnrollment = createAction('[Course] Toggle Enrollment', props<{ id: number }>());

// Select course
export const selectCourse = createAction('[Course] Select Course', props<{ id: number | null }>());
