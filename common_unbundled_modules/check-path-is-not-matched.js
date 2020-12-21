const checkPathIsMatched = require("./check-path-is-matched.js");

const checkPathIsNotMatched = (children, currentPath) => {
  return !children.some(
    ({ path, pathIsStrict, pathRegExp, wrappedComponentIsWrapper }) =>
      checkPathIsMatched({
        currentPath,
        path,
        pathIsStrict,
        pathRegExp,
        wrappedComponentIsWrapper,
      })
  );
};

module.exports = checkPathIsNotMatched;
