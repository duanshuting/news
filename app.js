// 入口文件

// 1. 导包
const express = require('express');
const router = require('./router');

// 2. 配置
const app = express();
// 配置静态资源
app.use('/public', express.static('./public'));
// 配置第三方资源
app.use('/node_modules', express.static('./node_modules'));
// 配置第三方模板引擎
app.engine('html', require('express-art-template'));

// 3. 使用路由
app.use(router);

// 4. 监听端口
app.listen(7000, () => {
    console.log('run it ---'); 
});