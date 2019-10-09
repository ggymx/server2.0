// //引入mysql数据库配置
// let dbConnection=require('../dbConfig');
import LoginDao from '../dao/loginDao';
let loginDao=new LoginDao();
class LoginServices{
    /**处理用户登录 */
    login(req,res){
        console.log('登录请求-----',req.body);
        loginDao.selectUserByName(req,res);
}
}

export default LoginServices;