// implement your posts router here
const express = require('express')
const router = express.Router()
const Posts = require('./posts-model')

router.get('/', (req, res) => {
    Posts.find()
        .then(posts => {
            res.status(200).json(posts)
        })
        .catch(error => {
            console.log(error)
            res.status(500).json({
                message: 'Error retrieving posts'
            })
        })
})

router.get('/:id', (req, res) => {
    Posts.findById(req.params.id)
        .then(post => {
            if (post) {
                res.status(200).json(post)
            } else {
                res.status(404).json({
                    message: 'The post with the specified ID does not exist'
                })
            }
        })
        .catch(error => {
            console.log(error)
            res.status(500).json({
                message: 'Error retrieving post'
            })
        })
})

router.post('/', (req, res) => {
    const { title, contents } = req.body
    if (!title || !contents) {
        res.status(400).json({
            message: 'Please provide title and contents for the post'
        })
    } else {
        Posts.insert({title, contents})
            .then(({id}) => {
                return Posts.findById(id)
            })
            .then(post => {
                res.status(201).json(post)
            })
            .catch(error => {
                console.log(error)
                res.status(500).json({
                    message: 'There was an error while saving the post to the database'
                })
            })
    }
})

router.put('/:id', (req, res) => {
    const updates = req.body
    Posts.update(req.params.id, updates)
        .then(post => {
            if (post) {
                res.status(200).json(post)
            } else {

            }
        })
        .catch()
})

module.exports = router