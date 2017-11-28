//登录注册模型
const User = require('../models/user');

/**
 * [signin 用户登陆]
 */
exports.signin = function (req, res) {
    const user = req.body.user;
    const name = user.name;
    const password = user.password;

    User.findOne({ name }, (err, hasUser) => {
        if (err) {
            console.log(err);
        }
        if (!hasUser) { //登录时不存在此用户重定向到注册页面
            return res.redirect('/signup');
        }
        //传入明文密码，与Schema文档实例中的user、password进行匹配
        hasUser.comparePassword(password, (err2, isMatch) => {
            if (err2) {
                console.log(err);
            }
            if (!isMatch) {
                return res.redirect('/signin');
            } 
            req.session.user = hasUser;//将用户登录状态存入session内存中
            res.redirect('/');
        });
    });
};
/**
 * [signup 用户注册]
 */
exports.signup = function (req, res) {
    const user = req.body.user;//req.body获取post表单
    User.findOne({ name: user.name }, (err, hasUser) => {
        if (err) {
            console.log(err);
        }
        if (hasUser) {
            return res.redirect('/signin');
        } 
        const newUser = new User(user);
        newUser.save((saveErr, saveSuccess) => {
            if (saveErr) {
                console.log(saveErr);
            }
            console.log(saveSuccess);
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
    User.fetch((err, users) => {
        if (err) {
            console.log(err);
        }
        res.render('userlist', {
            title: '用户列表页',
            users
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
