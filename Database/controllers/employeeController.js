const express = require('express');
const router = express.Router();
var ObjectId = require('mongoose').Types.ObjectId;

//models
var Employee = require('../models/employee');

// get Employee
router.get('/', (req,res) => {
    Employee.find((err, docs) => {
        if(!err)
            res.send(docs)
    });
});

// save Employee(Angular Modal)
router.post('/', (req,res) => {
    var employeeData = new Employee({
        empid : req.body.empid,
        firstname : req.body.firstname,
        lastname : req.body.lastname,
        dob : req.body.dob,
        mobileno : req.body.mobileno,
        city : req.body.city,
        address : req.body.address
    });
    employeeData.save((err, doc) => {
        if(!err){
            res.send(doc)
        }else{    
            res.send('Data Not Found');
        }
    })
});

// get employee by id
router.get('/:id', (req, res) => {
    console.log(req.params.id)
    if(ObjectId.isValid(req.params.id)){
        Employee.findById((req.params.id), (err, doc) => {
          res.send(doc)
        });
    }
    else{
        res.send('Data Not Found');
    }
})

// update employee data by id
router.put('/:id',(req, res) => {
    console.log(req.body)
    if(!ObjectId.isValid(req.params.id)){
       return res.send('Data Not Found');
    }
        else{
            var employeeData = {
                empid : req.body.empid,
                firstname : req.body.firstname,
                lastname : req.body.lastname,
                dob : req.body.dob,
                mobileno : req.body.mobileno,
                city : req.body.city,
                address : req.body.address
            }
        }
        Employee.findByIdAndUpdate(req.params.id, {$set: employeeData}, {new: true}, (err, doc) => {
            if(!err)
                res.send(doc)
            else
              return res.send('Data not Updated');
        });
});

// Delete employee in(Angular Modal)
router.delete('/:id', (req, res) => {
    if(ObjectId.isValid(req.params.id))
        Employee.findByIdAndDelete(req.params.id, (err, doc) => {
            if(!err)
                res.send(doc)
            else
                res.send('Data not found');
        })
});

module.exports = router