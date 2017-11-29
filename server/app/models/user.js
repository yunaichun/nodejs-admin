const mongoose = require('mongoose');
const UserSchema = require('../schemas/user');

//编译生成模型（目前猜测第一个参数指的是数据库中对应的表名）
const User = mongoose.model('User', UserSchema);
//导出模型
module.exports = User;
