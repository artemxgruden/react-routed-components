const checkPathIsMatched = ({
  currentPath,
  path,
  pathIsStrict,
  pathRegExp,
  wrappedComponentIsWrapper,
} = {}) => {
  if (pathRegExp) {
    return pathRegExp.test(currentPath);
  }

  if (pathIsStrict) {
    return path === currentPath;
  }

  if (wrappedComponentIsWrapper) {
    return currentPath ? currentPath.startsWith(path) : false;
  }

  return currentPath ? currentPath.split("?")[0] === path : false;
};

module.exports = checkPathIsMatched;
