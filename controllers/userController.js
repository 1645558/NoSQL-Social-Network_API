const { Users, Thoughts } = require('../models');

const userController = {
    getUsers(req, res) {
        Users.find()
        .populate({path: 'thoughts', select: '-__v'})
        .populate({path: 'friends', select: '-__v'})
        .select('-__v')
        .then((users) => res.json(users))
        .catch((err) => res.status(500).json(err));
    },
    getSingleUser(req, res) {
        Users.findOne({ _id: req.params.userId })
        .populate({path: 'thoughts', select: '-__v'})
        .populate({path: 'friends', select: '-__v'})
        .select('-__v')
        .then((user) => 
        !user
        ? res.status(404).json({ message: 'No user with that ID' })
        : res.json(user)
        )
        .catch((err) => res.status(500).json(err));
    },
    createUser(req, res) {
        Users.create(req.body)
        .then((dbUserData) => res.json(dbUserData))
        .catch((err) => res.status(500).json(err));
    },
    updateUser(req, res) {
        Users.findOneAndUpdate(
            { _id: req.params.userId },
            { $set: req.body },
            { runValidators: true, new: true }
        )
        .then((users) => 
        !users
        ?res.status(404).json({ message: 'No user with that ID'})
        : res.json(users)
        )
        .catch((err) => res.status(500).json(err));
    },
    deleteUser(req, res) {
        Users.findOneAndRemove({ _id: req.params.userId })
        .then((users) => 
        !users
        ?res.status(404).json({ message: 'No user with that ID'})
        : Thoughts.deleteMany({ _id: { $in: users.thoughts}})
        )
        .then(() => res.json({ message: 'User and associated thoughts deleted'}))
        .catch((err) => res.status(500).json(err));
    },
};

module.exports = userController;