// 路由模块

// 1. 导包
const express = require('express');
const c_user = require('./controllers/c_user');

// 2. 实例化router
const router = express.Router();

// 3. 配置路由 实例方法
router
    .get('/signin', c_user.showSignin)
    .post('/signin', c_user.handleSignin)

// 4. 导出
module.exports = router;