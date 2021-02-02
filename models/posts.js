const mongoose = require('mongoose');

const { Schema } = mongoose;

const PostSchema = new Schema({
    username: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
    body: { type: String, required: true },
    post_time: { type: Date, required: true },
});

module.exports = mongoose.model('Post', PostSchema);
