import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actionCreators from '../redux/actions/index';

class reduxThunkAction extends Component {
	constructor(props) {
		super(props);
	}
	componentDidMount() {
		console.log('this.props值为:', this.props);
		this.props.reduxThunkAction().then(() => {
			console.log('异步返回redux数据', this.props.asyncData);
		});
	}
	render() {
		return (
			<div>
				ReduxThunkAction Test
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
)(reduxThunkAction);
