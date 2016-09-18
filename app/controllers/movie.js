//电影页面模型
var Movie = require('../models/movie');
//评论页面
var Comment = require('../models/comment');
//引用underscore模块（修改替换）
var _ = require('underscore');

//detail jade【电影详情页-->渲染数据】
exports.detail= function(req, res) {
    //:id指的是可以获取前台传递的值
    var id = req.params.id;
    Movie.findById(id, function(err, movie) {
        //-----关联查询用户名------//
        //1、查找到此电影id
        //2、populate关联查询user的数据from在模型中已经定义，来自User（ref:'User'）
        //3、根据from中的ObjectId去user表中去查name
        Comment
            .find({movie:id})
            .populate('from','name')
            .exec(function(err,comments){
                res.render('detail', {
                    title: '详情页' + movie.title,
                    movie: movie,
                    comments:comments
                })
            })
    })
}



//admin jade【添加电影页-->渲染空数据】
exports.new= function(req, res) {
        //需要有默认的值（因为修改也用了此页面，所以添加的时候默认渲染为空）
        res.render('admin', {
            title: '后台录入页',
            movie: {
                title: '',
                doctor: '',
                country: '',
                year: '',
                poster: '',
                flash: '',
                summary: '',
                language: ''
            }
        })
}
//【修改电影页-->渲染数据】
//admin update movie(列表页点击更新，即修改-->将查询到的数据打印到后台录入页)
exports.update= function(req, res) {
        var id = req.params.id;
        if (id) {
            Movie.findById(id, function(err, movie) {
                res.render('admin', {
                    title: '后台更新页',
                    movie: movie
                })
            })
        }
}
//admin post movie【新增、修改电影-->提交表单保存】
exports.save=function(req, res) {
    //前台是否传入id字段
    var id = req.body.movie._id;
    console.log(id);
    //拿到movie对象
    var movieObj = req.body.movie;
    //定义修改或者保存实体
    var _movie;
    if (id !== 'undefined') { //修改
        Movie.findById(id, function(err, movie) {
            if (err) {
                console.log(err);
            }
            //underscore模块可以完成替换，查询 到数据放在第一个位置,post数据放在第二个参数上去
            _movie = _.extend(movie, movieObj)
                //调用save方法，第二个参数是回调
            _movie.save(function(err, movie) {
                if (err) {
                    console.log(err);
                }
                //页面重定向到详情页面
                res.redirect('/movie/' + movie.id);
            })
        })
    } else { //新增
        //调用模型（构造函数，传入电影数据）
        _movie = new Movie({
            title: movieObj.title, //标题
            doctor: movieObj.doctor, //导演
            language: movieObj.language, //语言
            country: movieObj.country, //国家
            summary: movieObj.summary, //简介
            flash: movieObj.flash, //视频地址
            poster: movieObj.poster, //海报地址
            year: movieObj.year, //上映时间
        })

        //调用save方法，第二个参数是回调
        _movie.save(function(err, movie) {
            if (err) {
                console.log(err);
            }
            //页面重定向到详情页面
            res.redirect('/movie/' + movie.id);
        })
    }
}



//list jade【电影列表页-->渲染数据】
exports.list= function(req, res) {
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
}
//list delete movie【电影列表页-->异步删除click】
exports.del= function(req, res) {
    var id = req.query.id; //ajax中通过url中拼接参数
    if (id) {
        Movie.remove({ _id: id }, function(err, movie) {
            if (err) {
                console.log(err);
            } else {
                //向客户端返回json的数据
                res.json({ success: 1 });
            }
        })
    }
}