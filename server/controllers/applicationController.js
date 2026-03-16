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
        const { applicationId, businessName, businessType, address } = req.body;

        const mapDepartment = (type) => {
            const t = type.toLowerCase();
            if (t.includes('food') || t.includes('restaurant') || t.includes('cafe')) return 'Department of Health & Food Safety';
            if (t.includes('retail') || t.includes('shop') || t.includes('store')) return 'Department of Commerce';
            if (t.includes('tech') || t.includes('software') || t.includes('it ')) return 'Department of IT & Electronics';
            if (t.includes('manufactur') || t.includes('factory')) return 'Department of Industries';
            return 'General Processing Department';
        };
        const assignedDepartment = mapDepartment(businessType);

        let documents = [];

        if (req.files && req.files.length > 0) {
            for (const file of req.files) {
                try {
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
                    if (fs.existsSync(file.path)) {
                        fs.unlinkSync(file.path);
                    }
                } catch (loopError) {
                    console.error("CRITICAL ERROR PROCESSING FILE:", file.originalname, loopError);
                    throw loopError;
                }
            }
        }

        const application = await Application.create({
            user: req.user._id,
            applicationId,
            businessName,
            businessType,
            address,
            department: assignedDepartment, // New routing field
            documents,
            aiScore: null,
            aiCompletenessScore: null,
            aiClarityScore: null,
            aiMissingDocuments: [],
            aiFeedback: "Pending Officer Review",
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

// @desc    Get all applications for officers
// @route   GET /api/applications/officer
// @access  Private
const getOfficerApplications = async (req, res) => {
    try {
        if (req.user.role !== 'officer' && req.user.role !== 'admin') {
            return res.status(401).json({ message: 'Not authorized as an officer' });
        }

        let query = {};

        // --- PHASE 4: Filter by Officer Category ---
        if (req.user.role === 'officer') {
            const cat = req.user.officerCategory;
            if (cat === 'Food & Safety' || cat === 'Health') {
                query.department = 'Department of Health & Food Safety';
            } else if (cat === 'Environment' || cat === 'Industries') {
                query.department = 'Department of Industries';
            } else if (cat === 'Labor') {
                query.department = 'Department of Commerce'; // Fallback mapping
            } else if (cat) {
                query.department = 'General Processing Department';
            }
            // If `cat` is undefined (old user), let them see everything for now or default to General. Let's let them see all for demo.
        }

        // Filter by status if provided in query string
        if (req.query.status) {
            query.status = req.query.status;
        }

        console.log("---- GETTING OFFICER APPLICATIONS ----");
        console.log("User:", req.user.name, req.user.role, "Category:", req.user.officerCategory);
        console.log("Query:", query);

        const applications = await Application.find(query).populate('user', 'name email mobile').sort({ createdAt: -1 });
        console.log("Found Applications:", applications.length);
        console.log("--------------------------------------");

        res.json(applications);
    } catch (error) {
        console.error("GET OFFICER APPS ERROR:", error);
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
            // Check permissions (owner or officer/admin)
            if (application.user.toString() !== req.user._id.toString() && !['officer', 'admin'].includes(req.user.role)) {
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

// @desc    Update application status (Admin/Officer)
// @route   PUT /api/applications/:id/status
// @access  Private (Assume admin/officer for now, but we'll mock it)
const updateApplicationStatus = async (req, res) => {
    try {
        const { status, remarks, rejectedFields } = req.body;
        const application = await Application.findById(req.params.id);

        if (!application) {
            return res.status(404).json({ message: 'Application not found' });
        }

        application.status = status;
        if (remarks) {
            application.aiFeedback = remarks; // reusing this field or add a new one, keeping it simple
        }
        if (rejectedFields && Array.isArray(rejectedFields)) {
            application.rejectedFields = rejectedFields;
        } else if (status === 'Approved') {
            application.rejectedFields = []; // clear if approved
        }

        await application.save();

        // 1. Create Notification
        let title, message, type;
        if (status === 'Approved') {
            title = 'Application Approved! 🎉';
            message = `Your application for "${application.businessName}" has been conditionally approved.`;
            type = 'success';
        } else if (status === 'Rejected') {
            title = 'Application Rejected';
            message = `Your application for "${application.businessName}" was rejected. Remarks: ${remarks || 'None'}`;
            type = 'error';
        } else if (status === 'ActionRequired') {
            title = 'Action Required';
            message = `Your application for "${application.businessName}" needs attention. Remarks: ${remarks || 'None'}`;
            type = 'warning';
        } else {
            title = 'Application Updated';
            message = `Your application for "${application.businessName}" is now ${status}.`;
            type = 'info';
        }

        // We require the Notification model. It's safe to require it here locally or at the top.
        const Notification = require('../models/Notification');
        const notification = await Notification.create({
            user: application.user,
            applicationId: application._id,
            title,
            message,
            type,
        });

        // 2. Emit Real-time Notification via Socket.io
        if (req.io) {
            req.io.to(application.user.toString()).emit('newNotification', notification);
        }

        res.json(application);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    createApplication,
    getMyApplications,
    getApplicationById,
    updateApplicationStatus,
    getOfficerApplications,
};
