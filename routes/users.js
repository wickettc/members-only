const express = require('express');
const userController = require('../controllers/userController');

const router = express.Router();

router.get('/sign-up', userController.sign_up_get);

router.post('/sign-up', userController.sign_up_post);

router.get('/log-in', userController.log_in_get);

router.post('/log-in', userController.log_in_post);

module.exports = router;
