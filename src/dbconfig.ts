import * as mysql from 'mysql';
const dbConfig = {
    mysql: {
        host: "localhost", //这是数据库的地址
        port: "3308",
        user: "root", //需要用户的名字
        password: "root", //用户密码 ，如果你没有密码，直接双引号就是
        database: "mediasys"//数据库名字
    } 
};
// module.exports=dbConfig;
// export default dbConfig

//创建连接
var connection = mysql.createPool(dbConfig.mysql);
//启动连接
connection.getConnection((err,res)=>{
    if(err){
        console.log('与MySql数据库建立连接失败！');
        console.log('错误信息为：'+err);
    }else{
        console.log('连接Mysql成功！',res);
    }
});

module.exports=connection;