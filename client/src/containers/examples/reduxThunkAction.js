import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actionCreators from '../../redux/actions/index';

class reduxThunkAction extends Component {
	componentDidMount() {
		console.log('this.props值为:', this.props);
		this.props.reduxThunkAction().then(() => {
			//异步获取redux store数据：获取的是reducer
			console.log('异步获取redux store数据:', this.props.reduxThunkReducer);
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
