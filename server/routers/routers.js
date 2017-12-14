const User = require('../app/controllers/user');
const Catetory = require('../app/controllers/catetory');
const Movie = require('../app/controllers/movie');
const multipart = require('connect-multiparty');
const express = require('express');

const router = express.Router();
const multipartMiddleware = multipart();//指定模块使用，因为会在服务器存储临时文件，用完别忘了删除

/*用户管理模块*/
router.get('/insertUser', User.insertUser);
router.get('/importUsers', multipartMiddleware, User.insertUser);
router.get('/deleteUser/:id', User.deleteUser);
router.get('/deleteUsers', User.deleteUsers);
router.get('/updateUser', User.updateUser);
router.get('/selectUser', User.selectUser);
router.get('/selectUsers', User.signinMiddleware, User.selectUsers);
router.get('/signin', User.signin);
router.get('/signup', User.signup);
router.get('/logout', User.logout);
/*电影分类管理模块*/
router.get('/insertUser', Catetory.insertCatetory);
router.get('/deleteCatetory/:id', Catetory.deleteCatetory);
router.get('/deleteCatetories', Catetory.deleteCatetories);
router.get('/updateCatetory', Catetory.updateCatetory);
router.get('/selectCatetory', Catetory.selectCatetory);
router.get('/selectCatetories', User.signinMiddleware, Catetory.selectCatetories);

/*电影详情管理模块*/
router.get('/insertMovie', Movie.uploadImageMiddleware, Movie.insertMovie);
router.get('/deleteMovie/:id', Movie.deleteMovie);
router.get('/deleteMovies', Movie.deleteMovies);
router.get('/updateMovie', Movie.uploadImageMiddleware, Movie.updateMovie);
router.get('/selectMovie', Movie.selectMovie);
router.get('/selectMoviesByCatetory', User.signinMiddleware, Movie.selectMoviesByCatetory);
router.get('/selectMoviesByTitle', User.signinMiddleware, Movie.selectMoviesByTitle);

module.exports = router;
