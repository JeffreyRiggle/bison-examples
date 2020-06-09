import { decode, encode } from '@jeffriggle/bison/dist/esm/index';

const client = new WebSocket('ws://localhost:5000/', 'bison-stream');

client.addEventListener('open', () => {
    console.log('Connection to server is open');
});

client.addEventListener('message', (event) => {
    event.data.arrayBuffer().then(buff => {
      const result = decode(Buffer(buff)) || {}

      console.log(result);
    });
});

export const sendMessage = (message) => {
    client.send(encode({ type: 1, message }))
}

export const getMessages = () => {
    client.send(encode({ type: 0 }));
}