const WebSocketServer = require('websocket').server
const http = require('http')
const { encode, decode } = require('@jeffriggle/bison/dist/cjs')
const { addMessage, getMessages } = require('./messageStore')

const server = http.createServer((req, res) => {
    console.log('Got request for ', req.url)
    res.writeHead(404);
    res.end();
})

server.listen(5000, () => {
    console.log('Server is running');
})

wsServer = new WebSocketServer({
    httpServer: server,
    autoAcceptConnections: false,
})

wsServer.on('request', req => {
    const connection = req.accept('bison-stream', req.origin);
    connection.on('message', message => {
        const data = decode(message.binaryData);

        if (data.type === 0) {
            connection.sendBytes({
                messages: getMessages()
            })
        } else if (data.type === 1) {
            addMessage(data.message)
            const sendData = encode({ 
                status: 'Success',
                messages: getMessages()
            })
            connection.sendBytes(sendData)
        }
    })

    connection.on('close', (reason, description) => {
        console.log(`Connection closed due to ${reason} with description ${description}`)
    })
})