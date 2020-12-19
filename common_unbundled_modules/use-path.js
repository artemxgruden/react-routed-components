const { useState, useEffect } = require("react");

const checkIsOnClient = require("./check-is-on-client.js");
const checkPathIsMatched = require("./check-path-is-matched.js");
const getCurrentPathOnClient = require("./get-current-path-on-client.js");
const listenPathRedirectionEvent = require("./listen-path-redirection-event.js");

const usePath = (props) => {
  const {
    initialPath = null,
    path = null,
    pathIsStrict = false,

    pathRegExp = null,
    pathRegExpGroupNames = null,

    componentIsWrapper = false,
    checkPathRedirection = () => false,
  } = props;

  const [pathIsMatched, setPathIsMatched] = useState(
    checkPathIsMatched({
      currentPath: checkIsOnClient() ? getCurrentPathOnClient() : initialPath,

      path,
      pathIsStrict,

      pathRegExp,
      pathRegExpGroupNames,

      componentIsWrapper,
    })
  );

  const handlePathRedirectionEvent = (event) => {
    const redirectionPath = event.detail.path;

    const pathIsMatched = checkPathIsMatched({
      currentPath: redirectionPath,
      path,
      pathIsStrict,

      pathRegExp,
      pathRegExpGroupNames,

      componentIsWrapper,
    });

    setPathIsMatched(pathIsMatched);
  };

  listenPathRedirectionEvent(handlePathRedirectionEvent);

  return { pathIsMatched };
};

module.exports = usePath;
