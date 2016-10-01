import React, {PropTypes} from 'react';
import ReactDom from 'react-dom';

class ChatMessage extends React.Component {
  componentDidMount() {
    var node = ReactDom.findDOMNode(this);
    node.scrollTop = node.scrollHeight;
  }
  componentDidUpdate() {
    var node = ReactDom.findDOMNode(this);
    node.scrollTop = node.scrollHeight;
  }

  render() {
  const {senderPic, receiverPic} = this.props;
  const message = this.props.message.messages.map((message, i) => {
    if (Object.keys(message)[0] === "1"){
      return(
        <div className="message right" key={i}>
          <img src={senderPic} alt=""/>
          <div className="bubble">
            {message[1]}
            <div className="corner"></div>
          </div>
        </div>
      )
    } else {
      return (
        <div className="message" key={i}>
          <img src={receiverPic} alt=""/>
           <div className="bubble">
             {message[2]}
             <div className="corner"></div>
            </div>
        </div>
      )
    }
  });


  return(
    <div className="chat-messages">
      {message}
    </div>
  );


  }
}
ChatMessage.propTypes = {
  message: PropTypes.object,
  senderPic: PropTypes.string.isRequired,
  receiverPic: PropTypes.string.isRequired
}

export default ChatMessage
