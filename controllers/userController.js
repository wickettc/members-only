const bcrypt = require('bcryptjs');
const passport = require('passport');
const { body, validationResult } = require('express-validator');
const User = require('../models/user');

exports.sign_up_get = (req, res) => {
    res.render('sign_up');
};

exports.sign_up_post = [
    body('firstname')
        .isLength({ min: 1 })
        .withMessage('First name is required'),
    body('lastname').isLength({ min: 1 }).withMessage('Last name is required'),
    body('email').custom((value) =>
        User.findOne({ email: value })
            .exec()
            .then((user) => {
                if (user) {
                    return Promise.reject(new Error('Email is already in use'));
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
            res.render('sign_up', { errors: errors.array() });
            return;
        }

        bcrypt.hash(req.body.password, 10, (error, hashedPW) => {
            new User({
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                email: req.body.email,
                password: hashedPW,
            }).save((err) => {
                if (err) return next(err);
                res.redirect('/');
            });
        });
    },
];

exports.log_in_get = (req, res) => {
    res.render('log_in');
};

exports.log_in_post =
    ('/log_in',
    passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/users/log-in',
    }));
