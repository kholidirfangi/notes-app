import React from 'react';

function CardHeader({ titleNote, createdAt }) {
  return (
    <div>
      <h3 className="titleNote">{titleNote}</h3>
      <p className="date">{createdAt}</p>
    </div>
  );
}

export default CardHeader;
