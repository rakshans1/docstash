import React, {PropTypes} from 'react';

class VideoView extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
          <div>
            {this.props.payload.format === 'video'  ?
            <video width="1050" height="580" autoPlay controls>
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
