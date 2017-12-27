import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
//异步Action中间件：action_creators返回函数而不是对象。返回的函数会被中间件执行
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import rootReducer from './redux/reducer/index';//reducer
import RouterConfig from './router/index';//router

const loggerMiddleware = createLogger();
const store = createStore(
    rootReducer,
    applyMiddleware(
		//异步Action中间件：action_creators返回函数而不是对象。返回的函数会被中间件执行
		thunkMiddleware,
		loggerMiddleware
    )
);

ReactDOM.render(
	<Provider store={store}>
		<RouterConfig />
	</Provider>,
	document.getElementById('app')
);
