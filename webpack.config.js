const webpack = require('webpack');
const path = require('path');
const autoprefixer = require('autoprefixer');

module.exports = {
	entry: [
		'webpack-dev-server/client?http://localhost:8080',	
		'webpack/hot/only-dev-server',	//模块热替换，配置react-hot-loader插件
		'./client/src/index.js'
	],
	output: {
		publicPath: '/', //设置网站跟目录
		path: path.join(__dirname, '/client/dist'), //打包目录
		filename: 'bundle.js' //打包文件名
	},
	module: {
		loaders: [
			//jsx+ES6语法解析
			{
				test: /\.jsx?$/,
				exclude: /node_modules/,
				loaders: ['react-hot-loader/webpack', 'babel-loader']
			},
			// CSS、LESS、SCSS文件加载，浏览器兼容CSS自动补全
			{
				test: /\.css|less|scss$/,
				// 	loader: ['style-loader', 'css-loader']
				use: [
					{ loader: 'style-loader' },
					{ loader: 'css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]' },
					{ loader: 'less-loader' },
					{ loader: 'sass-loader' },
					{
						loader: 'postcss-loader',
						options: {
							plugins: () => [autoprefixer(
								{ 
									browsers: [
										'iOS >= 7', 
										'Android >= 4.1', 
										'last 10 Chrome versions', 
										'last 10 Firefox versions', 
										'Safari >= 6', 
										'ie > 8'
									] 
								}
							)],
						},
					}
				]
			}
		]
	},
	resolve: { //模块解析规则，提升打包速度
		extensions: ['.js', '.jsx', '.css', '.less', '.scss']
	},
	devServer: {	
		contentBase: './client/dist',	//--contentBase指定目录启动服务器的根目录
		hot: true, //服务器启动模块热替换【需要配置插件plugins】，不需要页面刷新
		port: 4000
	},
	plugins: [	
		new webpack.HotModuleReplacementPlugin() //模块热替换插件
	]	
};
