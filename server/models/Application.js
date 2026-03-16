const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    applicationId: {
        type: String,
        required: true,
        unique: true
    },
    businessName: {
        type: String,
        required: true,
    },
    businessType: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    documents: [{
        name: String,
        url: String,
        publicId: String,
        uploadedAt: {
            type: Date,
            default: Date.now,
        }
    }],
    status: {
        type: String,
        enum: ['Pending', 'Approved', 'Rejected', 'ActionRequired'],
        default: 'Pending',
    },
    department: {
        type: String,
        required: true,
        default: 'General Processing',
    },
    aiScore: {
        type: Number,
        default: 0,
    },
    aiCompletenessScore: {
        type: Number,
        default: 0,
    },
    aiClarityScore: {
        type: Number,
        default: 0,
    },
    aiMissingDocuments: [{
        type: String,
    }],
    aiFeedback: {
        type: String,
    },
    rejectedFields: [{
        type: String, // e.g., 'panNumber', 'addressLine1', 'documents.aadhar'
    }]
}, { timestamps: true });

const Application = mongoose.model('Application', applicationSchema);
module.exports = Application;
