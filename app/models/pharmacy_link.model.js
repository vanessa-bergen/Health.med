var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var pharmacyLinkSchema = new Schema({
    prescription : {
    	type: [{ 
            type: Schema.Types.ObjectId,
            ref : 'Prescription'
        }],
        default : []
    },

    date_generated : {
        type : Date,
        required : true,
        default : Date.now
    }

});

mongoose.model('pharmacyLink', pharmacyLinkSchema);
