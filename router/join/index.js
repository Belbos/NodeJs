var express = require('express')
var app = express()
var router = express.Router();
var path = require('path')
var mysql = require('mysql')

router.get('/', function(req, res){
    console.log('Join js loaded')
    res.sendFile(path.join( __dirname , "../../public/join.html"))
 })
 
 var connection = mysql.createConnection({
    host: 'localhost',
    port : 3306,
    user : 'nodejs',
    password : '1q2w3e4r',
    database : 'nodejs'
});

connection.connect();

 router.post('/', function(req, res){
    var body = req.body;
    var email = body.email;
    var name = body.name;
    var passwd = body.password;
    
    var sql = {email:email, name:name, pw:passwd};
    var query = connection.query('INSERT INTO USER set ?' , sql , function(err, rows){
        if(err)  throw err
        else res.render('welcome.ejs', {'name':name, 'id':rows.insertId} )
        //console.log("OK db insert", rows.insertId, name);
    } )
})


//connection.end();

  
module.exports = router ;