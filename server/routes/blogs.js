const express = require('express');
const router = express.Router();
const Blog = require('../models/Blog');

router.get('/', (req, res) => {
    Blog
        .find()
        .then(blogs => {
            res.status(200).json(blogs);
        });
});

router.get('/featured', (req, res) => {
    Blog
        .where('featured').equals(true)
        .then(featuredBlogs => {
            res.status(200).json(featuredBlogs);
        });
});

router.get('/:id', (req, res) => {
    Blog
        .findById(req.params.id)
        .then(blog => {
            if (blog) {
              res.status(200).json(blog)
            } else {
              res.status(404).send();
            }
        });
});

router.post('/', (req, res) => {
    const newBlog = new Blog(req.body)
        newBlog.save() 
        .then(newBlog => {
            res.status(201).json(newBlog);
        });
});

router.put('/:id', (req, res) => {
    Blog
        .findByIdAndUpdate(req.params.id, req.body)
        .then(updatedBlog => {
            res.status(204).json(updatedBlog);
        });
});

router.delete('/:id', (req,res) => {
    Blog
        .findByIdAndRemove(req.params.id)
        .then(deletedBlog => {
            res.status(200).json(deletedBlog);
        });
});

module.exports = router;
