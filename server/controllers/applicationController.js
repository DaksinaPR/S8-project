const Application = require('../models/Application');
const cloudinary = require('cloudinary').v2;
const fs = require('fs');

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

// @desc    Submit a new application
// @route   POST /api/applications
// @access  Private
const createApplication = async (req, res) => {
    try {
        const { businessName, businessType, address } = req.body;

        let documents = [];
        if (req.files && req.files.length > 0) {
            for (const file of req.files) {
                // Upload to Cloudinary
                const result = await cloudinary.uploader.upload(file.path, {
                    folder: 'single-window-docs',
                    resource_type: 'auto',
                });

                documents.push({
                    name: file.originalname,
                    url: result.secure_url,
                    publicId: result.public_id,
                });

                // Remove file from local server
                fs.unlinkSync(file.path);
            }
        }

        // Deterministic AI Score Calculation
        let calculatedScore = 60; // Base score
        let feedbackPoints = [];

        // 1. Business Name Check
        if (businessName.length > 5) {
            calculatedScore += 10;
        } else {
            feedbackPoints.push("Business name is too short.");
        }

        // 2. Address Detail Check
        if (address.length > 15) {
            calculatedScore += 10;
        } else {
            feedbackPoints.push("Address details are vague.");
        }

        // 3. Document Check
        if (documents.length > 0) {
            calculatedScore += 20;
            // Bonus for multiple documents
            if (documents.length > 1) calculatedScore += 5;
        } else {
            calculatedScore -= 10;
            feedbackPoints.push("No supporting documents uploaded.");
        }

        // Cap score at 100
        if (calculatedScore > 98) calculatedScore = 98; // Leave room for human perfection

        const mockScore = calculatedScore;
        const mockFeedback = feedbackPoints.length > 0 ? "Suggestions: " + feedbackPoints.join(" ") : "Application looks complete and well-documented.";

        const application = await Application.create({
            user: req.user._id,
            businessName,
            businessType,
            address,
            documents,
            aiScore: mockScore,
            aiFeedback: mockFeedback,
        });

        res.status(201).json(application);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get logged in user applications
// @route   GET /api/applications/my
// @access  Private
const getMyApplications = async (req, res) => {
    try {
        const applications = await Application.find({ user: req.user._id }).sort({ createdAt: -1 });
        res.json(applications);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get application by ID
// @route   GET /api/applications/:id
// @access  Private
const getApplicationById = async (req, res) => {
    try {
        const application = await Application.findById(req.params.id);

        if (application) {
            // Check permissions (owner or officer/admin) - for now just owner
            if (application.user.toString() !== req.user._id.toString() && req.user.role === 'entrepreneur') {
                return res.status(401).json({ message: 'Not authorized' });
            }
            res.json(application);
        } else {
            res.status(404).json({ message: 'Application not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    createApplication,
    getMyApplications,
    getApplicationById,
};
