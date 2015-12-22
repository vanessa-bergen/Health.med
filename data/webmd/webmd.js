var request = require('request-with-cookies');
var cheerio = require('cheerio');
var fs = require('fs');

var ENDPOINT = "http://symptomchecker.webmd.com/symptoms-a-z";

var cookies = [
    {
        name : 's_cc',
        value : 'true',
        domain : '.symptomchecker.webmd.com',
        path : '/'
    },
    {
        name : 's_fid',
        value : '79891EDA5D1B01D9-2C69F0DB9B62586E',
        domain : '.symptomchecker.webmd.com', 
        path : '/'
    },
    {
        name : 's_sq',
        value : 'webmdp1global%3D%2526pid%253Dsymptomchecker.webmd.com%25252Fcoresc-az%25252Fsymptoms-a-z%2526pidt%253D1%2526oid%253Dhttp%25253A%25252F%25252Fsymptomchecker.webmd.com%25252Fsymptoms-a-z%252523%2526ot%253DA',
        domain : '.symptomchecker.webmd.com',
        path : '/'
    }
];

var options = {
    url : ENDPOINT,
    headers : {
        'User-Agent' : 'Mozilla/5.0 (Windows NT 6.2; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/46.0.2490.86 Safari/537.36', 
    },
    cookies : cookies
};

function nextChar(c){
    return String.fromCharCode(c.charCodeAt(0) + 1);
};

var client = request.createClient(options);

console.log("Requesting...");

client(ENDPOINT, function(err, res, body){
    if (err) {
        console.log("Error: " + JSON.stringify(err));
    } else {
        console.log("Success: " + res.statusCode);
        
        var $ = cheerio.load(body);
        var currentChar = "A";
        var symptoms = [];

        for (var i = 0; i < 26; i += 1){
            var list = $('#list_' + currentChar).children('ol');
            
            list.each(function(){
                var li = $(this).children('li');

                li.each(function(){
                    symptoms.push($(this).text());
                });
            });

            currentChar = nextChar(currentChar);
        }
        
        writeSymptomsJson("webmd_symptoms", symptoms);
    }
});

var writeSymptomsJson = function(character, symptomsList){
    var filename = character + ".json";
    console.log('Writing file ' + filename);

    fs.writeFile(__dirname + "/" + filename, JSON.stringify(symptomsList),
    function(err){
        if (err){
            console.log("Error writing " + filename + ":");
            console.log(JSON.stringify(err));
        } else {
            console.log(filename + " successfully written");
        }
    });
};
