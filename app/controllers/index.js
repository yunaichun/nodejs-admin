//首页模型
var Movie = require('../models/movie');
//分类模型
var Catetory = require('../models/catetory');
exports.index=function(req, res) {
        Catetory
            .find({})
            //populate第一个参数指的是查询Movies里面的ID，第二个参数是限制为5条
            .populate({path:'movies',options:{limit:5}})
            .exec(function(err,catetories){
                if (err) {
                    console.log(err);
                }
                //渲染首页模板，指的是回调返回的结果
                res.render('index', {
                    title: '首页',
                    catetories: catetories
                })
            })

        // console.log('user in session:')
        // //打印session中user的值
        // console.log(req.session.user);
        // // var _user=req.session.user;
        // // //如果session中有user的值，将session中user的值存入本地变量中去。这样首页的渲染就会判断是不是登录状态了。
        // // if(_user){
        // //  app.locals.user=_user;
        // // }
        // //调用方法（回调方法中拿到返回的movies数组）
        // Movie.fetch(function(err, movies) {
        //     if (err) {
        //         console.log(err);
        //     }
        //     //渲染首页模板
        //     res.render('index', {
        //         title: '首页',
        //         movies: movies
        //     })
        // })
}
