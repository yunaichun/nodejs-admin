//电影页面模型
var Comment = require('../models/comment');
//引用underscore模块（修改替换）
var _ = require('underscore');


//comment
exports.save=function(req, res) {
    //-----------comment是一个数组----------//
    //----------前台样式name="comment[movie]"----------//
    //电影ID----name="comment[movie]", value="#{movie._id}"                                    
    //现在登陆的用户ID----name="comment[from]", value="#{user._id}"                                      
    //主评论的ID----name:'comment[cid]'，value:commentId（var commentId=target.attr('data-cid');） 
    //主评论对应的用户ID----name:'comment[tid]',value:toId（var toId=target.attr('data-tid');）；          
    //内容----name="comment[content]"
    var _comment=req.body.comment;
    //获取主评论对应的电影ID
    var movieId=_comment.movie;
    
     
    //点击头像进行回复
    //如果有主评论cid（detail.js动态打印进去的）
    if(_comment.cid){
        //根据主评论的ID查找查找到这条评论记录
        Comment.findById(_comment.cid,function(err,comment){
            var reply={
                //现在登录用户为回复人form。name="comment[from]", value="#{user._id}"
                from:_comment.from,
                //评论区：data-tid="#{item.from._id}"变成现在的toId。而value为toId的name为'comment[tid]',
                //回复区：data-tid="#{reply.from._id}"
                to:_comment.tid,//回复谁。
                content:_comment.content//回复内容
            };
            //传入数组
            comment.reply.push(reply);
            //执行保存
            comment.save(function(err,comment){
                if (err) {
                    console.log(err);
                }
                //页面重定向到详情页面
                res.redirect('/movie/' + movieId);
            });
        });
    }else{//如果不点击头像直接评论的话，直接生成主评论
        //调用模型,实例化.生成一条心记录
        var comment=new Comment(_comment);
        comment.save(function(err,comment){
            if (err) {
                console.log(err);
            }
            //页面重定向到详情页面
            res.redirect('/movie/' + movieId);
        });
    }
};



