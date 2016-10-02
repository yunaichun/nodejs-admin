//加载Express模块
var express = require('express');
//新版的express中已经不包含bodyparser
var bodyParser = require('body-parser');
//新版的express中已经不包含cookieparser【sessionid】
var cookieParser = require('cookie-parser');
//新版的express中已经不包含session【store对象】
var session=require('express-session');
//新版的express中已经不包含multipart
var multipart = require('connect-multiparty');
//打印错误
var morgan = require('morgan');

//请求样式（在bower安装包中的静态资源）
var path = require('path');
//设置端口，可以从命令行输入
var port = process.env.PORT || 3000;


//mongoose数据库
var mongoose = require('mongoose');
//session持久化【传入session，不是express】
var mongoStore=require('connect-mongo')(session);

// //时间日期格式化
// var moment=require('moment');

//启动web服务器
var app = express();


//连接本地数据库
mongoose.connect('mongodb://localhost:12345/imooc');


//设置视图根目录
app.set('views', './app/views/pages');
//设置默认的模板引擎
app.set('view engine', 'jade');
//表单格式化
app.use(bodyParser.urlencoded({ extended: true }));
//session依赖的中间件
app.use(cookieParser());
//增加中间件（处理文件上传）
app.use(multipart());
//添加session
app.use(session({
	//防止篡改cookie值
	secret:'imooc',
	//session持久化。传入第一个参数是mongoDB数据库地址。
	store:new mongoStore({
		url:'mongodb://localhost:12345/imooc',
		collection:'sessions'
	})
}))


// 如果是开发环境
if ('development' === app.get('env')) {
  //打印错误
  app.set('showStackError', true);
  //中间件：请求类型+请求地址+状态
  app.use(morgan(':method :url :status :response-time'));
  //可读性强，非压缩
  app.locals.pretty = true;
  //数据库的debug配置
  mongoose.set('debug', true);
}


//引入路由
require('./config/routes')(app);
//设置监听端口
app.listen(port);


//获取静态资源。静态资源目录
app.use(express.static(path.join(__dirname, 'public')));
//本地moment
app.locals.moment=require('moment');


//打印启动日志
console.log('server started on port ' + port);
