//import express from 'express'
var express = require('express')
var app = express()
var bodyParser = require('body-parser')

var mysql = require('mysql') // MySql s
// Passport 인증 관련 모듈 
var passport = require('passport')
var LocalStrategy = require('passport-local').Strategy
var session = require('express-session')
var flash = require('connect-flash')


var router = require('./router/index')
 
app.listen(3000, function(){
    console.log("Start, ! express server on port 3000 !!")
});

// html 파일 (정적파일)에 대한 경로 셋팅
app.use(express.static('public'))
// json 방식일 경우
app.use(bodyParser.json())
// json 방식이 아닐경우 url 인코딩 해서 받는다.
app.use(bodyParser.urlencoded({extended:true}))
app.set('view engine', 'ejs')

// 세션 관련 셋팅
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true
}))

app.use(passport.initialize())
app.use(passport.session())
app.use(flash())


// 라우팅 처리
app.use(router) // 루트 경로
