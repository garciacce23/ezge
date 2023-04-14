const mongoose = require('mongoose');

const ajaxContentSchema = new mongoose.Schema({
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
    regionContent: {
        type: [String],
        required: true
    }
}, {versionKey: false});//{ collection: 'ajaxContent' },

const AJAXContent = mongoose.model('AJAXContent', ajaxContentSchema);

module.exports = AJAXContent;