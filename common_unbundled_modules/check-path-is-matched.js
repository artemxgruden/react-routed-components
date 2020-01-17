const checkPathIsMatched = (props) => {
	const {
		currentPath,
		path,
		pathIsStrict,

		pathRegExp,
		pathRegExpGroupNames,

		componentIsWrapper
	} = props;

	if (pathRegExp) {
		return pathRegExp.test(currentPath);
	}

	if (pathIsStrict) {
		return path === currentPath;
	}

	if (componentIsWrapper) {
		return currentPath ? currentPath.startsWith(path) : false;
	}

	return currentPath ? currentPath.split('?')[0] === path : false;
};

module.exports = checkPathIsMatched;
