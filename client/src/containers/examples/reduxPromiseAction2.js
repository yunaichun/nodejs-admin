import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actionCreators from '../../redux/actions/index';

class reduxPromiseAction2 extends Component {
	componentDidMount() {
		console.log('this.props值为:', this.props);
		this.props.reduxPromiseAction2().then(data => {
			//异步获取redux store数据：返回的是提交的action
			console.log('异步获取redux store数据:', data);
		});
	}
	render() {
		return (
			<div>
				ReduxPromiseAction2 Test
			</div>
		);
	}
}

function mapStateToProps(state, ownProps) {
	console.log('mapStateToProps的sate值:', state);
	console.log('mapStateToProps的ownProps值:', ownProps);
	return state;
}

export default connect(
	mapStateToProps,
	actionCreators
)(reduxPromiseAction2);
