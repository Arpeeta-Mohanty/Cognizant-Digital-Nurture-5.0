import { createFeatureSelector, createSelector } from '@ngrx/store';
import { EnrollmentState, adapter } from './enrollment.reducer';

const selectEnrollmentState = createFeatureSelector<EnrollmentState>('enrollments');
const { selectAll, selectTotal } = adapter.getSelectors();

export const selectAllEnrollments = createSelector(selectEnrollmentState, selectAll);
export const selectTotalEnrollments = createSelector(selectEnrollmentState, selectTotal);
export const selectEnrollmentsLoading = createSelector(selectEnrollmentState, s => s.loading);
