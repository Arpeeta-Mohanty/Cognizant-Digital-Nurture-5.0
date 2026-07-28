import { createReducer, on } from '@ngrx/store';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Enrollment } from '../../models/enrollment.model';
import * as EnrollmentActions from './enrollment.actions';

export const adapter: EntityAdapter<Enrollment> = createEntityAdapter<Enrollment>();

export interface EnrollmentState extends EntityState<Enrollment> {
  loading: boolean;
  error: string | null;
}

const initialState: EnrollmentState = adapter.getInitialState({
  loading: false,
  error: null
});

export const enrollmentReducer = createReducer(
  initialState,
  on(EnrollmentActions.loadEnrollments, state => ({ ...state, loading: true })),
  on(EnrollmentActions.loadEnrollmentsSuccess, (state, { enrollments }) =>
    adapter.setAll(enrollments, { ...state, loading: false })
  ),
  on(EnrollmentActions.loadEnrollmentsFailure, (state, { error }) =>
    ({ ...state, loading: false, error })
  ),
  on(EnrollmentActions.addEnrollmentSuccess, (state, { enrollment }) =>
    adapter.addOne(enrollment, state)
  ),
  on(EnrollmentActions.removeEnrollmentSuccess, (state, { id }) =>
    adapter.removeOne(id, state)
  )
);
