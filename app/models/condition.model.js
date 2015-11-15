var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var ConditionSchema = new Schema({
    name : {
        type : String,
        required : true
    },

    description : {
        type : String,
        required : true
    }
});

mongoose.model('Condition', ConditionSchema);

