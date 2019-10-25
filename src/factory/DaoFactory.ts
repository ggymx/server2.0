import LoginDao from '../dao/LoginDao';
import LoginDaoImpl from '../dao/LoginDaoImpl';
import InjectDao from '../dao/InjectDao';
import InjectDaoImpl from '../dao/InjectDaoImpl';
import MediaDao from '../dao/MediaDao';
import MediaDaoImpl from '../dao/MediaDaoImpl';
//工厂模式：工厂类
class DaoFactory{
     private static loginDaoInstance:LoginDao;
     private static injectDaoInstance:InjectDao;
     private static mediaDaoInstance:MediaDao;
     public static produceLoginDao():LoginDao{
         //单例模式
         if(!DaoFactory.loginDaoInstance){
            DaoFactory.loginDaoInstance=LoginDaoImpl.getInstance();
         }
         return DaoFactory.loginDaoInstance;
     }
     public static produceInjectDao():InjectDao{
           //单例模式
        if(!DaoFactory.injectDaoInstance){
            DaoFactory.injectDaoInstance=InjectDaoImpl.getInstance();
         }
         return DaoFactory.injectDaoInstance;
     }
     public static produceMediaDao():MediaDao{
         if(!DaoFactory.mediaDaoInstance){
             DaoFactory.mediaDaoInstance = MediaDaoImpl.getInstance();
         }
         return DaoFactory.mediaDaoInstance;
     }
}

export default DaoFactory;