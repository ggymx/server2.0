import DaoFactory from '../factory/DaoFactory';
let injectDaoImpl=DaoFactory.produceInjectDao();
class InjectService{
    //查询状态
    // queryInject(request,response){
    //     injectDaoImpl.selectInjects().then(res=>{
    //         console.log('查询注入状态------',res)
    //         response.json(res);
    //     }).catch(err=>{
    //         console.log('出现错误-------',err);
    //         response.json(err);
    //     })
    // }
    async queryInject(request,response){
        let data=await injectDaoImpl.selectInjects().catch(err=>{
            console.log('err------',err);
            response.json(err);
            return;
        });
        response.json(data);
    }
    //增加状态
    addInject(){}
    //删除状态
    remoteInject(){}
    //更新状态
    updateInject(){}
}


export default InjectService;