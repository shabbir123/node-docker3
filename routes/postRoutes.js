const express = require('express');
const { getAllPosts, createPost, getOnePost, updatePost, deletePost } = require('../controllers/postController');

const router = express.Router();

router.route('/').get(getAllPosts).post(createPost);
router.route('/:id').get(getOnePost).patch(updatePost).delete(deletePost);

module.exports = router;