import React, { useState } from 'react';
import './Card.css';

const books = [
  { id: 1, title: 'Clean Code',            author: 'Robert C. Martin', available: true  },
  { id: 2, title: 'The Pragmatic Programmer', author: 'Andrew Hunt',   available: false },
  { id: 3, title: 'You Don\'t Know JS',    author: 'Kyle Simpson',     available: true  },
  { id: 4, title: 'Eloquent JavaScript',   author: 'Marijn Haverbeke', available: false },
];

function BookDetails() {
  const [showAll, setShowAll] = useState(true);

  // if-else via element variable
  let statusLabel;
  if (showAll) {
    statusLabel = <span className="badge badge-blue">Showing All Books</span>;
  } else {
    statusLabel = <span className="badge badge-green">Showing Available Only</span>;
  }

  const displayBooks = showAll ? books : books.filter((b) => b.available);

  return (
    <div className="section-card">
      <div className="section-header">
        <h2>📚 Book Details</h2>
        {/* Element variable */}
        {statusLabel}
        <button className="toggle-btn" onClick={() => setShowAll((p) => !p)}>
          {showAll ? 'Show Available Only' : 'Show All'}
        </button>
      </div>

      {/* map() with keys */}
      <div className="items-grid">
        {displayBooks.map((book) => (
          <div key={book.id} className="item-card">
            <h3>{book.title}</h3>
            <p className="sub">by {book.author}</p>
            {/* Ternary operator */}
            <span className={`badge ${book.available ? 'badge-green' : 'badge-red'}`}>
              {book.available ? '✅ Available' : '❌ Unavailable'}
            </span>
          </div>
        ))}
      </div>

      {/* Logical && */}
      {displayBooks.length === 0 && (
        <p className="empty-msg">No books match the current filter.</p>
      )}
    </div>
  );
}

export default BookDetails;
