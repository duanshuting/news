// 文章相关的数据库操作，比如查询文章数据

const connection = require('../config/db_config');

//// 查询所有文章数据
exports.findAllTopic = (callback) => {
    const sqlStr = 'SELECT * FROM `topics` ORDER BY id DESC';
    connection.query(sqlStr, (err, data) => {
        if (err) {
            return callback(err, null);
        }
        callback(null, data);
    });
}

//// 添加新文章
exports.addTopic = (body, callback) => {
    const sqlStr = 'INSERT INTO `topics` SET ?';
    connection.query(sqlStr, body, (err, data) => {
        if (err) {
            return callback(err, null);
        }
        callback(null, data);
    });
}