import React from 'react';
import { Breadcrumb, Icon } from 'antd';
import { Link } from 'react-router-dom';
import '../../style/bcrumb/bcrumb.less';

/**
 * 公共面包屑
 *
 * @export
 * @class Bcrumb
 * @extends {Component}
 */
export class Bcrumb extends React.Component {
	constructor(props) {
		super(props); 
	}
	render() {
		return (
			<Breadcrumb className="bread-crumb">
                <Breadcrumb.Item>
                    <Link to="/home"><Icon type="home" /><span>主页</span></Link>
                </Breadcrumb.Item>
                <Breadcrumb.Item>
                    <Icon type={this.props.icon ? this.props.icon : 'laptop'} />
                    <span>{ this.props.title }</span>
                </Breadcrumb.Item>
            </Breadcrumb> 
		);
	}
}
