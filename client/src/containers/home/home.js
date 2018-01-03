import React from 'react';
import { Bcrumb } from '../../component/bcrumb/bcrumb';// 公共面包屑
import '../../style/home/home.less';
import '../../../../bower_components/simpleWeather/jquery.simpleWeather.min.js';

class Home extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			image: '', //天气图
			temperature: '', //当前温度
			unitsTemp: '', //温度单位
			date: '', //日期
			city: '', //城市
			region: '', //省份
			windDirection: '', //风向
			windSpeed: '', //风速
			unitsSpeed: '' //风速单位
		};
	}
	componentDidMount() {
		const that = this;
		$.simpleWeather({
			location: 'Hangzhou',
			woeid: '',
			unit: 'c',
			success(res) {
				console.log(res);
				that.setState({
					image: res.forecast[0].image,
					temperature: res.temp,
					unitsTemp: res.units.temp,
					date: res.forecast[0].date,
					city: res.city,
					region: res.region,
					windDirection: res.wind.direction,
					windSpeed: res.wind.speed,
					unitsSpeed: res.units.speed,
				});
			}
		});
		/*
		// 监听window.resize事件
		window.onresize = () => {
            // if(_this.$router.currentRoute.path!="/"){
            // 	return;
            // }
            // _this.height=$(window).innerHeight()-120+"px";
        }
        */
	}
	render() {
		return (
			<div>
				<Bcrumb title="当前天气" icon="line-chart" />
				<div id="main">
					<div id="weather">
						<h2>
							<img src={this.state.image} alt="" />
							<div className="text">{this.state.temperature}&deg;{this.state.unitsTemp}</div>
						</h2>
						<ul>
							<li className="currently">{this.state.date}</li>
							<li>{this.state.city},{this.state.region}</li>
							<li className="currently">
								{this.state.windDirection} {this.state.windSpeed} {this.state.unitsSpeed}
							</li>
						</ul>
					</div>
				</div>
			</div>
		);
	}
}

export default Home;
