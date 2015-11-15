var mongoose = require('mongoose');

var Schema = mongoose.Schema;

TestResultSchema = new Schema ({
    date: {
        day: {
            type: Number
            required: true
            min: 1
            max: 31
        },

        month: {
            type: Number
            required: true
            min: 1
            max: 12    
        },
        year: {
            type: Number
            required: true
            min: 1
        },
      
    },    
    files : {
        type: String
        required: true   
    }
});

mongoose.model('TestResults', TestResultSchema);
