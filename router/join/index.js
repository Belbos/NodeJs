var express = require('express')
var app = express()
var router = express.Router();
var path = require('path')
var mysql = require('mysql');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

 var connection = mysql.createConnection({
    host: 'localhost',
    port : 3306,
    user : 'nodejs',
    password : '1q2w3e4r',
    database : 'nodejs'
});

connection.connect();

router.get('/', function(req, res){
    console.log('Join js loaded')
    res.render('join.ejs')
 })

passport.use('local-join', new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback : true
    }, function(req, username, password, done) {
        console.log('뭐야 왜 이거 안찍히냐고');
        var query = connection.query('select * from user where email = ?', [email], function(err,rows){
             if(err) return done(err);

             if(rows.length){
                 console.log('existed user')
                 return done(null, false, {message : 'your email is already Userd'})
             }else{

             }
        })
        console.log('local-join callback called');
    }
));

router.post('/', passport.authenticate('local-join', {
     successRedirect: '/main',
     failureRedirect: '/join',
     failureFlash: true })
);
  
module.exports = router ;