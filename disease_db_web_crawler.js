var request = require('request-with-cookies');
var cheerio = require('cheerio');

var endpoint = 'http://www.diseasesdatabase.com';

var options = {
    url: endpoint,
    headers: {
        'User-Agent' : 'Mozilla/5.0 (Windows NT 6.2; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/46.0.2490.86 Safari/537.36',
    },
    cookies : [
        {
            name : 'diseasesdatabase',
            content : 'CumulativeHitCount=13&LastVisit=2015%2D11%2D21+21%3A06%3A52&FirstVisit=2015%2D11%2D21+20%3A25%3A29&RecentDDBItems=7431%2C14326%2C7547&GUID=1F4843FE%2D51E2%2D4085%2DA284%2DE9297965A171',
            domain : 'www.diseasesdatabase.com',
            path : '/',
        }
    ]
};

var client = request.createClient(options);

client(endpoint + '/disease_index_a.asp', function(err, res, body){
    if (err) {
        console.log(JSON.stringify(err));
        return ;
    }
    console.log("status = " + res.statusCode);

    var $ = cheerio.load(body);

    var aDiseases = $('#page_specific_content');
   
    aDiseases.each(function(i, a){
        if (a.text){
            console.log(a.text());
        }
    });
     


    console.log(body);
});

