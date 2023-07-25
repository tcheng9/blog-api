var express = require('express');
var router = express.Router();
var User = require('../models/user');
var async = require('async');
var bcrypt = require("bcrypt");
const passport = require('passport');
const jwt = require('jsonwebtoken');

//Get all users
router.get('/users',authenticateToken,  async function(req,res,next){
    try{
        const users = await User.find({username: 'test3' });
        res.json(users);
    } catch(err){
        res.status(500).json({message: err.message});
    }
})

//Sign up users
router.post('/signup', authenticateToken, async (req, res, next) => {
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
router.post('/login', authenticateToken, async (req, res) => {
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
            const currUser = {username: users[0].username}
            
            const accessToken = jwt.sign(currUser, process.env.ACCESS_TOKEN_SECRET);
            
            res.json({accessToken: accessToken});
        } else {
            res.json('not successful');
        }
     } catch (err) {
        res.status(500).json({message: err.message});
    }
    }

 )



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


module.exports = router