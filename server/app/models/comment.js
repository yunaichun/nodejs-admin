var mongoose=require('mongoose');
var CommentSchema=require('../schemas/comment');

//编译生成模型（目前猜测第一个参数指的是数据库中对应的表名）
var Comment=mongoose.model('Comment',CommentSchema);
//导出模型
module.exports=Comment;