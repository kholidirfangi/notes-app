import React from 'react';
import NameApp from '../components/NameApp';
import Search from '../components/Search';

class Header extends React.Component {
    constructor(props) {
        super(props);

        
    }

  render() {
    return (
      <div className="header">
        <NameApp />
        <Search />
      </div>
    );
  }
}

export default Header;
