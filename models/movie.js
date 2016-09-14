var mongoose=require('mongoose');
var MovieSchema=require('../schemas/movie');

//编译生成模型（目前猜测第一个参数指的是数据库中对应的表名）
var Movie=mongoose.model('Movie',MovieSchema);
//导出模型
module.exports=Movie;