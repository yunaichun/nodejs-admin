//电影页面模型
const Movie = require('../models/movie');
//评论页面
const Comment = require('../models/comment');
//电影分类
const Catetory = require('../models/catetory');
//引用underscore模块（修改替换）
const _ = require('underscore');
//文件系统
const fs = require('fs');
//路径模块
const path = require('path');

//detail jade【电影详情页-->渲染数据】
exports.detail = function (req, res) {
    //:id指的是可以获取前台传递的值
    const id = req.params.id;
    Movie.findById(id, (err, movie) => {
        //访客统计量计算，进入详情页面自增1
        Movie.update({ _id: id }, { $inc: { pv: 1 } }, (err1) => {
            if (err1) {
                console.log(err1);
            }
        });
        //-----关联查询用户名------//
        //1、查找到此电影id
        //2、populate关联查询user的数据from在模型中已经定义，来自User（ref:'User'）
        //3、根据from中的ObjectId去user表中去查name
        Comment
            .find({ movie: id })
            .populate('from', 'name')
            // 根据关联的user表的_id查user表的name字段。这样在页面就可以拿到user表的name字段reply.from.name  
            // from:{        
            //     type:ObjectId,
            //     ref:'User'
            // },
            .populate('reply.from reply.to', 'name')
            .exec((err3, comments) => {
                if (err3) {
                    console.log(err3);
                }
                res.render('detail', {
                    title: `详情页${movie.title}`,
                    movie, //movie对象传走
                    comments //comments对象传走
                });
            });
    });
};


//admin jade【添加电影页-->渲染空数据】
exports.new = function (req, res) {
    //需要有默认的值（因为修改也用了此页面，所以添加的时候默认渲染为空）
    // res.render('admin', {
    //     title: '后台录入页',
    //     movie: {
    //         title: '',
    //         doctor: '',
    //         country: '',
    //         year: '',
    //         poster: '',
    //         flash: '',
    //         summary: '',
    //         language: ''
    //     }
    // })
    Catetory.find({}, (err, catetories) => {
        res.render('admin', {
            title: '后台录入页',
            catetories, //来自查询的结果
            movie: {}
        });
    });
};
//【修改电影页-->渲染数据】
//admin update movie(列表页点击更新，即修改-->将查询到的数据打印到后台录入页)
exports.update = function (req, res) {
    const id = req.params.id;
    if (id) {
        //根据电影id查询此记录
        Movie.findById(id, (err, movie) => {
            //查询到所有的分类，可以到页面去渲染
            Catetory.find({}, (err, catetories) => {
                res.render('admin', {
                    title: '后台更新页',
                    movie,
                    catetories
                });
            });
        });
    }
};


//增加图片上传功能
exports.savePoster = function (req, res, next) {
    //通过name名称拿到file
    const posterData = req.files.uploadPoster;
    console.log('前台传递的file:');
    console.log(req.files);

    //拿到路径（服务器缓存地址）
    const filePath = posterData.path;
    //拿到原始名称
    const originalFilename = posterData.originalFilename;
    //有图片传过来
    if (originalFilename) {
        //读取文件路径中的二进制数据,拿到海报的数据
        fs.readFile(filePath, (err, data) => {
            //申明时间戳，用来命名新的图片的名称
            const timestamp = Date.now();
            //取文件扩展名（image/jpeg）
            const type = posterData.type.split('/')[1];
            //新名称
            const poster = `${timestamp}.${type}`;
            //存入服务器
            //__dirname指的是当前movie所在的目录
            //存入上两层public目录下的upload目录下
            //第二个参数是指存入的根目录相对当前目录的位置
            //第三个参数是具体的文件路径+文件名称
            const newPath = path.join(__dirname, '../../', `/public/upload/${poster}`);
            //写入文件
            //第一个参数是文件路径
            //第二个参数是读取的data
            fs.writeFile(newPath, data, (err) => {
                //将写入成功后的poster的名字挂到request上。下一个流程后台可以请求到
                req.poster = poster;
                //进入下一个流程
                next();
            });
        });
    } else {
        //如果没有文件上传不做任何处理，直接进入下一个流程
        //根据路由可知，进入Movie.sava流程
        next();
    }
};

