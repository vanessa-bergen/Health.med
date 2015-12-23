var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var SymptomSchema = new Schema ({
    name: {
        type: String,
        required: true    
    },
//    body_section: {
//        type: String,
//        required: true    
//    },        
//    body_sub_section: {
//        type: String,
//        required: true    
//    }    
});

mongoose.model('Symptom', SymptomSchema);
