import React, {PropTypes} from 'react';
import {Link, IndexLink} from 'react-router';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as userActions from '../../actions/userActions';

class Header extends React.Component {
  constructor(props) {
    super(props);
  }
  componentWillMount() {
    this.props.actions.userInfo();
  }

  render() {
    let picture = this.props.user.picture;
    return(
      <div>
      <nav className="navbar navbar-light">
        <img src={require('../../assets/img/logo.png')} className="brand-img" alt=""/>
        <IndexLink className="navbar-brand brand" to="/">Docstash</IndexLink>
        <form className="form-inline pull-xs-center">
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
                <li className="sidebar-li"><i className="active flaticon-folder-2"/><a className="sidebar-a active" href="/">Library</a></li>
                <li className="sidebar-li"><i className="flaticon-square"/><a className="sidebar-a" href="recent.html">Recent</a></li>
              </ul>
              <p className="sidebar-text">FILTER BY</p>
              <ul className="nav nav-sidebar sidebar-ul">
                <li className="sidebar-li"><i className="flaticon-interface"/><a  className="sidebar-a" href="documents.html">Documents</a></li>
                <li className="sidebar-li"><i className="flaticon-multimedia"/><a  className="sidebar-a"href="videos.html">Videos</a></li>
                <li className="sidebar-li"><i className="flaticon-music"/><a  className="sidebar-a" href="music.html">Music</a></li>
                <li className="sidebar-li"><i className="flaticon-photo"/><a className="sidebar-a" href="images.html">Images</a></li>
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
  actions: PropTypes.object.isRequired,
};
function mapStateToProps(state) {
  return{ user: state.user };
}
function mapDispatchToProp(dispatch) {
  return {
    actions: bindActionCreators(userActions, dispatch)
  };
}
export default connect(mapStateToProps, mapDispatchToProp)(Header);
