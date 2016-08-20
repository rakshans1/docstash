import React from 'react';
import {Link, IndexLink} from 'react-router';

const Header = () => {
  return(
    <nav className="navbar navbar-light">
      <img src={require('../../assets/img/logo.svg')}  className="brand-img" alt="" />
      <IndexLink to="/" className="navbar-brand ">Docstash</IndexLink>

      <div className="pull-xs-right">
        <Link to="login"><button className="hp-btn">LOGIN</button></Link>
      </div>
    </nav>
  );
};

export default Header;
