var crypto = require("crypto");
var express = require('express');
var router = express.Router();
var request = require("request");

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
};
var getOpenidByDeviceID = function (db, device_id, cb) {
    var collection = db.collection('wechat-message');
    collection.findOne({msg_type:"bind"}, {sort:[["msg_id", -1]]}, function (err, result) {
        cb(result.open_id);
    });
};
var sendAlertMessage = function(openid, token, status){
    var url = "https://api.weixin.qq.com/cgi-bin/message/template/send?access_token="+token;
    var params =  {
        "touser":openid,
        "template_id":"aN3x24H0uH2I9qatvWt-UcdIUWezhLVByrVeH38uqWQ",
        "url":"http://weixin.qq.com/download",
        "data":{
            "first":{
                "value":"请确认车辆是否安全！",
                "color":"#173177"
            },
            "keyword1":{
                "value":"位置移动",
                "color":"#173177"
            },
            "keyword2": {
                "value":new Date().toLocaleString(),
                "color":"#173177"
            },
            "remark":{
                "value":"感谢使用！",
                "color":"#173177"
            }
        }
    };
    request.post({url: url, json:true, body:JSON.stringify(params)}, function (err, httpResponse, body) {
        console.log(err);
        console.log(body);
    });

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
        var message = req.body;
        saveWechatMessage(db, message, function(){
            console.log("Inserted wechat-message into the collection");
            if(message.msg_type == "notify"){
                getOpenidByDeviceID(db, message.device_id, function (openid) {
                    req.app.locals.getToken(db, function(token){
                        sendAlertMessage(openid, token, message.services.operation_status.status);
                    });
                });
            }
            res.json({error_code: 0, error_msg: "ok"});
        });
    });
    return router;
}

module.exports = wechat;
