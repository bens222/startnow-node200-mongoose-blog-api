const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.get('/', (req, res) => {
    User
        .find()
        .then(users => {
            res.status(200).json(users);
        });
});

router.get('/:id', (req, res) => {
    User
        .findById(req.params.id)
        .then(user => {
            if (user) {
                res.status(200).json(user)
              } else {
                res.status(404).send();
              }
        });
});

router.post('/', (req, res) => {
    const newUser = new User(req.body)
        newUser.save() 
        .then(newUser => {
            res.status(201).json(newUser);
        });
});

router.put('/:id', (req, res) => {
    User
        .findByIdAndUpdate(req.params.id, req.body)
        .then(updatedUser => {
            res.status(204).json(updatedUser);
        });
});

router.delete('/:id', (req,res) => {
    User
        .findByIdAndRemove(req.params.id)
        .then(deletedUser => {
            res.status(200).json(deletedUser);
        });
});

module.exports = router;
