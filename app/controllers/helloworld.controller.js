module.exports = function(){
    
    var c = {};
    
    c.say = function(req, res){
        console.log('helloworld controller - say()');
        res.send("hello world");
    }

    c.sayJson = function(req, res){
        console.log('helloworld controller - sayJson()');
        res.json({ hello : "world" });

    }

    c.index = function(req, res){
        

        console.log('    index');
        if (req.user_id != undefined) {
            res.send("you have param'd " + req.user_id);
        } else if (req.query.user_id){
            res.send('you have queried "' + req.query.user_id + '"');
        } else {
            res.sendFile('/home/chris/_NodeJs/Health.js/app/views/index.html');
        }
    }

    c.index_user_id = function(req, res, next, user_id){
        console.log('    index_user_id');

        req.user_id = user_id;
        next();
    }

    return c;
}

