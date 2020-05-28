const posts = new Map();

const getPosts = () => {
    let retVal = {};
    posts.forEach((v, k) => {
        retVal[k] = v;
        retVal[k].id = k;
    });

    return retVal;
}

const addPost = (post) => {
    const id = posts.size + 1;
    post.comments = {};
    posts.set(id, post);
}

const likePost = (postId) => {
    const post = posts.get(postId);

    if (!post) {
        return 404;
    }

    post.likes = post.likes ? post.likes + 1 : 1;
    posts.set(postId, post);
    return 200;
}

const addComment = (postId, comment) => {
    const post = posts.get(postId);

    if (!post) {
        return 404;
    }

    const commentId = post.comments.length + 1;
    post.comments[commentId] = comment;

    posts.set(postId, post);
    return 200;
}

const likeComment = (postId, commentId) => {
    const post = posts.get(postId);

    if (!post) {
        return 404;
    }

    const comment = post[commentId];

    if (!comment) {
        return 404;
    }

    comment.likes = comment.likes ? comment.likes + 1 : 1;
    posts.set(postId, post);
    return 200;
}

module.exports = {
    addComment,
    addPost,
    likeComment,
    likePost,
    getPosts
}