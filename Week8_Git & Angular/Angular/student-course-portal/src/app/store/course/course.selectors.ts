import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CourseState, adapter } from './course.reducer';

// Feature selector gets the 'courses' slice of the global state
const selectCourseState = createFeatureSelector<CourseState>('courses');

// Entity adapter provides selectAll, selectEntities, selectIds, selectTotal
const { selectAll, selectEntities, selectTotal } = adapter.getSelectors();

export const selectAllCourses = createSelector(selectCourseState, selectAll);
export const selectCourseEntities = createSelector(selectCourseState, selectEntities);
export const selectTotalCourses = createSelector(selectCourseState, selectTotal);
export const selectCoursesLoading = createSelector(selectCourseState, s => s.loading);
export const selectCoursesError = createSelector(selectCourseState, s => s.error);
export const selectSelectedCourseId = createSelector(selectCourseState, s => s.selectedCourseId);

export const selectSelectedCourse = createSelector(
  selectCourseEntities,
  selectSelectedCourseId,
  (entities, id) => (id != null ? entities[id] : null)
);

export const selectEnrolledCourses = createSelector(
  selectAllCourses,
  courses => courses.filter(c => c.enrolled)
);

export const selectCoursesByCategory = (category: string) => createSelector(
  selectAllCourses,
  courses => courses.filter(c => c.category === category)
);
