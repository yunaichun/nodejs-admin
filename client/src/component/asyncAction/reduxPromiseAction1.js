import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createAction } from 'redux-actions';
import { signin } from '../../api/api';

class reduxPromiseAction1 extends Component {
	componentDidMount() {
		console.log('this.props值为:', this.props);
		this.props.dispatch(
			createAction('reduxPromiseAction1')(
				signin({ name: 'test', password: 'test' })
				.then(data => data) 
			) 
		);
	}
	render() {
		return (
			<div>
				ReduxPromiseAction1 Test
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
)(reduxPromiseAction1);
