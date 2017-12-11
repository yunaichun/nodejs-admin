const expect = require('chai').expect;

const getRandomString = require('../utils/getRandomString');
const Catetory = require('../../server/app/models/catetory');
const Movie = require('../../server/app/models/movie');

let catetory = {};
let catetory2 = {};
describe('Test Catetory Model Logic', () => {
	before(() => {
		catetory = {
			name: getRandomString() //获得长度16的字符串: 
		};
		catetory2 = {
			name: getRandomString() //获得长度16的字符串: 
		};
	});
	afterEach(() => {
		Catetory.deleteOne({});
		Movie.deleteOne({});
	});
	describe('Save logic', () => {
        /* 返回保存结果
		{ 
			__v: 0,
			name: 'd34d229d414c0411',
			_id: 5a28de37e736e28a49ee95d2,
			meta: 
			{ 
				updateAt: 2017-12-07T06:22:47.154Z,
				createAt: 2017-12-07T06:22:47.154Z 
			},
			movies: [] 
		}
		*/
		it('initial save with field of isNew', (done) => {
			const newCatetory = new Catetory(catetory);
			newCatetory.save((err, res) => {
				expect(err).to.be.equal(null);
				expect(res.name).to.be.equal(catetory.name);
				done();
			});
		});
		it('can not have the same catetory', (done) => {
			const newCatetory = new Catetory(catetory);
			newCatetory.save((err, res) => {
				expect(err).to.be.equal(null);
				expect(res.name).to.be.equal(catetory.name);
				const newCatetory2 = new Catetory(catetory);
				newCatetory2.save((err2, res2) => {
					expect(err2).not.to.be.equal(null);
					done();
				});
			});
		});
	});
	describe('Remove logic', () => {
		it('remove special catetory', (done) => { //异步测试
			const newCatetory = new Catetory(catetory);
			newCatetory.save((err, res) => {
				expect(err).to.be.equal(null);
				expect(res.name).to.be.equal(catetory.name);
				Catetory.deleteOne({ name: catetory.name }, (err1, res1) => {
					expect(err1).to.be.equal(null);
					expect(res1.result.ok).to.be.equal(1);//{ result: { n: 1, ok: 1 } …… }
					done();
				});
			});
		});
		it('remove all catetories by Promise', () => { //返回Promise
			return Catetory.remove({})
				.then((res) => {
					expect(res.result.ok).to.be.equal(1);//{ result: { n: 0, ok: 1 } …… }
				});
		});
		it('remove all catetories by array of ids', (done) => { //异步测试
			const newCatetory = new Catetory(catetory);
			const ids = [];
			newCatetory.save((err, res) => {
				expect(err).to.be.equal(null);
				ids.push(res._id);
				const newCatetory2 = new Catetory(catetory2);
				newCatetory2.save((err1, res1) => {
					expect(err1).to.be.equal(null);
					ids.push(res1._id);
					Catetory.deleteAllByIds(ids, (err2, res2) => {
						expect(err2).to.be.equal(null);
						expect(res2.result.n).to.be.equal(2);//{ result: { n: 2, ok: 1 } …… }
						done();
					});
				});
			});
		});
	});
	describe('Update logic', () => {
		it('update special catetory by update methods', (done) => { //异步测试
			const newCatetory = new Catetory(catetory);
			newCatetory.save((err, res) => {
				expect(err).to.be.equal(null);
				expect(res.name).to.be.equal(catetory.name);
				Catetory.updateAll({ _id: res._id }, { $set: { 'meta.updateAt': Date.now() } }, (err1, res1) => {
					expect(err1).to.be.equal(null);
					expect(res1.nModified).to.be.equal(1);//{ n: 1, nModified: 1, ok: 1 }
					done();
				});
			});
		});
		it('update special catetory by save methods', (done) => { //异步测试
			const newCatetory = new Catetory(catetory);
			newCatetory.save((err, res) => {
				expect(err).to.be.equal(null);
				expect(res.name).to.be.equal(catetory.name);
				res.save((err1, res1) => {
					expect(err1).to.be.equal(null);
					expect(res1.name).to.be.equal(res.name);
					done();
				});
			});
		});
		it('update all catetories', (done) => { //异步测试
			const newCatetory1 = new Catetory(catetory);
			newCatetory1.save((err, res) => {
				expect(err).to.be.equal(null);
				expect(res.name).to.be.equal(catetory.name);
				const newCatetory2 = new Catetory(catetory2);
				newCatetory2.save((err1, res1) => {
					expect(err1).to.be.equal(null);
			    	expect(res1.name).to.be.equal(catetory2.name);
					Catetory.updateAll({}, { $set: { 'meta.updateAt': Date.now() } }, (err2, res2) => {
						expect(err2).to.be.equal(null);
			    	    expect(res2.ok).to.be.equal(1);//{ n: 2, nModified: 2, ok: 1 }
						done();
					});
				});
			});
		});
	});
	describe('Find logic', () => {
		it('find special catetory', (done) => {
			Catetory.selectOne({ name: catetory.name }, (err, res) => {
				expect(err).to.be.equal(null);
				expect(Array.isArray(res)).to.be.equal(false);//{}
				done();
			});
		});
		it('find movies by catetory', (done) => {
			const movie = {
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
							Catetory.selectMoviesByCatetory({}, {}, 1, 5, (err5, res5) => {
								done();
							});
						});
					});
				});
			});
		});
		it('find all catetories', (done) => {
			Catetory.selectAll({}, (err, res) => {
				expect(err).to.be.equal(null);
				expect(Array.isArray(res)).to.be.equal(true);//[{}……]
				done();
			});
		});
	});
});
