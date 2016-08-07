import React from 'react';
import {Link} from 'react-router';

class HomePage extends React.Component {
  render() {
    return(
      <div>
      <div className="homepage">
        <nav className="navbar navbar-light">
          <img src={require('../../assets/img/logo.svg')}  className="brand-img" alt="" />
          <a className="navbar-brand " href="/">DocStash</a>

          <div className="pull-xs-right">
            <a href=""><button className="hp-btn">LOGIN</button></a>
          </div>
        </nav>

      <div className="row">
        <div className="col-sm-12">
          <h1>Secure Cloud Storage</h1>
          <p>Register now and start using our service.</p>
          <Link to={'signup'}><button className="signup-btn">SIGN UP</button></Link>
          <img className="hp-img" src={require('../../assets/img/main.png')} alt="" />
        </div>
      </div>
      </div>
      <div className="row">
        <div className="col-sm-12">
          <h2 className="hp-features">Features</h2>
          <div className="row">
          <div className="col-sm-4">
            <img className="img-fluid hp-img-f" src={require('../../assets/img/home/4.png')} alt="" />
            <h3 className="hp-head">Pro Version</h3>
            <p className="hp-p">Get more space when needed with pro</p>
          </div>
          <div className="col-sm-4">
            <img className="img-fluid hp-img-f" src={require('../../assets/img/home/2.png')} alt="" />
            <h3 className="hp-head">Cloud Backup</h3>
            <p className="hp-p">Upload from any browser</p>
          </div>
          <div className="col-sm-4">
            <img className="img-fluid hp-img-f" src={require('../../assets/img/home/3.png')} alt="" />
            <h3 className="hp-head">Access Everywhere</h3>
            <p className="hp-p">Move everything to cloud seamlessly</p>
          </div>
        </div>
        </div>
      </div>
      <div className="row">
        <div className="col-sm-12">
          <img src={require('../../assets/img/home/crypto.png')}className="img-fluid hp-img-f" alt="" />
          <h2 className="hp-features">Get Top Level Cloud Encryption with DocStash Crypto</h2>
        </div>
      </div>

      <footer>
          <p className="foot-text">© DocStash 2016 All rights reserved.</p>
      </footer>
      </div>
    );
  }
}

export default HomePage;
