var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var AllergySchema = new Schema({
    name : {
        type : String,
        required : true
    },

    type : {
        type : String,
        required : true
    },

    severity : {
        type : String,
        enum : [
            'mild',
            'moderate',
            'severe'
        ],
        required : true
    },

    exposure_type : {
        type : String,
        required : true
    }
});

mongoose.model('Allergy', AllergySchema);



	
