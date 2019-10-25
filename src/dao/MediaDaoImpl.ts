import MediaDao from "./MediaDao";
import Message from './domain/Message';
import dbConnection from '../DBConnection';
class MediaDaoImpl implements MediaDao{
    private static MediaColumns= [
        {
          "prop": "ID",
          "label": "ID"
        },
        {
          "prop": "videoID",
          "label": "视频ID"
        },
        {
          "prop": "videoName",
          "label": "视频名称"
        },
        {
          "prop": "createDate",
          "label": "创建时间"
        },
        {
          "prop": "inject",
          "label": "注入操作"
        },
        {
          "prop": "injStatus",
          "label": "注入状态"
        },
        {
          "prop": "strStatus",
          "label": "储存状态"
        },
        {
          "prop": "strProgress",
          "label": "储存进度（0-100）"
        },
        {
          "prop": "code",
          "label": "播放代码"
        },
        {
          "prop": "company",
          "label": "公司名称"
        },
        {
          "prop": "video",
          "label": "视频大小"
        },
        {
          "prop": "ftp",
          "label": "FTP操作"
        }
      ];
    private constructor(){}
    public static getInstance(){
        return new MediaDaoImpl();
    }
    selectMedias(): Promise<Message<Array<Object>>> {
        return new Promise((resolve,reject)=>{
            let sql='SELECT * FROM media_test';
            dbConnection.query(sql,(err,result)=>{
                if(!err){
                    //将查到的数据重新包装
                    let mzArr:Array<Object>=result;
                    let resultVo={
                        mzArr,
                        mzTree:MediaDaoImpl.MediaColumns
                    }
                    resolve(new Message({msg:'ok',data:resultVo,stCode:200}))
                    //  resolve(result);
                    // resolve(new Message({msg:'ok',data:result,stCode:200}));
                }else{
                    // reject(err);
                    reject({msg:'err',data:null,stCode:404});
                }
        });
        // throw new Error("Method not implemented.");
    });
}    
    selectMediasByLimit(cursor: number, limit: number): Promise<Message<Array<Object>>> {
        console.log('客户端传入的分页数据',cursor);
        return new Promise((resolve,reject)=>{
            //selete * from testtable limit 2 offset 1;
            let sql1=`SELECT * FROM media_test limit ${limit} offset ${limit*(cursor-1)}`;
            dbConnection.query(sql1,(err,result)=>{
                if(!err){
                       let mzArr:Array<Object>=result;
                      let resultVo={
                        mzArr,
                        mzTree:MediaDaoImpl.MediaColumns
                    }
                      //查询总条数
                      let sql2="SELECT COUNT(*) AS count FROM media_test";
                      dbConnection.query(sql2,(err,result2)=>{
                          if(!err){
                             (resultVo as any).count=result2[0].count,
                             console.log('媒资查询结果-------',resultVo);
                              //将查到的数据重新包装
                             resolve(new Message({msg:'ok',data:resultVo,stCode:200}))
                          }else{
                            resolve(new Message({msg:'ok',data:resultVo,stCode:200}))
                          }
                      })
                    //  resolve(result);
                    // resolve(new Message({msg:'ok',data:result,stCode:200}));
                }else{
                    // reject(err);
                    reject({msg:'err',data:null,stCode:404});
                }
        });
      });
    }
}

export default MediaDaoImpl;