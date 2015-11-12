var appScript = require('./config/express.js');

var app = appScript();

app.listen(3004, function(){
    console.log('health.js now listening on port 3004');
});
