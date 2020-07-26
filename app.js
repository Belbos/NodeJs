//import express from 'express'
var express = require('express')
var app = express()
var bodyParser = require('body-parser')
var mysql = require('mysql')

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


// 라우팅 처리
app.use(router) // 루트 경로
