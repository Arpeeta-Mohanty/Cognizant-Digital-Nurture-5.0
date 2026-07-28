import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';
import { unsavedChangesGuard } from './guards/unsaved-changes.guard';

// Hands-On 7: Routing with lazy loading, guards, and route params
export const routes: Routes = [
  {
    path: '',
    // Lazy loading: component is loaded only when the route is visited
    loadComponent: () => import('./components/home/home.component').then(m => m.HomeComponent),
    title: 'Home — Student Course Portal'
  },
  {
    path: 'courses',
    loadComponent: () => import('./components/course-list/course-list.component').then(m => m.CourseListComponent),
    title: 'Courses'
  },
  {
    path: 'courses/:id',
    // Route parameter :id is accessed via ActivatedRoute.paramMap
    loadComponent: () => import('./components/course-detail/course-detail.component').then(m => m.CourseDetailComponent),
    title: 'Course Detail'
  },
  {
    path: 'profile',
    loadComponent: () => import('./components/student-profile/student-profile.component').then(m => m.StudentProfileComponent),
    // authGuard: only authenticated users can access this route
    canActivate: [authGuard],
    title: 'My Profile'
  },
  {
    path: 'enrollment',
    loadComponent: () => import('./components/enrollment-form/enrollment-form.component').then(m => m.EnrollmentFormComponent),
    // unsavedChangesGuard: warns user before leaving with unsaved form data
    canDeactivate: [unsavedChangesGuard],
    title: 'Enrollment Form'
  },
  {
    path: 'reactive-form',
    loadComponent: () => import('./components/reactive-form/reactive-form.component').then(m => m.ReactiveFormComponent),
    canDeactivate: [unsavedChangesGuard],
    title: 'Reactive Form'
  },
  {
    // Wildcard route — must be last
    path: '**',
    loadComponent: () => import('./components/not-found/not-found.component').then(m => m.NotFoundComponent),
    title: '404 Not Found'
  }
];
