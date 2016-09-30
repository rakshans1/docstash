import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as wsAction from '../actions/wsAction';
import ChatFriends from '../components/main/sections/chat/ChatFriends';
import ChatModal from '../components/main/sections/chat/ChatModal';
import classNames from 'classnames';

class Chat extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            chatVisible: false,
            showModal: false
        }
        this.show = this.show.bind(this);
        this.showModal = this.showModal.bind(this);
        this.sendmessage = this.sendmessage.bind(this);
    }

    show() {
        if (this.state.chatVisible) {
            this.setState({chatVisible: false})
        } else {
            this.setState({chatVisible: true})
        }
    }

  showModal(pic, name, email){
        if (this.state.showModal) {
            this.setState({showModal: false})
        } else {
            this.setState({
              showModal: true,
              chatPic: pic,
              chatName: name,
              chatEmail: email,
            })
        }
  }
  sendmessage(senderEmail, receiverEmail, message) {
    this.props.actions.wsChat(senderEmail, receiverEmail, message);
  }
    render() {
      let chatbox = classNames({chatbox: true, 'chatbox-open': this.state.chatVisible, 'chatbox-close': !this.state.chatVisible});
      let indicator = classNames({chat_message_counter: true, 'display-none': this.state.chatVisible, 'indicator': !this.state.chatVisible});
      const {chat, chats} = this.props.ws;
        return (
            <div className={chatbox}>
                <header className="clearfix-chat" onClick={() => this.show()}>
                    <a href="#" className="chat-close">x</a>
                    <h4>Chat</h4>
                    <span className={indicator}>{chat ? chat.user.length -1  : 0}</span>
                </header>
                    { chat ? <ChatFriends  user={chat.user} email={this.props.user} showModal={this.showModal}/> : null }
                    {this.state.showModal ? <ChatModal {...this.state} senderPic={this.props.user.picture} senderEmail={this.props.user.email} chatMessage={chats}  sendMessage={this.sendmessage} showModal={this.showModal}/> : null}
            </div>
        )
    }
}
Chat.propTypes = {
    actions: PropTypes.object.isRequired,
    ws: PropTypes.object,
    user: PropTypes.object
};
function mapStateToProps(state) {
    return {ws: state.ws, user: state.user};
}
function mapDispatchToProp(dispatch) {
    return {
        actions: bindActionCreators(wsAction, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProp)(Chat);
