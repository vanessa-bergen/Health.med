var mongoose = require('mongoose');

var Schema = mongoose.Schema;

// Patient Schema - thanks
var PatientSchema = new Schema({
    password : {
        type : String, 
        required : true
    },
    email : {
        type : String, 
        required : true
    },
    health_card_number : {
        type : String, 
        required : true
    },
    phone_number : {
        type : String,
        required : true
    },
    name_last : {
        type : String,
        required : true
    },
    name_first : {
        type : String,
        required : true
    },
    birthday : {
        date : {
            type : Number,
            required : true,
            min : 1,
            max : 31
        },
        month : {
            type : Number, 
            required : true,
            min : 1,
            max : 12   
        },
        year : {
            type : Number,
            required : true, 
            min : 1900
        }
    },
    gender : {
        type : String
    }
});

mongoose.model('Patient', PatientSchema);
