import notifyMe from './notification';

let chatLog = []

function chatNotification(chats) {
  if (chats) {

    chats.forEach((chat, i) => {

        if (!chatLog[i])
            chatLog.push(0);

        if (chatLog[i] < chats[i].messages.length) {
            if (Object.keys(chats[i].messages[chatLog[i]])[0] === "2") {
                const name = chats[i].name;
                const message = chats[i].messages[chatLog[i]][2];
                const picture = chats[i].pic;
                notifyMe(name, message, picture);
            }
        }
        chatLog[i] = chats[i].messages.length

    });
  }
}

export default chatNotification;
