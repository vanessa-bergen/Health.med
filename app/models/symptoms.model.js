var mongooose = require('mongoose');

var Schema = mongoose.Schema;

var SymptomsSchema = new Schema ({
    name: {
        type: String
        required: true    
    },
    body_seciton: {
        type: String
        required: true    
    },        
    body_sub_section: {
        type: String
        required: true    
    }    
});

mongoose.model('Symptoms', SymtpomsSchema);
