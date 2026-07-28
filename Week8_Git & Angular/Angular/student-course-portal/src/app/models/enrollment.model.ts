// Enrollment model for form exercises
export interface Enrollment {
  id?: number;
  studentName: string;
  studentEmail: string;
  rollNumber: string;
  department: string;
  courseId: number;
  courseName: string;
  semester: number;
  enrollmentDate: string;
}
