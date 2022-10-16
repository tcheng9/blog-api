var express = require('express');
var router = express.Router();
var Post = require('../models/post');
var async = require('async');

/* GET home page */
router.get('/', async function(req, res, next){
    try {
        const posts = await Post.find();
        res.json(posts);
    } catch (err){
        res.status(500).json({message: err.message});
    }
});

router.get('/:id', function (req, res,) {
    res.send(req.params.id);
});

router.post('/', async function(req, res){
    const post = new Post({
        title: req.body.title,
        text: req.body.text,
        comments: req.body.comments,
        publish_status: req.body.publish_status,
     });

    
     try{
        const newPost = await post.save();
        res.json(newPost);
     } catch (err){
        res.json({messsage: err.message});
     }
})
router.put('/', (req, res) => {
    return res.send('Received a PUT HTTP method');
});

router.delete('/', (req, res) => {
    return res.send('Received a DELETE HTTP method');
})

module.exports = router;