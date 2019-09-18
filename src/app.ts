//引入express框架
import * as express from 'express';
import * as morgan from 'morgan';

//引入mysql数据库配置
let dbConnection=require('./dbConfig');
let Router=require('./route/router');

//创建express后台应用
let app = express();

// 中间件
app.use(express.static('./public'));
app.use(morgan());

app.get('/', (req,res)=>{
    //返回的数据
    res.end('express app start');
});


// post为基础路径  http://127.0.0.1:18000/post
// 适用于同一个路由下的多个子路由
app.use('/post', Router);


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

app.listen(1900, ()=>{
    console.log('访问URL：http://127.0.0.1:1900');
});
