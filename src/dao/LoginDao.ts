import Message from './domain/Message';
import User from './domain/User';
interface LoginDao{
    //查询用户通过姓名和密码
    selectUserByName(username,pwd):Promise<Message<User>>;
}

export default LoginDao;