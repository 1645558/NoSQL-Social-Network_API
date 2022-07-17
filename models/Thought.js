const { Schema, model } = require('mongoose');
const moment = require('moment');

const thoughtSchema = new Schema({
    thoughtText: { type: String, required: true, minLength: 1, maxLength: 280 },
    createdAt: { type: Date, default: Date.now },
    get: (val) => moment(val).format('MMM DD, YYYY [at] hh:mm a'),
    username: { type: String, required: true },
    reactions: [{ type: Schema.Types.ObjectId }]
},
{
    toJSON: {
        virtuals: true,
    },
    id: false
}
);

thoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions.length;
});

const Thoughts = model('thoughts', thoughtSchema);

module.exports = Thoughts;