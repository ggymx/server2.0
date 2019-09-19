"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//引入express框架
var express = require("express");
var morgan = require("morgan");
//引入mysql数据库配置
// let dbConnection=require('./dbConfig');
var post_router = require('./route/router');
//创建express后台应用
var app = express();
// 中间件
app.use(express.static('./public'));
app.use(morgan());
app.get('/', function (req, res) {
    //返回的数据
    res.end('express app start');
});
// post为基础路径  http://127.0.0.1:18000/post
// 适用于同一个路由下的多个子路由
app.use('/post', post_router);
// 适合定义RESTful API
//http://127.0.0.1:18000/article
app.route('/article')
    .get(function (req, res) {
    res.end('route /articl get\n');
})
    .post(function (req, res) {
    res.end('route /articl post');
});
// http:127.0.0.1:18000/news/123
// 路由参数
/**
 * next:函数下一步要执行的参数
 * newsId：路由参数
 * */
app.param('newsId', function (req, res, next, newsId) {
    console.log('param newsid:' + newsId);
    req.newsId = newsId;
    next();
});
app.get('/news/:newsId', function (req, res) {
    console.log('监听请求：/news/:newsId:');
    res.end('newsId:' + req.newsId + '\n');
});
app.listen(1900, function () {
    console.log('访问URL：http://127.0.0.1:1900');
});
