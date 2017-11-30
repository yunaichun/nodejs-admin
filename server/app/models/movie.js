const mongoose = require('mongoose');
const MovieSchema = require('../schemas/movie');

//编译生成模型: 第一个参数是数据库中对应表名
const Movie = mongoose.model('Movie', MovieSchema);
module.exports = Movie;
