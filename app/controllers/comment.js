//电影页面模型
var Comment = require('../models/comment');
//引用underscore模块（修改替换）
var _ = require('underscore');


//comment
exports.save=function(req, res) {
    //获取post的user值
    var _comment=req.body.comment;
    //获取主键
    var movieId=_comment.movie;
    //调用模型,实例化
    var comment=new Comment(_comment);

    //调用save方法，第二个参数是回调
    comment.save(function(err, comment) {
        if (err) {
            console.log(err);
        }
        //页面重定向到详情页面
        res.redirect('/movie/' + movieId);
    })
}



