const { Schema, Types } = require('mongoose');
const dateFormat = require('../../utils/dateFormat');
const {mongoose} = require('mongoose')

const reactionSchema = new Schema(
    {
      reactionId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId(),
      },
      reactionBody: {
        type: String,
        required: true,
        maxlength: 280,
      },
      username: {
        type: String,
        required: true,
      },
      createdAt: {
        type: Date,
        default: Date.now,
        get: timestamp => dateFormat(timestamp),
      },
    },
    {
       toJSON: {
        virtuals: true,
        getters: true,
      }, 
    },
);

const Reaction = mongoose.model('Reaction', reactionSchema);

module.exports = reactionSchema;