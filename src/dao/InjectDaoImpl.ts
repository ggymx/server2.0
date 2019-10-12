import dbConnection from '../DBConnection';
import InjectDao from '../dao/InjectDao';
class InjectDaoImpl implements InjectDao{
    private constructor(){}
    public static getInstance(){
        return new InjectDaoImpl();
    }
    selectInjects():Promise<Object>{
        // console.log('接收到的请求数据-------',req.query);
        return new Promise((resolve,reject)=>{
            let sql='SELECT * FROM inject_test';
            dbConnection.query(sql,(err,result)=>{
                if(!err){
                     resolve(result);
                }else{
                    reject(err);
                }
        });
       
    })
  }
}

export default InjectDaoImpl;