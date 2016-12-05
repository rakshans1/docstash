import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as fileActions from '../../../actions/fileActions';
import Icon from '../../icon';

class Music extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      audio: new Audio()
    }
    this.playMusic = this.playMusic.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }
  componentDidUpdate(){
    if(this.props.music.status === "play") {
      this.playMusic(this.props.music.url, true)
    } else {
      this.playMusic(null, false)
    }
  }
  playMusic(url, status){
    if (status) {
      this.state.audio.src = url;
      this.state.audio.autoplay = true;
      this.state.audio.play();
    } else {
      this.state.audio.pause();
    }
  }
  handleClick(){
    if (this.props.music.status === 'play') {
      this.props.actions.music({url: this.props.music.url, status: 'pause', name: this.props.music.name});
    } else {
      this.props.actions.music({url: this.props.music.url, status: 'play', name: this.props.music.name});
    }
  }
  render() {
    var iconNode = <Icon type={this.props.music.status}/>;
    return(
      <div className="music-player">
      <button type="button"  className="play-btn" onClick={this.handleClick}>
        {iconNode}
      </button>
      <p>{this.props.music.name}</p>
      </div>
    )
  }
}
Music.propTypes = {
    actions: PropTypes.object.isRequired,
    music: PropTypes.object
};
function mapDispatchToProp(dispatch) {
    return {
        actions: bindActionCreators(fileActions, dispatch)
    };
}
function mapStateToProps(state) {
    return { music: state.music};
}
export default connect(mapStateToProps, mapDispatchToProp)(Music);
