import { TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { CourseService } from './course.service';
import { Course } from '../models/course.model';

describe('CourseService', () => {
  let service: CourseService;
  let httpMock: HttpTestingController;

  const mockCourses: Course[] = [
    { id: 1, title: 'Angular Fundamentals', instructor: 'John', credits: 4, category: 'Frontend', description: 'Learn Angular', enrolled: false, rating: 4.8, duration: '40h' },
    { id: 2, title: 'Spring Boot', instructor: 'Jane', credits: 3, category: 'Backend', description: 'Build APIs', enrolled: true, rating: 4.6, duration: '35h' }
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CourseService,
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    });
    service = TestBed.inject(CourseService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    // Verify no unexpected HTTP requests were made
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should GET all courses', () => {
    service.getCourses().subscribe(courses => {
      expect(courses.length).toBe(2);
      expect(courses[0].title).toBe('Angular Fundamentals');
    });

    // Expect one GET request to the courses URL
    const req = httpMock.expectOne('http://localhost:3000/courses');
    expect(req.request.method).toBe('GET');
    req.flush(mockCourses);
  });

  it('should GET course by ID', () => {
    service.getCourseById(1).subscribe(course => {
      expect(course?.title).toBe('Angular Fundamentals');
    });

    const req = httpMock.expectOne('http://localhost:3000/courses/1');
    expect(req.request.method).toBe('GET');
    req.flush(mockCourses[0]);
  });

  it('should POST a new course', () => {
    const newCourse = { title: 'New Course', instructor: 'Bob', credits: 3, category: 'Cloud', description: 'Cloud basics', enrolled: false, rating: 4.5, duration: '30h' };

    service.createCourse(newCourse).subscribe(course => {
      expect(course.id).toBe(3);
      expect(course.title).toBe('New Course');
    });

    const req = httpMock.expectOne('http://localhost:3000/courses');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(newCourse);
    req.flush({ ...newCourse, id: 3 });
  });

  it('should PUT (update) a course', () => {
    const update = { title: 'Updated Angular' };

    service.updateCourse(1, update).subscribe(course => {
      expect(course.title).toBe('Updated Angular');
    });

    const req = httpMock.expectOne('http://localhost:3000/courses/1');
    expect(req.request.method).toBe('PUT');
    req.flush({ ...mockCourses[0], ...update });
  });

  it('should DELETE a course', () => {
    service.deleteCourse(1).subscribe(() => {
      // Deletion successful
    });

    const req = httpMock.expectOne('http://localhost:3000/courses/1');
    expect(req.request.method).toBe('DELETE');
    req.flush(null);
  });

  it('should fall back to seed data on HTTP error', () => {
    service.getCourses().subscribe(courses => {
      // Should return seed data (6 courses) when server is offline
      expect(courses.length).toBeGreaterThan(0);
    });

    const req = httpMock.expectOne('http://localhost:3000/courses');
    req.error(new ProgressEvent('Network error'));
  });

  it('should toggle enrollment locally', () => {
    // Seed data has course id=1 with enrolled=false
    service.toggleEnrollment(1);
    const courses = service.getLocalCourses();
    const course = courses.find(c => c.id === 1);
    expect(course?.enrolled).toBe(true);
  });
});
