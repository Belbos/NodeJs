var express = require('express')
var app = express()
var router = express.Router();
var path = require('path')
var mysql = require('mysql')

var connection = mysql.createConnection({
    host: 'localhost',
    port : 3306,
    user : 'nodejs',
    password : '1q2w3e4r',
    database : 'nodejs'
});

connection.connect();


router.post('/form', function(req, res){
    //  get : req.param(email)
    //  post : req.body
     console.log(req.body.email)    
     res.render('email.ejs', {email:req.body.email} )
 })
 
 
 router.post('/ajax', function(req, res){
    var email = req.body.email;
    var responseData = {};

    var query = connection.query('SELECT NAME FROM USER WHERE EMAIL = "'+ email +'"', function(err, rows){
        if(err) throw err;

        if(rows[0]){
            responseData.result = "OK";
            responseData.name = rows[0].NAME;            
        }else{
            responseData.result = "OK";
            responseData.name = "Data Not Found";
        }
        res.json(responseData)
    })
 })
 

module.exports = router ;