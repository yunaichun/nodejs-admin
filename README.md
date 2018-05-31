# 简介
前后端完全分离的项目。后端共30个接口，对接口编写测试用例，同时利用 [postman](https://www.getpostman.com/) 完成接口测试。功能包含文件上传和下载、导入导出Excel、批量新增和删除、模糊查询和分页查询等。

前端利用[Ant Design](https://ant.design/index-cn)，[React](https://reactjs.org/docs/hello-world.html)、[react-router4.0](https://reacttraining.com/react-router/web/guides/philosophy)、[Redux](http://redux.js.org/)完成页面的布局和交互逻辑。同时，前端也使用[mockjs](http://mockjs.com/)完成数据和接口的mock。

## 后端
- 后端: Nodejs + Express
- 数据库: mongoDB
- 自动化: nodemon
- 代码审查: esLint(ES6)
- 测试框架: Mocha+Chai

## 前端
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
