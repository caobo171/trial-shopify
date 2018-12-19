const paths = require('./paths')

module.exports = {
	resolveModules: [
		paths.appDir,
		paths.appShared
	],
	
	pfStyleEntries: {
		'main-style': [paths.mainStyleFile],
		'reset-style': [paths.resetStyleFile],
		'animation-style': [paths.animationStyle]
	}
}