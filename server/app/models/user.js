const mongoose = require('mongoose');
const UserSchema = require('../schemas/user');

//编译生成模型: 第一个参数是数据库中对应表名
const User = mongoose.model('User', UserSchema);
module.exports = User;
