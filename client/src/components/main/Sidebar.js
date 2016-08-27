import React from 'react';
import {IndexLink, Link} from 'react-router';
import Icon from '../icon';

class Sidebar extends React.Component{
  constructor(props){
    super(props);
  }
  render() {
    return(
      <div className="col-sm-2 sidebar">
      <p className="sidebar-text">MAIN MENU</p>
      <ul className="nav nav-sidebar sidebar-ul">
        <li className="sidebar-li"><IndexLink className="sidebar-a" activeClassName="active" to="/"><i className="flaticon-folder-2"/>Library</IndexLink></li>
        <li className="sidebar-li"><a className="sidebar-a" href="recent.html"><i className="flaticon-square"/>Recent</a></li>
      </ul>
      <p className="sidebar-text">FILTER BY</p>
      <ul className="nav nav-sidebar sidebar-ul">
        <li className="sidebar-li"><a  className="sidebar-a" href="documents.html"><i className="flaticon-interface"/>Documents</a></li>
        <li className="sidebar-li"><a  className="sidebar-a"href="videos.html"><i className="flaticon-multimedia"/>Videos</a></li>
        <li className="sidebar-li"><a  className="sidebar-a" href="music.html"><i className="flaticon-music"/>Music</a></li>
        <li className="sidebar-li"><a className="sidebar-a" href="images.html"><i className="flaticon-photo"/>Images</a></li>
      </ul>
      <p className="sidebar-text">Extra</p>
      <ul className="nav nav-sidebar sidebar-ul">
        <li className="sidebar-li"><Link  className="sidebar-a" activeClassName="active" to="/short"><i className="flaticon-link"/>Link Shortner</Link></li>
      </ul>
      <div className="usage">
        <p className="usage-use">USAGE</p>
        <progress className="progress" value="50" max="100">5%</progress>
        <p className="usage-capacity"> 5GB / 10GB</p>
      </div>
    </div>
    );
  }
}
export default Sidebar;
