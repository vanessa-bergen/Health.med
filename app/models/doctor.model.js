var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var DoctorSchema = new Schema ({
    name_first: {
        type: String,
        required: true
    },
    name_last: {
        type: String,
        required: true   
    },
    specilization: {
        type: String,
        required: true
    },
    gender : {
        type : String, 
        required : true,
        enum : [ 
            "male", 
            "female"
        ]
    },
    password : {
        type : String, 
        required : true
    },
    phone_numnber: {
        primary: {
            type: String, 
            required: true
        },
        secondary: {
            type: String,
            required: false
        },
    },
    email: {
        type: String,
        required: true
    },
    address: {
        street: {
            type: String,
            required: true  
        },
        province: {
            type: String,
            required: true,
            enum : [
                'AB', 
                'BC', 
                'MB', 
                'NB', 
                'NL', 
                'NS', 
                'NT', 
                'NU', 
                'ON', 
                'PR', 
                'QC', 
                'SK', 
                'YT'
            ]   
        },
        postal_code: {
            type: String,
            required: true  
        },
        country: {
            type: String,
            enum: [ 
                'CAN'
            ],
            required: true
        }
    },
    
    // relationships
    has_access_to : {
        type : [{
            type : Schema.Types.ObjectId,
            ref : 'Patient'
        }],
        default : []
    },
    invites : {
        type : [{
            type : Schema.Types.ObjectId,
            ref : 'Patient'
        }]
    }
});

mongoose.model('Doctor', DoctorSchema);
