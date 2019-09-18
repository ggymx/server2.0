const dbConfig = {
    mysql: {
        host: "localhost", //这是数据库的地址
        port: "3308",
        user: "root", //需要用户的名字
        password: "root", //用户密码 ，如果你没有密码，直接双引号就是
        database: "mediasys"//数据库名字
    } 
};
module.exports=dbConfig;
// export default dbConfig