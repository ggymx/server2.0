import DaoFactory from '../factory/DaoFactory';
let mediaDaoImpl = DaoFactory.produceMediaDao();
class MediaService{
    async queryMedia(request,response){
        // response.json('media/query');
        let cursor = (request.query as any).cursor;
        let limit = (request.query as any).limit;
        let data;
        if(cursor && limit){
            console.log('分页查询---------');
        data=await mediaDaoImpl.selectMediasByLimit(cursor,limit).catch(err=>{
                console.log('err------',err);
                response.json(err);
                return;
            });
        }else{
        //返回全部数据
        console.log('全部查询---------');
         data=await mediaDaoImpl.selectMedias().catch(err=>{
            console.log('err------',err);
            response.json(err);
            return;
        });
        }
        response.json(data);
    }
}

export default MediaService;