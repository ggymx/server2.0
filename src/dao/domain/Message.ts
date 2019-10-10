// import User from './User';
class Message<T>{
    private data:T;//数据库数据
    private msg:String;
    private stCode:number;
    constructor({msg,data,stCode}){
        this.msg=msg;
        this.data=data;
        this.stCode=stCode;
    }
}

export default Message;