// //引入mysql数据库配置
// let dbConnection=require('../dbConfig');
import LoginDaoImpl from '../dao/loginDaoImpl';
let loginDaoImpl=new LoginDaoImpl();
class LoginServices{
    /**处理用户登录 */
    login(request,response){
        let username=(request.body as any).username
        let pwd=(request.body as any).pwd;
        console.log('登录请求-----',request.body);
        loginDaoImpl.selectUserByName(username,pwd).then(res=>{
            console.log('Promise------res',res);
            response.json(res)
        }).catch(err=>{
            console.log('Promise------err',err)
            response.json(err)
        });
}
}

export default LoginServices;