const https = require('https');

function build_key(appid, secret){
    return appid + "|" + secret;
}

module.exports = function token(appid, secret) {
    var getToken = function (db, cb) {
        var key = build_key(appid, secret);
        if (isValid(key)) {
            return cb(_wx_access_token_[key].access_token);
        }
        // 2. refresh token
        return refresh(appid, secret, cb);
    }
    return getToken;
};

function refresh(appid, secret, cb) {
    var url = 'https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=' + appid + '&secret=' + secret;
    https.get(url, (res) => {
        console.log('statusCode:', res.statusCode);
        console.log('headers:', res.headers);

        res.on('data', (d) => {
            d = JSON.parse(d);
            if(d.errcode){
                console.error(d.errmsg);
                return cb(d.errmsg);
            }
            var key = build_key(appid, secret);
            _wx_access_token_[key] = {
                access_token: d.access_token,
                expires_in: new Date().getTime() + (d.expires_in - 10) * 1000
            };
            return cb(_wx_access_token_[key].access_token);
        });

    }).on('error', (e) => {
        console.error(e);
    });
}


function isValid(db, key) {
    var collection = db.collection('wechat-token');
    collection.findOne({"key": key}, function(err, ));
    return _wx_access_token_[key] && new Date().getTime() < _wx_access_token_[key].expires_in;
}