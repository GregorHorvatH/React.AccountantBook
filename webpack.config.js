const webpack = require('webpack');

module.exports = {
	entry: "./src/main.js",
	output: {
		path: __dirname + "/public/build/",
		publicPath: "build/",
		filename: "bundle.js"
	},
	module: {
		loaders: [
			{
				test: /\.js$/,
				loader: "react-hot-loader!babel-loader",
				exclude: /(node_modules|bower_components|public)/
			},
			{
				test: /\.css$/,
				loader: "react-hot-loader!style-loader!css-loader!autoprefixer-loader",
				exclude: [/node_modules/, /public/]
			},
			{
				test: /\.less$/,
				loader: "react-hot-loader!style-loader!css-loader!autoprefixer-loader!less-loader",
				exclude: [/node_modules/, /public/]
			},
			{
				test: /\.gif$/,
				loader: "url-loader?lomit=10000&imetype=image/gif"
			},
			{
				test: /\.jpg$/,
				loader: "url-loader?lomit=10000&imetype=image/jpg"
			},
			{
				test: /\.png$/,
				loader: "url-loader?lomit=10000&imetype=image/png"
			},
			{
				test: /\.svg$/,
				loader: "url-loader?lomit=10000&imetype=image/svg+xml"
			},
			{
				test: /\.jsx$/,
				loader: "react-hot-loader!babel-loader",
				exclude: /(node_modules|bower_components|public)/
			},
			{
				test: /\.json$/,
				loader: "json-loader"
			}
		]
	}
}