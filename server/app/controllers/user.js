//登录注册模型
const User = require('../models/user');

/**
 * [signin 用户登陆]
 */
exports.signin = function (req, res) {
    const user = req.body.user;
    const name = user.name;
    const password = user.password;
    
    User.findOne({ name }, (err1, res1) => {
        if (err1) {
            console.log(err1);
        }
        if (!res1) { //登录时不存在此用户重定向到注册页面
            return res.redirect('/signup');
        }
        //传入明文密码，与Schema文档实例中的user、password进行匹配
        res1.comparePassword(password, (err2, isMatch) => {
            if (err2) {
                console.log(err2);
            }
            if (!isMatch) {
                return res.redirect('/signin');
            } 
            req.session.user = res1;//将用户登录状态存入session内存中
            res.redirect('/');
        });
    });
};
/**
 * [signup 用户注册]
 */
exports.signup = function (req, res) {
    const user = req.body.user;//req.body获取post表单
    User.findOne({ name: user.name }, (err1, res1) => {
        if (err1) {
            console.log(err1);
        }
        if (res1) {
            return res.redirect('/signin');
        } 
        const newUser = new User(user);
        newUser.save((err2, res2) => {
            if (err2) {
                console.log(err2);
            }
            console.log(res2);
            res.redirect('/');
        });
    });
};
/**
 * [logout 用户登出]
 */
exports.logout = function (req, res) {
    delete req.session.user;
    res.redirect('/');
};
/**
 * [listuser 用户列表]
 */
exports.listuser = function (req, res) {
    const user = req.session.user;
    if (!user) { 
        return res.redirect('/signin');
    }
    User.fetch((err1, res1) => {
        if (err1) {
            console.log(err1);
        }
        res.render('userlist', {
            title: '用户列表页',
            users: res1
        });
    });
};


// 注册页面
exports.showSignup = function (req, res) {
  res.render('signup', {
    title: '注册页面'
  });
};
//登录页面
exports.showSignin = function (req, res) {
  res.render('signin', {
    title: '登录页面'
  });
};
//登录中间件
exports.signinRequired = function (req, res, next) {
    const user = req.session.user;
    if (!user) {
        return res.redirect('/signin');
    }
    next();
};
//管理员中间件
exports.adminRequired = function (req, res, next) {
    next();
};
