const checkPathIsMatched = require("./check-path-is-matched.js");

const checkPathIsNotMatched = (childrenRoutesParameters, currentPath) => {
  return !childrenRoutesParameters.some((childRoutesParameters) =>
    checkPathIsMatched({
      currentPath,
      path: childRoutesParameters.path,
      pathIsStrict: childRoutesParameters.pathIsStrict,

      pathRegExp: childRoutesParameters.pathRegExp,
      pathRegExpGroupNames: childRoutesParameters.pathRegExpGroupNames,

      componentIsWrapper: childRoutesParameters.componentIsWrapper,
    })
  );
};

module.exports = checkPathIsNotMatched;
