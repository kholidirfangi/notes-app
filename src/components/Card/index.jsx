import React from 'react';
import CardHeader from './CardHeader';
import CardBody from './CardBody';
import CardFooter from './CardFooter';
import { showFormattedDate } from '../../utils';

function Card({ id, title, createdAt, body, onDelete, onClick, children }) {
  return (
    <div className="card" key={id}>
      <div>
        <CardHeader
          titleNote={title}
          createdAt={showFormattedDate(createdAt)}
        />
        <CardBody content={body} />
      </div>
      <CardFooter onDelete={onDelete} onClick={onClick}>
        {children}
      </CardFooter>
    </div>
  );
}

export default Card;
