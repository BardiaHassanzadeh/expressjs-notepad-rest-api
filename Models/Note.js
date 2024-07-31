const mongoose = require('mongoose')

const noteSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    text: {
        type: String,
        required: true
    },
    created_at: {
        type: Date,
        required: true,
        default: Date.now
    },
    updated_at: {
        type: Date,
        required: true,
        default: Date.now
    }
})

// Middleware to handle updates to 'updated_at'
noteSchema.pre('save', function(next) {
    this.updated_at = Date.now();
    next();
});

noteSchema.pre('findOneAndUpdate', function(next) {
    this._update.updated_at = Date.now();
    next();
});

module.exports = mongoose.model('Note', noteSchema)