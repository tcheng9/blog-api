var express = require('express');
var router = express.Router();
var Post = require('../models/post');
var Comment = require('../models/comment');
var async = require('async');
const jwt = require('jsonwebtoken');

/* GET home page */
router.get('/', authenticateToken, async function(req, res, next){
    try {
        const posts = await Post.find();
        res.json(posts);
    } catch (err){
        res.status(500).json({message: err.message});
    }
});

// router.get('/', authenticateToken, async function(req, res, next){
//         res.json(Post);
        
// });

/* GET ONE POST ID */
// router.get('/:id', getPost, function (req, res,) {
//     res.send(res.post.title);
// });

/* POST - (SAVE AN POST TO DB) */
router.post('/', authenticateToken, async function(req, res){
    let currDate = new Date();
    const post = new Post({
        title: req.body.title,
        text: req.body.text,
        // comments: req.body.comments,
        publish_status: req.body.publish_status,
        date: currDate.toString()
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

/* UPDATE A POST*/
router.patch('/:id',authenticateToken,  getPost, async (req, res) => {
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


/* DELETE A POST */
router.delete('/:id',authenticateToken, getPost, async (req, res) => {
    try{
        await res.post.remove();
        res.json({message: "Deleted Post"});
    } catch (err){
        res.status(500).json({message: err.message});
    }
})

router.get('/:id', async(req, res) => {
    let comment
    let post 
    Post.findById(req.params.id).then(post => {
        
        Comment.find({postId: req.params.id}).then(comments => {
            
            res.json({post: post, comments: comments});
        })
    })
    
  
})


/* FUNCTION TO GET POST BY ID */
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


function authenticateToken(req, res, next){
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null) return res.sendStatus(401)

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) return res.sendStatus(403);

        req.user = user;
        next();
    })
    
}

router.post('/:id/comment', authenticateToken, async (req, res) => {
    const comment = new Comment({
        text: req.body.text,
        email: req.body.email,
        postId: req.params.id,
    })

    
    try{
        const newComment = await comment.save();
        res.status(201).json(newComment);
    } catch (err){
        res.status(401).json({message: err.message});
    }
    
})


module.exports = router;