const router = require('express').Router();

const {
    getThoughts,
    getSingleThought,
    createThought
} = require('../../controllers/thoughtsController');

router.route('/').get(getThoughts);

router.route('/:id').get(getSingleThought);

router.route('/:userId').post(createThought);

module.exports = router;
