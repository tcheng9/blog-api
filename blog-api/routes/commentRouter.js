var express = require('express');
var router = express.Router();
var Comment = require('../models/comment');
var async = require('async');

/* GET comment home page */
router.get('/', async function (req, res, next) {
    try{
        const comments = await Comment.find();
        res.json(comments);
    } catch (err){
        res.status(500).json({message: err.message});
    }
});

/* GET 1 comment home page */
router.get('/:id', getComment, function (req, res,) {
    res.send(res.comment.text);
});

/* POST comment */
router.post('/', async function (req, res) {
    const comment = new Comment({
        text: req.body.text,
        email: req.body.email
    })

    try{
        const newComment = await comment.save();
        res.status(201).json(newComment);
    } catch (err){
        res.status(401).json({message: err.message});
    }
})

//Udate a comment 

router.patch('/:id', getComment, async (req, res, next) => {
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

router.delete('/:id', getComment, async (req, res, next) => {
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


module.exports = router;