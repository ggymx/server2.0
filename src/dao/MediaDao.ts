import Message from "./domain/Message";

interface MediaDao{
    selectMedias():Promise<Message<Array<Object>>>;
    selectMediasByLimit(cursor:number,limit:number):Promise<Message<Array<Object>>>;
}

export default MediaDao;