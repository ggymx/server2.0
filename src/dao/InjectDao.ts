import Message from './domain/Message';
import Inject from './domain/Inject';
interface InjectDao{
    selectInjects():Promise<Message<Array<Object>>>;
}

export default InjectDao;