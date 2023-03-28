var mongoose = require('mongoose');

var joincampSchema = new mongoose.Schema({
    
    username: {
        type: String,
        required: true
    },
    join1: {
        type: Object ,
        required: true,
        unique : true
    },
    campname: {
        type: String,
        required: true
    },
    date:{
        type : String,
        required : true
    },
    email:{
        type: String,
        
    },
    fname:{
        type: String,
        required: true
    },
    lname:{
        type: String,
        required: true
    },
    status:{
        type: String,
        required: true
    }
    
});

// Custom validation for email
/*
userSchema.path('email').validate((val) => {
    emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return emailRegex.test(val);
}, 'Invalid e-mail.');*/

const Joincamp = mongoose.model(    'joincamp', joincampSchema);

console.log(Joincamp,joincampSchema.obj) ;

module.exports = Joincamp