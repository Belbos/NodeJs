var express = require('express')
var path = require('path')
var mysql = require('mysql');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var app = express();
var router = express.Router();

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
    var msg; 
    var errMsg = req.flash('error')
    if(errMsg) msg = errMsg;
    res.render('join.ejs', {'message':msg})
    //res.render('join.ejs')
 })

 passport.serializeUser(function(user, done){
     console.log('pasport session save : ', user.id)
    done(null, user.id);
 });


 passport.deserializeUser(function(id, done){
    console.log('pasport session get id : ',id)
    done(null, id);
 });

passport.use('local-join', new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback : true
    }, function(req, username, password, done) {
        var query = connection.query('SELECT * FROM USER WHERE email = ?', [email], function(err, rows){
             if(err) return done(err);

             // 같은 이메일이 있는 경우
             if(rows.length){
                 console.log('existed user') 
                 return done(null, false, {message : 'your email is already Used'})
             }else{ // 같은 이메일이 없는 경우
                 var sql = {email:eamil, pw:password};
                 var query = connection.query('INSERT INTO USER SET ? ', sql, function(err,rows){
                     if(err) throw err
                     return done(null, {'email': email, 'id' : rows.insertId})
                 })

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