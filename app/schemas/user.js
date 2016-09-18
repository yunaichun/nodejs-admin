//模式Schmea相当于定义数据库字段
var mongoose=require('mongoose');
//加密算法
var bcrypt=require('bcryptjs');
//计算强度，默认是10
var SALT_WORK_FACTOR=10;
//利用mongoose定义模式。其中meta指的是记录创建的时间
var UserSchema=new mongoose.Schema({
	name:{
		unique:true,
		type:String
	},
	password:{
		unique:true,
		type:String
	},
	//0 normal
	//1 verified user
	//2 professional user
	//>10 admin
	//>50 super admin
	role:{
		type:Number,
		default:0
	},
	meta:{
		createAt:{
			type:Date,
			default:Date.now()
		},
		updateAt:{
			type:Date,
			default:Date.now()
		}
	}
})

//添加实例方法
UserSchema.methods={
	//第一个参数是用户传来的明文密码，第二个参数是回调函数
	comparePassword:function(_password,cb){
		bcrypt.compare(_password,this.password,function(err,isMatch){
			if(err){
				//有错误的话包装到回调方法中返回
				return cb(err);
			}
			//没有错误的话，将错误设置成为null，将是否匹配的值返回
			cb(null,isMatch);
		})
	}
}


//为模式添加方法。每次在存储数据之前都会调用此方法
UserSchema.pre('save',function(next){
	//当前密码
	var user=this;
	if(this.isNew){
		this.meta.creataAt=this.meta.updateAt;
	}else{
		this.meta.updateAt=Date.now();
	}
    //bcypt加盐加密算法.
    //生成盐，第一个参数是计算强度（计算时间和资源），第二个参数是拿到生成的盐
	bcrypt.genSalt(SALT_WORK_FACTOR,function(err,salt){
		//有错误，将错误带到下一个流程
		if(err){
			return next(err)
		}
		//拿到盐之后。用hash。第一个参数是明文密码，第二个参数是上一步生成的盐。第三个参数是回调方法
		bcrypt.hash(user.password,salt,function(err,hash){
			//有错误 return掉
			if(err){
			     return next(err)
		    }
		    //加盐后的hash密码
		    user.password=hash;
		    next();
		})
	})
	// var hash = bcrypt.hashSync(this.password);
    // this.password = hash;
    // next();
})

//静态方法，不会直接与数据库交互。模型实例化以后才会具有此方法
UserSchema.statics={
	//查询全部：跟新时间排序
	fetch:function(cb){
		return this
	      .find({})
	      .sort('meta.updateAt')
	      .exec(cb)
	},
	//查询单条数据
	findById:function(id,cb){
		//执行回调方法
		 return this
	      .findOne({_id: id})
	      .exec(cb)
	}
}
//导出模块
module.exports=UserSchema;