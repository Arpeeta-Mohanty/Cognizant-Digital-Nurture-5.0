// Student model used across all hands-on exercises
export interface Student {
  id: number;
  name: string;
  email: string;
  rollNumber: string;
  department: string;
  semester: number;
  enrolledCourses: number[];
  gpa: number;
}
