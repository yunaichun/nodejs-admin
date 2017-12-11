const expect = require('chai').expect;

const getRandomString = require('../utils/getRandomString');
const Catetory = require('../../server/app/models/catetory');
const Movie = require('../../server/app/models/movie');
const fs = require('fs');
const path = require('path');

let catetory = {};//先保存分类获取分类id
let movie = {};//保存电影 
describe('Test Movie Model Logic', () => {
	before((done) => {
		catetory = {
			name: getRandomString() //获得长度16的字符串: 
		};
		movie = {
			title: '金刚狼3：殊死一战', //标题
			doctor: '詹姆斯·曼高德', //导演
			language: '英语/西班牙语', //语言
			country: '美国', //国家
			summary: '金刚狼3：殊死一战', //简介
			flash: 'https://movie.douban.com/trailer/212262/#content', //视频地址
			poster: 'https://img3.doubanio.com/view/photo/s_ratio_poster/public/p2431980130.webp', //海报地址
			year: 2017, //上映时间
		};
		const newCatetory = new Catetory(catetory);
		newCatetory.save((err, res) => {
			expect(err).to.be.equal(null);
			movie.catetory = res._id;
			done();
		});
	});
	afterEach((done) => {
		Movie.deleteOne({}, (err1, res1) => {
			expect(err1).to.be.equal(null);
			expect(res1.result.ok).to.be.equal(1);
			done();
		});
	});
	after(() => {
		Catetory.deleteOne({});
	});
	describe('Save logic', () => {
        /*  返回保存结果
			{ 
				__v: 0,
				title: '金刚狼3：殊死一战',
				doctor: '詹姆斯·曼高德',
				language: '英语/西班牙语',
				country: '美国',
				summary: '金刚狼3：殊死一战',
				flash: 'https://movie.douban.com/trailer/212262/#content',
				poster: 'https://img3.doubanio.com/view/photo/s_ratio_poster/public/p2431980130.webp',
				year: 2017,
				catetory: 5a29137d73ddb0a96829acad,
				_id: 5a29137d73ddb0a96829acae,
				meta: 
				{ 
					updateAt: 2017-12-07T10:10:04.878Z,
					createAt: 2017-12-07T10:10:04.878Z 
				},
				pv: 0 
			}
		*/
		it('save with exist catototy', (done) => {
			const newMovie = new Movie(movie);
			newMovie.save((err, res) => {
				expect(err).to.be.equal(null);
				expect(res.catetory).to.be.equal(movie.catetory);
				Catetory.selectOne({ _id: movie.catetory }, (err1, res1) => {
					expect(err1).to.be.equal(null);
					expect(Array.isArray(res1.movies)).to.be.equal(true);
					res1.movies.push(res._id);
					Catetory.updateAll({ _id: movie.catetory }, { $set: { 'meta.updateAt': Date.now(), movies: res1.movies } }, (err2, res2) => {
						expect(err2).to.be.equal(null);
						expect(res2.ok).to.be.equal(1); //{ n: 1, nModified: 1, ok: 1 }
						done();
					});
				});
			});
		});
		it('save without exist catototy', (done) => {
			movie.catetoryName = '新增分类';
			const newMovie = new Movie(movie);
			newMovie.save((err, res) => {
				expect(err).to.be.equal(null);
				expect(res.catetory).to.be.equal(movie.catetory);
				const catetory1 = {
					name: res.catetoryName, //分类名称
					movies: [res._id] //电影id
				};
				const newCatetory = new Catetory(catetory1);
				newCatetory.save((err1, res1) => {
					expect(err1).to.be.equal(null);
					expect(res1.name).to.be.equal(catetory1.name);
					Movie.updateAll({ _id: res._id }, { $set: { 'meta.updateAt': Date.now(), catetory: res1._id } }, (err2, res2) => {
						expect(err2).to.be.equal(null);
						expect(res2.ok).to.be.equal(1); //{ n: 1, nModified: 1, ok: 1 }
						done();
					});
				});
			});
		});
		it('upload file', (done) => {
			const files = fs.readdirSync(path.join(__dirname, '../utils/'));
			const filterJPGFiles = files.filter((file) => file.indexOf('jpg') > -1);
			if (filterJPGFiles) {
				filterJPGFiles.forEach((file) => {
					fs.unlinkSync(path.join(__dirname, '../utils/', file));
				});
			}
			fs.readFile(path.join(__dirname, '../utils/upload.jpeg'), (err, res) => {
				const timestamp = Date.now();
				const type = 'jpg';
				const newPath = path.join(__dirname, '../utils/', `/${timestamp}.${type}`);
				fs.writeFile(newPath, res, (err2) => {
					expect(err2).to.be.equal(null);
					done();
				});
			});
		});
	});
	describe('delete logic', () => {
		it('remove special movie', (done) => { //异步测试
			const newMovie = new Movie(movie);
			newMovie.save((err, res) => {
				expect(err).to.be.equal(null);
				expect(res.catetory).to.be.equal(movie.catetory);
				Movie.deleteOne({ _id: res._id }, (err1, res1) => {
					expect(err1).to.be.equal(null);
					expect(res1.result.n).to.be.equal(1);//{ result: { n: 1, ok: 1 } …… }
					done();
				});
			});
		});
		it('remove all movies', () => { //返回Promise
			return Movie.remove({})
				.then((res) => {
					expect(res.result.ok).to.be.equal(1);//{ result: { n: 0, ok: 1 } …… }
				});
		});
		it('remove all users by array of ids', (done) => { //异步测试
			const newMovie = new Movie(movie);
			const ids = [];
			newMovie.save((err, res) => {
				expect(err).to.be.equal(null);
				ids.push(res._id);
				const newMovie2 = new Movie(movie);
				newMovie2.save((err1, res1) => {
					expect(err1).to.be.equal(null);
					ids.push(res1._id);
					Movie.deleteAllByIds(ids, (err2, res2) => {
						expect(err2).to.be.equal(null);
						expect(res2.result.n).to.be.equal(2);//{ result: { n: 2, ok: 1 } …… }
						done();
					});
				});
			});
		});
	});
	describe('Update logic', () => {
		it('update special movie by update methods', (done) => { //异步测试
			const newMovie = new Movie(movie);
			newMovie.save((err, res) => {
				expect(err).to.be.equal(null);
				expect(res.catetory).to.be.equal(movie.catetory);
				Movie.updateAll({ _id: res._id }, { $set: { 'meta.updateAt': Date.now() } }, (err1, res1) => {
					expect(err1).to.be.equal(null);
					expect(res1.nModified).to.be.equal(1);//{ n: 1, nModified: 1, ok: 1 }
					done();
				});
			});
		});
		it('update special movie by save methods', (done) => { //异步测试
			const newMovie = new Movie(movie);
			newMovie.save((err, res) => {
				expect(err).to.be.equal(null);
				expect(res.catetory).to.be.equal(movie.catetory);
				res.save((err1, res1) => {
					expect(err1).to.be.equal(null);
					expect(res1.catetory).to.be.equal(res.catetory);
					done();
				});
			});
		});
	});
	//新增一个电影->分类里就需要再添加一个->开始查找电影【关联查询】
	describe('Find logic', () => {
		it('find special movie', (done) => {
			const newMovie = new Movie(movie);
			newMovie.save((err, res) => {
				expect(err).to.be.equal(null);
				expect(res.catetory).to.be.equal(movie.catetory);
				Catetory.selectOne({ _id: movie.catetory }, (err1, res1) => {
					expect(err1).to.be.equal(null);
					expect(Array.isArray(res1.movies)).to.be.equal(true);
					res1.movies.push(res._id);
					Catetory.updateAll({ _id: movie.catetory }, { $set: { 'meta.updateAt': Date.now(), movies: res1.movies } }, (err2, res2) => {
						expect(err2).to.be.equal(null);
						expect(res2.ok).to.be.equal(1); //{ n: 1, nModified: 1, ok: 1 }
						Movie.selectOne({ _id: res._id }, (err2, res2) => {
							expect(err2).to.be.equal(null);
							expect(res2.catetory.name).to.be.equal(res1.name);//重点在这里：关联查询
							expect(Array.isArray(res2)).to.be.equal(false);//{}
							Movie.updateAll({ _id: res._id }, { $inc: { pv: 1 } }, (err3, res3) => { //访客统计量自增1
								expect(err3).to.be.equal(null);
								done();
							});
						});
					});
				});
			});
		});
		it('find all movies', (done) => {
			Movie.selectAll({}, (err, res) => {
				expect(err).to.be.equal(null);
				expect(Array.isArray(res)).to.be.equal(true);//[{}……]
				done();
			});
		});
		it('find movies by title', (done) => {
			catetory = {
				name: '未知分类' //获得长度16的字符串: 
			};
			const newCatetory = new Catetory(catetory);
			//新增一个分类
			newCatetory.save((err, res) => {
				movie.catetory = res._id;
				//在此分类下添加5个电影
				Movie.create(movie, movie, movie, movie, movie, movie, (err1, res1) => {
					Movie.selectAll({}, '_id', (err3, res3) => {
						for (let i = 0; i < res3.length; i++) {
							res.movies.push(res3[i]._id);
						}
						//将5个电影存入分类中
						res.save((err4, res4) => {
							//通过分类查找5个电影
							Movie.selectMoviesByTitle('金刚狼', {}, 1, 5, (err5, res5) => {
								done();
							});
						});
					});
				});
			});
		});
	});
});
