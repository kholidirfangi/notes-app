import React from 'react';

function CardFooter({ onDelete, onArchive }) {
  return (
    <div className="btn-action">
      <div className="delete" onClick={onDelete}>
        Delete
      </div>
      <div className="archive" onClick={onArchive}>
        Arsip
      </div>
    </div>
  );
}
export default CardFooter;
