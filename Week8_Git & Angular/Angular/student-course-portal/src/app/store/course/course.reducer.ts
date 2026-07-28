import { createReducer, on } from '@ngrx/store';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Course } from '../../models/course.model';
import * as CourseActions from './course.actions';

// EntityAdapter provides CRUD helpers for normalized entity collections
export const adapter: EntityAdapter<Course> = createEntityAdapter<Course>();

export interface CourseState extends EntityState<Course> {
  loading: boolean;
  error: string | null;
  selectedCourseId: number | null;
}

const initialState: CourseState = adapter.getInitialState({
  loading: false,
  error: null,
  selectedCourseId: null
});

// Reducer is a pure function: (state, action) => newState
export const courseReducer = createReducer(
  initialState,

  on(CourseActions.loadCourses, state => ({ ...state, loading: true, error: null })),

  on(CourseActions.loadCoursesSuccess, (state, { courses }) =>
    adapter.setAll(courses, { ...state, loading: false })
  ),

  on(CourseActions.loadCoursesFailure, (state, { error }) =>
    ({ ...state, loading: false, error })
  ),

  on(CourseActions.addCourseSuccess, (state, { course }) =>
    adapter.addOne(course, state)
  ),

  on(CourseActions.updateCourseSuccess, (state, { course }) =>
    adapter.updateOne({ id: course.id, changes: course }, state)
  ),

  on(CourseActions.deleteCourseSuccess, (state, { id }) =>
    adapter.removeOne(id, state)
  ),

  on(CourseActions.toggleEnrollment, (state, { id }) => {
    const course = state.entities[id];
    if (!course) return state;
    return adapter.updateOne({ id, changes: { enrolled: !course.enrolled } }, state);
  }),

  on(CourseActions.selectCourse, (state, { id }) =>
    ({ ...state, selectedCourseId: id })
  )
);
