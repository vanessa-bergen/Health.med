var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var AppointmentSchema = new Schema({
    with_doctor : {
        type : Schema.Types.ObjectId,
        ref : 'Doctor',
        required : true
    },
    about_patient : {
        type : Schema.Types.ObjectId,
        ref : 'Patient',
        required : true
    },
    notes: {
        type : String,
        required : true
    },
    height : {
        type : Number,
        required : true
    },
    
    weight : {
        type : Number,
        required : true
    },

    blood_pressure : {
        type : Number,
        required : true
    },

    smoking : {
        type : Boolean,
        required : true
    },
     
    date : {
        day : {
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
            required : true
        }
    }
});

mongoose.model('Appointment', AppointmentSchema);

     
        
