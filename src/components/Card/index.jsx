import React from 'react';
import CardHeader from './CardHeader';
import CardBody from './CardBody';
import CardFooter from './CardFooter';

function Card({ id, title, date, content, onDelete, onClick, children }) {
  return (
    <div className="card" key={id}>
      <CardHeader titleNote={title} dateNote={date} />
      <CardBody content={content} />
      <CardFooter onDelete={onDelete} onClick={onClick}>
        {children}
      </CardFooter>
    </div>
  );
}

export default Card;
