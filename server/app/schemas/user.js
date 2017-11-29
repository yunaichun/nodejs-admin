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
 * 【此函数不能用箭头函数，不然获取不到此文档】
 */
UserSchema.pre('save', function (next) {
	if (this.isNew) {
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
 * 可以通过this获取此实例。【】
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
 * 可以通过this获取此Model
 */
UserSchema.statics = {
	//查询全部：按照更新时间排序
	fetch(cb) {
		return this
			.find({})
			.sort('meta.updateAt')
			.exec(cb);//执行上述查询，同时传入回调函数
	},
	//查询单条数据
	findById(id, cb) {
		//执行回调方法
		return this
			.findOne({ _id: id })
			.exec(cb);//执行上述查询，同时传入回调函数
	}
};

module.exports = UserSchema;
