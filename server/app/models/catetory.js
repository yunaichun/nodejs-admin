const mongoose = require('mongoose');
const CatetorySchema = require('../schemas/catetory');

//编译生成模型: 第一个参数是数据库中对应表名
const Catetory = mongoose.model('Catetory', CatetorySchema);
module.exports = Catetory;
