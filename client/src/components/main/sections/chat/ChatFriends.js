import React, {PropTypes} from 'react';

class ChatFriends extends React.Component {
    render() {
        const friends = this.props.user.map((usr, i) => {
            if (usr.email === this.props.email.email)
                return null;
            return (
                <div key={i} className="friend" onClick={() => this.props.showModal(usr.pic, usr.name, usr.email)}>
                    <img src={usr.pic}/>
                    <p>
                        {usr.name} {usr.email}
                    </p>
                </div>
            );
        });


        return (
            <div className="friendslist">
                <div className="friends">
                    {this.props.user.length > 1 ? friends :
                      <p className="chat-online">No User Online</p>
                    }
                </div>
            </div>
        );
    }
}
ChatFriends.propTypes = {
  user: PropTypes.array,
  email: PropTypes.object,
  showModal: PropTypes.func
}
export default ChatFriends;
