
const express = require('express');
const { uploadPost, getFeed, upload } = require('../controllers/postController');
const { protect } = require('../middlewares/authMiddleware');
const router = express.Router();

router.post('/upload', protect, upload.single('image'), uploadPost);
router.get('/feed', protect, getFeed);

module.exports = router;
