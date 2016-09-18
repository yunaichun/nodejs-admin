//登录注册模型
var User = require('../models/user');

//【首页-->注册-->提交表单保存】
exports.signup= function(req, res) {
        //获取表单数据(一个对象)
        ////req.param('user')集成路由,body,query三种形式
        //req.query获取路由或异步url中
        //req.body获取post表单
        var _user = req.body.user;
        //打印接收时保存前的密码
        console.log(_user);
        var user = new User(_user);

        //判断是否重复name
        User.find({ name: _user.name }, function(err, user) {
            if (err) {
                console.log(err);
            }
            if (user) {
                console.log('userName is exist');
                //如果此用户已经注册跳转到登录页面
                return res.redirect('/signin');
            } else {
                //没有此用户才执行新增操作
                user.save(function(err, user) {
                    if (err) {
                        console.log(err);
                    }
                    //注册成功跳转到首页
                    res.render('/');
                    //接收保存后的对象
                    console.log(user);
                })
            }
        })
}
//【用户列表页-->渲染数据】
exports.listuser= function(req, res) {
    // var user=req.session.user;
    // //如果没有用户登录，跳转到登录页面
    // if(!user){
    //     return res.redirect('/signin');
    // }
    // //如果用户权限值大于10，才会展现列表
    // if(user.role>10){
        //调用方法（回调方法中拿到返回的movies数组）
        User.fetch(function(err, users) {
            if (err) {
                console.log(err);
            }
            //渲染首页模板
            res.render('userlist', {
                title: '用户列表页',
                users: users
            })
        })
    // }
}
//【首页-->登录-->提交表单保存】
exports.signin= function(req, res) {
        var _user = req.body.user;
        var name = _user.name;
        var password = _user.password;

        //判断是否重复name
        User.findOne({ name: name }, function(err, user) {
            if (err) {
                console.log(err);
            }
            if (!user) {
                //登录时不存在此用户重定向到注册页面
                return res.redirect('/signup');
            }
            //在schema中添加实例方法。传入明文密码，与数据库中的user。password进行匹配。
            user.comparePassword(password, function(err, isMatch) {
                if (err) {
                    console.log(err);
                }
                if (isMatch) {
                    //将用户登录状态存入session内存中
                    req.session.user = user;
                    console.log('Password is matched')
                    //登录成功跳转到首页
                    res.redirect('/');
                } else {
                    //密码不对，重定向到当前页面，重新登录
                    return res.redirect('/signin');
                    console.log('Password is not matched');
                }
            })
        })
}
//【首页-->登出-->删除session后重定向】
exports.logout=function(req, res) {
    //删除session中的user的值
    delete req.session.user;
    //需要删除app.loacal上的user值。不然前台会判断，就是根据app.locals中的user值判断的
    //delete app.locals.user;
    //重定向到首页
    res.redirect('/');
}

// 注册页面
exports.showSignup = function(req, res) {
  res.render('signup', {
    title: '注册页面'
  })
}

//登录页面
exports.showSignin = function(req, res) {
  res.render('signin', {
    title: '登录页面'
  })
}

//登录中间件
exports.signinRequired = function(req, res,next) {
    var user=req.session.user;
    if(!user){
        return res.redirect('/signin');
    }
    next();
}
//管理员中间件
exports.adminRequired = function(req, res,next) {
    var user=req.session.user;
    if(user.role<=10){
        return res.redirect('/signin');
    }
    next();
}