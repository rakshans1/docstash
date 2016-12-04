import React from 'react';
import Icon from '../../icon';

class Music extends React.Component{
  constructor(props){
    super(props);
    this.playMusic = this.playMusic.bind(this);
  }
  componentDidUpdate(){
    if(this.props.music.status === "play") {
      this.playMusic(this.props.music.url)
    }
  }
  playMusic(url){
    var musicBuffer = null;
    var context = new AudioContext();
    var request = new XMLHttpRequest();
    request.open('GET', url, true);
    request.responseType = 'arraybuffer';
    request.onload = function() {
      context.decodeAudioData(request.response, function(buffer) {
        musicBuffer = buffer;
        var source = context.createBufferSource();
        source.buffer = musicBuffer;
        source.connect(context.destination);
        source.start(0);
      }, function(err){console.log(err) });
    }
    request.send();
  }
  render() {
    var iconNode = <Icon type={this.props.music.status}/>;
    return(
      <div>
      <button type="button"  className="play-btn" onClick={this.handleClick}>
        {iconNode}
      </button>
      </div>
    )
  }
}
export default Music;
