var crypto = require("crypto");

var checkSignature = function (signature, timestamp, nonce, token) {

    var shasum = crypto.createHash('sha1');
    var arr = [token, timestamp, nonce].sort();
    shasum.update(arr.join(''));

    return shasum.digest('hex') === signature;
};



var wechat = function(config){
    return function (req, res) {
        if(req.method == "GET"){
            if(req.query.method == 'getToken'){
                req.app.locals.getToken(function(token){
                    res.send(token);
                })

            }
            if(checkSignature(req.query.signature, req.query.timestamp, req.query.nonce, config.token)){
                res.send(req.query.echostr);
            }else{
                res.send("error");
            }
        }else{
            var db = req.app.locals.db;
            var collection = db.collection('wechat-message');
            collection.insertOne(req.body, function(err, result) {
                console.log("Inserted wechat-message into the collection");
                res.json({error_code: 0, error_msg: "ok"});
            });
        }
    }

}

module.exports = wechat;
