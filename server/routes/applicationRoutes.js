const express = require('express');
const router = express.Router();
const { createApplication, getMyApplications, getApplicationById } = require('../controllers/applicationController');
const { protect } = require('../middleware/authMiddleware');
const multer = require('multer');

// Configure Multer for temp storage
const upload = multer({ dest: 'uploads/' });

router.post('/', protect, upload.array('documents', 5), createApplication);
router.get('/my', protect, getMyApplications);
router.get('/:id', protect, getApplicationById);

module.exports = router;
