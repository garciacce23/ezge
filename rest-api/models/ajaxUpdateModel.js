const mongoose = require('mongoose');

const ajaxUpdateSchema = new mongoose.Schema({
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
    elementFields: {
        type: Object,
        required: true
    }
}, { collection: 'ajaxUpdate' });

const AJAXUpdate = mongoose.model('AJAXUpdate', ajaxUpdateSchema);

module.exports = AJAXUpdate;