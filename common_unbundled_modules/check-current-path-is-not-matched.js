const {useState, useMemo, useContext} = require('react');

const contexts = require('./contexts.js');
const checkPathIsMatched = require('./check-path-is-matched.js');
const listenPathRedirectionEvent = require('./listen-path-redirection-event.js');
const checkIsOnClient = require('./check-is-on-client.js');
const getCurrentPathOnClient = require('./get-current-path-on-client.js');

const checkPathIsNotMatched = (childrenRoutesParameters, currentPath) => {
	return !childrenRoutesParameters.some((childRoutesParameters) =>
		checkPathIsMatched({
			currentPath,
			path: childRoutesParameters.path,
			pathIsStrict: childRoutesParameters.pathIsStrict,

			pathRegExp: childRoutesParameters.pathRegExp,
			pathRegExpGroupNames: childRoutesParameters.pathRegExpGroupNames,

			componentIsWrapper: childRoutesParameters.componentIsWrapper
		})
	);
};

const checkCurrentPathIsNotMatched = (children) => {
	const currentPath = checkIsOnClient()
		? getCurrentPathOnClient()
		: useContext(contexts.initialPathContext);

	const childrenRoutesParameters = children.map(({type}) => ({
		path: type.path,
		pathIsStrict: type.pathIsStrict,
		componentIsWrapper: type.componentIsWrapper,
		pathRegExp: type.pathRegExp,
		pathRegExpGroupNames: type.pathRegExpGroupNames,
	}));

	const [currentPathIsNotMatched, setCurrentPathIsNotMatched] = useState(
		useMemo(
			() => checkPathIsNotMatched(childrenRoutesParameters, currentPath)
		)
	);

	listenPathRedirectionEvent((event) => {
		const pathIsNotMatched = checkPathIsNotMatched(
			childrenRoutesParameters,
			event.detail.path
		);

		if (currentPathIsNotMatched !== pathIsNotMatched) {
			setCurrentPathIsNotMatched(
				pathIsNotMatched
			);
		}
	});

	return currentPathIsNotMatched;
};

module.exports = checkCurrentPathIsNotMatched;
