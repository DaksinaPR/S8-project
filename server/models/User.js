const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    mobile: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ['entrepreneur', 'officer', 'admin', 'client'],
        default: 'entrepreneur',
    },
    officerCategory: { type: String },
    state: { type: String },
    city: { type: String },
    companyName: { type: String },
    certificate: { type: String },
    associatedCompany: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Application',
        default: null,
    },
    isApprovedByEntrepreneur: {
        type: Boolean,
        default: false,
    },
}, { timestamps: true });

// Encrypt password using bcrypt
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

// Match user entered password to hashed password in database
userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model('User', userSchema);
module.exports = User;
