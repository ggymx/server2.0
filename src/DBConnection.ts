import * as mysql from 'mysql';
class DBConnection{
    public static mysql:object={
        host: "localhost", //这是数据库的地址
        port: "3308",
        user: "root", //需要用户的名字
        password: "root", //用户密码 ，如果你没有密码，直接双引号就是
        database: "mediasys"
    }
    public static getConnection(){
        var connection = mysql.createPool(DBConnection.mysql);
        //启动连接
        connection.getConnection((err,res)=>{
        if(err){
            console.log('与MySql数据库建立连接失败！');
            console.log('错误信息为：'+err);
        }else{
            console.log('连接Mysql成功！',res);
        }
        });
        return connection;
    }
}

var connection=DBConnection.getConnection();
export default connection;