
module.exports = {
	mode:'development',
    entry:  {
		main:[require.resolve('react-dev-utils/webpackHotDevClient'), paths.appIndexJs]
	},
    output: {
		pathinfo: true,
		filename: 'assets/[name].js',
		chunkFilename: 'static/js/[name].chunk.js',
		publicPath: publicPath
    },

    // Enable sourcemaps for debugging webpack's output.
    devtool: "source-map",

    resolve: {
        // Add '.ts' and '.tsx' as resolvable extensions.
        extensions: [".ts", ".tsx", ".js", ".json"]
    },

    module: {
        rules: [
            // All files with a '.ts' or '.tsx' extension will be handled by 'awesome-typescript-loader'.
			{ test: /\.(js|ts|tsx|jsx)$/,
				 loader: require.resolve('babel-loader'),
				 query: {compact: false}  },
			// stackoverflow preferences:
			//https://stackoverflow.com/questions/29576341/what-does-the-code-generator-has-deoptimised-the-styling-of-some-file-as-it-e

            // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
			{ enforce: "pre",
			 test: /\.(js|jsx)$/,
			  loader: require.resolve('eslint-loader'),
			   query: {compact: false} }
        ]
	},
	plugins:[
		new HtmlWebpackPlugin({
			inject: true,
			chunks: ['main'],
			template: paths.appHtml
		})
	],

    // When importing a module whose path matches one of the following, just
    // assume a corresponding global variable exists and use that instead.
    // This is important because it allows us to avoid bundling all of our
    // dependencies, which allows browsers to cache those libraries between builds.
    // externals: {
    //     "react": "React",
    //     "react-dom": "ReactDOM"
    // }
};