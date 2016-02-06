var mongoose = require('mongoose');

var Schema = mongoose.Schema;

TestResultSchema = new Schema ({
    // relationships
    patient_id : {
        type : Schema.Types.ObjectId,
        required : true
    },
    date : {
        day: {
            type: Number,
            required: true,
            min: 1,
            max: 31
        },
        month: {
            type: Number,
            required: true,
            min: 1,
            max: 12    
        },
        year: {
            type: Number,
            required: true,
            min: 1
        }
    },    
    red_blood_cell_count : {
        type : Number, // units = trillion cells/L
        required : true
    },
    hemoglobin : {
        type : Number, // units = grams/dL
        required : true
    },
    hemotocrit : {
        type : Number, // units = percent
        required : true
    },
    white_blood_cell_count : {
        type : Number, // units = billions cells/L
        required : true
    },
    platelet_count : {
        type : Number, // units = billion/L
        required : true
    }
}); 

mongoose.model('TestResult', TestResultSchema);
