var express = require('express');
var router = express.Router();
var User = require('../models/user');
var async = require('async');
var bcrypt = require("bcrypt");
const passport = require('passport');

//Get all users
router.get('/users', async function(req,res,next){
    try{
        const users = await User.find({username: 'test3' });
        res.json(users);
    } catch(err){
        res.status(500).json({message: err.message});
    }
})

//Sign up users
router.post('/signup', async (req, res, next) => {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    
    const user = new User({
        username: req.body.username,
        password: hashedPassword,
        author: false,
    })

    try{
        const newUser = await user.save();
        res.status(201).json(newUser);
    } catch(err){
        res.status(401).json({message: err.message});
    }

})

//Login users
// router.post('/login', passport.authenticate("local"));
router.post('/login', async (req, res) => {
    // try{
    //     const users = await User.find({username: req.body.username });
    //     res.json(users);
    // } catch(err){
    //     res.status(500).json({message: err.message});
    // }

    const users = await User.find({username: req.body.username });
    if (users == null){
        return res.status(400).send('cannot find user');
    }
    
    try {
        if(await bcrypt.compare(req.body.password, users[0].password)){
            res.json('success');
        } else {
            res.json('not successful');
        }
     } catch (err) {
        res.status(500).json({message: err.message});
    }
    }

 )

module.exports = router