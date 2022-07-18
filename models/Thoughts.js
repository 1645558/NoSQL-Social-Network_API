const { Schema, model } = require('mongoose');
const moment = require('moment');

const reactionSchema = new Schema({
    reactionId: { type: Schema.Types.ObjectId, default: () => new Types.ObjectId() },
    reactionBody: { type: String, required: true, maxLength: 280 },
    username: { type: String, required: true },
    createdAt: { type: Date, default: Date.now, 
        get: (val) => moment(val).format('MMM DD, YYYY [at] hh:mm a')}
},
{
    toJSON: {
        getters: true
    }
}
);

const thoughtSchema = new Schema({
    thoughtText: { type: String, required: true, minLength: 1, maxLength: 280 },
    createdAt: { type: Date, default: Date.now, 
        get: (val) => moment(val).format('MMM DD, YYYY [at] hh:mm a')},
    username: { type: String, required: true },
    reactions: [reactionSchema]
},
{
    toJSON: {
        virtuals: true,
        getters: true
    },
    id: false
}
);

thoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions.length;
});

const Thoughts = model('Thoughts', thoughtSchema);

module.exports = Thoughts;