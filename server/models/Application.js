const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
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
    aiScore: {
        type: Number,
        default: 0,
    },
    aiFeedback: {
        type: String,
    },
}, { timestamps: true });

const Application = mongoose.model('Application', applicationSchema);
module.exports = Application;
