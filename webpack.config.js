const path = require('path');
// const ExtractTextPlugin = require('extract-text-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const autoprefixer = require('autoprefixer');

module.exports = {
	entry: './src/app.js',
	output: {
		path: path.resolve(__dirname, 'public'),
		filename: 'main.js'
	},
	module: {
		rules: [
			{
				test: /\.(scss|css)$/,
				use: [
					MiniCssExtractPlugin.loader,
					{
						loader: 'css-loader'
					},
					{
						loader: 'postcss-loader',
						options: {
							autoprefixer: {
								browsers: ['last 2 versions']
							},
							plugins: () => [autoprefixer]
						}
					},
					{
						loader: 'sass-loader'
					}
				]
			},
			{
				test: /\.worker\.js$/,
				use: {
					loader: 'worker-loader',
					options: {
						inline: true,
						fallback: false
					}
				}
			}
		]
	},
	plugins: [
		new MiniCssExtractPlugin({
			filename: '[name].css',
			chunkFilename: '[id].css',
			ignoreOrder: false
		})
	],
	externals: ['fs']
};
