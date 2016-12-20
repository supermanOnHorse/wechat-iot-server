const request = require('request');

function build_key(appid, secret){
    return appid + "|" + secret;
}

module.exports = function token(appid, secret) {
    var getToken = function (db, cb) {
        var key = build_key(appid, secret);
        var collection = db.collection('wechat-token');
        collection.findOne({"key": key}, function(err, doc){
            if (isValid(doc)) {
                cb(doc.access_token);
            }else{
                refresh(appid, secret, collection, cb);
            }
        });
    }
    return getToken;
};

function refresh(appid, secret, collection, cb) {
    var url = 'https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=' + appid + '&secret=' + secret;
    request.get({url: url, json:true}, function (err, httpResponse, body) {
        if(body.errcode){
            console.error(d.errmsg);
            return;
        }
        var key = build_key(appid, secret);
        var doc = {
            key: key,
            access_token: body.access_token,
            expires_in: new Date().getTime() + (body.expires_in - 10) * 1000
        };
        collection.updateOne({key: key}, doc, {upsert:true}, function (err, result) {
            cb(doc.access_token);
        });
    });
}


function isValid(doc) {
    return doc && doc.access_token && new Date().getTime() < doc.expires_in;
}