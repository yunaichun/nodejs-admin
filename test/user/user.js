//生成随机串
var crypto = require('crypto');
//密码加密
var bcrypt = require('bcrypt');

//获取随机字符串
function getRandomString(len) {
  //没有名字的话
  if (!len) len = 16;
  // 通过crypto的randomBytes方法，生成随机字符串
  return crypto.randomBytes(Math.ceil(len / 2)).toString('hex');
}

//引入should模块
var should = require('should');
//引入入口文件
var app = require('../../app');
//引入mongoose
var mongoose = require('mongoose');
//拿到user模型
var User = require('../../app/models/user');
// //拿到模型(需要app模块设置)
// var User = mongoose.model('User');

//申明全局变量
var user;

// test
describe('<Unit Test', function() {//描述单元测试开始，describe可以嵌套
  describe('Model User:', function() {//测试模型
    before(function(done) {//在测试用例开始之前
      user = {
        name: getRandomString(),//获得长度16的字符串
        password: 'password'//密码
      };

      done();//调用done
    });

    describe('Before Method save', function() {//在save方法调用之前
      //it代表一个测试用例，it中最好只调用一次done
      it('should begin without test user', function(done) {//开始之前没有此用户的
        User.find({name: user.name}, function(err, users) {//通过User模型去查找此用户
          users.should.have.length(0);//长度为0

          done();//调用done
        });
      });
    });

    describe('User save', function() {//执行save
      //用例1
      it('should save without problems', function(done) {//保存的时候没有错误
        var _user = new User(user);//实例化为了新建

        _user.save(function(err) {//调用save方法
          should.not.exist(err);//判断err是否为真，应该为false
          _user.remove(function(err) {//成功的话删除此条记录，为了下次测试
            should.not.exist(err);//应该不要有错误的

            done();//调用done
          });
        });
      });

      //用例2
      it('should password be hashed correctly', function(done) {//测试密码是正确的
        var password = user.password;//获得密码
        var _user = new User(user);//实例化为了保持

        _user.save(function(err) {//调用save方法
          should.not.exist(err);//应该此密码不存在
          _user.password.should.not.have.length(0);//密码应该不为0
          //比对：原始密码。当前用户加密后密码，回调方法
          bcrypt.compare(password, _user.password, function(err, isMatch) {
            should.not.exist(err);//不要抛错
            isMatch.should.equal(true);//是否匹配，应该为true

            _user.remove(function(err) {//上面炮筒之后删除实例
              should.not.exist(err);//不要抛错

              done();//调用done,标志测试用例开始跑
            });
          });
        });
      });

      //用例3
      it('should have default role 0', function(done) {//权限应该默认为0
        var _user = new User(user);//实例化为了新建

        _user.save(function(err) {//调用保存方法
          _user.role.should.equal(0);//用户角色应该为0

          _user.remove(function(err) {//跑通之后删除此用例

            done();//调用done,标志测试用例开始跑
          });
        });
      });

      //用例4
      it('should fail to save an existing user', function(done) {//测试用户名不能重复
        var _user1 = new User(user);//实例化用户1

        _user1.save(function(err) {//保存用户1
          should.not.exist(err);//不要抛错

          var _user2 = new User(user);//实例化用户2

          _user2.save(function(err) {//保存用户2
            should.exist(err);//此时应该报错了

            _user1.remove(function(err) {//删除用户1
              if (!err) {//没有错误的情况
                _user2.remove(function(err) {//删除用户2
                  
                  done();//调用done
                });
              }
            });
          });
        });
      });
    });

    after(function(done) {//测试用例跑完之后的操作
      // clear user info
      done();
    });
  });
});