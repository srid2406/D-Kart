import React from 'react';
import { slide as Menu } from 'react-burger-menu';

export default props => {
  return (
    <Menu>
      <a className="menu-item" href="/">
        Home
      </a>
      <hr />
      <a className="menu-item" href="#orders">
        My Orders
      </a>
      <hr />

      <a className="menu-item" href="#profile">
        Profile
      </a>
      <hr />

      {/* <a className="menu-item" href="/faq">
        FAQ
      </a> */}
    </Menu>
  );
}

