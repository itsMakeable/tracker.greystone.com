var nib = require('nib');
var axis = require('axis');
var rupture = require('rupture');
var jeet = require('jeet');

module.exports = {
	devtool: 'sourcemap',
	output: {
		filename: 'bundle.js'
	},
	module: {
		loaders: [{
			test: /bootstrap\/js\//,
			loader: 'imports?jQuery=jquery'
		}, {
			test: /\.js$/,
			exclude: [/app\/lib/, /node_modules/],
			loader: 'ng-annotate!babel'
		}, {
			test: /\.html$/,
			loader: 'raw'
		}, {
			test: /\.styl$/,
			loader: 'style!css!stylus'
		}, {
			test: /\.jade$/,
			loader: "jade-loader"
		}, {
			test: /\.css$/,
			loader: 'style!css'
		}, {
			test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
			loader: "url?limit=10000&minetype=application/font-woff"
		}, {
			test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
			loader: "url?limit=10000&minetype=application/font-woff"
		}, {
			test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
			loader: "url?limit=10000&minetype=application/octet-stream"
		}, {
			test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
			loader: "file"
		}, {
			test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
			loader: "url?limit=10000&minetype=image/svg+xml"
		}, {
			test: /\.(jpe?g|png|gif)$/i,
			loaders: [
				'file?hash=sha512&digest=hex&name=[hash].[ext]',
				'image-webpack?bypassOnDebug&optimizationLevel=7&interlaced=false'
			]
		}]
	},
	stylus: {
		use: [nib(), axis(), rupture(), jeet()]
	}
};
