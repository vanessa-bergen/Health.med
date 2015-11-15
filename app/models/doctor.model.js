var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var DoctorSchema = new Schema ({
    name_first: {
        type: String
        required: true
     },
    name_last: {
        type: String
        required: true   
    },
    specilization: {
         type: String
         required: true
    },
    phone_numnber: {
        cell: {
            type: String 
            required: true
        },
       home: {
           type: String
           required: false
        },
       work: {
           type: String
           required: false
       }     
    },
    email: {
        type: String
        required: true
    },
   address: {
        street: {
            type: String
            required: true  
        },
        province: {
            type: String
            required: true
            enum : {'AB', 'BC', 'MB', 'NB', 'NL', 'NS', 'NT', 'NU', 'ON', 'PR', 'QC', 'SK', 'YT'}   
       },
        postal_code: {
            type: String
            required: true  
        },
        country: {
            type: String
            enum: {'CAN'}
            required: true
        }
     }
});

mongoose.model('Doctor', DoctorSchema);
