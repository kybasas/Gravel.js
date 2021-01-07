const path = require('path')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')

const isProd = process.env.NODE_ENV === 'production'
const isDev = !isProd

const filename = ext => isDev ? `bundle.${ext}` : `bundle.[hash].${ext}`

const babelOptions = preset => {
	const opts = {
		presets: ['@babel/preset-env'],
		plugins: ['@babel/plugin-proposal-class-properties']
	}
	if (preset) opts.presets.push(preset)
	
	return opts
}

module.exports = {
	context: path.resolve(__dirname, 'src'),
	mode: 'development',
	entry: './index.ts',
	output: {
		filename: filename('js'),
		path: path.resolve(__dirname, 'dist')
	},
	resolve: {
		extensions: ['.ts', '.js'],
		alias: {
			'@': path.resolve(__dirname, 'src'),
		}
	},
	devtool: isDev ? 'source-map' : false,
	devServer: {
		port: 3000,
		hot: isDev
	},
	plugins: [
		new CleanWebpackPlugin(),
		new HTMLWebpackPlugin({
			template: 'index.html',
			minify: {
				removeComments: isProd,
				collapseWhitespace: isProd
			}
		}),
		new CopyPlugin([
			{
				from: path.resolve(__dirname, 'src/favicon.ico'),
				to: path.resolve(__dirname, 'dist')
			}
		]),
	],
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				loader: {
					loader: 'babel-loader',
					options: {
						presets: ['@babel/preset-env']
					}
				},
			},
			{
				test: /\.ts$/,
				exclude: /node_modules/,
				loader: {
					loader: 'babel-loader',
					options: babelOptions('@babel/preset-typescript')
				},
			},
		]
	}
}
