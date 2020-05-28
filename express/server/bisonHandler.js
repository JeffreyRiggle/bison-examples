const bodyParser = require('body-parser');
const { encode, decode } = require('@jeffriggle/bison/dist/cjs');

const handleBison = (req, res, next) => {
    if (req.headers['content-type'] !== 'application/bison') {
        next();
        return;
    }

    if (req.rawBody) {
        req.body = decode(req.rawBody);
    }

    next();
}

const useBison = (app) => {
    app.use(bodyParser.raw({type: 'application/bison', verify: (req, res, buf, encoding) => {
        if (buf && buf.length) {
            req.rawBody = buf;
        }
    }}));

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