const expect = require('chai').expect;
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const getRandomString = require('../utils/getRandomString');
// const app = require('../../app');
const User = require('../../app/models/user');

let user = {};
describe('Test User Model Logic', () => {
	before(() => {
		user = {
			name: getRandomString(), //获得长度16的字符串: 
			password: 'password',
		};
	});
	describe('Before save logic', () => {
		it('connect mongoDB success', () => { //传入done指的是异步测试
			mongoose.connect('mongodb://localhost:6666/OnlineMovie', err => {
				if (err) {
					console.log('connect database error -->', err);
					process.exit(1);
				}
			});
		});
		it('remove all user', () => { //返回Promise
			return User.remove({})
				.then((res) => {
					expect(res.result.ok).to.be.equal(1);
				});
		});
		it('start without user', (done) => { //异步测试
			User.find({ name: user.name }, (err, users) => {
				expect(err).to.be.equal(null);
				expect(users.length).to.be.equal(0);
				done();
			});
		});
	});
	describe('Save logic', () => {
		it(' save without problem', (done) => {
			const newUser = new User(user);
			newUser.save((err, res) => {
				expect(err).to.be.equal(null);
				expect(res.name).to.be.equal(user.name);
				newUser.remove((err2, res2) => {
					expect(err2).to.be.equal(null);
					expect(res2.name).to.be.equal(user.name);
					done();
				});
			});
		});
		it('password hashed correctly', (done) => {
			const newUser = new User(user);
			const password = user.password; //明文密码
			newUser.save((err, res) => {
				expect(err).to.be.equal(null);
				expect(res.name).to.be.equal(user.name);
				bcrypt.compare(password, res.password, (err2, res2) => {
					console.log('222', res2);
					expect(err2).to.be.equal(null);
					expect(res2).to.be.equal(true);
					newUser.remove((err3, res3) => {
						expect(err3).to.be.equal(null);
						expect(res3.name).to.be.equal(user.name);
						done();
					});
				});
			});
		});
		it('have a default role', (done) => {
			const newUser = new User(user);
			newUser.save((err, res) => {
				expect(err).to.be.equal(null);
				expect(res.role).to.be.equal(0);
				newUser.remove((err2, res2) => {
					expect(err2).to.be.equal(null);
					expect(res2.role).to.be.equal(0);
					done();
				});
			});
		});
		it('can not save if have a user', (done) => {
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
});
