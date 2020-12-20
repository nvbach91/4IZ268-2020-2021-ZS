import React from 'react';

import './navbar.scss';

export const Navbar = () => {
  return (
    <div className="headerWrapper">
      <span className="logo"><a href="./">Shortify</a></span>
      <nav>
        <a href="./">Create link</a>
        <a href="./list">Find your path</a>
        <a href="./about">About Shortify</a>
      </nav>
    </div>
  )
}
