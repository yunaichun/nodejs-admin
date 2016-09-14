//加载Express模块
var express = require('express');
//新版的express中已经不包含bodyparser
var bodyParser = require('body-parser')
//请求样式（在bower安装包中的静态资源）
var path = require('path');
//设置端口，可以从命令行输入
var port = process.env.PORT || 3000;


//mongoose数据库
var mongoose = require('mongoose');
//引用underscore模块（修改替换）
var _=require('underscore');
//首页模型
var Movie = require('./models/movie');
// //时间日期格式化
// var moment=require('moment');

//启动web服务器
var app = express();


//连接本地数据库
mongoose.connect('mongodb://localhost:12345/imooc');


//设置视图根目录
app.set('views', './views/pages');
//设置默认的模板引擎
app.set('view engine', 'jade');
//表单格式化
app.use(bodyParser.urlencoded({ extended: true }));
//获取静态资源
app.use(express.static(path.join(__dirname, 'public')));
//本地moment
app.locals.moment=require('moment');
//设置监听端口
app.listen(port);

//打印启动日志
console.log('server started on port ' + port);

//路由的编写(浏览器中的地址)
//index jade
app.get('/', function(req, res) {
    //调用方法（回调方法中拿到返回的movies数组）
    Movie.fetch(function(err, movies) {
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

//detail jade
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

//admin jade
app.get('/admin/addmovie', function(req, res) {
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
//点击修改到表单
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
//admin post movie（保存表单操作）
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

//list jade
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

//list delete movie
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