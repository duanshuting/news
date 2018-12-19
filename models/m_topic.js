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

//// 根据id查询文章
exports.findTopicById = (topicID, callback) => {
    const sqlStr = 'SELECT * FROM `topics` WHERE id=?';
    connection.query(sqlStr, topicID, (err, data) => {
        if (err) {
            return callback(err, null);
        }
        callback(null, data);
    });
}

//// 根据id删除文章
exports.deleTopicById = (topicID, callback) => {
    const sqlStr = 'DELETE FROM `topics` WHERE id=?';
    connection.query(sqlStr, topicID, (err, data) => {
        if (err) {
            return callback(err, null);
        }
        callback(null, data);
    })
}

//// 编辑文章(根据topicID修改文章)
exports.editTopicById = (topicID, body, callback) => {
    const sqlStr = 'UPDATE `topics` SET ? WHERE id=?';
    connection.query(sqlStr, [body, topicID], (err, data) => {
        if (err) {
            return callback(err, null);
        }
        callback(null, data);
    });
}