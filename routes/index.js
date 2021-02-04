const express = require('express');
const postController = require('../controllers/postController');

const router = express.Router();

/* GET home page. */
router.get('/', postController.index);

router.get('/create-post', postController.create_post_get);

router.post('/create-post', postController.create_post_post);

router.get('/become-admin', postController.admin_form_get);

router.post('/become-admin', postController.admin_form_post);

router.get('/delete/:id', postController.delete_post_get);

router.post('/delete/:id', postController.delete_post_post);

module.exports = router;
