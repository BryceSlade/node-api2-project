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
            res.status(500).json({
                message: error.message
            })
        })
})

module.exports = router