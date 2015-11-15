var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var MedicationSchema = new Schema ({
    name : {
        type: String,
        required: true       
    },
    dosage_amount : {
        type: Number,
        required: true
        // should this be an integer??
    },
    dosage_unit : {
        type : String, 
        required : true,
        enum : [
            "mg",
            "ug",
            "g"
        ]
    }

});

mongoose.model('Medication', MedicationSchema);
