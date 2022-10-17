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

router.get('/:id', getPost, function (req, res,) {
    res.send(res.post.title);
});

router.post('/', async function(req, res){
    const post = new Post({
        title: req.body.title,
        text: req.body.text,
        comments: req.body.comments,
        publish_status: req.body.publish_status,
     })

    //  console.log(req.body);
    //  res.send(req.body);

     try{
        const newPost = await post.save();
        res.status(201).json(newPost);
     } catch (err){
        res.status(401).json({messsage: err.message});
     }
})
router.patch('/:id', getPost, async (req, res) => {
    if(req.body.title != null){
        res.post.title = req.body.title
    }

    if(req.body.text != null){
        res.post.text = req.body.text
    }

    if(req.body.comments != null){
        res.post.comments = req.body.comments
    }

    if(req.body.publish_status != null){
        res.post.publish_status = req.body.publish_status
    }

    try {
        const updatedPost = await res.post.save();
        res.json(updatedPost);
    } catch(err){
        res.status(400).json({message: err.message});
    }
});

router.delete('/:id', getPost, async (req, res) => {
    try{
        await res.post.remove();
        res.json({message: "Deleted Post"});
    } catch (err){
        res.status(500).json({message: err.message});
    }
})

async function getPost(req, res, next){
    let post

    try{
        post = await Post.findById(req.params.id);
        if (post == null){
            return res.status(404).json({message: "Cannot find subscriber"});
        }
    } catch (err){
        return res.status(500).json({message: err.message});
    };

    res.post = post
    next();
}

module.exports = router;