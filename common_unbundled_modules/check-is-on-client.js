const checkIsOnClient = () => {
	return typeof window === 'undefined' ? false : true;
};

module.exports = checkIsOnClient;
