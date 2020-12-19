const getCurrentPathOnClient = () => {
  return window.location.pathname + window.location.search;
};

module.exports = getCurrentPathOnClient;
