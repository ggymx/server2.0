import * as express from 'express';
import InjectService from '../services/InjectService';
//引入mysql数据库配置
import dbConnection from '../DBConnection';
// let dbConnection=require('../dbConfig');

//创建访问的路由
let injectR = express.Router();
let injectService = new InjectService(); 
//http://127.0.0.1:18000/post/add
injectR.get('/add', (req, res)=> {
    console.log('add请求-------');
    res.end('Router /add');
});

//http://127.0.0.1:18000/post/list   req.query  获取get参数  req.body   获取post参数
// injectR.get('/query', (req, res)=>{
//     console.log('接收到的请求数据-------',req.query);
//     let sql='SELECT * FROM inject_test';
//     dbConnection.query(sql,(err,result)=>{
//         if(err){
//             console.log('出现错误！',err);
//             res.send(err)
//         }else{
//         // resolve();
//          let list =JSON.parse(JSON.stringify(result));
//          console.log('查询list---：',typeof list);
//            res.send(list)
//         }
//     });
// });

injectR.get('/query',injectService.queryInject);


module.exports=injectR;