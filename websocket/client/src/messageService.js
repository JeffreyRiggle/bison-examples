import { w3cwebsocket as WebSocket } from 'websocket';
import { encode } from '@jeffriggle/bison/dist/esm/index';

const client = new WebSocket('ws://localhost:5000/', 'bison-stream');

client.onerror = () => {
    console.log('Connection Error!');
}

client.onopen = () => {
    console.log('Connection to server is open');
}

client.onclose = () => {
    console.log('Connection has been closed');
}

client.onmessage = (event) => {
    const blob = new Blob(event.data);
    console.log('Got event ', event);
}

export const sendMessage = (message) => {
    client.send(encode({ type: 1, message }))
}

export const getMessages = () => {
    client.send(encode({ type: 0 }));
}