var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var PrescriptionSchema = new Schema({
  	doctor : {
        type: [{ 
            type: Schema.Types.ObjectId,
            ref : 'Doctor'
        }],
        default : []
    },

    patient : {
        type: [{ 
            type: Schema.Types.ObjectId,
            ref : 'Patient'
        }],
        default : []
    },
    drug_name : {
    	type : String,
    	required : true
    },

    dosage : {
    	type : String,
    	required : true
    },
    frequency : {
    	type: String,
    	required: true
    },

    date: {

        type : String,
        required : true
    }
});

mongoose.model('Prescription', PrescriptionSchema);

