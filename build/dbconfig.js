"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mysql = require("mysql");
var dbConfig = {
    mysql: {
        host: "localhost",
        port: "3308",
        user: "root",
        password: "root",
        database: "mediasys" //数据库名字
    }
};
// module.exports=dbConfig;
// export default dbConfig
var connection = mysql.createPool(dbConfig.mysql);
connection.getConnection(function (err, res) {
    if (err) {
        console.log('与MySql数据库建立连接失败！');
        console.log('错误信息为：' + err);
    }
    else {
        console.log('连接Mysql成功！', res);
    }
});
module.exports = connection;
