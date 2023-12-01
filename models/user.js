const { Schema, model } = require('mongoose');

const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Did you type your email wrong? Please include a valid email address!'],
        },
        thoughts: {
            type: Schema.Types.ObjectId,
            ref: "Thought"
        },
        friends: {
            type: Schema.Types.ObjectId,
            ref: "User"
        },
        toJSON: {
            getters: true,
          },
});

userSchema.virtual
const User = mongoose.model("User", userSchema);
module.exports = User;