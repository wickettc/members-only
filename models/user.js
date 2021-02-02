const mongoose = require('mongoose');

const { Schema } = mongoose;

const UserSchema = new Schema({
    first_name: { type: String, required: true, maxlength: 50 },
    last_name: { type: String, required: true, maxlength: 50 },
    username: { type: String, required: true, maxlength: 50 },
    password: { type: String, required: true, maxlength: 50 },
});

UserSchema.virtual('fullName').get(() => this.first_name + this.last_name);

module.exports = mongoose.model('User', UserSchema);
