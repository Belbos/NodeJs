var express = require('express')
var app = express()
var router = express.Router();
var path = require('path')

// router
var main = require('./main/main')
var email = require('./email/email')
var join = require('./join/index')
var login = require('./login/index')

router.use('/join', join)
router.use('/main', main)
router.use('/email', email)
router.use('/login', login)


// URL Routing 
router.get('/', function(req, res ){
    //console.log("indexjs / path loaded")
    res.sendFile(path.join( __dirname , "../public/main.html"))
    
});

module.exports = router ;
