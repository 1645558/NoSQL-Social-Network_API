const { Thoughts, Users } = require('../models');

const thoughtController = {
    getThoughts(req, res) {
        Thoughts.find()
            .populate({ path: 'reactions', select: '-__v' })
            .select('-__v')
            .then((thoughts) => res.json(thoughts))
            .catch((err) => res.status(500).json(err));
    },
    getSingleThought(req, res) {
        Thoughts.findOne({ id: req.params.id })
            .populate({ path: 'reactions', select: '-__v' })
            .select('-__v')
            .then((thoughts) =>
                !thoughts
                    ? res.status(404).json({ message: 'No thought with that ID' })
                    : res.json(thoughts)
            )
            .catch((err) => res.status(500).json(err));
    },
    createThought(req, res) {
        Thoughts.create(req.body)
            .then(({_id}) => {
                return Users.findOneAndUpdate(
                    { _id: req.body.userId },
                    { $push: { thoughts: _id } },
                    { new: true }
                );
            })
            .then((thoughts) =>
                !thoughts
                    ? res.status(404).json({ message: 'No thought with that ID' })
                    : res.json(thoughts)
            )
            .catch((err) => res.status(500).json(err));
    },
    updateThought(req, res) {
        Thoughts.findOneAndUpdate(
            { _id: req.params.userId },
            { $set: req.body },
            { runValidators: true, new: true }
        )
            .then((thoughts) =>
                !thoughts
                    ? res.status(404).json({ message: 'No thought with that ID' })
                    : res.json(thoughts)
            )
            .catch((err) => res.status(500).json(err));
    },
    deleteThought(req, res) {
        Thoughts.findOneAndDelete({ _id: req.params.userId })
            .then((thoughts) =>
                !thoughts
                    ? res.status(404).json({ message: 'No thought with that ID' })
                    : Users.findOneAndUpdate(
                        { thoughts: req.params.userId },
                        { $pull: { thoughts: req.params.userId } },
                        { new: true }
                    )
            )
            .then((users) =>
                !users
                    ? res.status(404).json({ message: 'No user with that ID' })
                    : res.json({ message: 'Thought successfully deleted ' })
            )
            .catch((err) => res.status(500).json(err));
    },
    addReaction(req, res) {
        Thoughts.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $addToSet: { reactions: req.body } },
            { runValidators: true, new: true }
        )
            .then((thoughts) =>
                !thoughts
                    ? res.status(404).json({ message: 'No thought with that ID' })
                    : res.json(thoughts)
            )
            .catch((err) => res.status(500).json(err));
    },
    deleteReaction(req, res) {
        Thoughts.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $pull: { reactions: { reactionId: req.params.reactionId } } },
            { new: true }
        )
            .then((thoughts) =>
                !thoughts
                    ? res.status(404).json({ message: 'No thought with that ID' })
                    : res.json(thoughts)
            )
            .catch((err) => res.status(500).json(err));
    }
};

module.exports = thoughtController;