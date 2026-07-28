import React, { useState } from 'react';
import BookDetails from './components/BookDetails';
import BlogDetails from './components/BlogDetails';
import CourseDetails from './components/CourseDetails';
import './App.css';

function App() {
  const [activeTab, setActiveTab] = useState('books');

  return (
    <div className="app-container">
      <h1 className="main-title">📝 Blogger App — HOL 13</h1>

      {/* Tab Navigation */}
      <div className="tab-bar">
        {['books', 'blogs', 'courses'].map((tab) => (
          <button
            key={tab}
            className={`tab-btn ${activeTab === tab ? 'active' : ''}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab === 'books' ? '📚 Books' : tab === 'blogs' ? '✍️ Blogs' : '🎓 Courses'}
          </button>
        ))}
      </div>

      {/* Conditional rendering using if-else (element variable) */}
      <div className="tab-content">
        {activeTab === 'books'   && <BookDetails />}
        {activeTab === 'blogs'   && <BlogDetails />}
        {activeTab === 'courses' && <CourseDetails />}
      </div>
    </div>
  );
}

export default App;
