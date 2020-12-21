const { useContext, useState, useEffect } = require("react");

const { initialPathContext } = require("./contexts.js");
const checkIsOnClient = require("./check-is-on-client.js");
const getCurrentPathOnClient = require("./get-current-path-on-client.js");
const listenPathRedirectionEvent = require("./listen-path-redirection-event.js");

const useCurrentPath = () => {
  const initialPath = checkIsOnClient()
    ? getCurrentPathOnClient()
    : useContext(initialPathContext);

  const [currentPath, setCurrentPath] = useState(initialPath);

  const handlePathRedirectionEvent = (event) => {
    const redirectionPath = event.detail.path;
    setCurrentPath(redirectionPath);
  };

  listenPathRedirectionEvent(handlePathRedirectionEvent);

  return currentPath;
};

module.exports = useCurrentPath;
