//引入express框架
import * as express from 'express';
import * as morgan from 'morgan';

//引入mysql数据库配置
let dbConnection=require('./dbConfig');

//创建express后台应用
let app = express();

// 中间件
app.use(express.static('./public'));
app.use(morgan());

app.get('/', (req,res)=>{
    //返回的数据
    res.end('express app start');
});
/******Router方式路由********/
//创建访问的路由
let Router = express.Router();

// post为基础路径  http://127.0.0.1:18000/post
// 适用于同一个路由下的多个子路由
app.use('/post', Router);

//http://127.0.0.1:18000/post/add
Router.get('/add', (req, res)=> {
    res.end('Router /add');
});

//http://127.0.0.1:18000/post/list
Router.get('/list', (req, res)=>{
    /** 
     * req.query  获取get参数
     * req.body   获取post参数
    */
    console.log('接收到的请求数据-------',req.query);
       let posts=[{
            title:'测试1',
            author:'葛干',
            createtime:'2019-2-15',
            likeCount:100
        },
        {
            title:'测试2',
            author:'杨梦雪',
            createtime:'2019-8-15',
            likeCount:200
        }
    ];
    let responseData={
        msg:'ok',
        posts
    }
    //sql查询
    let sql='SELECT * FROM cp';
    dbConnection.query(sql,(err,result)=>{
        if(err){
            console.log('出现错误！',err);
            responseData={
                msg:'err',
                posts:null
            }
        }else{
        // resolve();
         let list =JSON.parse(JSON.stringify(result));
         console.log('查询list---：',list);
         responseData.posts=list;
        //  res.send(responseData);
        }
    });
    // res.end('Router /list');
    res.send(responseData);
});



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
