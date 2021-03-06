// 处理函数的实现
// 用户登录

// 导入 m_user.js 
const m_user = require('../models/m_user');

//// 渲染登录页面
exports.showSignin = (req, res) => {
    res.render('signin.html');
}

//// 处理客户端表单登录请求
exports.handleSignin = (req, res) => {
    // 1. 获取表单数据 req.body
    const body = req.body;
    
    // 2. 先验证邮箱(数据库邮箱 === body.email)
    // 使用 m_user.js 中的方法  在这里使用数据库操作的结果
    m_user.checkEmail(body.email, (err, data) => {
        if (err) {
            return res.send({
                code: 500,
                msg: '服务器出现错误！！！'
            });
        }
        // data是数组
        // 如果邮箱不存在 []
        if (data.length === 0) {
            return res.send({
                code: 1,
                msg: '邮箱不存在！！！'
            });
        } 
        // 3. 在验证密码
        if (data[0].password !== body.password) {
            return res.send({
                code: 2,
                msg: '密码不正确！！！'
            });
        }
        // data[0] 昵称(用户名) (express-session保存信息)
        // 使用 req.session 保存正确的用户信息
        req.session.user = data[0];
        // console.log(req.session.user);

        // 4. 返回200的响应
        res.send({
            code: 200,
            msg: '登录成功！！！'
        });
    });
}

//// 处理用户退出的请求
exports.handleSignout = (req, res) => {
    // 1. 清除session中的user信息
    delete req.session.user;

    // 2. 回到登录页 (服务端重定向适用于同步请求)
    res.redirect('/signin');
}

//// 渲染注册页面
exports.showSignup = (req, res) => {
    res.render('signup.html');
}

//// 处理注册的表单请求
exports.handleSignup = (req, res) => {
    // 1. 获取表单数据
    const body = req.body;

    // 2. 先验证邮箱是否存在(body.email === 数据库的email)
    m_user.checkEmail(body.email, (err, data) => {
        if (err) {
            return res.send({
                code: 500,
                msg: '服务器出现错误'
            });
        }
        // 如果邮箱存在，返回响应(邮箱存在)
        if (data[0]) {
            return res.send({
                code: 1,
                msg: '邮箱已经存在'
            });
        }
        // 3. 如果邮箱不存在 -> 验证昵称
        m_user.checkNickname(body.nickname, (err, data) => {
            if (err) {
                return res.send({
                    code: 500,
                    msg: '服务器出现错误'
                });
            }
            // 如果昵称存在,返回响应
            if (data[0]) {
                return res.send({
                    code: 2,
                    msg: '昵称已经存在'
                });
            }
            // 4. 如果昵称不存在 -> 可以添加新用户
            m_user.addUser(body, (err, data) => {
                if(err) {
                    return res.send({
                        code: 500, 
                        msg: '服务器出现错误'
                    });
                }
                // 5. 返回200响应
                res.send({
                    code: 200,
                    msg: '注册成功'
                });
            });
        });
    });
}

