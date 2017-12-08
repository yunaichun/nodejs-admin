const Catetory = require('../models/catetory');//电影分类
const Movie = require('../models/movie');//电影详情
const Comment = require('../models/comment');//电影评论
const _ = require('underscore');//引用underscore模块（修改替换）
const fs = require('fs');
const path = require('path');

/**
 * [new 查询全部电影分类]
 */
exports.new = function (req, res) {
    Catetory.selectAll({}, (err, catetories) => {
        res.render('admin', {
            title: '后台录入页',
            catetories, //来自查询的结果
            movie: {}
        });
    });
};
/**
 * [list 查询全部电影，将分类id关联查询到分类名称]
 */
exports.list = function (req, res) {
    Movie.find({})
        .populate('catetory', 'name')
        .exec((err, movies) => {
          if (err) {
            console.log(err);
          }

          res.render('list', {
            title: '列表页',
            movies
          });
        });
};
/**
 * [detail 根据电影ID查询电影详情+此电影全部评论]
 */
exports.detail = function (req, res) {
    const id = req.params.id;//req.params获取动态路由
    Movie.selectOne({ _id: id }, (err1, res1) => {
        if (err1) {
            console.log(err1);
        }
        Movie.updateAll({ _id: id }, { $inc: { pv: 1 } }, (err2, res2) => { //访客统计量自增1
            if (err2) {
                console.log(err2);
            }
            console.log(res2);
        });
        Comment
            .find({ movie: id })
            .populate('from', 'name')
            .populate('reply.from reply.to', 'name')
            .exec((err3, res3) => {
                if (err3) {
                    console.log(err3);
                }
                res.render('detail', {
                    title: `详情页${res1.title}`,
                    movie: res1, 
                    comments: res3
                });
            });
    });
};
/**
 * [update 根据电影ID查询电影详情+全部分类]
 */
exports.update = function (req, res) {
    const id = req.params.id;
    if (id) {
        Movie.selectOne({ _id: id }, (err, movie) => {
            if (err) {
                console.log(err);
            }
            Catetory.selectAll({}, (err1, catetories) => {
                if (err1) {
                    console.log(err1);
                }
                res.render('admin', {
                    title: '后台更新页',
                    movie,
                    catetories
                });
            });
        });
    }
};
/**
 * [del 根据电影ID删除指定电影]
 */
exports.del = function (req, res) {
    const id = req.query.id; //ajax中通过url中拼接参数
    if (id) {
        Movie.remove({ _id: id }, (err, movie) => {
            if (err) {
                console.log(err);
            } else {
                //向客户端返回json的数据
                res.json({ success: 1 });
            }
        });
    }
};
/**
 * [save 新增和修改电影详情]
 */
exports.save = function (req, res) {    
    const id = req.body.movie._id;//前台是否传入id字段
    const movieObj = req.body.movie;//拿到movie对象【表单数据】
    let _movie;//定义修改或者保存实体
    if (req.poster) { //上一个流程存储了一个新的海报地址
        movieObj.poster = req.poster;//重写movieObj中原有的地址
    }
    if (id) { //修改
        Movie.selectOne({ _id: id }, (err, movie) => {
            if (err) {
                console.log(err);
            }
            //underscore模块可以完成替换，查询 到数据放在第一个位置,post数据放在第二个参数上去
            _movie = _.extend(movie, movieObj);
            _movie.save((err1, movie) => { //调用save方法，第二个参数是回调
                if (err1) {
                    console.log(err1);
                }
                //页面重定向到详情页面
                res.redirect(`/movie/${movie.id}`);
            });
        });
    } else { //新增        
        _movie = new Movie({//保存电影之后需要将电影id保存在分类列表中去
            catetory: movieObj.catetory, //分类id(选择的)
            //catetoryName:movieObj.catetoryName, //新增的
            title: movieObj.title, //标题
            doctor: movieObj.doctor, //导演
            language: movieObj.language, //语言
            country: movieObj.country, //国家
            summary: movieObj.summary, //简介
            flash: movieObj.flash, //视频地址
            poster: movieObj.poster, //海报地址
            year: movieObj.year, //上映时间
        });
        const catetoryId = _movie.catetory;//获取从前台传来的分类name(选择已有的分类)
        const catetoryName = movieObj.catetoryName;//获取从前台传来的分类name(新增的没有的分类)
        _movie.save((err, movie) => { 
            if (err) {
                console.log(err);
            }
            if (catetoryId) { //选择已有的分类
                Catetory.selectOne({ _id: catetoryId }, (err, catetory) => {
                    catetory.movies.push(movie._id);//已有分类添加新电影ID
                    catetory.save((err, catetory) => { //磁性保存操作
                        res.redirect(`/movie/${movie._id}`);
                    });
                });      
            } else if (catetoryName) { //新增的没有的分类
                const catetory = new Catetory({
                    name: catetoryName, //前台获取
                    movies: [movie._id] //后台存储之后返回的
                });
                catetory.save((err, catetory) => {
                    //将此时保存电影分类返回的id赋值给现在要保存的电影
                    _movie.catetory = catetory._id;
                    movie.save((err, movie) => { //第二次保存电影（将分类存进去）
                        res.redirect(`/movie/${movie._id}`);
                    });
                });
            } 
        });
    }
};
/**
 * [savePoster 中间件---海报图上传]
 */
exports.savePoster = function (req, res, next) {
    const posterData = req.files.uploadPoster;//通过name名称拿到file
    const filePath = posterData.path;//拿到路径（服务器缓存地址）
    const originalFilename = posterData.originalFilename;//拿到原始名称
    if (originalFilename) {
        fs.readFile(filePath, (err, data) => { //读取文件信息
            const timestamp = Date.now();//申明时间戳，用来命名新的图片的名称
            const type = posterData.type.split('/')[1];//取文件扩展名（image/jpeg）
            const poster = `${timestamp}.${type}`;//新名称
            const newPath = path.join(__dirname, '../../', `/public/upload/${poster}`);
            fs.writeFile(newPath, data, (err1) => {
                if (err1) {
                    console.log(err1);
                }
                req.poster = poster;//将写入成功后的poster的名字挂到request上。下一个流程后台可以请求到
                next();//进入下一个流程
            });
        });
    } else {
        next();//如果没有文件上传不做任何处理，直接进入下一个流程
    }
};
