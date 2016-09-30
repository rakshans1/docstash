import React, {PropTypes} from 'react';
import ChatMessage from './ChatMessage';

class ChatModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: '',
      typing: 0
    }
    this.handleMessage = this.handleMessage.bind(this);
    this.onEnter = this.onEnter.bind(this);
    this.sendmessage = this.sendmessage.bind(this);
  }
  handleMessage(e) {
    this.setState({
      message: this.refs.message.innerText,
      typing: this.refs.message.innerText.length
    })
  }
  onEnter(e) {
    if (e.charCode === 13) {
      e.preventDefault()
      const {chatEmail, senderEmail} = this.props
      if (this.state.message.length > 0)  this.props.sendMessage(senderEmail, chatEmail, this.state.message);
      this.setState({
        message: ''
      });
      this.refs.message.innerText = '';
    }
  }
  sendmessage() {
    const {chatEmail, senderEmail} = this.props
    if (this.state.message.length > 0)  this.props.sendMessage(senderEmail, chatEmail, this.state.message);
      this.setState({
        message: ''
      });
      this.refs.message.innerText = '';
  }
  render() {
    const { chatName, chatPic, chatEmail, chatMessage, senderPic, showModal } = this.props;
    return(
      <div className="chatview">
        <div className="profile">
            <div className="close" onClick={() => showModal()}>
              <div className="cy s1 s2 s3"></div>
              <div className="cx s1 s2 s3"></div>
            </div>
            <img className="floatingImg" src={chatPic} alt=""/>
            <p>{chatName}<br/><span>{chatEmail}</span></p>
        </div>

          {chatMessage ? <ChatMessage senderPic={senderPic} receiverPic={chatPic} message={chatMessage.find(message => message.email === chatEmail)}/> : null}

        <div className="sendmessage">
          <div dir="auto" className="chat-input" ref="message" contentEditable="true" onInput={this.handleMessage} onKeyPress={this.onEnter}></div>
          <div className={this.state.typing > 0 ? "display-none" : "input-placeholder"}>Send Message...</div>
          <button className="send" onClick={this.sendmessage}></button>
        </div>

      </div>
    );
  }
}

ChatModal.propTypes = {
  chatMessage: PropTypes.array,
  chatEmail: PropTypes.string.isRequired,
  chatName: PropTypes.string.isRequired,
  chatPic: PropTypes.string.isRequired,
  senderPic: PropTypes.string.isRequired,
  senderEmail: PropTypes.string.isRequired,
  showModal: PropTypes.func.isRequired,
  sendMessage: PropTypes.func.isRequired
};
export default ChatModal;
