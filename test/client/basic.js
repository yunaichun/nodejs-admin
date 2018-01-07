import React from 'react';
import ReactDOM from 'react-dom';
/**引入react测试插件react-addons-test-utils**/
import ReactTestUtils from 'react-dom/test-utils'; // ES6
import PanelHeader from '../../client/src/component/layout/panelHeader';

describe('Basic', () => {
	it('render basic component', () => {
		//renderIntoDocument在单元测试中渲染React组件
		const component = ReactTestUtils.renderIntoDocument(
			<PanelHeader />
		);
		console.log(component);
		//scryRenderedDOMComponentsWithTag获取渲染的React组件
		const classS = ReactTestUtils.scryRenderedDOMComponentsWithClass(
			component, 
			'test'
		);
		const divS = ReactTestUtils.scryRenderedDOMComponentsWithTag(
			component, 
			'div'
		);
		console.log(classS, divS);
	});
});