//admin post movie【新增、修改电影-->提交表单保存】
exports.save = function (req, res) {
    //前台是否传入id字段
    const id = req.body.movie._id;
    //拿到movie对象
    const movieObj = req.body.movie;
    //定义修改或者保存实体
    let _movie;

//处理文件上传
//上一个流程存储了一个新的海报地址
    if (req.poster) {
        //重写movieObj中原有的地址
        movieObj.poster = req.poster;
    }
    if (id) { //修改
        console.log('id存在');
        Movie.findById(id, (err, movie) => {
            if (err) {
                console.log(err);
            }
            //underscore模块可以完成替换，查询 到数据放在第一个位置,post数据放在第二个参数上去
            _movie = _.extend(movie, movieObj);
                //调用save方法，第二个参数是回调
            _movie.save((err, movie) => {
                if (err) {
                    console.log(err);
                }
                //页面重定向到详情页面
                res.redirect('/movie/' + movie.id);
            })
        })
    } else { //新增
        console.log('id不存在');
 // //调用模型（构造函数，传入电影数据）
        // _movie = new Movie({
        //     title: movieObj.title, //标题
        //     doctor: movieObj.doctor, //导演
        //     language: movieObj.language, //语言
        //     country: movieObj.country, //国家
        //     summary: movieObj.summary, //简介
        //     flash: movieObj.flash, //视频地址
        //     poster: movieObj.poster, //海报地址
        //     year: movieObj.year, //上映时间
        // })

        // //调用save方法，第二个参数是回调
        // _movie.save(function(err, movie) {
        //     if (err) {
        //         console.log(err);
        //     }
        //     //页面重定向到详情页面
        //     res.redirect('/movie/' + movie.id);
        // })

         //_movie = new Movie(movieObj)
        //保存电影之后需要将电影id保存在分类列表中去
        _movie = new Movie({
            catetory: movieObj.catetory, //分类id(选择的)
            //catetoryName:movieObj.catetoryName, //自己新增的
            title: movieObj.title, //标题
            doctor: movieObj.doctor, //导演
            language: movieObj.language, //语言
            country: movieObj.country, //国家
            summary: movieObj.summary, //简介
            flash: movieObj.flash, //视频地址
            poster: movieObj.poster, //海报地址
            year: movieObj.year, //上映时间
        });
       
        //获取从前台传来的分类name
        const catetoryId = _movie.catetory;
        //获取从前台传来的分类name
        const catetoryName = movieObj.catetoryName;
        //调用save方法，第二个参数是回调
        _movie.save((err, movie) => {
            console.log(movie);
            if (err) {
                console.log(err);
            }
            //电影分类是勾选的（在分类模块已经新增过）
            if (catetoryId) {
                //再在分类表中根据分类id查到此条记录，将此电影id添加进去
                Catetory.findById(catetoryId, (err, catetory) => {
                    //查找到此条分类记录，将电影idpush进去
                    catetory.movies.push(movie._id);
                    //磁性保存操作
                    catetory.save((err, catetory) => {
                        //页面重定向到详情页面
                        res.redirect('/movie/' + movie._id);
                    });
                });      
            } else if (catetoryName) { //直接在新增电影页面添加电影分类
                const catetory = new Catetory({
                    name: catetoryName, //前台获取
                    movies: [movie._id] //后台存储之后返回的
                });
                //新增电影分类
                catetory.save((err, catetory) => {
                    //将此时保存电影分类返回的id赋值给现在要保存的电影
                    _movie.catetory = catetory._id;
                    //第二次保存电影（将分类存进去）
                    movie.save((err, movie) => {
                        //跳转
                        res.redirect('/movie/'+movie._id);
                    });
                });
            } 
        });
    }
};


//list jade【电影列表页-->渲染数据】
exports.list = function (req, res) {
        // //调用方法（回调方法中拿到返回的movies数组）
        // Movie.fetch(function(err, movies) {
        //     if (err) {
        //         console.log(err);
        //     }
        //     //渲染首页模板
        //     res.render('list', {
        //         title: '列表页',
        //         movies: movies
        //     })
        // })
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
//list delete movie【电影列表页-->异步删除click】
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
