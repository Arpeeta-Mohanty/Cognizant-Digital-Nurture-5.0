// Course model used across all hands-on exercises
export interface Course {
  id: number;
  title: string;
  instructor: string;
  credits: number;
  category: string;
  description: string;
  enrolled: boolean;
  rating: number;
  duration: string;
}
