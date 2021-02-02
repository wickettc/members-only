const User = require('../models/user');

exports.sign_up = (req, res) => {
    res.render('sign_up');
};

exports.log_in = (req, res) => {
    res.render('log_in');
};
