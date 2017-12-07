const expect = require('chai').expect;

const getRandomString = require('../utils/getRandomString');
const Catetory = require('../../server/app/models/catetory');

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
	afterEach((done) => {
		Catetory.deleteOne({ name: catetory.name }, (err, res) => {
			expect(err).to.be.equal(null);
			expect(res.result.ok).to.be.equal(1);
			done();
		});
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
	describe('Find logic', () => {
		it('find special catetory', (done) => {
			Catetory.selectOne({ name: catetory.name }, (err, res) => {
				expect(err).to.be.equal(null);
				expect(Array.isArray(res)).to.be.equal(false);//{}
				done();
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
	describe('Update logic', () => {
		it('update special catetory', (done) => { //异步测试
			const newCatetory = new Catetory(catetory);
			newCatetory.save((err, res) => {
				expect(err).to.be.equal(null);
				expect(res.name).to.be.equal(catetory.name);
				Catetory.updateAll({ name: catetory.name }, { $set: { 'meta.updateAt': Date.now() } }, (err1, res1) => {
					expect(err1).to.be.equal(null);
					expect(res1.nModified).to.be.equal(1);//{ n: 1, nModified: 1, ok: 1 }
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
			    	    expect(res2.nModified).to.be.equal(2);//{ n: 2, nModified: 2, ok: 1 }
						done();
					});
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
					expect(res.result.ok).to.be.equal(1);//{ result: { n: 1, ok: 1 } …… }
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
});
