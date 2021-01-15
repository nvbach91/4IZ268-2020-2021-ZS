import React from 'react';
import { Link } from 'react-router-dom';

import './navbar.scss';

export const Navbar = () => {
  return (
    <div className="headerWrapper">
      <span className="logo"><a href="./">Shortify</a></span>
      <nav>
        <Link to="./" >Create links</Link>
        <Link to="./list" >Find your path</Link>
        <Link to="./about" >About Shortify</Link>
      </nav>
    </div>
  )
}
