const express = require('express');
const userController = require('../controllers/userController');

const router = express.Router();

router.get('/sign-up', userController.sign_up);

router.get('/log-in', userController.log_in);

module.exports = router;
