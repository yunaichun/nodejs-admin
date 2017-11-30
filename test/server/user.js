const expect = require('chai').expect;
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const getRandomString = require('../utils/getRandomString');
// const app = require('../../app');
const User = require('../../server/app/models/user');

let user = {};
describe('Test User Model Logic', () => {
	before(() => {
		user = {
			name: getRandomString(), //获得长度16的字符串: 
			password: 'password',
		};
	});
	afterEach((done) => {
		User.deleteAll({}, (err, res) => {
			expect(err).to.be.equal(null);
			expect(res.result.ok).to.be.equal(1);
			done();
		});
	});
	describe('Save logic', () => {
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
			User.fetchOne({ name: user.name }, (err, res) => {
				expect(err).to.be.equal(null);
				expect(Array.isArray(res)).to.be.equal(false);
				done();
			});
		});
		it('find all users', (done) => {
			User.fetchAll({}, (err, res) => {
				expect(err).to.be.equal(null);
				expect(Array.isArray(res)).to.be.equal(true);
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
					expect(res1.nModified).to.be.equal(1);
					done();
				});
			});
		});
		it('update all users', (done) => { //异步测试
			const newUser1 = new User(user);
			newUser1.save(() => {
				const user2 = {
					name: getRandomString(), //获得长度16的字符串: 
					password: 'password',
				};
				const newUser2 = new User(user2);
				newUser2.save(() => {
					User.updateAll({}, { $set: { 'meta.updateAt': Date.now() } }, (err1, res1) => {
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
				User.deleteAll({ name: user.name }, (err1, res1) => {
					expect(err1).to.be.equal(null);
					expect(res1.result.ok).to.be.equal(1);
					done();
				});
			});
		});
		it('remove all users', () => { //返回Promise
			return User.remove({})
				.then((res) => {
					expect(res.result.ok).to.be.equal(1);
				});
		});
	});
});
