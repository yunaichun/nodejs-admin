const expect = require('chai').expect;

const Movie = require('../../server/src/models/movie');
const Comment = require('../../server/src/models/comment');
const User = require('../../server/src/models/user');

let movie = {};//电影
let comment1 = {};//评论1 
let comment2 = {};//评论1 
let user1 = {};//用户1
let user2 = {};//用户2
describe('Test Comment Model Logic', () => {
	before((done) => {
		//电影
		movie = {
			catetoryName: '未知分类', //分类名称
			title: '金刚狼3：殊死一战', //标题
			doctor: '詹姆斯·曼高德', //导演
			language: '英语/西班牙语', //语言
			country: '美国', //国家
			summary: '金刚狼3：殊死一战', //简介
			flash: 'https://movie.douban.com/trailer/212262/#content', //视频地址
			poster: 'https://img3.doubanio.com/view/photo/s_ratio_poster/public/p2431980130.webp', //海报地址
			year: 2017, //上映时间
		};
		//评论
		comment1 = {
			movie: null,
			from: null,
			content: '我是来自用户1的主评论'
		};
		comment2 = {
			from: null,
			to: null,
			content: '我是回复用户1的评论'
		};
		//用户
		user1 = {
			name: 'test1', //获得长度16的字符串: 
			password: 'password',
		};
		user2 = {
			name: 'test2', //获得长度16的字符串: 
			password: 'password',
		};
		const newMovie = new Movie(movie);
		newMovie.save((err, res) => { //添加电影
			expect(err).to.be.equal(null);
			movie._id = res._id;
			const newUser1 = new User(user1);
			newUser1.save((err1, res1) => { //添加用户1
				expect(err1).to.be.equal(null);
				user1._id = res1._id;
				const newUser2 = new User(user2);
				newUser2.save((err2, res2) => { //添加用户2
					expect(err2).to.be.equal(null);
					user2._id = res2._id;
					done();
				});
			});
		});
	});
	after(() => { 
		User.deleteOne({});
		Comment.deleteOne({});
		Movie.deleteOne({});
	});
	describe('Save logic', () => {
		/* 返回保存结果
			{ 
				__v: 0,
				content: '我是来自用户1的主评论',
				movie: 5a2dfe77d7a9d10ed9ce336a,
				from: 5a2dfe77d7a9d10ed9ce336b,
				_id: 5a2dfe78d7a9d10ed9ce336d,
				meta: 
				{ 
					updateAt: 2017-12-11T03:41:43.227Z,
					createAt: 2017-12-11T03:41:43.227Z 
				},
				 reply: [ 
					{ 
					   from: 5a2e254f35283b1a8ede8a32,
				       to: 5a2e254f35283b1a8ede8a31,
				       content: '我是回复用户1的评论',
				       _id: 5a2e254f35283b1a8ede8a34 
				    } 
			    ] 
			}
		*/
		it('save with main comment', (done) => {
			const mainComment = Object.assign({}, comment1, { movie: movie._id, from: user1._id});
			const newComment = new Comment(mainComment);
			newComment.save((err, res) => {
				expect(err).to.be.equal(null);
				comment1._id = res._id;
				done();
			});
		});
		it('save with reply comment', (done) => {
			Comment.selectOne({ _id: comment1._id }, (err, res) => {
				expect(err).to.be.equal(null);
				comment2.from = user2._id;
				comment2.to = user1._id;
				res.reply.push(comment2);
				res.save((err1, res1) => {
					expect(err1).to.be.equal(null);
					done();
				});
			});
		});
		it('save with second main comment', (done) => {
			const mainComment2 = comment1 = {
				movie: movie._id,
				from: user1._id,
				content: '我是来自用户1的第二条主评论'
			};
			const newComment2 = new Comment(mainComment2);
			newComment2.save((err, res) => {
				expect(err).to.be.equal(null);
				done();
			});
		});
	});
	describe('Remove logic', () => {
		it('remove special comment', (done) => { //异步测试
			const mainComment3 = {
				movie: movie._id,
				from: user1._id,
				content: '我是来自用户1的第三条主评论'
			};
			const newComment3 = new Comment(mainComment3);
			newComment3.save((err, res) => {
				expect(err).to.be.equal(null);
				Comment.deleteOne({ _id: res._id }, (err1, res1) => {
					expect(err1).to.be.equal(null);
					expect(res1.result.n).to.be.equal(1);//{ result: { n: 1, ok: 1 } …… }
					done();
				});
			});
		});
		// it('remove all comments', () => { //返回Promise
		// 	return Comment.remove({})
		// 		.then((res) => {
		// 			expect(res.result.ok).to.be.equal(1);//{ result: { n: 0, ok: 1 } …… }
		// 		});
		// });
		it('remove all comments by array of ids', (done) => { //异步测试
			const mainComment = {
				movie: movie._id,
				from: user1._id,
				content: '我是来自用户1的第三条主评论'
			};
			const newComment = new Comment(mainComment);
			const ids = [];
			newComment.save((err, res) => {
				expect(err).to.be.equal(null);
				ids.push(res._id);
				const mainComment2 = new Comment(mainComment);
				mainComment2.save((err1, res1) => {
					expect(err1).to.be.equal(null);
					ids.push(res1._id);
					Comment.deleteAllByIds(ids, (err2, res2) => {
						expect(err2).to.be.equal(null);
						expect(res2.result.n).to.be.equal(2);//{ result: { n: 2, ok: 1 } …… }
						done();
					});
				});
			});
		});
	});
	describe('Find logic', () => {
		it('find special comment', (done) => {
			Movie.selectOne({ _id: movie._id }, (err, res) => {
				expect(err).to.be.equal(null);
				Movie.updateAll({ _id: res._id }, { $inc: { pv: 1 } }, (err1, res1) => { //访客统计量自增1
					expect(err1).to.be.equal(null);
				});
				Comment.selectOne({ movie: res._id }, (err2, res2) => {
					expect(err2).to.be.equal(null);
					expect(Array.isArray(res2)).to.be.equal(false);//{}
					done();
				});
			});
		});
		it('find all comments', (done) => {
			Movie.selectOne({ _id: movie._id }, (err, res) => {
				expect(err).to.be.equal(null);
				Movie.updateAll({ _id: res._id }, { $inc: { pv: 1 } }, (err1, res1) => { //访客统计量自增1
					expect(err1).to.be.equal(null);
				});
				Comment.selectAll({ movie: res._id }, (err2, res2) => {
					expect(err2).to.be.equal(null);
					expect(Array.isArray(res2)).to.be.equal(true);//[{}……]
					done();
				});
			});
		});
	});
});
