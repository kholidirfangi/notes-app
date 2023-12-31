import React from 'react';

function CardFooter({ onDelete, onClick, children }) {
  return (
    <div className="btn-action">
      <div className="delete" onClick={onDelete}>
        Hapus
      </div>
      <div className="archive" onClick={onClick}>
        {children}
      </div>
    </div>
  );
}
export default CardFooter;
