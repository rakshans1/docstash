import React, {PropTypes} from 'react';
import {Link, IndexLink} from 'react-router';
import {connect} from 'react-redux';
import Icon from '../icon'

class Header extends React.Component {
  // constructor(props) {
  //   super(props);
  // }
  render() {
    let picture = this.props.user.picture;
    return(
      <div>
      <nav className="navbar nav-shadow navbar-light">
        <div className="brand-img"><Icon type="logo"/></div>
        <IndexLink className="navbar-brand brand" to="/">Docstash</IndexLink>
        <form className="form-inline pull-xs-center search-form">
          <div className="form-group search">
              <img src={require('../../assets/icon/search.svg')} className="search-icon" alt="" />
              <i className="fa fa-search search-icon" />
              <input type="text" className="form-control search-input" />
            </div>
        </form>
        <div className="avatar">
          <img className="avatar-image" src={picture} alt=""/>
          {/* <i className="arrow-down avatar-drop" aria-hidden="true" /> */}
          <ul className="dropdowns">
            <li><a href="#">Setting</a></li>
            <li><Link to="/signout">Logout</Link></li>
          </ul>
        </div>
      </nav>

      <div className="col-sm-12">
        <div className="side-nav" >
          <div id="menuToggle">

            <input type="checkbox" />


            <span/>
            <span/>
            <span/>

            <ul id="menu">

              <p className="sidebar-text">MAIN MENU</p>
              <ul className="nav nav-sidebar sidebar-ul">
                <li className="sidebar-li"><i className="active flaticon-folder-2"/><Link className="sidebar-a"  to="/" activeClassName="active">Library</Link></li>
                <li className="sidebar-li"><i className="flaticon-square"/><Link className="sidebar-a"  to="recent">Recent</Link></li>
              </ul>
              <p className="sidebar-text">FILTER BY</p>
              <ul className="nav nav-sidebar sidebar-ul">
                <li className="sidebar-li"><Link className="sidebar-a"  to="documents" activeClassName="active"><i className="flaticon-interface"/> Documents</Link></li>
                <li className="sidebar-li"><Link className="sidebar-a"  to="videos" activeClassName="active"><i className="flaticon-multimedia"/> Videos</Link></li>
                <li className="sidebar-li"><Link className="sidebar-a"  to="music" activeClassName="active"><i className="flaticon-music"/> Music</Link></li>
                <li className="sidebar-li"><Link className="sidebar-a"   to="images" activeClassName="active"><i className="flaticon-photo"/> Images</Link></li>
              </ul>
              <p className="sidebar-text">Extra</p>
              <ul className="nav nav-sidebar sidebar-ul">
                <li className="sidebar-li"><Link to="/short" className="sidebar-a" activeClassName="active" ><i className="flaticon-link"/> Shortner</Link></li>
              </ul>



            </ul>
          </div>
        </div>
      </div>
      </div>
    );
  }
}
Header.defaultProps = {
  user: {
    picture: ''
  }
}
Header.propTypes = {
  user: PropTypes.object.isRequired,
};
function mapStateToProps(state) {
  return{ user: state.user };
}
export default connect(mapStateToProps)(Header);
