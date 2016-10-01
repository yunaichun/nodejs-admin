//首页模型
var Movie = require('../models/movie');
//分类模型
var Catetory = require('../models/catetory');
exports.index=function(req, res) {
        Catetory
            .find({})
            //populate第一个参数指的是查询Movies里面的ID，第二个参数是限制为5条
            .populate({path:'movies',options:{limit:5}})//就只查关联表里面对应的movies
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

// //电影分类查询
// exports.search=function(req, res) {
//     //前台传递的电影分类ID
//     var catId=req.query.cat;
//     //前台传递的分页页码
//     var page=req.query.p;
//     var index=page*2;//其中*2是和limit是一样的 
//     Catetory
//         .find({_id:catId})//根据分类id查询
//         //populate第一个参数指的是查询Movies里面的ID，第二个参数是限制为5条
//         .populate({
//             path:'movies',//就只查关联表里面对应的movies
//             options:{limit:2,skip:index}//跳过前几条
//         })
//         .exec(function(err,catetories){
//             if (err) {
//                 console.log(err);
//             }
//             var catetory=catetories[0]||[];
//             //只差徐一条数据
//             res.render('results', {
//                 title: '结果列表页面',
//                 keyword:catetory.name,
//                 catetory: catetory
//             })
//         })
// }



//电影分类查询
exports.search=function(req, res) {
    //前台传递的电影分类ID
    var catId=req.query.cat;
    //前台传递的分页页码
    var page=parseInt(req.query.p,10);
    console.log("前台传递分类ID"+catId);
    console.log("前台传递当前页"+page);
    //每页显示的条数
    var count=2;
    //默认显示第一页（从0标记开始）
    var index=page*count;//其中*2是和limit是一样的 
    
    Catetory
        .find({_id:catId})//根据分类id查询
        //populate第一个参数指的是查询Movies里面的ID，第二个参数是限制为5条
        .populate({
            path:'movies',//就只查关联表里面对应的movies
            select:'title poster'//就只查关联表movies里面的title和poster字段
            //options:{limit:2,skip:index}//跳过前几条
        })
        .exec(function(err,catetories){
            console.log('根据分类ID查询到的所有电影分类'+catetories);
            if (err) {
                console.log(err);
            }
            var catetory=catetories[0]||[];
            //实现分页逻辑
            var movies=catetory.movies||[];
            console.log('此电影分类下的所有电影'+movies);
            //这才是分页的逻辑（前台传递的第几页index+后台规定的每页多少条）
            var results=movies.slice(index,index+count);

            //只差徐一条数据
            res.render('results', {
                title: '结果列表页面',
                keyword:catetory.name,
                currentPage:page+1,//当前页
                query:'cat='+catId,
                totalPage:Math.ceil(movies.length/2),//总页数
                movies: results
            })
        })
}