//加载Express模块
var express = require('express');
//新版的express中已经不包含bodyparser
var bodyParser = require('body-parser');
//新版的express中已经不包含cookieparser【sessionid】
var cookieParser = require('cookie-parser');
//新版的express中已经不包含session【store对象】
var session=require('express-session')
//请求样式（在bower安装包中的静态资源）
var path = require('path');
//设置端口，可以从命令行输入
var port = process.env.PORT || 3000;


//mongoose数据库
var mongoose = require('mongoose');
//引用underscore模块（修改替换）
var _=require('underscore');
//session持久化【传入session，不是express】
var mongoStore=require('connect-mongo')(session);
//首页模型
var Movie = require('./models/movie');
//登录注册模型
var User = require('./models/user');
// //时间日期格式化
// var moment=require('moment');

//启动web服务器
var app = express();


//连接本地数据库
mongoose.connect('mongodb://localhost:12345/imooc');


//设置视图根目录
app.set('views', './views/pages/');
//设置默认的模板引擎
app.set('view engine', 'jade');
//表单格式化
app.use(bodyParser.urlencoded({ extended: true }));
//session依赖的中间件
app.use(cookieParser());
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
//获取静态资源
app.use(express.static(path.join(__dirname, 'public')));
//本地moment
app.locals.moment=require('moment');
//设置监听端口
app.listen(port);

//打印启动日志
console.log('server started on port ' + port);


//预处理，在网站任何位置都可以判断用户的登录状态
app.use(function(req,res,next){
	var _user=req.session.user;
	console.log(_user);
	//如果session中有user的值，将session中user的值存入本地变量中去。这样首页的渲染就会判断是不是登录状态了。
	if(_user){
		app.locals.user=_user;
		next();
	}
	return	next(); 
})
//路由的编写(浏览器中的地址)
//index jade【首页-->渲染数据】
app.get('/', function(req, res) {
	console.log('user in session:')
	//打印session中user的值
	console.log(req.session.user);
	// var _user=req.session.user;
	// //如果session中有user的值，将session中user的值存入本地变量中去。这样首页的渲染就会判断是不是登录状态了。
	// if(_user){
	// 	app.locals.user=_user;
	// }
    //调用方法（回调方法中拿到返回的movies数组）
    Movie.fetch(function(err, movies) {
    	console.log(movies);
        if (err) {
            console.log(err);
        }
        //渲染首页模板
        res.render('index', {
            title: '首页',
            movies: movies
        })
    })
})
//【首页-->注册-->提交表单保存】
app.post('/user/signup',function(req,res){
	//获取表单数据(一个对象)
	////req.param('user')集成路由,body,query三种形式
	//req.query获取路由或异步url中
	//req.body获取post表单
	var _user=req.body.user;
	//打印接收时保存前的密码
	console.log(_user);
	var user=new User(_user);

	//判断是否重复name
	User.find({name:_user.name},function(err,user){
		if(err){
			console.log(err);
		}
		if(user){
			console.log('userName is exist');
			//如果有此用户直接返回到首页
			return res.redirect('/');
		}else{
			//没有此用户才执行新增操作
			user.save(function(err,user){
				if(err){
					console.log(err);
				}
				//重定向到首页
		        res.render('/admin/listuser');
		        //接收保存后的对象
				console.log(user);
			})
		}
	})
})
//【用户列表页-->渲染数据】
app.get('/admin/listuser', function(req, res) {
	 //调用方法（回调方法中拿到返回的movies数组）
    User.fetch(function(err, users) {
        if (err) {
            console.log(err);
        }
        //渲染首页模板
        res.render('userlist', {
            title: '用户列表页',
            users: users
        })
    })
})
//【首页-->登录-->提交表单保存】
app.post('/user/signin',function(req,res){
	var _user=req.body.user;
	var name=_user.name;
	var password=_user.password;

	//判断是否重复name
	User.findOne({name:name},function(err,user){
		if(err){
			console.log(err);
		}
		if(!user){
			//用户不存在
			return res.redirect('/');
		}
		//在schema中添加实例方法。传入明文密码，与数据库中的user。password进行匹配。
		user.comparePassword(password,function(err,isMatch){
			if(err){
				console.log(err);
			}
			if(isMatch){
				//将用户登录状态存入session内存中
				req.session.user=user;
				console.log('Password is matched')
				res.redirect('/');
			}else{
				console.log('Password is not matched');
			}
		})
	})
})
//【首页-->登出-->删除session后重定向】
app.get('/user/logout',function(req,res){
	//删除session中的user的值
	delete req.session.user;
	//需要删除app.loacal上的user值。不然前台会判断，就是根据app.locals中的user值判断的
	delete app.locals.user;	
	//重定向到首页
	res.redirect('/');
})


