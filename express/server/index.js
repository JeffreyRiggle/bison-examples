const express = require('express');
const { getPosts, addComment, addPost, likeComment, likePost } = require('./postManager');
const { useBison, sendBison } = require('./bisonHandler');
const app = express();

useBison(app);

app.get('/posts', (req, res) => {
    res.status(200);
    sendBison(res, getPosts())
});

app.post('/posts/create', (req, res) => {
    addPost({
        body: req.body.body,
        title: req.body.title
    });
    res.status(201).end();
});

app.post('/posts/:postId/like', (req, res) => {
    console.log('Got like post request')
    likePost(req);
});

app.post('/posts/:postId/comments', (req, res) => {
    console.log('Got create comment request')
    addComment(req);
});

app.post('/posts/:postId/comments/:commentId/like', (req, res) => {
    console.log('Got like comment request')
    likeComment(req);
});

app.listen(4040);