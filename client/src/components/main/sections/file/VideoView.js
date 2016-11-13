import React, {PropTypes} from 'react';

class VideoView extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
          <div>
            {this.props.payload.format === 'video'  ?
            <video width="750" height="450" autoPlay controls>
              <source src={this.props.payload.url} type="video/mp4" />
            </video>
            : <audio autoPlay controls>
              <source src={this.props.payload.url} type="video/mp4" />
            </audio>}
          </div>
        );
    }
}
VideoView.propTypes = {
    payload: PropTypes.object,
};

export default VideoView;
