const crypto = require('crypto');

//获取随机字符串
module.exports = function getRandomString(len) {
	if (!len) {
		len = 16;
	}
	return crypto.randomBytes(Math.ceil(len / 2)).toString('hex');
};
