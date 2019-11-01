// //引入mysql数据库配置
// let dbConnection=require('../dbConfig');
// import LoginDao from '../dao/LoginDao';
// import LoginDaoImpl from '../dao/LoginDaoImpl';
import DaoFactory from '../factory/DaoFactory';
// var cookie = require('cookie-parser');

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
    async login(request,response){
        let username=(request.body as any).username
        let pwd=(request.body as any).password;
        console.log('登录请求-----',request.body);
        let data=await loginDaoImpl.selectUserByName(username,pwd).catch(err=>{
            console.log('err--------------',err);
            response.json(err);
            return;
        });
        console.log('查表数据login-data---',data);
        if(data){
            // response.cookie('cart', { items: [1,2,3] }, { maxAge: 10000*4,signed:true,httpOnly:true });
            // response.cookie('username', "gegan", { maxAge: 10000*2,signed:true});
            // response.cookie('age', "大白",{ maxAge: 10000*3,signed:true });

            // console.log('cookie------',request.cookie);
            // console.log('cookie------cart',request.signedCookies.cart);
            // console.log('cookie------username',request.signedCookies.username);
            // console.log('cookie------age',request.signedCookies.age);
            response.json(data);
        }
    }
}

export default LoginServices;