var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var PrescriptionSchema = new Schema({
    doctor : {
        type :  Schema.Types.ObjectId,
           ref : 'Doctor',
           required : true
    },  
    patient : {
            type: Schema.Types.ObjectId,
            ref : 'Patient',
            required : true
    },
    pharmacy_links : {
        type :[{
            type : Schema.Types.ObjectId,
            ref : 'pharmacyLink'
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
        type : Date,
        required : true
    }
});

mongoose.model('Prescription', PrescriptionSchema);

