// 所有文章相关的方法实现

// 导包
const m_topic = require('../models/m_topic');
// moment 处理时间，和 node 无关
const moment = require('moment');

//// 渲染文章列表
exports.showTopicList = (req, res) => {

    m_topic.findAllTopic((err, data) => {
        // 控制器使用模型返回的结果
        if (err) {
            return res.send({
                code: 500,
                msg: '服务器出现错误'
            });
        }
        // console.log(data);
        res.render('index.html', {
            topics: data,
            user: req.session.user
        });
    });
}

//// 渲染发布文章页面
exports.showCreateTopic = (req, res) => {
    res.render('topic/create.html');
}

//// 处理发布新文章的请求
exports.handleCreateTopic = (req, res) => {
    // 1. 获取表单数据
    const body = req.body;
    // 给body动态添加成员
    // 1) createdAt
    body.createdAt = moment().format();
    // 2) userId (当前添加的新文章的作者是谁) 文章的userId = 当前登录用户的id值
    body.userId = req.session.user.id;

    // 2. 让模型操作数据库 -> 添加/插入数据 -> 返回结果
    m_topic.addTopic(body, (err, data) => {
        if (err) {
            return res.send({
                code: 500,
                msg: '服务器再次出现错误'
            });
        }
        // 3. 使用该结果，返回响应
        res.send({
            code: 200,
            msg: '新文章添加成功'
        });
    });
}