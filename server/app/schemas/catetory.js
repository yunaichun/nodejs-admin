const mongoose = require('mongoose');//模式Schmea相当于定义数据库字段
//关联文档数据类型（主键）
const ObjectId = mongoose.Schema.Types.ObjectId;

//利用mongoose定义模式。其中meta指的是记录创建的时间
const CatetorySchema = new mongoose.Schema({
	name: {
		unique: true,
		type: String
	}, //分类名称
	movies: [{ type: ObjectId, ref: 'Movie' }], //分类对应的电影id数组（一对多）
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
CatetorySchema.pre('save', function (next) {
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
CatetorySchema.statics = {
	//批量保存：导入EXCEL
	saveAll(arrays, cb) {
		this.model('Catetory').create.apply(this, arrays, cb);
	},
	//指定条件删除一条数据【传入空对象删除全部】
	deleteOne(obj, cb) {
		return this
			.remove(obj)
			.exec(cb);//执行删除后，调用回调cb函数。相当于Catetory.remove(obj, cb)或则newCatetory.remove(cb)
	},
	//根据某一字段批量删除【传入同一字段数组值】
	deleteAllByIds(valueArray, cb) {
		return this
			.remove({ _id: { $in: valueArray } })
			.exec(cb);//执行删除后，调用回调cb函数。相当于Catetory.remove(obj, cb)
	},
	//更新指定条件下所有数据【传入空对象更新全部】
	updateAll(conditions, doc, cb) {
		return this
			.update(conditions, doc, { multi: true })
			.exec(cb);//执行更新后，将调用回调cb函数。相当于Catetory.update(conditions, doc, options, cb)
	},
	//指定条件查询一条数据
	selectOne(obj, conditions = {}, cb) {
		return this
			.findOne(obj, conditions)
			.exec(cb);//执行查询后，将调用回调cb函数。相当于Catetory.findOne({ _id: id }, cb)
	},
	//指定条件查询全部：按照更新时间排序
	selectAll(obj, conditions = {}, cb) {
		return this
			.find(obj, conditions)
			.sort('meta.updateAt')
			.exec(cb);//执行查询后，将调用回调cb函数。相当于Catetory.find(obj, cb)
	},
	//指定条件查询全部：按照更新时间排序
	selectMoviesByCatetory(obj, conditions = {}, currentPage, pageSize, cb) {
		return this
			.find(obj, conditions)
			.populate({ 
				path: 'movies',
				// select:'title poster', 
				options: { 
					skip: parseInt(currentPage - 1, 10) * parseInt(pageSize, 10),
					limit: pageSize
				}
			})
			.sort('meta.updateAt')
			.exec(cb);//执行查询后，将调用回调cb函数。相当于Catetory.find(obj, cb)
	}
};
module.exports = CatetorySchema;
