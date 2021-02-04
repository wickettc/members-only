const async = require('async');
const { body, validationResult } = require('express-validator');

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

exports.admin_form_get = (req, res) => {
    res.render('admin_form');
};

exports.admin_form_post = [
    body('password').custom((value, { req }) => {
        if (value !== 'becomeadmintoday') {
            throw new Error('Sorry, that is not the password');
        }
        return true;
    }),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.render('admin_form', { errors: errors.array() });
            return;
        }
        User.findByIdAndUpdate(
            req.body.username,
            { admin: true },
            {},
            (err) => {
                if (err) return next(err);
                res.redirect('/');
            }
        );
    },
];

exports.delete_post_get = (req, res, next) => {
    Post.findById(req.params.id).exec((err, post) => {
        if (err) return next(err);
        res.render('delete_post', {
            title: `Are you sure you want to delete "${post.title}"?`,
            post,
        });
    });
};

exports.delete_post_post = (req, res, next) => {
    Post.findByIdAndDelete(req.body.deleteid, (err, done) => {
        if (err) return next(err);
        res.redirect('/');
    });
};
