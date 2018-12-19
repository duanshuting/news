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

////渲染文章详情页
exports.showTopicDetail = (req, res) => {
    // 获取当前动态路由参数topicID的值
    const topicID = req.params.topicID;
    // console.log(req.params); // {topicID: 1}

    // 让M根据当前选中的id值(topicID)去查询数据库
    // 让M操作数据库，返回结果 err 和 data
    m_topic.findTopicById(topicID, (err, data) => {
        if (err) {
            return res.send({
                code: 500,
                msg: '服务器出现错误'
            });
        }
        if (data.length === 0) {
            return res.send({
                code: 1,
                msg: '该文章已经被删除'
            });
        }
        res.render('topic/show.html', {
            topic: data[0],
            sessionId: req.session.user.id
        });
    });
}

//// 删除文章
exports.handleDeleTopic = (req, res) => {
    // 获取要删除文章的id
    const topicID = req.params.topicID;

    // 让M操作数据库：根据topicID删除数据
    m_topic.deleTopicById(topicID, (err, data) => {
        if (err) {
            return res.send({
                code: 500,
                msg: '服务器出现错误'
            });
        }
        // 删除成功，回到列表页
        res.redirect('/');
    })
}

//// 渲染编辑页面
exports.showEditTopic = (req, res) => {
    const topicID = req.params.topicID;

    // 让M操作数据库：根据topicID查询数据
    m_topic.findTopicById(topicID, (err, data) => {
        if(err) {
            return res.send({
                code: 500,
                msg: '服务器出现错误'
            });
        }
        if (data === 0) {
            return res.send({
                code: 1,
                msg: '该文章已经被删除'
            });
        }
        res.render('topic/edit.html', {
            topic: data[0]
        });
    })
}

//// 处理编辑表单
exports.handleEditTopic = (req, res) => {
    // 获取表单数据
    const body = req.body;
    // 获取当前要编辑的文章的topicID
    const topicID = req.params.topicID;

    // 让M操作数据库：根据topicID修改数据
    m_topic.editTopicById(topicID, body, (err, data) => {
        if (err) {
            return res.send({
                code: 500,
                msg: '服务器出现错误'
            });
        }
        // 编辑成功，回到详情页(因为是异步操作，所有要客户端返回响应)
        res.send({
            code: 200,
            msg: '文章编辑成功'
        });
    });
}