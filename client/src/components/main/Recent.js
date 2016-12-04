import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import FileIcon from './sections/file/FileIcon';
import moment from 'moment';
import Music from './sections/Music';

class Recent extends React.Component {
    constructor(props) {
        super(props);
        this.renderRecent = this.renderRecent.bind(this);
    }
    renderRecent = (recent, i) => {
      const time = moment(recent.updatedAt).fromNow()
      return(
        <div className="recent-activity" key={i}>
            <FileIcon type={recent.reason}/>
            <p className="recent-activity-event">You {recent.reason} the file</p>
            <p className="recent-activity-filename">{recent.name}</p>
            <p className="rececnt-activity-time">{time}</p>
        </div>
      );
    }
    render() {
        return (
            <div className="col-sm-2 recent">
                <p className="recent-heading">RECENT ACTIVITY</p>
                {this.props.recent.map(this.renderRecent)}
            <Music music={this.props.music}/>
          </div>
        );
    }
}
Recent.propTypes = {
  recent : PropTypes.array
}
function mapStateToProps(state) {
    return { recent: state.recent, music: state.music};
}
export default connect(mapStateToProps, null)(Recent);
