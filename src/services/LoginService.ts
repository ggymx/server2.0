// //引入mysql数据库配置
// let dbConnection=require('../dbConfig');
// import LoginDao from '../dao/LoginDao';
// import LoginDaoImpl from '../dao/LoginDaoImpl';
import DaoFactory from '../factory/DaoFactory';
// import CryptoUtil from '../util/CryptoUtil ';
// const crypto=require('crypto');
// var cookie = require('cookie-parser');
// const secret='ilovescotchyscotch';
// //引入生成token的中间件
// const jwt = require('../jsonwebtoken');
let loginDaoImpl=DaoFactory.produceLoginDao();
class LoginServices{
    /**处理用户登录 */
    // loginDaoImpl:LoginDao=new LoginDaoImpl();
    // login(request,response){
    //     let username=(request.body as any).username
    //     let pwd=(request.body as any).pwd;
    //     console.log('登录请求-----',request.body);
    //     loginDaoImpl.selectUserByName(username,pwd).then(res=>{
    //         console.log('Promise------res',res);
    //         response.json(res)
    //     }).catch(err=>{
    //         console.log('Promise------err',err)
    //         response.json(err)
    //     });
    // }
    //await默认只能接收resolve中的数值，reject不能接收
    async login(request,response,jwt){
        console.log('传入的登录凭证---------',jwt);
        let username=(request.body as any).username
        let pwd=(request.body as any).password;
        console.log('登录请求-----',request.body);
        let message=await loginDaoImpl.selectUserByName(username,pwd).catch(err=>{
            console.log('err--------------',err);
            response.json(err);
            return;
        });
        // console.log('查表数据login-data---',message);
        if(message){
         console.log('login-----message',(message as any).data.userId);
         //加密头
         const superSecret = 'test1';
             //生成token
          const user=(message as any).data;
          console.log('加密前------------',user);
          const userKeys=Object.keys(user);
          console.log('userKeys-------------',userKeys);
        //   const key = Buffer.from('9vApxLk5G3PAsJrM', 'utf8').toString();
        //   const iv = Buffer.from('FnJL7EDzjqWjcaY9', 'utf8').toString();
        //   console.log('key++++++iv-type-',typeof key,typeof iv);
        //   userKeys.forEach(index=>{
        //      user[index]=CryptoUtil.Encrypt(user[index]);
        //  })
        //  console.log('crypto-------------',crypto);
        //  console.log('CryptoUtil-------------',CryptoUtil.Encrypt);
          console.log('加密后--------------',user);
          const token = jwt.sign({userId:user.userId,username:user.username,pwd:user.pwd},superSecret);
          console.log('生成的token-------'+token);
          //解码token
            // jwt.verify(token,superSecret, function (err, decoded){
            //      //decoded　是得到的用户信息
            //      console.log('解析token-------------',decoded);
            // });
            // response.cookie('cart', { items: [1,2,3] }, { maxAge: 10000*4,signed:true,httpOnly:true });
            // response.cookie('username', "gegan", { maxAge: 10000*2,signed:true});
            // response.cookie('age', "大白",{ maxAge: 10000*3,signed:true });

            // console.log('cookie------',request.cookie);
            // console.log('cookie------cart',request.signedCookies.cart);
            // console.log('cookie------username',request.signedCookies.username);
            // console.log('cookie------age',request.signedCookies.age);
            // console.log('生成token的中间件------',jwt);

            response.json({...message,token});
        }
    }
}

export default LoginServices;