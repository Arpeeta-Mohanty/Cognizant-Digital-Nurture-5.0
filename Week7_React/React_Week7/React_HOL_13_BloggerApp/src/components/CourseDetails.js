import React, { useState } from 'react';
import './Card.css';

const courses = [
  { id: 1, title: 'React 18 Complete Guide',  instructor: 'John Doe',    enrolled: 320, free: false },
  { id: 2, title: 'JavaScript Fundamentals',  instructor: 'Jane Smith',  enrolled: 540, free: true  },
  { id: 3, title: 'Node.js & Express',        instructor: 'Bob Wilson',  enrolled: 210, free: false },
  { id: 4, title: 'HTML & CSS Basics',        instructor: 'Alice Brown', enrolled: 890, free: true  },
];

function CourseDetails() {
  const [showFreeOnly, setShowFreeOnly] = useState(false);

  const displayed = showFreeOnly ? courses.filter((c) => c.free) : courses;

  return (
    <div className="section-card">
      <div className="section-header">
        <h2>🎓 Course Details</h2>
        {/* Logical && — only show badge when filter is active */}
        {showFreeOnly && <span className="badge badge-green">Free Courses Only</span>}
        <button className="toggle-btn" onClick={() => setShowFreeOnly((p) => !p)}>
          {showFreeOnly ? 'Show All' : 'Free Only'}
        </button>
      </div>

      {/* map() with keys */}
      <div className="items-grid">
        {displayed.map((course) => (
          <div key={course.id} className="item-card">
            <h3>{course.title}</h3>
            <p className="sub">👨‍🏫 {course.instructor}</p>
            <p className="sub">👥 {course.enrolled} enrolled</p>
            {/* Ternary operator */}
            <span className={`badge ${course.free ? 'badge-green' : 'badge-blue'}`}>
              {course.free ? '🆓 Free' : '💳 Paid'}
            </span>
          </div>
        ))}
      </div>

      {/* Logical && */}
      {displayed.length === 0 && <p className="empty-msg">No courses available.</p>}
    </div>
  );
}

export default CourseDetails;
