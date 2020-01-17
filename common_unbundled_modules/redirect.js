const getCurrentPathOnClient = require('./get-current-path-on-client.js');

const redirect = (path) => {
	const currentPath = getCurrentPathOnClient();

	if (currentPath === path) {
		return;
	}

	const redirectEvent = new CustomEvent('pathRedirection', {detail: {path}});
	window.dispatchEvent(redirectEvent);
	history.pushState({}, '', path);
};

module.exports = redirect;
