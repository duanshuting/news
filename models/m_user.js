// 作用：把c_user.js文件中 数据库操作部分 提取出来

// 导入数据库配置模块
const connection = require('../config/db_config');

// 登录-验证邮箱
exports.checkEmail = (email, callback) => {

    const sqlStr = 'SELECT * FROM `users` WHERE email=?';
    connection.query(sqlStr, email, (err, data) => {
        if (err) {
            // err结果
            callback(err, null);
        } else {
            // data结果
            callback(null, data);
        }
    });
}

//// 验证昵称
exports.checkNickname = (nickname, callback) => {
    const sqlStr = 'SELECT * FROM `users` WHERE nickname=?';
    connection.query(sqlStr, nickname, (err, data) => {
        if (err) {
            return callback(err, null);
        }
        callback(null, data);
    });
}

//// 添加新用户
exports.addUser = (body, callback) => {
    const sqlStr = 'INSERT INTO `users` SET ?';
    connection.query(sqlStr, body, (err, data) => {
        if (err) {
            return callback(err, null);
        }
        callback(null, data);
    });
}