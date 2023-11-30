import React from 'react';
import CardHeader from './CardHeader';
import CardBody from './CardBody';
import CardFooter from './CardFooter';

function Card({id, title, date, content, onDelete, onArchive}) {
  return (
    <div className="card" key={id}>
      <CardHeader titleNote={title} dateNote={date} />
      <CardBody content={content} />
      <CardFooter onDelete={onDelete} onArchive={onArchive}/>
    </div>
  );
}

export default Card;
