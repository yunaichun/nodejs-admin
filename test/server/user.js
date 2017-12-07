const expect = require('chai').expect;

const getRandomString = require('../utils/getRandomString');
const User = require('../../server/app/models/user');

let user = {};
let user2 = {};
describe('Test User Model Logic', () => {
	before(() => {
		user = {
			name: getRandomString(), //获得长度16的字符串: 
			password: 'password',
		};
		user2 = {
			name: getRandomString(), //获得长度16的字符串: 
			password: 'password',
		};
	});
	afterEach((done) => {
		User.deleteOne({ name: user.name }, (err, res) => {
			expect(err).to.be.equal(null);
			expect(res.result.ok).to.be.equal(1);
			done();
		});
	});
	describe('Save logic', () => {
		/* 返回保存结果
			{ 
				__v: 0,
				name: '4472dcab8525888a',
				password: '$2a$10$nePsE1IPNm1kDxFrPRevpeW3rNdiKHC69tIU8FTlyDY.Q.t6bnsAe',
				_id: 5a28deccaf66d58b3a35d223,
				meta: 
				{ 
					updateAt: 2017-12-07T06:25:16.136Z,
					createAt: 2017-12-07T06:25:16.136Z 
				},
				role: 0 
			}
		*/
		it('initial save with field of isNew and have a default role', (done) => {
			const newUser = new User(user);
			newUser.save((err, res) => {
				expect(err).to.be.equal(null);
				expect(res.role).to.be.equal(0);
				done();
			});
		});
		it('password hashed correctly', (done) => {
			const newUser = new User(user);
			const password = user.password; //明文密码
			newUser.save((err, res) => {
				expect(err).to.be.equal(null);
				expect(res.name).to.be.equal(user.name);
				res.comparePassword(password, (err2, res2) => {
					expect(err2).to.be.equal(null);
					expect(res2).to.be.equal(true);
					done();
				});
			});
		}); 
		it('can not have the same user', (done) => {
			const newUser = new User(user);
			newUser.save((err, res) => {
				expect(err).to.be.equal(null);
				expect(res.name).to.be.equal(user.name);
				const newUser2 = new User(user);
				newUser2.save((err2) => {
					expect(err2).not.to.be.equal(null);
					done();
				});
			});
		});
	});
	describe('Find logic', () => {
		it('find special user', (done) => {
			User.selectOne({ name: user.name }, (err, res) => {
				expect(err).to.be.equal(null);
				expect(Array.isArray(res)).to.be.equal(false);//{}
				done();
			});
		});
		it('find all users', (done) => {
			User.selectAll({}, (err, res) => {
				expect(err).to.be.equal(null);
				expect(Array.isArray(res)).to.be.equal(true);//[{}……]
				done();
			});
		});
	});
	describe('Update logic', () => {
		it('update special user', (done) => { //异步测试
			const newUser = new User(user);
			newUser.save((err, res) => {
				expect(err).to.be.equal(null);
				expect(res.name).to.be.equal(user.name);
				User.updateAll({ name: user.name }, { $set: { 'meta.updateAt': Date.now() } }, (err1, res1) => {
					expect(err1).to.be.equal(null);
					expect(res1.nModified).to.be.equal(1);//{ n: 1, nModified: 1, ok: 1 }
					done();
				});
			});
		});
		it('update all users', (done) => { //异步测试
			const newUser1 = new User(user);
			newUser1.save((err, res) => {
				expect(err).to.be.equal(null);
				expect(res.name).to.be.equal(user.name);
				const newUser2 = new User(user2);
				newUser2.save((err1, res1) => {
					expect(err1).to.be.equal(null);
			    	expect(res1.name).to.be.equal(user2.name);
					User.updateAll({}, { $set: { 'meta.updateAt': Date.now() } }, (err2, res2) => {
						expect(err2).to.be.equal(null);
			    	    expect(res2.nModified).to.be.equal(2);//{ n: 2, nModified: 2, ok: 1 }
						done();
					});
				});
			});
		});
	});
	describe('Remove logic', () => {
		it('remove special user', (done) => { //异步测试
			const newUser = new User(user);
			newUser.save((err, res) => {
				expect(err).to.be.equal(null);
				expect(res.name).to.be.equal(user.name);
				User.deleteOne({ name: user.name }, (err1, res1) => {
					expect(err1).to.be.equal(null);
					expect(res1.result.n).to.be.equal(1);//{ result: { n: 1, ok: 1 } …… }
					done();
				});
			});
		});
		it('remove all users', () => { //返回Promise
			return User.remove({})
				.then((res) => {
					expect(res.result.n).to.be.equal(1);//{ result: { n: 1, ok: 1 } …… }
				});
		});
		it('remove all users by array of ids', (done) => { //异步测试
			const newUser = new User(user);
			const ids = [];
			newUser.save((err, res) => {
				expect(err).to.be.equal(null);
				ids.push(res._id);
				const newUser2 = new User(user2);
				newUser2.save((err1, res1) => {
					expect(err1).to.be.equal(null);
					ids.push(res1._id);
					User.deleteAllByIds(ids, (err2, res2) => {
						expect(err2).to.be.equal(null);
						expect(res2.result.n).to.be.equal(2);//{ result: { n: 2, ok: 1 } …… }
						done();
					});
				});
			});
		});
	});
});
