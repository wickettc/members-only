const mongoose = require('mongoose');

const { Schema } = mongoose;

const PostSchema = new Schema({
    username: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
    title: { type: String, required: true },
    message: { type: String, required: true },
    post_time: { type: Date, required: true },
});

module.exports = mongoose.model('Post', PostSchema);
