import MediaDao from "./MediaDao";
import Message from './domain/Message';
class MediaDaoImpl implements MediaDao{
    selectMedias(): Promise<Message<Array<Object>>> {
        throw new Error("Method not implemented.");
    }    
    selectMediasByLimit(cursor: number, limit: number): Promise<Message<Array<Object>>> {
        throw new Error("Method not implemented.");
    }
}

export default MediaDaoImpl;