var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var TreatmentSchema = new Schema({
    name : { 
        type: String,
        required: true
    };
    instructions : {
        type: String,
        required: true
    };
    refills : {
        type: String
        required: false 
    }

   frequency: {
        type: String
        required: true    
    }
});

mongoose.model('treatment', TreatmentSchema);
