const Post = require('../models/posts');

exports.index = (req, res, next) => {
    // Post.find({}).exec()
    res.render('index');
};

exports.create_post_get = (req, res) => {
    res.render('create_post');
};

exports.create_post_post = (req, res, next) => {
    new Post({
        username: req.body.username,
        message: req.body.message,
        post_time: req.body.post_time,
    }).save((err) => {
        if (err) return next(err);
        res.redirect('/');
    });
};
