const express = require('express');
const router = express.Router();
const { createApplication, getMyApplications, getApplicationById, updateApplicationStatus, getOfficerApplications } = require('../controllers/applicationController');
const { protect } = require('../middleware/authMiddleware');
const multer = require('multer');

// Configure Multer for temp storage
const upload = multer({ dest: 'uploads/' });

router.post('/', protect, upload.array('documents', 20), createApplication);
router.get('/my', protect, getMyApplications);
router.get('/officer', protect, getOfficerApplications);
router.get('/:id', protect, getApplicationById);
router.put('/:id/status', protect, updateApplicationStatus);

module.exports = router;
