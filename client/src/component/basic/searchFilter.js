import React from 'react';
import { Row, Col, Input, Cascader, DatePicker, Button, Switch } from 'antd';
import city from './city';

const Search = Input.Search;
const { RangePicker } = DatePicker;

export class SearchFilter extends React.Component {
	constructor(props) {
		super(props);
	}
	render() {
		const { getFieldDecorator } = this.props.form;
		const { handleSubmit, handleChange, handleReset, handleCreate } = this.props;
		return (
			<Row gutter={24}>
				<Col xl={{ span: 8 }} md={{ span: 8 }}>
					{getFieldDecorator('nameFilter')(
						<Search 
							placeholder="Search Name"
							size="large" 
							onSearch={handleSubmit}
						/>
					)}
				</Col>
				<Col xl={{ span: 8 }} md={{ span: 8 }}>
					{getFieldDecorator('addressFilter')(
						<Cascader
							size="large"
							style={{ width: '100%' }}
							options={city}
							placeholder="Please pick an address"
							onChange={handleChange.bind(null, 'addressFilter')}
						/>
					)}
				</Col>
				<Col xl={{ span: 8 }} md={{ span: 8 }} sm={{ span: 12 }}>
					{getFieldDecorator('timeFilter')(
						<RangePicker 
							style={{ width: '100%' }}
							size="large"
							onChange={handleChange.bind(null, 'timeFilter')}
						/>
					)}
				</Col>
				<Col xl={{ span: 24 }} md={{ span: 24 }} sm={{ span: 24 }}>
					<div 
						style={{ 
							display: 'flex', 
							justifyContent: 'space-between', 
							flexWrap: 'wrap', 
							marginTop: 16, 
							marginBottom: 16 
						}}
					>
						<div>
							<Button 
								type="primary"
								size="large"
								style={{ marginRight: 16 }}
								onClick={handleSubmit}
							>
								Search
							</Button>
							<Button size="large" onClick={handleReset}>Reset</Button>
						</div>
						<div>
						<Switch style={{ marginRight: 16 }} size="large" defaultChecked />
						<Button size="large" type="ghost" onClick={handleCreate}>Create</Button>
						</div>
					</div>
				</Col>
			</Row>
		);
	}
}
