var fs = require('fs');

function nextChar(c){
    return String.fromCharCode(c.charCodeAt(0) + 1);
}

function printSymptoms(c){
    fs.readFile("webmd_symptoms.json", 'utf8', function(err, data){
        if (err) {
            console.log(JSON.stringify(err));
        } else {
            var list = JSON.parse(data);
            
            console.log(c);
            
            for (var i = 0; i < list.length; i += 1){
                if (c.toUpperCase() === list[i].name[0].toUpperCase()){
                    console.log("    " + list[i].name);
                }
            }
        }
    });
};

function main(){
    if (process.argv.length >= 3){
        var c = process.argv[2];
        printSymptoms(c);
    } else {
        var currentChar = "A";

        for (var i = 0; i < 26; i += 1){
            printSymptoms(currentChar);
            currentChar = nextChar(currentChar);
        }
    }  
}

main();
