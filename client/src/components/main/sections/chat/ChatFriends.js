import React, {PropTypes} from 'react';

class ChatFriends extends React.Component {
    render() {
      const {user, chats } = this.props
        const friends = user.map((usr, i) => {
            if (usr.email === this.props.email.email)
                return null;
            return (
                <div key={i} className="friend" onClick={() => this.props.showModal(usr.pic, usr.name, usr.email)}>
                    <img src={usr.pic}/>
                    <p>
                        {usr.name} {usr.email}
                    </p>
                    <div className="status available"></div>
                </div>
            );
        });

        const oflineFriends = chats.map((usr, i) => {
          if (user.find(existingUser => existingUser.email === usr.email))
              return null;
          return(
            <div key={i} className="friend" onClick={() => this.props.showModal(usr.pic, usr.name, usr.email)}>
                <img src={usr.pic}/>
                <p>
                    {usr.name} {usr.email}
                </p>
                <div className="status away"></div>
            </div>
          )
        });

        return (
            <div className="friendslist">
                <div className="friends">
                    {user.length > 1 || chats.length !== 0 ? friends :
                      <p className="chat-online">No User Online</p>
                    }
                    {chats.length > 0 ? oflineFriends : null}
                </div>
            </div>
        );
    }
}
ChatFriends.propTypes = {
  user: PropTypes.array,
  chats: PropTypes.array,
  email: PropTypes.object,
  showModal: PropTypes.func
}
export default ChatFriends;
