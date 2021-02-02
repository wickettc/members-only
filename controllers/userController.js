const bcrypt = require('bcryptjs');
const User = require('../models/user');

exports.sign_up_get = (req, res) => {
    res.render('sign_up');
};

exports.sign_up_post = (req, res, next) => {
    bcrypt.hash(req.body.password, 10, (error, hashedPW) => {
        const user = new User({
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            username: req.body.username,
            password: hashedPW,
        }).save((err) => {
            if (err) return next(err);
            res.redirect('/');
        });
    });
};

exports.log_in_get = (req, res) => {
    res.render('log_in');
};

exports.log_in_post = (req, res) => {
    res.send('log-in post');
};
