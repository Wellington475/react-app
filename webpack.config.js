"use strict";
var webpack = require('webpack');

module.exports = {
	entry: __dirname + "/src/app.js",
	output: {
		path: __dirname + "/dist",
		filename: "bundle.js"
	},
	devServer: {
		devtool: 'eval',
		hot: true,
		inline: true,
		port: 4242,
		host: 'localhost'
	},
	 plugins: [
		new webpack.optimize.UglifyJsPlugin({
			compress: {
				warnings: false,
			},
			output: {
				comments: false,
			},
		}),
		new webpack.DefinePlugin({
			'process.env': {
				NODE_ENV: JSON.stringify('production')
			}
		})
	],
	module: {
		loaders: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				loader: "babel",
				query: {
					presets: ['es2015', 'react', 'stage-1']
				}
			}
		]
	}
};