var express = require('express');
var router = express.Router();
var Comment = require('../models/comment');
var async = require('async');
const { default: mongoose } = require('mongoose');
const jwt = require('jsonwebtoken');
// router.post('/post/:id/comment', async (req, res) => {
//     const comment = new Comment({
//         text: req.body.text,
//         email: req.body.email,
//         postId: req.params.id,
//     })

    
//     try{
//         const newComment = await comment.save();
//         res.status(201).json(newComment);
//     } catch (err){
//         res.status(401).json({message: err.message});
//     }
    
// })


/* GET comment home page */
router.get('/', authenticateToken, async function (req, res, next) {
    try{
        const comments = await Comment.find();
        res.json(comments);
    } catch (err){
        res.status(500).json({message: err.message});
    }
});

/* GET 1 comment home page */
router.get('/:id',authenticateToken,  getComment, function (req, res,) {
    res.send(res.comment.text);
});

/* POST comment */
// router.post('/', authenticateToken, async function (req, res) {
//     const comment = new Comment({
//         text: req.body.text,
//         email: req.body.email
//     })

//     try{
//         const newComment = await comment.save();
//         res.status(201).json(newComment);
//     } catch (err){
//         res.status(401).json({message: err.message});
//     }
// })

//Udate a comment 

router.patch('/:id', authenticateToken, getComment, async (req, res, next) => {
    if(req.body.text != null){
        res.comment.text = req.body.text;
    }

    if (req.body.email != null){
        res.comment.email = req.body.email;
    }

    try {
        const updatedComment = await res.comment.save();
        res.json(updatedComment);
    } catch (err) {
        res.status(400).json({message: err.message});
    }
})

//Delete a comment

router.delete('/:id',authenticateToken, getComment, async (req, res, next) => {
    try {
        await res.comment.remove();
        res.json({message: "Deleted comment"});
    } catch (err){
        res.status(500).json({message: err.message});
    }
})


async function getComment(req, res,next){
    let comment;

    try{
        comment = await Comment.findById(req.params.id);
        if (comment == null){
            return res.status(404).json({message: "cannot find comment"})
        }
    } catch (err){
        return res.status(500).json({message: err.message});
    }
    res.comment = comment;
    next();
}


function authenticateToken(req, res, next){
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1];
    
     
    if (token == null) return res.sendStatus(401).json({message: "token is null"})
    

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) return res.sendStatus(403);

        req.user = user;
        next();
    })
    
}


////AUGUST 2023 REVISION
//CUSTOM COMMENT PATH
/* POST comment */
/* POST comment */
router.post('/', authenticateToken, async function (req, res) {
    const comment = new Comment({
        text: req.body.text,
        email: '',
        postId: req.body.postId,
        username: 'placeholder'
    })

    try{
        const newComment = await comment.save();
        res.status(201).json(newComment);
    } catch (err){
        res.status(401).json({message: err.message});
    }
})

module.exports = router;