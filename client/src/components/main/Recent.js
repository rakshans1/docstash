import React from 'react';

class Recent extends React.Component{
  constructor(props) {
    super(props);
  }
  render() {
    return(
      <div className="col-sm-2 recent">
        <p  className="recent-heading">RECENT ACTIVITY</p>
        <div className="recent-activity">
            <i className="flaticon flaticon-draw edit"></i>
            <p className="recent-activity-event">You edited the file</p>
            <p className="recent-activity-filename">Image1.jpg</p>
            <p className="rececnt-activity-time">2 hours ago</p>
        </div>

        <div className="recent-activity">
            <i className="flaticon flaticon-file-1 delete"></i>
            <p className="recent-activity-event">You deleted the file</p>
            <p className="recent-activity-filename">Image2.jpg</p>
            <p className="rececnt-activity-time">6 hours ago</p>
        </div>

        <div className="recent-activity">
            <i className="flaticon flaticon-file added"></i>
            <p className="recent-activity-event">You added the file</p>
            <p className="recent-activity-filename">Image3.jpg</p>
            <p className="rececnt-activity-time">8 hours ago</p>
        </div>

      </div>
    );
  }
}

export default Recent;
