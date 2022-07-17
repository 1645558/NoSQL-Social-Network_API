const { Schema, model } = require('mongoose');

//schema to create User model
const userSchema = new Schema({
    username: { type: String, required: true, unique: true, trim: true },
    email: { type: String, required: true, unique: true, match: [/^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/] },
    thoughts: [{ type: Schema.Types.ObjectId, ref: 'Thoughts'}],
    friends: [{ type: Schema.Types.ObjectId, ref: 'user' }]
},
{
    toJSON: {
        virtuals: true,
        getters: true,
    },
    id: false
}
);

//Creates a virtual called friendCount to get the amount of friends for that user
userSchema.virtual('friendCount').get(function () {
    return this.friends.length;
});

const User = model('user', userSchema);

module.exports = User;