const express = require('express');
const router = express.Router();
const { registerUser, loginUser, getMe, updateUserProfile } = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');
const multer = require('multer');

const upload = multer({ dest: 'uploads/' });

router.post('/register', upload.single('certificate'), registerUser);
router.post('/login', loginUser);
router.get('/me', protect, getMe);
router.put('/profile', protect, updateUserProfile);

module.exports = router;
