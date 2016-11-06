# 简介
利用Node.js的Express框架和Jade模板引擎，搭配mongoDB数据库搭建了一个电影分类展示首页，也实现后台电影的分类录入功能，主要功能如下：

- 用户登录、注册、注销、登出、权限管理
- 电影后台录入、列表
- 电影后台上传(将本地文件上传后的地址挂载到request，后台保存)、访客统计
- 电影分类
- 用户评论


## 前后台搭建工具
- 网站后台：Nodejs+Express+mongoDB
- 网站前台：Jade+Bootstrap+jQuery
- 数据库：mongDB
- 静态资源管理：Bower
- 自动化工具：Grunt


## 需要安装以下模块
- Express
```sh
$ npm install express
$ npm install body-parser
$ npm install cookie-parser 
$ npm install express-session
$ npm install connect-multiparty
$ npm install morgan
$ npm install grunt-mocha-test
$ npm install should
```

- mongDB
```sh
$ npm install mongoose
$ npm install underscore
$ npm install moment
$ npm install connect-mongo
```

- Jade
```sh
$ npm install jade
```

- Bower
```sh
$ npm install bower -g
$ bower install bootstrap
```

- Grunt
```sh
$ npm install grunt -g 
$ npm install grunt-cli -g
$ bpm install grunt-contib-watch --save-dev
$ npm install grunt-nodemon --save-dev
$ npm install grunt-concurrent --save-dev
```
