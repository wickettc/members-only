const express = require('express');
const postController = require('../controllers/postController');

const router = express.Router();

/* GET home page. */
router.get('/', postController.index);

router.get('/create-post', postController.create_post_get);

module.exports = router;
