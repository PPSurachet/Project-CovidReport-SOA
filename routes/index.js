var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index');
});

router.get('/map', function (req, res, next) {
  res.render('map');
});

router.get('/table', function (req, res, next) {
  res.render('tables');
});

module.exports = router;
