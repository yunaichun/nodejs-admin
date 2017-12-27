import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actionCreators from '../redux/actions/index';
import { signin, selectUsers } from '../api/api';

class Home extends Component {
	constructor(props) {
		super(props);
	}
	componentDidMount() {
		signin({ name: 'test', password: 'test' }).then((data) => {
			console.log('登陆成功:', data);
			selectUsers().then((data2) => {
				console.log('查询用户成功:', data2);
			});
		});
		console.log('this.props值为:', this.props);
		// const { dispatch } = this.props;
	}
	render() {
		return (
			<div>
				test
			</div>
		);
	}
}

function mapStateToProps(state, ownProps) {
	console.log('mapStateToProps的sate值:', state);
	console.log('mapStateToProps的ownProps值:', ownProps);
	const { users } = state;
	return { users };
}

export default connect(
	mapStateToProps,
	actionCreators
)(Home);
