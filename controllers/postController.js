const User = require('../models/user');
const Post = require('../models/posts');

exports.index = (req, res) => {
    res.render('index');
};

exports.create_post_get = (req, res) => {
    res.render('create_post');
};
