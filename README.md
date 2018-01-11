# 简介
前后端完全分离的项目。后端共计30个接口，并对所有接口编写测试用例，同时利用 [postman](https://www.getpostman.com/) 完成所有接口测试。共计用户管理、电影分类管理、电影详情管理、电影评论管理4个模块。包含文件上传和下载、导入导出Excel、批量新增和删除、模糊查询和分页查询等功能接口。

前端利用[Ant Design](https://ant.design/index-cn)，[React](https://reactjs.org/docs/hello-world.html)、[react-router4.0](https://reacttraining.com/react-router/web/guides/philosophy)、[Redux](http://redux.js.org/)完成页面的布局和交互逻辑。除此之外，前端也利用[mockjs](http://mockjs.com/)完成数据和接口的mock功能实现。

## 后端技术栈
- 后端: Nodejs + Express
- 数据库: mongoDB
- 自动化: nodemon
- 代码审查: esLint(ES6)
- 测试框架: Mocha+Chai

## 前端技术栈
- 前端: react + redux + react-router + Ant Design + mockjs
- 自动化: webpack
- 代码审查: esLint(ES6)
- 测试框架: Mocha+Chai

## 启动项目
- install dependencies
```sh
$ yarn install
```

- start server 
```sh
$ npm run server
```

- start client 
```sh
$ npm run dev
```

- test server
```sh
$ npm run test:server
```

- test client
```sh
$ npm run test:client
```
