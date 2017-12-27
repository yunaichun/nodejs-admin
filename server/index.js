const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const mongoStore = require('connect-mongo')(session);
const bodyParser = require('body-parser');
const path = require('path');
const routers = require('./src/routers/routers');

const port = process.env.PORT || 3000;
const app = express();

/*连接本地数据库*/
mongoose.connect('mongodb://localhost:6666/OnlineMovie', err => {
	if (err) {
		console.log('connect database error -->', err);
		process.exit(1);
	}
	console.log('connect database success'); 
});

/*日志打印*/
if (app.get('env') === 'development') { // process.env.NODE_ENV
	app.set('showStackError', true);// 打印错误
	app.use(morgan(':method :url :status :response-time'));//请求类型+请求地址+状态+响应时间
	app.set('json spaces', 2);//返回更漂亮的JSON数据
	mongoose.set('debug', true);//数据库的debug配置
}

/*cookieParser、session、bodyParser*/
app.use(cookieParser('OnlineMovie'));//解析cookie，同时也是session依赖的中间件
app.use(session({
	secret: 'OnlineMovie', //防止篡改cookie值[签名，与上文中cookie设置的签名字符串一致，]
	resave: false, //don't save session if unmodified【不想每次刷新页面就创建session】
	saveUninitialized: true, //don't create session until something stored【不想每次刷新页面就创建session】
	cookie: { maxAge: 60 * 60 * 1000 },
	store: new mongoStore({ //session持久化
		url: 'mongodb://localhost:6666/OnlineMovie'
	})
}));
app.use(bodyParser.urlencoded({ extended: true }));//post方法提交表单：处理不同类型请求体+处理不同编码+处理不同压缩类型【解析form表单】
app.use(express.static(path.join(__dirname, '/public/upload/')));//静态资源目录

/*引入路由*/
app.use(routers);
app.listen(port);
console.log(`server started on port ${port}`);
