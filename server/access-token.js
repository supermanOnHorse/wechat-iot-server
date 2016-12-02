const https = require('https');

const _wx_access_token_ = {};

/*
 * Store token's key as `appid|secret` format, becuase the secret can be updated in MP.
 */
function build_key(appid, secret){
    return appid + "|" + secret;
}

/**
 * return one token.
 */
module.exports = function token(appid, secret) {
    var getToken = function () {
        if(!appid || !secret){
            var err = new Error();
            err.name = 'WechatAccessTokenError';
            return err;
        }
        // 1. Return token if it is valid.
        var key = build_key(appid, secret);
        if (isValid(key)) {
            return _wx_access_token_[key];
        }
        // 2. refresh token
        return refresh(appid, secret);
    }
    return getToken;
};

/**
 * get one new token.
 */
function refresh(appid, secret) {
    var url = 'https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=' + appid + '&secret=' + secret;
    https.get(url, (res) => {
        console.log('statusCode:', res.statusCode);
        console.log('headers:', res.headers);

        res.on('data', (d) => {
            if(d.errcode){
                console.error(d.errmsg);
                return d.errmsg;
            }
            var key = build_key(appid, secret);
            _wx_access_token_[key] = {
                access_token: d.access_token,
                expires_in: new Date().getTime() + (d.expires_in - 10) * 1000
            };
            return _wx_access_token_[key];
        });

    }).on('error', (e) => {
        console.error(e);
    });
}

/**
 * check key is valid.
 */
function isValid(key) {
    return _wx_access_token_[key] && new Date().getTime() < _wx_access_token_[key].expires_in;
}