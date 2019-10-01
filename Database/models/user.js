var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var userSchema = new Schema({
    fname : {type: String},
    lname : {type: String},
    email : {type: String },
    password : {type: String},
    dob : {type: String},
    company : {type: String},
    address : {type: String}
});

module.exports = mongoose.model('User', userSchema);