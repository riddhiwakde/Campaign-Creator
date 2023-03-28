var mongoose = require('mongoose');

var campSchema = new mongoose.Schema({
    
    username: {
        type: String,
        required: true,
    },
    campname: {
        type: String,
        required: true,
        unique : true
    },
    date: {
        type: String,
        required : true,
    },
    start_time: {
        type: String,
        required : true 
    } ,
    maxmemb: {
        type: Number ,
        required : true
    },
    address: {
        type: String,
        required : true
    },
    long1 : {
        type: String,
        required : true
    },
    lat1: {
        type: String,
        required : true
    },
    payment_status : {
        type: String 

    },
    regmemb : {
        type : Number ,
        required :true 
    },
    approvation: {
        type: String,
        required : true
    }
    
});



const Campaign = mongoose.model('camp', campSchema);

console.log(Campaign,campSchema.obj) ;

module.exports = Campaign