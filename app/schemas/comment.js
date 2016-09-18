//模式Schmea相当于定义数据库字段
var mongoose=require('mongoose');
//通过Schema获取模式中的值
var Schema=mongoose.Schema;
//关联文档数据类型（主键）
var ObjectId=Schema.Types.ObjectId;



//利用mongoose定义模式。其中meta指的是记录创建的时间
var CommentSchema=new Schema({
	//电影
	movie:{
		type:ObjectId,//值
		ref:'Movie'//指向Movie模型
	},
	//评论来自谁
	from:{
		type:ObjectId,//值
		ref:'User'//指向User模型
	},
	//被回复的人
	to:{
		type:ObjectId,//值
		ref:'User'//指向User模型
	},
	content:String,
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

//为模式添加方法。每次在存储数据之前都会调用此方法
CommentSchema.pre('save',function(next){
	if(this.isNew){
		this.meta.creataAt=this.meta.updateAt;
	}else{
		this.meta.updateAt=Date.now();
	}
    //调用静态方法，流程才能走下去
    next();
})

//静态方法，不会直接与数据库交互。模型实例化以后才会具有此方法
CommentSchema.statics={
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
module.exports=CommentSchema;