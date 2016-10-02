//首页
var Index = require('../app/controllers/index');
//用户
var User = require('../app/controllers/user');
//电影
var Movie=require('../app/controllers/movie'); 
//评论
var Comment=require('../app/controllers/comment'); 
//分类
var Catetory=require('../app/controllers/catetory'); 


//新版的express中已经不包含multipart
var multipart = require('connect-multiparty');
var multipartMiddleware=multipart();

module.exports = function(app) {
    //预处理，在网站任何位置都可以判断用户的登录状态
    app.use(function(req, res, next) {
            var _user = req.session.user;
            //console.log(_user);
            // //如果session中有user的值，将session中user的值存入本地变量中去。这样首页的渲染就会判断是不是登录状态了。
            // if (_user) {
            //     app.locals.user = _user;
            // }
            app.locals.user = _user;
            // return next();
            next();
    });
    //路由的编写(浏览器中的地址)
    //index jade【首页-->渲染数据】
    app.get('/', Index.index);




    //【首页-->注册-->提交表单保存】
    app.post('/user/signup', User.signup);
    //【首页-->登录-->提交表单保存】
    app.post('/user/signin',User.signin);
    //【首页-->登出-->删除session后重定向】
    app.get('/user/logout', User.logout);
    //显示signin登录页面
    app.get('/signin',User.showSignin);
    //显示signup注册页面
    app.get('/signup',User.showSignup);



    //detail jade【电影详情页-->渲染数据】
    app.get('/movie/:id', Movie.detail);
        //【用户列表页-->渲染数据】[添加中间件]
    app.get('/admin/user/list',User.signinRequired,User.adminRequired,User.listuser);
    //admin jade【添加电影页-->渲染空数据】
    app.get('/admin/movie/new',User.signinRequired,User.adminRequired,Movie.new);
    //【修改电影页-->渲染数据】
    //admin update movie(列表页点击更新，即修改-->将查询到的数据打印到后台录入页)
    app.get('/admin/movie/update/:id',User.signinRequired,User.adminRequired, Movie.update);
    //admin post movie【新增、修改电影-->提交表单保存】
    //增加中间件Movie.savePoster，判断文件是否已经上传，增加存储图片功能
    app.post('/admin/movie',multipartMiddleware,User.signinRequired,User.adminRequired, Movie.savePoster,Movie.save);
    //list jade【电影列表页-->渲染数据】
    app.get('/admin/movie/list',User.signinRequired,User.adminRequired,Movie.list);
    //list delete movie【电影列表页-->异步删除click】
    app.delete('/admin/movie/list',User.signinRequired,User.adminRequired, Movie.del);


    
    //评论
    app.post('/user/comment',User.signinRequired, Comment.save);


    //分类录入
    app.get('/admin/catetory/new',User.signinRequired, Catetory.new);
    app.post('/admin/catetory',User.signinRequired,Catetory.save);
    app.get('/admin/catetory/list',User.signinRequired,Catetory.list);



    //首页电影分类列表
    app.get('/results',Index.search);
}
