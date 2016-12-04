var express = require('express');
var router = express.Router();
const https = require('https');

var findDevices = function(db, callback) {
    // Get the documents collection
    var collection = db.collection('device');
    // Find some documents
    collection.find({}).toArray(function(err, devices) {
        console.log("Found the following records");
        console.log(devices)
        callback(devices);
    });
}

var getDevice = function(db, token, product_id, callback){
    var url = 'https://api.weixin.qq.com/device/getqrcode?access_token=' + token + '&product_id=' + product_id;
    https.get(url, (res) => {
        console.log('statusCode:', res.statusCode);
        console.log('headers:', res.headers);

        res.on('data', (d) => {
            d = JSON.parse(d);
            if(d.base_resp.errorcode != 0){
                console.error(d.base_resp.errmsg);
            }else{
                var collection = db.collection('device');
                delete d.resp_msg;
                collection.insertOne(d, function(err, r) {
                    console.log(err);
                    console.log(r);
                    callback({error_code: 0, error_msg: "ok"});
                });
            }

        });

    }).on('error', (e) => {
        console.error(e);
    });
}

router.get('/_all', function(req, res) {
    var db = req.app.locals.db;
    findDevices(db, function(devices) {
        res.json(devices);
    });
});
router.get('/:product_id/_init', function (req, res) {
    var db = req.app.locals.db;
    req.app.locals.getToken(function (token) {
        getDevice(db, token, req.params.product_id, function (result) {
            res.json(result);
        })
    });
});

module.exports = router;
