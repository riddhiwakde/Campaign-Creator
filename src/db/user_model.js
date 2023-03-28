var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique : true
    },
    email: {
        type: String,
        required : true,
        unique : true
    },
    password: {
        type: String,
        required : true 
    } ,
    fname: {
        type: String,
        required : true
    },
    mname: {
        type: String,
        required : true
    },
    lname: {
        type: String,
        required : true
    },
    gender: {
        type: String,
        required : true
    },
    contactno: {
        type: Number ,
        required : true,
        unique : true
    },
    address: {
        type: String,
        required : true
    },
    pincode: {
        type: Number ,
        required : true
    },
    bloodgroup: {
        type: String ,
        required : true
    },
    birthdate: {
        type: String ,
        required : true
    } 
});

// Custom validation for email
/*
userSchema.path('email').validate((val) => {
    emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return emailRegex.test(val);
}, 'Invalid e-mail.');*/

const Registration = mongoose.model('user', userSchema);

console.log(Registration,userSchema.obj) ;

module.exports = Registration ; 