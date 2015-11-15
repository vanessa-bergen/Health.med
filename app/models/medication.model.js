var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var Medication.Schema = new Schema ({
    name : {
        type: String,
        required: true       
    },
    dosage : {
        type: String
        required: true
        // should this be an integer??   
    },

});

mongoose.model('Medication', MedicationSchema);
