const mongoose = require('mongoose');

// 连接数据库
mongoose.connect('mongodb://localhost:6666/OnlineMovie', err => {
	if (err) {
		console.log('connect database error -->', err);
		process.exit(1);
	}
});
