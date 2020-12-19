const { useState, useMemo, useContext } = require("react");

const contexts = require("./contexts.js");
const checkPathIsNotMatched = require("./check-path-is-not-matched.js");
const listenPathRedirectionEvent = require("./listen-path-redirection-event.js");
const checkIsOnClient = require("./check-is-on-client.js");
const getCurrentPathOnClient = require("./get-current-path-on-client.js");

const checkCurrentPathIsNotMatched = (children) => {
  const currentPath = checkIsOnClient()
    ? getCurrentPathOnClient()
    : useContext(contexts.initialPathContext);

  const childrenRoutes = Array.isArray(children) ? children : [children];

  const childrenRoutesParameters = childrenRoutes.map(({ type }) => ({
    path: type.path,
    pathIsStrict: type.pathIsStrict,
    componentIsWrapper: type.componentIsWrapper,
    pathRegExp: type.pathRegExp,
    pathRegExpGroupNames: type.pathRegExpGroupNames,
  }));

  const [currentPathIsNotMatched, setCurrentPathIsNotMatched] = useState(
    useMemo(() => checkPathIsNotMatched(childrenRoutesParameters, currentPath))
  );

  listenPathRedirectionEvent((event) => {
    const pathIsNotMatched = checkPathIsNotMatched(
      childrenRoutesParameters,
      event.detail.path
    );

    if (currentPathIsNotMatched !== pathIsNotMatched) {
      setCurrentPathIsNotMatched(pathIsNotMatched);
    }
  });

  return currentPathIsNotMatched;
};

module.exports = checkCurrentPathIsNotMatched;
