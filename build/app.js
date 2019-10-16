"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//引入express框架
var express = require("express");
var morgan = require("morgan");
var LoginService_1 = require("./services/LoginService");
//引入mysql数据库配置
// let dbConnection=require('./dbConfig');
//Inject路由
var injectR = require('./route/router');
var bodyParser = require('body-parser');
//创建express后台应用
var app = express();
// 中间件
app.use(express.static('./public'));
app.use(morgan());
//POST请求在 express 中不能直接获得，需要安装 body-parser模块
// parse application/x-www-form-urlencoded  
app.use(bodyParser.urlencoded({ extended: false })); //这行代码也必须添加   
// parse application/json  
app.use(bodyParser.json());
var loginServices = new LoginService_1.default();
app.all('*', function (req, res, next) {
    //解决跨域
    res.header("Access-Control-Allow-Origin", "*");
    //为什么vue启动得服务还需要加上这句
    res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
    //预检请求发送的间隔
    res.header("Access-Control-Max-Age", "3600");
    //允许远程网页嵌套iframe
    res.header("x-frame-options", "SAMEORIGIN");
    //安全考虑，不在客户端显示服务器信息
    res.header("X-Powered-By", ' 3.2.1');
    res.header("Access-Control-Allow-Methods", "POST,GET");
    // res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    // res.header("Access-Control-Allow-Headers", " X-Requested-With");
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
app.post('/login', loginServices.login);
// post为基础路径  http://127.0.0.1:18000/post
// 适用于同一个路由下的多个子路由
app.use('/inject', injectR);
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
app.listen(8070, function () {
    console.log('访问URL：http://127.0.0.1:8070');
});
// var debug = require('debug')('my-application'); // debug模块
// app.set('port', process.env.PORT || 3000); // 设定监听端口
// //启动监听
// var server = app.listen(app.get('port'), function() {
//   debug('Express server listening on port ' + server.address().port);
// });