//detail jade【电影详情页-->渲染数据】
app.get('/movie/:id', function(req, res) {
    //:id指的是可以获取前台传递的值
    var id = req.params.id;
    Movie.findById(id, function(err, movie) {
        res.render('detail', {
            title: '详情页' + movie.title,
            movie: movie
        })
    })

})



//admin jade【添加电影页-->渲染空数据】
app.get('/admin/addmovie', function(req, res) {
	//需要有默认的值（因为修改也用了此页面，所以添加的时候默认渲染为空）
    res.render('admin', {
        title: '后台录入页',
        movie:{
        	title:'',
        	doctor:'',
        	country:'',
        	year:'',
        	poster:'',
        	flash:'',
        	summary:'',
        	language:''
        }
    })
})
//【修改电影页-->渲染数据】
//admin update movie(列表页点击更新，即修改-->将查询到的数据打印到后台录入页)
app.get('/admin/updatemovie/:id',function(req,res){
	var id=req.params.id;
	if(id){
		Movie.findById(id,function(err,movie){
			res.render('admin',{
				title:'后台更新页',
				movie:movie
			})
		})
	}
})
//admin post movie【新增、修改电影-->提交表单保存】
app.post('/admin/addmovie/new',function(req,res){
	//前台是否传入id字段
	var id=req.body.movie._id;
	console.log(id);
	//拿到movie对象
	var movieObj=req.body.movie;
	//定义修改或者保存实体
	var _movie;
	if(id!=='undefined'){//修改
	    Movie.findById(id,function(err,movie){
	    	if(err){
	    		console.log(err);
	    	}
	    	//underscore模块可以完成替换，查询 到数据放在第一个位置,post数据放在第二个参数上去
	    	_movie=_.extend(movie,movieObj)
	    	//调用save方法，第二个参数是回调
	    	_movie.save(function(err,movie){
	    		if(err){
	    			console.log(err);
	    		}
	    		//页面重定向到详情页面
	    		res.redirect('/movie/'+movie.id);
	    	})
	    }) 
	}else{//新增
		//调用模型（构造函数，传入电影数据）
		_movie=new Movie({
			title:movieObj.title,//标题
			doctor:movieObj.doctor,//导演
			language:movieObj.language,//语言
			country:movieObj.country,//国家
			summary:movieObj.summary,//简介
			flash:movieObj.flash,//视频地址
			poster:movieObj.poster,//海报地址
			year:movieObj.year,//上映时间
		})

		//调用save方法，第二个参数是回调
    	_movie.save(function(err,movie){
    		if(err){
    			console.log(err);
    		}
    		//页面重定向到详情页面
    		res.redirect('/movie/'+movie.id);
    	})
	}
})



//list jade【电影列表页-->渲染数据】
app.get('/admin/listmovie', function(req, res) {
	 //调用方法（回调方法中拿到返回的movies数组）
    Movie.fetch(function(err, movies) {
        if (err) {
            console.log(err);
        }
        //渲染首页模板
        res.render('list', {
            title: '列表页',
            movies: movies
        })
    })
})
//list delete movie【电影列表页-->异步删除click】
app.delete('/admin/listmovie',function(req,res){
	var id=req.query.id;//ajax中通过url中拼接参数
	if(id){
		Movie.remove({_id:id},function(err,movie){
			if(err){
				console.log(err);
			}else{
				//向客户端返回json的数据
				res.json({success:1});
			}			
		})
	}
})