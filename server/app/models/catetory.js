var mongoose=require('mongoose');
var CatetorySchema=require('../schemas/catetory');

//编译生成模型（目前猜测第一个参数指的是数据库中对应的表名）
var Catetory=mongoose.model('Catetory',CatetorySchema);
//导出模型
module.exports=Catetory;