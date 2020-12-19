const checkPathIsMatched = require("./check-path-is-matched.js");

const checkPathIsNotMatched = (children, currentPath) => {
  return !children.some((child) =>
    checkPathIsMatched({
      currentPath,
      path: child.path,
      pathIsStrict: child.pathIsStrict,

      pathRegExp: child.pathRegExp,
      pathRegExpGroupNames: child.pathRegExpGroupNames,

      componentIsWrapper: child.componentIsWrapper,
    })
  );
};

module.exports = checkPathIsNotMatched;
