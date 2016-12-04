var express = require('express');
var router = express.Router();

var findProducts = function(db, callback) {
    // Get the documents collection
    var collection = db.collection('product');
    // Find some documents
    collection.find({}).toArray(function(err, docs) {
        console.log("Found the following records");
        console.log(docs)
        callback(products);
    });
}

router.get('/_all', function(req, res) {
    var db = req.app.locals.db;
    findProducts(db, function(products) {
        res.json(products);
    });
});

module.exports = router;
