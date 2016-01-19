var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var AllergySchema = new Schema({
    name : {
        type : String,
        required : true
    },
    life_threatening : { 
        type : Boolean,
        required : true
    },
    exposure_method : {
        type : String
    },
    symptoms : {
        type: [{     
            type : Schema.Types.ObjectId,
            ref : 'Symptom'
        }],
        default : []
    }
   
});


mongoose.model('Allergy', AllergySchema);



	
