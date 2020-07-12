//import express from 'express'
var express = require('express')
var app = express()
var bodyParser = require('body-parser')

app.listen(3000, function(){
    console.log("Start, ! express server on port 3000 !!")

});

app.use(express.static('public'))
// json 방식일 경우
app.use(bodyParser.json())
// json 방식이 아닐경우 url 인코딩 해서 받는다.
app.use(bodyParser.urlencoded({extended:true}))

app.set('view engine', 'ejs')

//app.set("views", path.join(__dirname, "views"));

// URL Routing 
app.get('/', function(req, res ){
    //res.send("<h1>hi friend!</h1>")
    res.sendFile(__dirname + "/public/main.html")
})

app.get('/main', function(req, res ){
    res.sendFile(__dirname + "/public/main.html")
})

app.post('/email_post', function(req, res){
   //  get : req.param(email)
   //  post : req.body
    console.log(req.body.email)    
    res.render('email.ejs', {email:req.body.email} )
})


app.post('/ajax_send_email', function(req, res){
    //console.log(req.body.email)
    var responseData = {'resule': 'ok', 'email' : req.body.email}
    res.json(responseData)
    //res.render('email.ejs', {email:req.body.email} )
})
