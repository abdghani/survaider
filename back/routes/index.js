var express = require('express');
var path = require("path");
var main = require(path.join(__dirname, '..', 'controller', 'main.controller'));
var router = express.Router();

router.get('/', main.alladult);
router.post('/getSkipLimit', main.alladultskiplimit);
router.post('/count', main.count);

module.exports = router;
