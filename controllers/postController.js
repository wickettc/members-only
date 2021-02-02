const User = require('../models/user');
const Post = require('../models/posts');

exports.index = (req, res) => {
    res.render('index');
};
