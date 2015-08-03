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
			loader: 'babel'
		}, {
			test: /\.html$/,
			loader: 'raw'
		}, {
			test: /\.styl$/,
			loader: 'style!css!stylus'
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
		}]
	}
};
