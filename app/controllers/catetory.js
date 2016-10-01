//电影页面模型
var Catetory = require('../models/catetory');



//admin jade【添加电影页-->渲染空数据】
exports.new= function(req, res) {
        //需要有默认的值（因为修改也用了此页面，所以添加的时候默认渲染为空）
        res.render('catetory_admin', {
            title: '后台分类录入页',
            catetory:{}
        })
}

//admin post movie【新增、修改电影-->提交表单保存】
exports.save=function(req, res) {
    //前台是否传入id字段
    var _catetory = req.body.catetory;
    var catetory = new Catetory(_catetory);

    //调用save方法，第二个参数是回调
    catetory.save(function(err, catetory) {
        if (err) {
            console.log(err);
        }
        //页面重定向到f分类列表页面
        res.redirect('/admin/catetory/list');
    })

}



//list jade【电影列表页-->渲染数据】
exports.list= function(req, res) {
        //调用方法（回调方法中拿到返回的movies数组）
        Catetory.fetch(function(err, catetories) {
            if (err) {
                console.log(err);
            }
            //渲染首页模板
            res.render('catetorylist', {
                title: '分类列表页',
                catetories: catetories
            })
        })
}
