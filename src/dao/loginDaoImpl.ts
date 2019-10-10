//引入mysql数据库配置
// let dbConnection=require('../dbConfig');
import dbConnection from '../DBConnection';
import User from './domain/User';
import Message from './domain/Message';
import LoginDao from './LoginDao';
class LoginDaoImpl implements LoginDao{
    // 通过用户名和密码查询用户   Promise<Message<User>>只约束resolve函数 
    selectUserByName(username,pwd):Promise<Message<User>>{
        return new Promise((resolve,reject)=>{
            if(!username || !pwd){
                console.log('未获取有效参数！-----');
                reject({msg:'缺失username或pwd',stCode:100});
                // res.end('');
                return;
            }
            console.log('用户名：',typeof username);
            console.log('密码：',pwd);
            // let sql=`SELECT COUNT(*),userId FROM user_test WHERE username='${username}' AND pwd='${pwd}'`;
            let sql= `SELECT * FROM user_test WHERE username='${username}' AND pwd='${pwd}'`;
            console.log('sql语句-----',sql);
            dbConnection.query(sql,(err,result)=>{
                if(!err){
                    // let userId=result[0].userId
                    try{
                    console.log('查询结果-----',result[0].userId);
                    let user:User=result[0];
                    console.log('查询到user--------',user);
                    // resolve({msg:'ok',userId});
                    // resolve({msg:'ok',user,stCode:200})
                    resolve(new Message({msg:'ok',data:user,stCode:200}));
                    }catch(e){
                        console.log('没有查询到任何数据----');
                        reject({msg:'fail',data:null,stCode:404});
                    }
                    // res.json({msg:'ok',userId});//json可以实现跨域（同源策略不拦截script）缺点：只适用于get请求
                    // res.json({msg:'ok',userId})
                }else{
                    console.log('出现异常----',err);
                    reject({msg:err,data:null,stCode:500});
                }
            })
        });
       
    }
}

export default LoginDaoImpl;