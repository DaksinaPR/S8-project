const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    message: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        enum: ['success', 'error', 'warning', 'info'],
        default: 'info',
    },
    isRead: {
        type: Boolean,
        default: false,
    },
    applicationId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Application',
        required: false,
    }
}, { timestamps: true });

const Notification = mongoose.model('Notification', notificationSchema);
module.exports = Notification;
