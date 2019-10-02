var express = require('express');
var router = express.Router();
var User = require('../models/user');

// Employee Daa registration
router.post('/register', (req,res) => {
    User.find({email: req.body.email}).countDocuments((err, count) => {
        if(!err)
            if(count > 0){
                return res.json({status: false, message: 'Email Already Exist'},)
            }
            else{
                var userData = new User({
                    fname: req.body.fname,
                    lname: req.body.lname,
                    email: req.body.email,
                    password: req.body.password,
                    dob: req.body.dob,
                    company: req.body.company,
                    address: req.body.address
                })
                userData.save((err, docs) => {
                    if (!err)
                        return res.json({status: true, message: 'Registered Successfully'})
                    else
                        return res.json({status: false, message: 'Something went wrong'})
                });
            }
            else
                return res.json({status: false, message: 'Something Went Wrong'})
    })
})

//get Registered User
router.get('/', (req,res) => {
    User.find((err, docs) => {
        if(!err){
            res.send(docs);
        }
    });
});

module.exports = router