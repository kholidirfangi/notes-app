import React from 'react';

function CardHeader({ titleNote, dateNote }) {
  return (
    <div>
      <h3 className="titleNote">{titleNote}</h3>
      <p className="date">{dateNote}</p>
    </div>
  );
}

export default CardHeader;
