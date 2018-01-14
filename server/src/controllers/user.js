const User = require('../models/user');
const xlsx = require('node-xlsx');
const _ = require('underscore');
const fs = require('fs');
const path = require('path');

exports.insertUser = function (req, res) {
    //req.body请求体;req.query查询参数;req.params动态路由
    const user = req.query;
    const newUser = new User(user);
    newUser.save((err1, res1) => {
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
exports.importUsers = function (req, res) {
    const uploadFile = req.files.uploadFile;//通过name名称拿到file
    if (uploadFile) {
        const filePath = uploadFile.path;//拿到路径（服务器缓存地址）
        const obj = xlsx.parse(filePath);
        const excelObj = obj[0].data;
        const newArray = [];
        for (let i = 1; i < excelObj.length; i++) {
            const temp = {};
            for (let j = 0; j < excelObj[i].length; j++) {
                temp.name = excelObj[i][0];
                temp.password = excelObj[i][1];
            }
            newArray.push(temp);
        }
        User.saveAll(newArray, (err1, res1) => {
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
    }
};
exports.exportUsers = function (req, res) {
    User.selectAll({}, 'name password meta.updateAt', (err1, res1) => {
        if (err1) {
            const errorData = {
                status: '500', 
                msg: 'server went wrong!',
                data: err1.toString()
            };
            res.end(JSON.stringify(errorData));
        }
        const newArray = [['用户名', '密码', '更新时间']];
        for (let i = 0; i < res1.length; i++) {
            const temp = [];
            temp.push(res1[i].name);
            temp.push(res1[i].password);
            temp.push(res1[i].meta.updateAt);
            newArray.push(temp);
        }
        console.log(newArray);
        //重新遍历了一次，真是闲的，但是也没有办法！！！
        const data = [];
        for (let m in newArray) {
            const arr = [];
            const value = newArray[m];
            for (let n in value) {
                arr.push(value[n]);
            }
            data.push(arr);
        }
        console.log(newArray === data);//两者的值是不同的
        const buffer = xlsx.build([
            {
                name: 'sheet1',
                data
            }        
        ]);
        const flePath = path.join(__dirname, '../../public/', '/upload/导出用户模板表.xlsx');
        fs.writeFileSync(flePath, buffer, { flag: 'w' });
        res.download(flePath); 
    });
};
exports.deleteUser = function (req, res) {
    const id = req.params.id;
    User.deleteOne({ _id: id }, (err1, res1) => {
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
exports.deleteUsers = function (req, res) {
    const ids = req.body.ids;//获取数组
    console.log('传递数据：', req.body, ids);
    User.deleteAllByIds(ids, (err1, res1) => {
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
exports.updateUser = function (req, res) {
    const user = req.query;
    const id = user.id;
    User.selectOne({ _id: id }, (err1, res1) => {
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
                msg: 'this user is not existed'
            };
            res.end(JSON.stringify(errorData));
        } else {
            const updateUser = _.extend(res1, user);
            updateUser.save((err2, res2) => {
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
exports.selectUser = function (req, res) {
    const id = req.query.id;
    User.selectOne({ _id: id }, (err1, res1) => {
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
exports.selectUsers = function (req, res) {
    User.selectAll({}, (err1, res1) => {
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
exports.signin = function (req, res) {
    const user = req.query;
    const name = user.name;
    const password = user.password;
    User.selectOne({ name }, (err1, res1) => {
        if (err1) {
             const errorData = {
                status: '500', 
                msg: 'server went wrong',
                data: err1.toString()
            };
            res.end(JSON.stringify(errorData));
        }
        if (!res1) {
            const resultsData = {
                status: '201', 
                msg: 'the username is not exist'
            };
            res.end(JSON.stringify(resultsData));
        } else {
            res1.comparePassword(password, (err2, res2) => {
                if (err2) {
                    const error2Data = {
                        status: '500', 
                        msg: 'server went wrong',
                        data: err2.toString()
                    };
                    res.end(JSON.stringify(error2Data));
                }
                if (!res2) {
                    const results2Data = {
                        status: '202', 
                        msg: 'the password is not right'
                    };
                    res.end(JSON.stringify(results2Data));
                }
                req.session.user = res1;//存入session
                const successData = {
                    status: '200', 
                    msg: 'OK!'
                };
                res.end(JSON.stringify(successData));
            });
        }
    });
};
exports.logout = function (req, res) {
    const user = req.session.user;
    if (!user) {
        const results1Data = {
            status: '201', 
            msg: 'you have already logout'
        };
        res.end(JSON.stringify(results1Data));
    } else {
        delete req.session.user;
        const successData = {
            status: '200', 
            msg: 'OK!'
        };
        res.end(JSON.stringify(successData));
    }
};
exports.signup = function (req, res) {
    const user = req.query;
    const name = user.name;
    User.selectOne({ name }, (err1, res1) => {
        if (err1) {
            const errorData = {
                status: '500', 
                msg: 'server went wrong!',
                data: err1.toString()
            };
            res.end(JSON.stringify(errorData));
        }
        if (res1) {
            const error2Data = {
                status: '201', 
                msg: 'username is existed',
                data: res1
            };
            res.end(JSON.stringify(error2Data));
        } else {
            const newUser = new User(user);
            newUser.save((err2, res2) => {
                if (err2) {
                    const error2Data = {
                        status: '500', 
                        msg: 'server went wrong!',
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
exports.signinMiddleware = function (req, res, next) {
    const user = req.session.user;
    if (!user) {
        const successData = {
            status: '200', 
            msg: 'you have to signin first'
        };
        res.end(JSON.stringify(successData));
    }
    next();
};
exports.adminMiddleware = function (req, res, next) {
    const user = req.session.user;
    if (user.role <= 10) {
        const successData = {
            status: '200', 
            msg: 'your authorith is not enough'
        };
        res.end(JSON.stringify(successData));
    }
    next();
};
