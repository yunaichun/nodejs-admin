import React from 'react';
import { Row, Col, Input, Cascader, DatePicker, Button, Switch } from 'antd';
import city from './city';

const Search = Input.Search;
const { RangePicker } = DatePicker;

export class SearchFilter extends React.Component {
	constructor(props) {
		super(props);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleReset = this.handleReset.bind(this);
		this.handleChange = this.handleChange.bind(this);
	}
	handleFields(fields) {
		const { createTime } = fields;
		if (createTime !== undefined && createTime.length) {
			fields.createTime = [createTime[0].format('YYYY-MM-DD'), createTime[1].format('YYYY-MM-DD')];
		}
		return fields;
	}
	handleSubmit() {
		const { getFieldsValue } = this.props.form;
		let fields = getFieldsValue();
		fields = this.handleFields(fields);
		console.log(fields);
	}
	handleReset() {
		const { getFieldsValue, setFieldsValue } = this.props.form;
		const fields = getFieldsValue();
		for (let item in fields) {
			if ({}.hasOwnProperty.call(fields, item)) { //对象实例属性
				if (fields[item] instanceof Array) { //是数组置为空数组
					fields[item] = [];
				} else { //非数组置为undefined
					fields[item] = undefined;
				}
			}
		}
		setFieldsValue(fields);
		this.handleSubmit();
	}
	handleChange(key, values) {
		console.log(key, values);
		const { getFieldsValue } = this.props.form;
		let fields = getFieldsValue();
		fields[key] = values;
		fields = this.handleFields(fields);
		console.log(fields);
	}
	render() {
		const { getFieldDecorator } = this.props.form;
		return (
			<Row gutter={24}>
				<Col xl={{ span: 8 }} md={{ span: 8 }}>
					{getFieldDecorator('name')(
						<Search 
							placeholder="Search Name"
							size="large" 
							onSearch={this.handleSubmit}
						/>
					)}
				</Col>
				<Col xl={{ span: 8 }} md={{ span: 8 }}>
					{getFieldDecorator('address')(
						<Cascader
							size="large"
							style={{ width: '100%' }}
							options={city}
							placeholder="Please pick an address"
							onChange={this.handleChange.bind(null, 'address')}
						/>
					)}
				</Col>
				<Col xl={{ span: 8 }} md={{ span: 8 }} sm={{ span: 12 }}>
					{getFieldDecorator('createTime')(
						<RangePicker 
							style={{ width: '100%' }}
							size="large"
							onChange={this.handleChange.bind(null, 'createTime')}
						/>
					)}
				</Col>
				<Col xl={{ span: 24 }} md={{ span: 24 }} sm={{ span: 24 }}>
					<div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', marginTop: 16, marginBottom: 16 }}>
						<div>
							<Button 
								type="primary"
								size="large"
								style={{ marginRight: 16 }}
								onClick={this.handleSubmit}
							>
								Search
							</Button>
							<Button size="large" onClick={this.handleReset}>Reset</Button>
						</div>
						<div>
						<Switch style={{ marginRight: 16 }} size="large" defaultChecked />
						<Button size="large" type="ghost" >Create</Button>
						</div>
					</div>
				</Col>
			</Row>
		);
	}
}
