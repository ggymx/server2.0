import LoginDao from '../dao/LoginDao';
import LoginDaoImpl from '../dao/LoginDaoImpl';
//工厂模式：工厂类
class DaoFactory{
     private static loginDaoInstance:LoginDao;
     public static produceLoginDao():LoginDao{
         //单例模式
         if(!DaoFactory.loginDaoInstance){
            DaoFactory.loginDaoInstance=new LoginDaoImpl();
         }
         return DaoFactory.loginDaoInstance;
     }
}

export default DaoFactory;