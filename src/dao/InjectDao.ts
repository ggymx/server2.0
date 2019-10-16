import Message from './domain/Message';
import Inject from './domain/Inject';
interface InjectDao{
    //查询全部数据
    selectInjects():Promise<Message<Array<Object>>>;
    //通过分页和指针查部分数据
    selectInjectsByLimit(cursor:number,limit:number):Promise<Message<Array<Object>>>;
}

export default InjectDao;