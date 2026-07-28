import React, { useState } from 'react';
import './Card.css';

const blogs = [
  { id: 1, title: 'Getting Started with React 18', category: 'React',      published: true  },
  { id: 2, title: 'Understanding Hooks in Depth',  category: 'React',      published: true  },
  { id: 3, title: 'CSS Grid vs Flexbox',           category: 'CSS',        published: false },
  { id: 4, title: 'Node.js Best Practices',        category: 'Node.js',    published: true  },
];

function BlogDetails() {
  const [filter, setFilter] = useState('all');

  // if-else for filter label
  let filterLabel;
  if (filter === 'all')       filterLabel = 'All Blogs';
  else if (filter === 'published') filterLabel = 'Published Blogs';
  else                        filterLabel = 'Draft Blogs';

  const displayed = blogs.filter((b) => {
    if (filter === 'published') return b.published;
    if (filter === 'draft')     return !b.published;
    return true;
  });

  return (
    <div className="section-card">
      <div className="section-header">
        <h2>✍️ Blog Details</h2>
        <span className="badge badge-blue">{filterLabel}</span>
      </div>

      <div className="filter-row">
        {['all', 'published', 'draft'].map((f) => (
          <button
            key={f}
            className={`filter-btn ${filter === f ? 'active' : ''}`}
            onClick={() => setFilter(f)}
          >
            {f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>

      {/* map() with keys */}
      <div className="items-grid">
        {displayed.map((blog) => (
          <div key={blog.id} className="item-card">
            <h3>{blog.title}</h3>
            <p className="sub">Category: {blog.category}</p>
            {/* Ternary operator */}
            <span className={`badge ${blog.published ? 'badge-green' : 'badge-orange'}`}>
              {blog.published ? '🟢 Published' : '🟡 Draft'}
            </span>
          </div>
        ))}
      </div>

      {/* Logical && */}
      {displayed.length === 0 && <p className="empty-msg">No blogs in this category.</p>}
    </div>
  );
}

export default BlogDetails;
