import LoginDao from '../dao/LoginDao';
import LoginDaoImpl from '../dao/LoginDaoImpl';
import InjectDao from '../dao/InjectDao';
import InjectDaoImpl from '../dao/InjectDaoImpl';
//工厂模式：工厂类
class DaoFactory{
     private static loginDaoInstance:LoginDao;
     private static InjectDaoInstance:InjectDao;
     public static produceLoginDao():LoginDao{
         //单例模式
         if(!DaoFactory.loginDaoInstance){
            DaoFactory.loginDaoInstance=LoginDaoImpl.getInstance();
         }
         return DaoFactory.loginDaoInstance;
     }
     public static produceInjectDao():InjectDao{
           //单例模式
        if(!DaoFactory.InjectDaoInstance){
            DaoFactory.InjectDaoInstance=InjectDaoImpl.getInstance();
         }
         return DaoFactory.InjectDaoInstance;
     }
}

export default DaoFactory;