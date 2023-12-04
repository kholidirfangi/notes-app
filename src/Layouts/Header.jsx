import React from 'react';
import NameApp from '../components/NameApp';
import Search from '../components/Search';

function Header({onChange}) {
  
    return (
      <div className="header">
        <NameApp />
        <Search onChange={onChange} />
      </div>
    );
  }

export default Header;
