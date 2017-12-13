const Catetory = require('../models/catetory');
const _ = require('underscore');

exports.insertCatetory = function (req, res) {
    //req.body请求体;req.query查询参数;req.params动态路由
    const catetory = req.query;
    const newCatetory = new Catetory(catetory);
    newCatetory.save((err1, res1) => {
        if (err1) {
            const errorData = {
                status: '500', 
                msg: 'server went wrong!',
                data: err1.toString()
            };
            res.end(JSON.stringify(errorData));
        }
        const successData = {
            status: '200', 
            msg: 'OK!',
            data: res1
        };
        res.end(JSON.stringify(successData));
    });
};
exports.deleteCatetory = function (req, res) {
    const id = req.params.id;
    Catetory.deleteOne({ _id: id }, (err1, res1) => {
        if (err1) {
            const errorData = {
                status: '500', 
                msg: 'server went wrong',
                data: err1.toString()
            };
            res.end(JSON.stringify(errorData));
        }
        const successData = {
            status: '200', 
            msg: 'OK!',
            data: res1
        };
        res.end(JSON.stringify(successData));
    });
};
exports.deleteCatetories = function (req, res) {
    const ids = req.body.ids;//获取数组
    Catetory.deleteAllByIds(ids, (err1, res1) => {
        if (err1) {
            const errorData = {
                status: '500', 
                msg: 'server went wrong',
                data: err1.toString()
            };
            res.end(JSON.stringify(errorData));
        }
        const successData = {
            status: '200', 
            msg: 'OK!',
            data: res1
        };
        res.end(JSON.stringify(successData));
    });
};
exports.updateCatetory = function (req, res) {
    const catetory = req.query;
    const id = catetory.id;
    Catetory.selectOne({ _id: id }, (err1, res1) => {
        if (err1) {
            const errorData = {
                status: '500', 
                msg: 'server went wrong',
                data: err1.toString()
            };
            res.end(JSON.stringify(errorData));
        }
        if (!res1) {
            const errorData = {
                status: '201', 
                msg: 'this catetory is not existed'
            };
            res.end(JSON.stringify(errorData));
        } else {
            const updateCatetory = _.extend(res1, catetory);
            updateCatetory.save((err2, res2) => {
                if (err1) {
                    const errorData = {
                        status: '500', 
                        msg: 'server went wrong',
                        data: err1.toString()
                    };
                    res.end(JSON.stringify(errorData));
                }
                const successData = {
                    status: '200', 
                    msg: 'OK!',
                    data: res2
                };
                res.end(JSON.stringify(successData));
            });
        }
    });
};
exports.selectCatetory = function (req, res) {
    const id = req.query.id;
    Catetory.selectOne({ _id: id }, (err1, res1) => {
        if (err1) {
            const errorData = {
                status: '500', 
                msg: 'server went wrong',
                data: err1.toString()
            };
            res.end(JSON.stringify(errorData));
        }
        const successData = {
            status: '200', 
            msg: 'OK!',
            data: res1
        };
        res.end(JSON.stringify(successData));
    });
};
exports.selectCatetories = function (req, res) {
    Catetory.selectAll({}, (err1, res1) => {
        if (err1) {
            const errorData = {
                status: '500', 
                msg: 'server went wrong',
                data: err1.toString()
            };
            res.end(JSON.stringify(errorData));
        }
        const successData = {
            status: '200', 
            msg: 'OK!',
            data: res1
        };
        res.end(JSON.stringify(successData));
    });
};
