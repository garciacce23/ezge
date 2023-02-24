const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true }
});

const MyModel = mongoose.model('MyModel', itemSchema);

module.exports = MyModel;