const mongoose = require('mongoose');

const screenSchema = new mongoose.Schema({
    metadata: {
        type: Object,
        required: true,
        version: {
            type: String,
            required: true
        },
        ID: {
            type: String,
            required: true
        }
    },
    header: {
        type: Array,
        default: []
    },
    elementFields: {
        type: Object,
        default: {}
    },
    bookmarkData: {
        type: String,
        default: ''
    },
    content: {
        type: Array,
        default: []
    },
    regionContent: {
        type: Array,
        default: []
    },
    contentContainerWidth: {
        type: String,
        enum: ['narrow', 'medium', 'wide', 'full'],
        default: 'narrow'
    },
    contentStyle: {
        type: String,
        enum: ['focal', 'nonfocal'],
        default: 'focal'
    },
    contentBackgroundImage: {
        type: Object,
        default: {}
    },
    contentBackgroundColor: {
        type: String,
        default: ''
    },
    bodyBackgroundImage: {
        type: Object,
        default: {}
    },
    bodyBackgroundColor: {
        type: String,
        default: ''
    },
    footerTextColor: {
        type: String,
        default: ''
    },
    hideBackToTop: {
        type: Boolean,
        default: false
    },
    backToTopBackgroundColor: {
        type: String,
        default: ''
    },
    backToTopTextColor: {
        type: String,
        default: ''
    }
} , { collection: 'screens' });

const ScreenModel = mongoose.model('ScreenModel', screenSchema);

module.exports = ScreenModel;
