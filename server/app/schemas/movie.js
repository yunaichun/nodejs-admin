const mongoose = require('mongoose');//模式Schmea相当于定义数据库字段
//关联文档数据类型（主键）
const ObjectId = mongoose.Schema.Types.ObjectId;

//利用mongoose定义模式。其中meta指的是记录创建的时间
const MovieSchema = new mongoose.Schema({
	catetory: { 
		type: ObjectId, 
		ref: 'Catetory' 
	}, //电影对应的分类id【选择已有的分类】
	catetoryName: {
		type: String, 
		default: undefined
	}, //分类标题【新增还没有添加的分类】
	title: String, //标题
	doctor: String, //导演
	language: String, //语言
	country: String, //国家
	summary: String, //简介
	flash: String, //视频地址
	poster: String, //海报地址
	year: Number, //上映时间
	pv: { //访客统计，初始值是0
		type: Number,
		default: 0
	},
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
MovieSchema.pre('save', function (next) {
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
MovieSchema.statics = {
	//批量保存：导入EXCEL
	saveAll(arrays, cb) {
		this.model('Movie').create.apply(this, arrays, cb);
	},
	//指定条件删除一条数据【传入空对象删除全部】
	deleteOne(obj, cb) {
		return this
			.remove(obj)
			.exec(cb);//执行删除后，调用回调cb函数。相当于Movie.update(conditions, doc, options, cb)
	},
	//根据某一字段批量删除【传入同一字段数组值】
	deleteAllByIds(valueArray, cb) {
		return this
			.remove({ _id: { $in: valueArray } })
			.exec(cb);//执行删除后，调用回调cb函数。相当于Movie.remove(obj, cb)
	},
	//更新指定条件下所有数据【传入空对象更新全部】
	updateAll(conditions, doc, cb) {
		return this
			.update(conditions, doc, { multi: true })
			.exec(cb);//执行更新后，将调用回调cb函数。相当于Movie.update(conditions, doc, options, cb)
	},
	//指定条件查询一条数据
	selectOne(obj, cb) {
		return this
			.findOne(obj)
			.populate('catetory', 'name')
			.exec(cb);//执行查询后，将调用回调cb函数。相当于Movie.findOne({ _id: id }, cb)
	},
	//指定条件查询全部：按照更新时间排序
	selectAll(obj, conditions = {}, cb) {
		return this
			.find(obj, conditions)
			.populate('catetory', 'name')
			.sort('meta.updateAt')
			.exec(cb);//执行查询后，将调用回调cb函数。相当于Movie.find(obj, cb)
	}
};
module.exports = MovieSchema;
