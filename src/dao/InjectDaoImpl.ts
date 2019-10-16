import dbConnection from '../DBConnection';
import InjectDao from '../dao/InjectDao';
import Message from './domain/Message';
import Inject from './domain/Inject';
class InjectDaoImpl implements InjectDao{
    private constructor(){}
    public static getInstance(){
        return new InjectDaoImpl();
    }
    selectInjects():Promise<Message<Array<Object>>>{
        // console.log('接收到的请求数据-------',req.query);
        return new Promise((resolve,reject)=>{
            let sql='SELECT * FROM inject_test';
            dbConnection.query(sql,(err,result)=>{
                if(!err){
                    //返回表格中绑定的列名
                    let ijTree=[
                        {
                          "prop": "id",
                          "label": "ID"
                        },
                        {
                          "prop": "cpId",
                          "label": "cpId"
                        },
                        {
                          "prop": "movieId",
                          "label": "movieId"
                        },
                        {
                          "prop": "correlateId",
                          "label": "correlateId"
                        },
                        {
                          "prop": "injStatus",
                          "label": "注入状态"
                        },
                        {
                          "prop": "detail",
                          "label": "detail"
                        },
                        {
                          "prop": "platform",
                          "label": "平台"
                        },
                        {
                          "prop": "path",
                          "label": "path"
                        },
                        {
                          "prop": "crDate",
                          "label": "创建时间"
                        },
                        {
                          "prop": "upDate",
                          "label": "更新时间"
                        },
                        {
                          "prop": "infoUrl",
                          "label": "infoUrl"
                        }
                      ]
                    //将查到的数据重新包装
                    let resultVo={
                      ijArr:result,
                      ijTree
                    }
                    resolve(new Message({msg:'ok',data:resultVo,stCode:200}))
                    //  resolve(result);
                    // resolve(new Message({msg:'ok',data:result,stCode:200}));
                }else{
                    // reject(err);
                    reject({msg:'err',data:null,stCode:404});
                }
        });
       
    })
  }
  selectInjectsByLimit(cursor:number,limit:number):Promise<Message<Array<Object>>>{
    console.log('客户端传入的分页数据',cursor);
    return new Promise((resolve,reject)=>{
        //selete * from testtable limit 2 offset 1;
        let sql1=`SELECT * FROM inject_test limit ${limit} offset ${limit*(cursor-1)}`;
        dbConnection.query(sql1,(err,result)=>{
            if(!err){
                //返回表格中绑定的列名
                let ijTree=[
                    {
                      "prop": "id",
                      "label": "ID"
                    },
                    {
                      "prop": "cpId",
                      "label": "cpId"
                    },
                    {
                      "prop": "movieId",
                      "label": "movieId"
                    },
                    {
                      "prop": "correlateId",
                      "label": "correlateId"
                    },
                    {
                      "prop": "injStatus",
                      "label": "注入状态"
                    },
                    {
                      "prop": "detail",
                      "label": "detail"
                    },
                    {
                      "prop": "platform",
                      "label": "平台"
                    },
                    {
                      "prop": "path",
                      "label": "path"
                    },
                    {
                      "prop": "crDate",
                      "label": "创建时间"
                    },
                    {
                      "prop": "upDate",
                      "label": "更新时间"
                    },
                    {
                      "prop": "infoUrl",
                      "label": "infoUrl"
                    }
                  ];
                  let resultVo={
                    ijArr:result,
                    ijTree
                }
                  //查询总条数
                  let sql2="SELECT COUNT(*) AS count FROM inject_test;"
                  dbConnection.query(sql2,(err,result2)=>{
                      if(!err){
                         (resultVo as any).count=result2[0].count,
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

export default InjectDaoImpl;