import * as express from 'express';

//引入mysql数据库配置
let dbConnection=require('../dbConfig');

/******Router方式路由********/
//创建访问的路由
let post_router = express.Router();

//http://127.0.0.1:18000/post/add
post_router.get('/add', (req, res)=> {
    console.log('add请求-------');
    res.end('Router /add');
});

//http://127.0.0.1:18000/post/list
post_router.get('/list', (req, res)=>{
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

module.exports=post_router;