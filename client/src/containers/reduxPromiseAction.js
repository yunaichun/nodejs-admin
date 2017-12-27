import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createAction } from 'redux-actions';
import * as actionCreators from '../redux/actions/index';
import { signin } from '../api/api';
console.log(actionCreators);
class reduxPromiseAction extends Component {
	constructor(props) {
		super(props);
	}
	componentDidMount() {
		console.log('this.props值为:', this.props);
		this.props.dispatch(actionCreators.reduxPromiseAction);
		// this.props.dispatch(createAction(
		// 	'reduxPromiseAction', 
		// 	signin({ name: 'test', password: 'test' })
		// 	.then((data) => {
		// 		console.log('1111111', data);
		// 	})
		// ));
	}
	render() {
		return (
			<div>
				ReduxPromiseAction Test
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
	mapStateToProps
)(reduxPromiseAction);
