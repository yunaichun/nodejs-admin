const expect = require('chai').expect;

const getRandomString = require('../utils/getRandomString');
const User = require('../../server/app/models/user');
const fs = require('fs');
const path = require('path');
const xlsx = require('node-xlsx');

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
		User.deleteOne({}, (err, res) => {
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
		it('initial save with field of isNew', (done) => {
			const newUser = new User(user);
			newUser.save((err, res) => {
				expect(err).to.be.equal(null);
				expect(res.role).to.be.equal(0);
				res.save((err2, res2) => {
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
		it('import EXCEL', (done) => {
			const excelPath = path.join(__dirname, '../utils/导入用户模板表.xlsx');
			const obj = xlsx.parse(excelPath);
			const excelObj = obj[0].data;
			const newArray = [];
			for (let i = 1; i < excelObj.length; i++) {
				const temp = {};
				for (let j = 0; j < excelObj[i].length; j++) {
					temp.name = excelObj[i][0];
					temp.password = excelObj[i][1];
				}
				newArray.push(temp);
			}
			User.saveAll(newArray, (err, res) => {
				expect(err).to.be.equal(null);
				expect(res.length).to.be.equal(3);
				done();
			});
		});
		it('export EXCEL', () => {
			const arrays = [
				{ name: 'test01', password: 'test01' },
				{ name: 'test02', password: 'test02' },
				{ name: 'test03', password: 'test03' }
			];
			User.saveAll(arrays);
			//查询数据以EXCEL表形式导出
			User.selectAll({}, 'name password meta.updateAt', (err, res) => {
				const newArray = [['用户名', '密码', '更新时间']];
				for (let i = 0; i < res.length; i++) {
					const temp = [];
					temp.push(res[i].name);
					temp.push(res[i].password);
					temp.push(res[i].meta.updateAt);
					newArray.push(temp);
				}
				//重新遍历了一次，真是闲的，但是也没有办法！！！
				const data = [];
				for (let m in newArray) {
					const arr = [];
					const value = newArray[m];
					for (let n in value) {
						arr.push(value[n]);
					}
					data.push(arr);
				}
				console.log(newArray === data);//两者的值是不同的
				const buffer = xlsx.build([
					{
						name: 'sheet1',
						data
					}        
				]);
				fs.writeFileSync(path.join(__dirname, '../utils/导出用户模板表.xlsx'), buffer, { flag: 'w' });
			});
		});
	});
	describe('Remove logic', () => {
		it('remove special user', (done) => { //异步测试
			const newUser = new User(user);
			newUser.save((err, res) => {
				expect(err).to.be.equal(null);
				expect(res.name).to.be.equal(user.name);
				User.deleteOne({ _id: res._id }, (err1, res1) => {
					expect(err1).to.be.equal(null);
					expect(res1.result.n).to.be.equal(1);//{ result: { n: 1, ok: 1 } …… }
					done();
				});
			});
		});
		it('remove all users', () => { //返回Promise
			return User.remove({})
				.then((res) => {
					expect(res.result.ok).to.be.equal(1);//{ result: { n: 0, ok: 1 } …… }
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
	describe('Update logic', () => {
		it('update special user by update methods', (done) => { //异步测试
			const newUser = new User(user);
			newUser.save((err, res) => {
				expect(err).to.be.equal(null);
				expect(res.name).to.be.equal(user.name);
				User.updateAll({ _id: res._id }, { $set: { 'meta.updateAt': Date.now() } }, (err1, res1) => {
					expect(err1).to.be.equal(null);
					expect(res1.nModified).to.be.equal(1);//{ n: 1, nModified: 1, ok: 1 }
					done();
				});
			});
		});
		it('update special user by save methods', (done) => { //异步测试
			const newUser = new User(user);
			newUser.save((err, res) => {
				expect(err).to.be.equal(null);
				expect(res.name).to.be.equal(user.name);
				res.save((err1, res1) => {
					expect(err1).to.be.equal(null);
					expect(res1.name).to.be.equal(res.name);
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
});
