const mongoose = require('mongoose');

const { Schema } = mongoose;

const UserSchema = new Schema({
    firstname: { type: String, required: true, maxlength: 50 },
    username: { type: String, required: true, maxlength: 50 },
    password: { type: String, required: true },
    admin: { type: Boolean, required: true },
});

module.exports = mongoose.model('User', UserSchema);
