const express = require('express');
//新版的express中已经不包含bodyparser
const bodyParser = require('body-parser');
//新版的express中已经不包含cookieparser【sessionid】
const cookieParser = require('cookie-parser');
//新版的express中已经不包含session【store对象】
const session = require('express-session');
const morgan = require('morgan');//请求日志
const mongoose = require('mongoose');//mongoose对象工具模型
//session持久化【传入session，不是express】
const mongoStore = require('connect-mongo')(session);
const path = require('path');//工具模块

const port = process.env.PORT || 3000;
const app = express();


/**
 * 连接本地数据库
 */
mongoose.connect('mongodb://localhost:6666/OnlineMovie', err => {
  if (err) {
    console.log('connect database error -->', err);
    process.exit(1);
  }
  console.log('connect database success');
});


app.set('views', './app/views/pages');//设置模板根目录
app.set('view engine', 'jade');//设置模板引擎
app.use(express.static(path.join(__dirname, 'public')));//获取静态资源。静态资源目录
app.locals.moment = require('moment');//本地moment

if (app.get('env') === 'development') { // 如果是开发环境
  app.set('showStackError', true);//打印错误
  app.use(morgan(':method :url :status :response-time'));//请求日志：请求类型+请求地址+状态
  app.locals.pretty = true;//可读性强，非压缩
  mongoose.set('debug', true);//数据库的debug配置
}


/**
 *  bodyParser、cookieParser、session设置
 */
app.use(bodyParser.urlencoded({ extended: true }));//表单格式化
app.use(cookieParser());//session依赖的中间件
// app.use(multipart());//增加中间件（处理文件上传）
app.use(session({//添加session中间件
	secret: 'OnlineMovie', //防止篡改cookie值
  resave: false, //强制session被存储，默认值是true（建议写出来）
  saveUninitialized: true, //参数需要写上去的
	store: new mongoStore({//session持久化。传入第一个参数是mongoDB数据库地址。
		url: 'mongodb://localhost:6666/OnlineMovie',
		collection: 'sessions'
	})
}));


/**
 * 引入路由
 */
require('./config/routes')(app);

app.listen(port);
console.log(`server started on port ${port}`);
