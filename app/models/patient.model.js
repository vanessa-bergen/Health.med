var mongoose = require('mongoose');

var Schema = mongoose.Schema;

// Patient Schema - thanks
var PatientSchema = new Schema({
    password : {
        type : String, 
        required : true
    },
    email : {
        type : String, 
        required : true
    },
    health_card_number : {
        type : String, 
        required : true,
        unique : true
    },
    phone_number : {
        primary : {
            type : String,
            required : true
        },
        secondary : {
            type : String
        },
    },
    name_last : {
        type : String,
        required : true
    },
    name_first : {
        type : String,
        required : true
    },
    birthday : {
        type : Date,
        required : true
    },
    address : {
        type : {
            street : {
                type : String,
                required : true
            },
            city : {
                type : String,
                required : true
            },
            province : {
                type : String,
                required : true,
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
                    'PE',
                    'QC',
                    'SK',
                    'YT' 
                ]
            },
            postal_code : {
                type : String,
                required : true
            },
            country : {
                type: String, 
                enum : [
                    'CAN'
                ],
                required : true
            }
        },
        required : true
    },
    gender : {
        type : String,
        required : true,
        enum : [
            "male",
            "female"
        ]
    },
    emergency_contact : {
        type : {
            name : {
                type : String,
                required : true
            }, 
            phone_number : {
                type : String, 
                required : true
            },
            relationship : {
                type : String, 
                required : true
            }
        }, 
		required : true
    },
   
    // relationships
    allergies : {
        type : [{
            type : Schema.Types.ObjectId,
            ref : 'Allergy'
        }],
        default : []
    },

    requests : {
        type: [{ 
            type: Schema.Types.ObjectId,
            ref : 'Doctor'
        }],
        default : []
    }


});
 
mongoose.model('Patient', PatientSchema);
