const User = require('../models/user');

exports.sign_up_get = (req, res) => {
    res.render('sign_up');
};

exports.sign_up_post = (req, res) => {
    res.send('sign up post');
};

exports.log_in_get = (req, res) => {
    res.render('log_in');
};

exports.log_in_post = (req, res) => {
    res.send('log-in post');
};
