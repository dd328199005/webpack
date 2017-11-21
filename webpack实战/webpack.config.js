const path = require('path')
//Extract text from a bundle, or bundles, into a separate file
//extract-text-webpack-plugin该插件的主要是为了抽离css样式,防止将样式打包在js中引起页面样式加载错乱的现象
var webpack = require('webpack')
module.exports = {
	entry: './app/main.js',
	output: {
		path: path.resolve(__dirname,'dist'),
		filename: 'bundle.js',
		// libraryTarget:'umd',
		// library: "MyLibrary"
	},
	plugins: [
		new webpack.ProvidePlugin({
			$: 'jquery'
		})
	]
}

