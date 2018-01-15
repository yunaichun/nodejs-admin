const User = require('../controllers/user');
const Catetory = require('../controllers/catetory');
const Movie = require('../controllers/movie');
const Comment = require('../controllers/comment');
const multipart = require('connect-multiparty');
const express = require('express');

const router = express.Router();
const multipartMiddleware = multipart();//指定模块使用，因为会在服务器存储临时文件，用完别忘了删除

/*设置跨域*/
router.all('*', (req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:4000'); //设置Credentials，就不能设置*。【携带session】
    res.header('Access-Control-Allow-Headers', 'Content-Type,Content-Length, Authorization, Accept,X-Requested-With');
    res.header('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('X-Powered-By', ' 3.2.1');
    if (req.method === 'OPTIONS') {
		res.send(200);/*让options请求快速返回*/
    }
    next();
});
/*用户管理模块*/
router.get('/insertUser', User.insertUser);
router.post('/importUsers', multipartMiddleware, User.importUsers);
router.get('/exportUsers', User.exportUsers);
router.get('/deleteUser/:id', User.deleteUser);
router.post('/deleteUsers', User.deleteUsers);
router.get('/updateUser', User.updateUser);
router.get('/selectUser', User.selectUser);
router.get('/selectUsers', User.selectUsers);
router.get('/signin', User.signin);
router.get('/signup', User.signup);
router.get('/logout', User.logout);

/*电影分类管理模块*/
router.get('/insertCatetory', Catetory.insertCatetory);
router.get('/deleteCatetory/:id', Catetory.deleteCatetory);
router.post('/deleteCatetories', Catetory.deleteCatetories);
router.get('/updateCatetory', Catetory.updateCatetory);
router.get('/selectCatetory', Catetory.selectCatetory);
// router.get('/selectCatetories', User.signinMiddleware, Catetory.selectCatetories);
router.get('/selectCatetories', Catetory.selectCatetories);

/*电影详情管理模块*/
router.post('/insertMovie', multipartMiddleware, Movie.uploadImageMiddleware, Movie.insertMovie);
router.get('/deleteMovie/:id', Movie.deleteMovie);
router.post('/deleteMovies', Movie.deleteMovies);
router.post('/updateMovie', multipartMiddleware, Movie.uploadImageMiddleware, Movie.updateMovie);
router.get('/selectMovie', Movie.selectMovie);
router.get('/selectMovies', Movie.selectMovies);
router.get('/selectMoviesByCatetory', User.signinMiddleware, Movie.selectMoviesByCatetory);
router.get('/selectMoviesByTitle', User.signinMiddleware, Movie.selectMoviesByTitle);

/*电影评论管理模块*/
router.get('/insertComment', Comment.insertComment);
router.get('/deleteComment/:id', Comment.deleteComment);
router.get('/deleteComments', Comment.deleteComments);
router.get('/updateComment', Comment.updateComment);
router.get('/selectComment', Comment.selectComment);
router.get('/selectComments', Comment.selectComments);

module.exports = router;
