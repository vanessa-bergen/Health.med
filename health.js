var appScript = require('./config/express.js');
var mongoScript = require('./config/mongoose.js');

var db = mongoScript();
var app = appScript(__dirname);

app.set('port', 3004);

app.listen(app.get('port'), function(){
    console.log('health.js now listening on port ' + app.get('port'));
});
