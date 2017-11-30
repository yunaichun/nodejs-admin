//电影页面模型
const Comment = require('../models/comment');

/**
 * [save 添加评论]
 */
exports.save = function (req, res) {
    //-----------comment是一个数组----------//
    //----------前台样式name="comment[movie]"----------//
    //电影ID----name="comment[movie]", value="#{movie._id}"                                    
    //现在登陆的用户ID----name="comment[from]", value="#{user._id}"                                      
    //主评论的ID----name:'comment[cid]'，value:commentId（var commentId=target.attr('data-cid');） 
    //主评论对应的用户ID----name:'comment[tid]',value:toId（var toId=target.attr('data-tid');）；          
    //内容----name="comment[content]"
    const comment = req.body.comment;
    //获取主评论对应的电影ID
    const movieId = comment.movie;
    
     
    //点击头像进行回复
    //如果有主评论cid（detail.js动态打印进去的）
    if (comment.cid) {
        //根据主评论的ID查找查找到这条评论记录
        Comment.findById(comment.cid, (err1, res1) => {
            const reply = {
                //现在登录用户为回复人form。name=c "comment[from]", value="#{user._id}"
                from: comment.from,
                //评论区：data-tid="#{item.from._id}"变成现在的toId。而value为toId的name为'comment[tid]',
                //回复区：data-tid="#{reply.from._id}"
                to: comment.tid, //回复谁。
                content: comment.content//回复内容
            };
            //传入数组
            res1.reply.push(reply);
            //执行保存
            res1.save((err2, res2) => {
                if (err2) {
                    console.log(err2);
                }
                console.log(res2);
                //页面重定向到详情页面
                res.redirect(`/movie/'${movieId}`);
            });
        });
    } else { 
        //如果不点击头像直接评论的话，直接生成主评论
        //调用模型,实例化.生成一条心记录
        const newComment = new Comment(comment);
        newComment.save((err3, res3) => {
            if (err3) {
                console.log(err3);
            }
            console.log(res3);
            //页面重定向到详情页面
            res.redirect(`/movie/'${movieId}`);
        });
    }
};
