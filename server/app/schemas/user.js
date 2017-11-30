const mongoose = require('mongoose');//模式Schmea相当于定义数据库字段
const bcrypt = require('bcryptjs');//加密算法

const SALT_WORK_FACTOR = 10;//计算强度，默认是10

//利用mongoose定义模式。其中meta指的是记录创建的时间
const UserSchema = new mongoose.Schema({
	name: {
		unique: true,
		type: String
	},
	password: {
		unique: true,
		type: String
	},
	//0 normal
	//1 verified user
	//2 professional user
	//>10 admin
	//>50 super admin
	role: {
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
UserSchema.pre('save', function (next) {
	// determine whether this is the original save or the saving of an existing document (an update)
	if (this.isNew) { //每次新增默认都是true的
		this.meta.creataAt = this.meta.updateAt;
	} else {
		this.meta.updateAt = Date.now();
	}
    /**
     * bcypt加盐加密算法:https://github.com/kelektiv/node.bcrypt.js
     */
    //第一步：生成盐，第一个参数是计算强度（计算时间和资源），第二个参数是拿到生成的盐
	bcrypt.genSalt(SALT_WORK_FACTOR, (err, salt) => {
		if (err) {
			return next(err);//有错误，将错误带到下一个流程
		}
		//第二步：自动生成一个盐和散列
		bcrypt.hash(this.password, salt, (bcryptErr, hash) => {
			if (bcryptErr) {
				return next(bcryptErr);
			}
			//加盐后的hash密码
			this.password = hash;
			next();
		});
	});
});
/**
 * 在Schema上的方法。一个文档实例上面的方法。
 * 可以通过this获取此实例。
 */
UserSchema.methods = {
	//第一个参数是用户传来的明文密码，第二个参数是回调函数
	comparePassword(_password, cb) {
		bcrypt.compare(_password, this.password, (err, isMatch) => {
			if (err) {
				return cb(err);
			}
			cb(null, isMatch);//没有错误的话，将错误设置成为null，将是否匹配的值返回
		});
	}
};
/**
 * 在Model上的方法。直接在Model上面的静态方法
 * 可以通过this获取此Model。可以对数据库操作
 */
UserSchema.statics = {
	//指定条件查询一条数据
	fetchOne(obj, cb) {
		return this
			.findOne(obj)
			.exec(cb);//执行查询后，将调用回调cb函数。相当于User.findOne({ _id: id }, cb)
	},
	//指定条件查询全部：按照更新时间排序
	fetchAll(obj, cb) {
		return this
			.find(obj)
			.sort('meta.updateAt')
			.exec(cb);//执行查询后，将调用回调cb函数。相当于User.find(obj, cb)
	},
	//更新指定条件下所有数据【传入空对象更新全部】
	updateAll(conditions, doc, cb) {
		return this
			.update(conditions, doc, { multi: true })
			.exec(cb);//执行更新后，将调用回调cb函数。相当于User.update(conditions, doc, options, cb)
	},
	//删除指定条件下全部数据【传入空对象删除全部】
	deleteAll(obj, cb) {
		return this
			.remove(obj)
			.exec(cb);//执行删除后，调用回调cb函数。相当于User.remove(obj, cb)或则newUser.remove(cb)
	}
};
module.exports = UserSchema;
