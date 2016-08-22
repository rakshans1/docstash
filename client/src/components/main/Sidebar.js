import React from 'react';

class Sidebar extends React.Component{
  constructor(props){
    super(props);
  }
  render() {
    return(
      <div className="col-sm-2 sidebar">
      <p className="sidebar-text">MAIN MENU</p>
      <ul className="nav nav-sidebar sidebar-ul">
        <li className="sidebar-li"><i className="active flaticon-folder-2"></i><a className="sidebar-a" href="/">Library</a></li>
        <li className="sidebar-li"><i className="flaticon-square"></i><a className="sidebar-a" href="recent.html">Recent</a></li>
      </ul>
      <p className="sidebar-text">FILTER BY</p>
      <ul className="nav nav-sidebar sidebar-ul">
        <li className="sidebar-li"><i className="flaticon-interface"></i><a  className="sidebar-a" href="documents.html">Documents</a></li>
        <li className="sidebar-li"><i className="flaticon-multimedia"></i><a  className="sidebar-a"href="videos.html">Videos</a></li>
        <li className="sidebar-li"><i className="flaticon-music"></i><a  className="sidebar-a" href="music.html">Music</a></li>
        <li className="sidebar-li"><i className="flaticon-photo"></i><a className="sidebar-a" href="images.html">Images</a></li>
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
