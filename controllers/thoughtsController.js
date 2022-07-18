const { Thoughts } = require('../models/Thoughts');

const thoughtController = {
    getThoughts(req, res) {
        Thoughts.find()
        .then((thoughts) => res.json(thoughts))
        .catch((err) => res.status(500).json(err));
    },
    getSingleThought(req, res) {
        Thoughts.findOne({ id: req.params.id })
        .select('-__v')
        .populate('reactions')
        .then((thoughts) => 
        !thoughts
        ? res.status(404).json({ message: 'No thought with that ID'})
        : res.json(thoughts)
        )
        .catch((err) => res.status(500).json(err));
    },
    createThought(req, res) {
        Thoughts.create(req.body)
    }
}

module.exports = thoughtController;