var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/login', function(req, res) {
  res.render('login');
});
router.get('/register', function(req, res){
	res.render('register')
})

module.exports = router;
