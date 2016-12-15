var crypto = require("crypto");
var express = require('express');
var router = express.Router();

var checkSignature = function (signature, timestamp, nonce, token) {

    var shasum = crypto.createHash('sha1');
    var arr = [token, timestamp, nonce].sort();
    shasum.update(arr.join(''));

    return shasum.digest('hex') === signature;
};
var saveWechatMessage = function(db, message, callback){
    var collection = db.collection('wechat-message');
    collection.insertOne(message, function(err, result) {
        callback();
    });
}
var sendAlertMessage = function(token){
    var url = "https://api.weixin.qq.com/cgi-bin/message/template/send?access_token="+token;

}


var wechat = function(config){
    router.get('/', function (req, res) {
        if(checkSignature(req.query.signature, req.query.timestamp, req.query.nonce, config.token)){
            res.send(req.query.echostr);
        }else{
            res.send("error");
        }
    });
    router.post('/', function (req, res) {
        var db = req.app.locals.db;
        saveWechatMessage(db, req.body, function(){
            console.log("Inserted wechat-message into the collection");
            if(req.body.msg_type == "notify"){
                if(req.body.status == 0){
                    req.locals.getToken()
                }
            }
            res.json({error_code: 0, error_msg: "ok"});
        });
    });
    return router;
}

module.exports = wechat;
