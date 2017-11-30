const mongoose = require('mongoose');//模式Schmea相当于定义数据库字段
//关联文档数据类型（主键）
const ObjectId = mongoose.Schema.Types.ObjectId;

//利用mongoose定义模式。其中meta指的是记录创建的时间
const CommentSchema = new mongoose.Schema({
	movie: { type: ObjectId, ref: 'Movie' }, //评论对应的电影id
	from: { type: ObjectId, ref: 'User' }, //评论对应的用户id
	content: String, //评论内容
	//回复体
	reply: [{
		from: { type: ObjectId, ref: 'User' }, //谁回复（回复人）
		to: { type: ObjectId, ref: 'User' }, //回复谁（被回复人）
		content: String//回复内容
	}],	
	meta: {
		createAt: {
			type: Date,
			default: Date.now()
		},
		updateAt: {
			type: Date,
			default: Date.now()
		}
	}
});
/**
 * 为Schema添加中间件，通过next()向下传递。
 * 文档实例每次保存之前的判断。可以通过this获取此实例。
 * 【此函数不能用箭头函数，不然获取不到此文档实例】
 */
CommentSchema.pre('save', function (next) {
	if (this.isNew) {
		this.meta.creataAt = this.meta.updateAt;
	} else {
		this.meta.updateAt = Date.now();
	}
    next();
});
/**
 * 在Model上的方法。直接在Model上面的静态方法
 * 可以通过this获取此Model。可以对数据库操作
 */
CommentSchema.statics = {
	//查询全部：按照更新时间排序
	fetch(cb) {
		return this
			.find({})
			.sort('meta.updateAt')
			.exec(cb);
	},
	//查询单条数据
	findById(id, cb) {
		return this
			.findOne({ _id: id })
			.exec(cb);//执行查询完后，将调用回调cb函数：this.findOne({ _id: id }, cb)
	}
};
//导出模块
module.exports = CommentSchema;
