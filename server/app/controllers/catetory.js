//电影页面模型
const Catetory = require('../models/catetory');

/**
 * [save 保存电影分类]
 */
exports.save = function (req, res) {
    const catetory = req.body.catetory;//req.body获取post表单
    const newCatetory = new Catetory(catetory);
    newCatetory.save((err1, res1) => {
        if (err1) {
            console.log(err1);
        }
        console.log(res1);
        //页面重定向到f分类列表页面
        res.redirect('/admin/catetory/list');
    });
};

/**
 * [list 分类列表]
 */
exports.list = function (req, res) {
    Catetory.selectAll({}, (err1, res1) => {
        if (err1) {
            console.log(err1);
        }
        console.log(res1);
        res.render('catetorylist', {
            title: '分类列表页',
            catetories: res1
        });
    });
};


//添加电影分类，渲染空数据
exports.new = function (req, res) {
    //需要有默认的值（因为修改也用了此页面，所以添加的时候默认渲染为空）
    res.render('catetory_admin', {
        title: '后台分类录入页',
        catetory: {}
    });
};
