import React from 'react';

function CardHeader({ titleNote, dateNote }) {
  return (
    <>
      <h3 className="titleNote">{titleNote}</h3>
      <p className="date">{dateNote}</p>
    </>
  );
}

export default CardHeader;
