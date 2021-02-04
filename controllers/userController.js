const bcrypt = require('bcryptjs');
const { body, validationResult } = require('express-validator');
const passport = require('../passport/setup');
const User = require('../models/user');

exports.sign_up_get = (req, res) => {
    res.render('sign_up');
};

exports.sign_up_post = [
    body('firstname')
        .isLength({ min: 1 })
        .withMessage('First name is required'),
    body('username').custom((value) =>
        User.findOne({ username: value })
            .exec()
            .then((user) => {
                if (user) {
                    return Promise.reject(
                        new Error('username is already in use')
                    );
                }
            })
    ),
    body('password')
        .isLength({ min: 8 })
        .withMessage('Password must contain at least 8 characters'),
    body('passwordconfirm').custom((value, { req }) => {
        if (value !== req.body.password) {
            throw new Error('Password confirmation does not match');
        }
        return true;
    }),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            console.log(errors.array());
            res.render('sign_up', { errors: errors.array() });
            return;
        }

        bcrypt.hash(req.body.password, 10, (error, hashedPW) => {
            new User({
                firstname: req.body.firstname,
                username: req.body.username,
                password: hashedPW,
                admin: req.body.isadmin,
            }).save((err) => {
                if (err) return next(err);
                res.redirect('/');
            });
        });
    },
];

exports.log_in_get = (req, res) => {
    console.log(req.flash());
    res.render('log_in', { message: req.flash('message') });
};

exports.log_in_post =
    ('/log_in',
    passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/users/log-in',
        failureFlash: true,
    }));

exports.log_out = (req, res) => {
    req.logout();
    res.render('log_out');
};
