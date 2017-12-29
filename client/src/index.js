import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
//异步Action中间件：action_creators返回函数而不是对象。返回的函数会被中间件执行
import thunkMiddleware from 'redux-thunk';
//异步Action中间件：action_creators返回Promise而不是对象。返回的Promise会被中间件执行
import promiseMiddleware from 'redux-promise';
//中间件：打印日志
import { createLogger } from 'redux-logger';
// 中间件：自定义打印日志
// import { logger } from './redux/middleware/logger.js';
import rootReducer from './redux/reducer/index';//reducer
import RouterConfig from './router/index';//router

// 引入antd样式
import 'antd/dist/antd.css';

const loggerMiddleware = createLogger();
const store = createStore(
    rootReducer,
    // initial_state,
    applyMiddleware(
		//异步Action返回函数，不是对象
		thunkMiddleware,
		//异步Action返回Promise，不是对象
		promiseMiddleware,
		// // //中间件：自定义打印日志
		// logger,
		//中间件：打印日志
		loggerMiddleware
    )
);

ReactDOM.render(
	<Provider store={store}>
		<RouterConfig />
	</Provider>,
	document.getElementById('app')
);
