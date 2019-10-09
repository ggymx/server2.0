//引入mysql数据库配置
let dbConnection=require('../dbConfig');
class LoginDao{
    //通过用户名和密码查询用户
    selectUserByName(username,pwd):Promise<Object>{
        return new Promise((resolve,reject)=>{
            if(!username || !pwd){
                console.log('未获取有效参数！-----');
                reject({msg:'缺失username或pwd'});
                // res.end('');
                return;
            }
            console.log('用户名：',typeof username);
            console.log('密码：',pwd);
            let sql=`SELECT COUNT(*),userId FROM user_test WHERE username='${username}' AND pwd='${pwd}'`;
            console.log('sql语句-----',sql);
            dbConnection.query(sql,(err,result)=>{
                if(!err){
                    console.log('查询结果-----',result[0].userId);
                    let userId=result[0].userId
                    resolve({msg:'ok',userId});
                    // res.json({msg:'ok',userId});//json可以实现跨域（同源策略不拦截script）缺点：只适用于get请求
                    // res.json({msg:'ok',userId})
                }else{
                    console.log('出现异常----',err);
                    reject(err);
                }
            })
        });
       
    }
}

export default LoginDao;