import React from 'react';

function Heading({ children, style }) {
  return <h2 className={`heading ${style}`}>{children}</h2>;
}

export default Heading;
