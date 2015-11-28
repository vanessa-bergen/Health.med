var request = require('request-with-cookies');
var cheerio = require('cheerio');
var fs = require('fs');

var endpoint = 'http://www.mayoclinic.org/';

var cookieContent = 'd4ie5omoerb2w5iw5o2r0rqk'; 

var options = {
    url: endpoint,
    headers: {
        'User-Agent' : 'Mozilla/5.0 (Windows NT 6.2; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/46.0.2490.86 Safari/537.36',
    },
    cookies : [
        {
            name : 'ASP.NET_SessionId',
            content : cookieContent,
            domain : 'www.diseasesdatabase.com',
            path : '/',
        }
    ]
};

var client = request.createClient(options);

var get = function(indexChar){
    console.log("get(" + indexChar + ")");
    if (indexChar){
        client(endpoint + '/diseases-conditions/index?letter=' + indexChar, 
            function(err, res, body){
            var urlStrings = "";

            if (err) {
                console.log(JSON.stringify(err));
                return ;
            }
            console.log("status = " + res.statusCode);
            var $ = cheerio.load(body);

            var aDiseases = $('#index').children('ol').children('li');
            
            console.log('Getting ' + indexChar +  'links...');

            var count = 0;
            aDiseases.each(function(){
                if ($(this).children('a')){
                    var as = $(this).children('a');

                    as.each(function(){ 
                        urlStrings += $(this).attr('href') + '\n';
                        count += 1;
                        console.log("    " + count);
                    });
                }
            });

            writeDiseaseUrls(indexChar, urlStrings);
        });
    }
};

var writeDiseaseUrls = function(c, text){
    var filename = c + ".json";
    console.log('Writing file ' + filename);

    var json = '[\n';
    var urls = text.split('\n');
    for (var i = 0; i < urls.length; i += 1){
        if (urls[i] && urls[i].length > 0){
            json += "'" + urls[i] + "',\n";
        }
    }
    json += "]";

    fs.writeFile(__dirname + "/data/" + filename, json, function(err){
        if (err){
            console.log("Error writing " + filename + ":");
            console.log(JSON.stringify(err));
        } else {
            console.log(filename + " successfully saved. :)");
        }
    });
};


var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
var delay = 1000;

console.log(characters);

for (var i = 0; i < characters.length; i += 1){
    setTimeout(function(index, character){
        console.log(index + " " + character);
        get(character);
    }, delay, i, characters.charAt(i));

    delay += (Math.random() * 1000 * 10 + 10000);
}
