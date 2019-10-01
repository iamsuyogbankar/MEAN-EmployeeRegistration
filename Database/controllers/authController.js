const express = require('express');
var router = express.Router();
var User = require('../models/user');
const jwt = require('jsonwebtoken');

//sign code using JWT web token
router.post('/signin', (req, res) => {
    if(!req.body.email){
        return res.json({ status: false, message: 'Email not Provided'})
    }else{
        if(!req.body.password) {
            return res.json({ status: false, message: 'Password not Provided'})
        } else {
            console.log('comming')
            User.findOne({email: req.body.email, password: req.body.password}, (err, doc) => {
                if(err) {
                    return res.json({ status: false, message: 'Something went wrong' })
                }else{
                    if(!doc){
                        return res.json({status: false, message: 'Wrong Credentials'})
                    }else{
                        const token = jwt.sign({ userId : doc._id }, 'shhhhh', {expiresIn: '24h'})
                        return res.json({status: true, message: 'Logged in', token: token, user: {username: doc.name, id: doc._id}});
                    }
                }
            })
        }
    }
});

// signin token code(token match or not)
router.use((req, res, next) => {
    const token = req.headers['authorization'];
    if(!token) {
        res.json({status: false, message: 'Token Not Found'})
    }else{
        jwt.verify(token, 'shhhhh', (err, decoded) => {
            if(err){
                res.json({status: false, message: 'Token Invalid: '+err})
            }else{
                req.decoded = decoded;
                next();
            }
        });
    }
});

module.exports = router



