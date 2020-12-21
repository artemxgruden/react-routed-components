const getCurrentPathOnClient = require("./get-current-path-on-client.js");
const { PATH_REDIRECTION_EVENT_NAME } = require("./constants.js");

const redirect = (path) => {
  const currentPath = getCurrentPathOnClient();

  if (currentPath === path) {
    return;
  }

  const redirectEvent = new CustomEvent(PATH_REDIRECTION_EVENT_NAME, {
    detail: { path },
  });

  window.dispatchEvent(redirectEvent);

  history.pushState({}, "", path);
};

module.exports = redirect;
