const bodyParser = require('body-parser');
const { encode, decode } = require('@jeffriggle/bison/dist/cjs');

const handleBison = (req, res, next) => {
    console.log('Got request with content type', req.headers['content-type'])
    if (req.headers['content-type'] !== 'application/bison') {
        next();
        return;
    }

    req.body = decode(req.body);
    next();
}

const useBison = (app) => {
    app.use(bodyParser.raw())
    app.use(handleBison);
}

const sendBison = (res, data) => {
    res.contentType('application/bison');
    res.send(encode(data));
}

module.exports = {
    useBison,
    sendBison
};