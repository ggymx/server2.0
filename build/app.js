"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//引入express框架
var express = require("express");
// var express = require('express');
// 打印日志的中间件
var morgan = require('morgan');
//引入mysql模块
var mysql = require('mysql');
//引入mysql数据库配置
var db = require('./dbConfig');
//创建一个连接
// var dbConnection=mysql.createConnection(db.mysql);
// //启动连接
// dbConnection.connect();
var connection = mysql.createPool(db.mysql);
connection.getConnection(function (err, res) {
    if (err) {
        console.log('与MySql数据库建立连接失败！');
        console.log('错误信息为：' + err);
    }
    else {
        console.log('连接Mysql成功！', res);
    }
});
//创建express后台应用
var app = express();
// 中间件
app.use(express.static('./public'));
app.use(morgan());
app.get('/', function (req, res) {
    //返回的数据
    res.end('express app start');
});
/******Router方式路由********/
//创建访问的路由
var Router = express.Router();
// post为基础路径  http://127.0.0.1:18000/post
// 适用于同一个路由下的多个子路由
app.use('/post', Router);
//http://127.0.0.1:18000/post/add
Router.get('/add', function (req, res) {
    res.end('Router /add');
});
//http://127.0.0.1:18000/post/list
Router.get('/list', function (req, res) {
    /**
     * req.query  获取get参数
     * req.body   获取post参数
    */
    console.log('接收到的请求数据-------', req.query);
    var posts = [{
            title: '测试1',
            author: '葛干',
            createtime: '2019-2-15',
            likeCount: 100
        },
        {
            title: '测试2',
            author: '杨梦雪',
            createtime: '2019-8-15',
            likeCount: 200
        }
    ];
    var responseData = {
        msg: 'ok',
        posts: posts
    };
    //sql查询
    var sql = 'SELECT * FROM cp';
    connection.query(sql, function (err, result) {
        if (err) {
            console.log('出现错误！', err);
            responseData = {
                msg: 'err',
                posts: null
            };
        }
        else {
            // resolve();
            var list = JSON.parse(JSON.stringify(result));
            console.log('查询list---：', list);
            responseData.posts = list;
            //  res.send(responseData);
        }
    });
    // res.end('Router /list');
    res.send(responseData);
});
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
app.listen(1900, function afterListen() {
    console.log('访问URL：http://127.0.0.1:1900');
});
