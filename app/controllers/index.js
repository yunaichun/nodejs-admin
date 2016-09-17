//首页模型
var Movie = require('../models/movie');
exports.index=function(req, res) {
        console.log('user in session:')
        //打印session中user的值
        console.log(req.session.user);
        // var _user=req.session.user;
        // //如果session中有user的值，将session中user的值存入本地变量中去。这样首页的渲染就会判断是不是登录状态了。
        // if(_user){
        //  app.locals.user=_user;
        // }
        //调用方法（回调方法中拿到返回的movies数组）
        Movie.fetch(function(err, movies) {
            if (err) {
                console.log(err);
            }
            //渲染首页模板
            res.render('index', {
                title: '首页',
                movies: movies
            })
        })
}
