const mongoose = require('mongoose');
const CommentSchema = require('../schemas/comment');

//编译生成模型: 第一个参数是数据库中对应表名
const Comment = mongoose.model('Comment', CommentSchema);
module.exports = Comment;
