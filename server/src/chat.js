import io from 'socket.io-client'
import secret from './config/secret';

let chatLog = []

const socket = io(secret.ws);

socket.emit('email', 'docstashcare@gmail.com');

socket.on('data', (data) => {

    if (data.chats) {

        data.chats.forEach((chat, i) => {

            if (!chatLog[i])
                chatLog.push(0);

            if (chatLog[i] < data.chats[i].messages.length) {
                if (Object.keys(data.chats[i].messages[chatLog[i]])[0] === "2") {
                    const email = data.chats[i].email
                    socket.emit('message', 'docstashcare@gmail.com', email, 'Hey, I am in Development. Will help you soon');
                }
            }
            chatLog[i] = data.chats[i].messages.length

        });
        // console.log(chatLog);
    }

});
