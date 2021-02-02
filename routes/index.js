const express = require('express');

const router = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {
    res.render('index', { title: 'Express' });
});

router.get('/sign-in', (req, res, next) => {
    res.render('sign_in');
});

router.get('/log-in', (req, res, next) => {
    res.render('log_in');
});

module.exports = router;
