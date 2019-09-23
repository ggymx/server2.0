//引入express框架
import * as express from 'express';
import * as morgan from 'morgan';

//引入mysql数据库配置
let dbConnection=require('./dbConfig');
let post_router=require('./route/router');

//创建express后台应用
let app = express();

// 中间件
app.use(express.static('./public'));
app.use(morgan());


app.all('*',function (req, res, next) {
    //解决跨域
    res.header("Access-Control-Allow-Origin", "*");
    // res.header("Access-Control-Allow-Headers", "X-Requested-With");
    // res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    // res.header("X-Powered-By",' 3.2.1')
    // res.header("Content-Type", "application/json;charset=utf-8");
    next();
  });

app.get('/', (req,res)=>{
    //返回的数据
    console.log('服务已启动------');
    res.end('express app start');
    //   res.sendFile('D:/server2.0/build/view/index.html');
});

//http://127.0.0.1:1360/login?username='gg'&&pwd='gegan'
app.get('/login',(req,res)=>{
        console.log('登录请求-----',req.body);
        let username=(req.query as any).username
        let pwd=(req.query as any).pwd;
        if(!username || !pwd){
            console.log('未获取有效参数！-----');
            res.json({msg:'缺失username或pwd'});
            // res.end('');
            return;
        }
        console.log('用户名：',typeof username);
        console.log('密码：',pwd);
        let sql=`SELECT COUNT(*),userId FROM user_test WHERE username='${username}' AND pwd='${pwd}'`;
        console.log('sql语句-----',sql);
        dbConnection.query(sql,(err,result)=>{
            if(err){
                console.log('出现异常----',err);
            }else{
                console.log('查询结果-----',result[0].userId);
                let userId=result[0].userId
                res.json({msg:'ok',userId});//json可以实现跨域（同源策略不拦截script）缺点：只适用于get请求
                // res.json({msg:'ok',userId})
            }
        })
        
});

// post为基础路径  http://127.0.0.1:18000/post
// 适用于同一个路由下的多个子路由
app.use('/post', post_router);


// 适合定义RESTful API
//http://127.0.0.1:18000/article
app.route('/article')
    .get((req, res)=>{
        res.end('route /articl get\n');
    })
    .post((req, res)=>{
        res.end('route /articl post');
    });

// http:127.0.0.1:18000/news/123
// 路由参数
/**
 * next:函数下一步要执行的参数
 * newsId：路由参数
 * */
app.param('newsId', (req, res, next, newsId)=> {
    console.log('param newsid:'+newsId);
    (req as any).newsId = newsId;
    next();
});

app.get('/news/:newsId', (req, res)=>{
    console.log('监听请求：/news/:newsId:');
    res.end('newsId:'+(req as any).newsId+'\n');
});

app.listen(1800, ()=>{
    console.log('访问URL：http://127.0.0.1:1800');
});



// var debug = require('debug')('my-application'); // debug模块
// app.set('port', process.env.PORT || 3000); // 设定监听端口
 
// //启动监听
// var server = app.listen(app.get('port'), function() {
//   debug('Express server listening on port ' + server.address().port);
// });

