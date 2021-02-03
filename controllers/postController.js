const async = require('async');

const Post = require('../models/posts');
const User = require('../models/user');

exports.index = (req, res, next) => {
    async.parallel(
        {
            posts: (cb) => {
                Post.find({}).exec(cb);
            },
            users: (cb) => {
                User.find({}).exec(cb);
            },
        },
        (err, results) => {
            if (err) return next(err);
            res.render('index', { results });
        }
    );
};

exports.create_post_get = (req, res) => {
    res.render('create_post');
};

exports.create_post_post = (req, res, next) => {
    const date = new Date().toLocaleTimeString('en-US', {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
    });
    new Post({
        username: req.body.username,
        title: req.body.title,
        message: req.body.message,
        post_time: date,
    }).save((err) => {
        if (err) return next(err);
        res.redirect('/');
    });
};
