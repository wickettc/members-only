const mongoose = require('mongoose');

const { Schema } = mongoose;

const UserSchema = new Schema({
    firstname: { type: String, required: true, maxlength: 50 },
    lastname: { type: String, required: true, maxlength: 50 },
    username: { type: String, required: true, maxlength: 50 },
    password: { type: String, required: true },
});

UserSchema.virtual('fullName').get(() => this.first_name + this.last_name);

module.exports = mongoose.model('User', UserSchema);
