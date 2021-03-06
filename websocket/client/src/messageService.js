import bison from '@jeffriggle/bison/dist/esm/index';

let messageListener;
const client = new WebSocket('ws://localhost:5000/', 'bison-stream');

client.addEventListener('open', () => {
    console.log('Connection to server is open');
});

client.addEventListener('message', (event) => {
    event.data.arrayBuffer().then(buff => {
      const result = bison.decode(Buffer(buff)) || {}

      if (result.messages && result.messages.length && messageListener) {
        messageListener(result.messages);
      }
    });
});

export const sendMessage = (message) => {
    client.send(bison.encode({ type: 1, message }))
}

export const getMessages = () => {
    client.send(bison.encode({ type: 0 }));
}

export const setMessageListener = (listener) => {
    messageListener = listener;
}