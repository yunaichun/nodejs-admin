const Comment = require('../models/comment');
const _ = require('underscore');

exports.insertComment = function (req, res) {
    //req.body请求体;req.query查询参数;req.params动态路由
    const comment = req.query;
    if (comment.cid) { //有主评论
        Comment.selectOne({ movie: comment.cid }, (err1, res1) => {
            if (err1) {
                const errorData = {
                    status: '500', 
                    msg: 'server went wrong!',
                    data: err1.toString()
                };
                res.end(JSON.stringify(errorData));
            }
            if (!res1) {
                const resultsData = {
                    status: '201', 
                    msg: 'the comment is not existed now!',
                };
                res.end(JSON.stringify(resultsData));
            } else {
                const reply = {
                    from: comment.from,
                    to: comment.tid,
                    content: comment.content
                };
                res1.reply.push(reply);
                res1.save((err2, res2) => {
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
                        data: res2
                    };
                    res.end(JSON.stringify(successData));
                });
            }
        });
    } else {
        const newComment = new Comment(comment);
        newComment.save((err1, res1) => {
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
    }
};
exports.deleteComment = function (req, res) {
    const id = req.params.id;
    Comment.deleteOne({ _id: id }, (err1, res1) => {
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
exports.deleteComments = function (req, res) {
    const ids = req.body.ids;//获取数组
    Comment.deleteAllByIds(ids, (err1, res1) => {
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
exports.updateComment = function (req, res) {
    const comment = req.query;
    const id = comment.id;
    Comment.selectOne({ _id: id }, (err1, res1) => {
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
            const updateComment = _.extend(res1, comment);
            updateComment.save((err2, res2) => {
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
exports.selectComment = function (req, res) {
    const id = req.query.id;
    Comment.selectOne({ movie: id }, (err1, res1) => {
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
exports.selectComments = function (req, res) {
    const id = req.query.id;
    Comment.selectAll({ movie: id }, (err1, res1) => {
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
