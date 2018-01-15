const Catetory = require('../models/catetory');
const Movie = require('../models/movie');
const Comment = require('../models/comment');
const _ = require('underscore');
const fs = require('fs');
const path = require('path');

exports.insertMovie = function (req, res) {
    //req.body请求体(post请求);req.query查询参数(get请求);req.params动态路由
    const movie = req.body;
    if (req.poster) { 
        movie.poster = req.poster;//中间件【假如有图片是文件上传的话】
    }
    const newMovie = new Movie(movie);
    newMovie.save((err1, res1) => {
        if (err1) {
            const error1Data = {
                status: '500', 
                msg: 'server went wrong!',
                data: err1.toString()
            };
            res.end(JSON.stringify(error1Data));
        }
        if (movie.catetory) { //选择已有分类
            Catetory.selectOne({ _id: movie.catetory }, (err2, res2) => {
                if (err2) {
                    const error2Data = {
                        status: '500', 
                        msg: 'server went wrong!',
                        data: err2.toString()
                    };
                    res.end(JSON.stringify(error2Data));
                }
                if (!res2) {
                    const resultData = {
                        status: '201', 
                        msg: 'the catotory is not existed',
                        data: res2
                    };
                    res.end(JSON.stringify(resultData));
                } else {
                    res2.movies.push(res1._id);
                    res2.save((err3, res3) => {
                        if (err3) {
                            const error3Data = {
                                status: '500', 
                                msg: 'server went wrong!',
                                data: err3.toString()
                            };
                            res.end(JSON.stringify(error3Data));
                        }
                        const successData = {
                            status: '200', 
                            msg: 'OK!',
                            data: res1
                        };
                        res.end(JSON.stringify(successData));
                    });
                }
            });
        }
        if (movie.catetoryName) { //新增没有分类
            const catetory = {
                name: movie.catetoryName,
                movies: [res1._id]
            };
            const newCatetory = new Catetory(catetory);
            newCatetory.save((err2, res2) => {
                if (err2) {
                    const error2Data = {
                        status: '500', 
                        msg: 'server went wrong!',
                        data: err2.toString()
                    };
                    res.end(JSON.stringify(error2Data));
                }
                res1.catetory = catetory._id;
                res1.save((err3, res3) => {
                    if (err3) {
                        const error3Data = {
                            status: '500', 
                            msg: 'server went wrong!',
                            data: err3.toString()
                        };
                        res.end(JSON.stringify(error3Data));
                    }
                    const successData = {
                        status: '200', 
                        msg: 'OK!',
                        data: res3
                    };
                    res.end(JSON.stringify(successData));
                });
            });
        }
    });
};
exports.deleteMovie = function (req, res) {
    const id = req.params.id;
    Movie.deleteOne({ _id: id }, (err1, res1) => {
        if (err1) {
            const error1Data = {
                status: '500', 
                msg: 'server went wrong',
                data: err1.toString()
            };
            res.end(JSON.stringify(error1Data));
        }
        const successData = {
            status: '200', 
            msg: 'OK!',
            data: res1
        };
        res.end(JSON.stringify(successData));
    });
};
exports.deleteMovies = function (req, res) {
    const ids = req.body.ids;//获取数组
    Movie.deleteAllByIds(ids, (err1, res1) => {
        if (err1) {
            const error1Data = {
                status: '500', 
                msg: 'server went wrong',
                data: err1.toString()
            };
            res.end(JSON.stringify(error1Data));
        }
        const successData = {
            status: '200', 
            msg: 'OK!',
            data: res1
        };
        res.end(JSON.stringify(successData));
    });
};
exports.updateMovie = function (req, res) {
    const movie = req.body;
    const id = movie.id;
    if (req.poster) { 
        movie.poster = req.poster;//中间件【假如有图片是文件上传的话】
    }
    Movie.selectOne({ _id: id }, (err1, res1) => {
        if (err1) {
            const error1Data = {
                status: '500', 
                msg: 'server went wrong',
                data: err1.toString()
            };
            res.end(JSON.stringify(error1Data));
        }
        if (!res1) {
            const resultData = {
                status: '201', 
                msg: 'this movie is not existed'
            };
            res.end(JSON.stringify(resultData));
        } else {
            const updateMovie = _.extend(res1, movie);
            updateMovie.save((err2, res2) => {
                if (err2) {
                    const error2Data = {
                        status: '500', 
                        msg: 'server went wrong',
                        data: err2.toString()
                    };
                    res.end(JSON.stringify(error2Data));
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
exports.selectMovie = function (req, res) {
    const id = req.query.id;
    Movie.selectOne({ _id: id }, (err1, res1) => {
        if (err1) {
            const error1Data = {
                status: '500', 
                msg: 'server went wrong',
                data: err1.toString()
            };
            res.end(JSON.stringify(error1Data));
        }
        //更新点击量
        Movie.updateAll({ _id: id }, { $inc: { pv: 1 } }, (err2, res2) => {
            if (err2) {
                const error2Data = {
                    status: '500', 
                    msg: 'server went wrong',
                    data: err1.toString()
                };
                res.end(JSON.stringify(error2Data));
            }
        });
        Comment.selectOne({ movie: id }, (err3, res3) => {
            if (err3) {
                const error3Data = {
                    status: '500', 
                    msg: 'server went wrong',
                    data: err1.toString()
                };
                res.end(JSON.stringify(error3Data));
            }
            const successData = {
                status: '200', 
                msg: 'OK!',
                movie: res1,
                comment: res3
            };
            res.end(JSON.stringify(successData));
        });
    });
};
//查询全部电影
exports.selectMovies = function (req, res) {
    Movie.selectAll({}, (err1, res1) => {
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
//电影分页查询【所有分类+指定分类】
exports.selectMoviesByCatetory = function (req, res) {
    const catetoryId = req.query.catetoryId;
    const currentPage = req.query.currentPage || 1;
    const pageSize = req.query.pageSize || 5;
    Catetory.selectMoviesByCatetory(catetoryId, {}, currentPage, pageSize, (err1, res1) => {
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
//标题模糊查询【所有分类+指定分类】
exports.selectMoviesByTitle = function (req, res) {
    const title = req.query.title;
    const catetoryId = req.query.catetoryId;
    const currentPage = req.query.currentPage || 1;
    const pageSize = req.query.pageSize || 5;
    Movie.selectMoviesByTitle(title, catetoryId, {}, currentPage, pageSize, (err1, res1) => {
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
exports.uploadImageMiddleware = function (req, res, next) {
    const uploadImage = req.files.poster;
    if (uploadImage) {
        const filePath = uploadImage.path;
        fs.readFile(filePath, (err1, res1) => {
            const timestamp = Date.now();
            const type = uploadImage.type.split('/')[1];
            const poster = `${timestamp}.${type}`;
            const newPath = path.join(__dirname, '../../', `/public/upload/${poster}`);
            fs.writeFile(newPath, res1, (err2, res2) => {
                req.poster = poster;
                next();
            });
        });
    } else {
        next();
    }
};
