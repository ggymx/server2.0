"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//引入express框架
var express = require("express");
var morgan = require("morgan");
//引入mysql数据库配置
var dbConnection = require('./dbConfig');
var post_router = require('./route/router');
//创建express后台应用
var app = express();
// 中间件
app.use(express.static('./public'));
app.use(morgan());
app.all('*', function (req, res, next) {
    //解决跨域
    res.header("Access-Control-Allow-Origin", "*");
    // res.header("Access-Control-Allow-Headers", "X-Requested-With");
    // res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    // res.header("X-Powered-By",' 3.2.1')
    // res.header("Content-Type", "application/json;charset=utf-8");
    next();
});
app.get('/', function (req, res) {
    //返回的数据
    console.log('服务已启动------');
    res.end('express app start');
    //   res.sendFile('D:/server2.0/build/view/index.html');
});
//http://127.0.0.1:1360/login?username='gg'&&pwd='gegan'
app.get('/login', function (req, res) {
    console.log('登录请求-----', req.body);
    var username = req.query.username;
    var pwd = req.query.pwd;
    if (!username || !pwd) {
        console.log('未获取有效参数！-----');
        res.json({ msg: '缺失username或pwd' });
        // res.end('');
        return;
    }
    console.log('用户名：', typeof username);
    console.log('密码：', pwd);
    var sql = "SELECT COUNT(*),userId FROM user_test WHERE username='" + username + "' AND pwd='" + pwd + "'";
    console.log('sql语句-----', sql);
    dbConnection.query(sql, function (err, result) {
        if (err) {
            console.log('出现异常----', err);
        }
        else {
            console.log('查询结果-----', result[0].userId);
            var userId = result[0].userId;
            res.json({ msg: 'ok', userId: userId }); //json可以实现跨域（同源策略不拦截script）缺点：只适用于get请求
            // res.json({msg:'ok',userId})
        }
    });
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
app.listen(1800, function () {
    console.log('访问URL：http://127.0.0.1:1800');
});
// var debug = require('debug')('my-application'); // debug模块
// app.set('port', process.env.PORT || 3000); // 设定监听端口
// //启动监听
// var server = app.listen(app.get('port'), function() {
//   debug('Express server listening on port ' + server.address().port);
// });
