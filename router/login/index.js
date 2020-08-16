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
    console.log('Join js login')
    var msg; 
    var errMsg = req.flash('error')
    if(errMsg) msg = errMsg;
    res.render('login.ejs', {'message':msg})
    
 })

 passport.serializeUser(function(user, done){
     console.log('pasport session save : ', user.id)
    done(null, user.id);
 });


 passport.deserializeUser(function(id, done){
    console.log('pasport session get id : ',id)
    done(null, id);
 });

passport.use('local-login', new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback : true
    }, function(req, username, password, done) {
        console.log("Post 까지 왔나?")
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


router.post('/', function(req, res, next){
    console.log("Post 까지 성공")
    passport.authenticate('local-login', function(err, user, info){
        console.log("local-login 실행이 왜안되는거야?")
        if(err) res.status(500).json(err);
        if(!user) return res.status(401).json(info.message)

        req.login(user, function(err){
            if(err) { return next(err); }
            return res.json(user);
        });
    })
})
/*
router.post('/', passport.authenticate('local-login', {
     successRedirect: '/main',
     failureRedirect: '/join',
     failureFlash: true })
);*/
  
module.exports = router ;