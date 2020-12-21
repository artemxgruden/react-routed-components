const { createElement, useContext } = require("react");

const { initialPathContext } = require("./contexts.js");
const useDocumentTitle = require("./use-document-title.js");
const usePath = require("./use-path.js");
const checkIsOnClient = require("./check-is-on-client.js");
const getCurrentPathOnClient = require("./get-current-path-on-client.js");

const createRoutedComponent = ({
  path = "/",
  pathIsStrict = false,
  pathRegExp = null,
  pathRegExpGroupNames = [],
  documentTitle = null,
  WrappedComponent = () => null,
  wrappedComponentIsWrapper = false,
  checkPathRedirection = () => false,
} = {}) => {
  const RoutedComponent = (props) => {
    const initialPath = useContext(initialPathContext);

    const currentPath = checkIsOnClient()
      ? getCurrentPathOnClient()
      : initialPath;

    const { pathIsMatched } = usePath({
      initialPath,
      path,
      pathIsStrict,
      pathRegExp,
      wrappedComponentIsWrapper,
      checkPathRedirection,
    });

    useDocumentTitle(pathIsMatched, documentTitle);

    let pathParameters = null;

    if (pathIsMatched && pathRegExp && pathRegExpGroupNames) {
      const matchResult = pathRegExp.exec(currentPath);
      pathParameters = pathRegExpGroupNames
        .map((k, i) => {
          return { [k]: matchResult[i + 1] };
        })
        .reduce((result, current) => {
          return Object.assign(result, current);
        }, {});
    }

    return pathIsMatched
      ? createElement(
          WrappedComponent,
          {
            ...props,
            path,
            pathIsStrict,
            wrappedComponentIsWrapper,
            documentTitle,
            pathParameters,
          },
          props.children
        )
      : null;
  };

  const propertyNames = Object.getOwnPropertyNames(WrappedComponent);

  for (const propertyName of propertyNames) {
    if (
      propertyName !== "length" &&
      propertyName !== "prototype" &&
      propertyName !== "name" &&
      propertyName !== "getDerivedStateFromProps"
    ) {
      RoutedComponent[propertyName] = WrappedComponent[propertyName];
    }
  }

  for (const key of Object.keys(WrappedComponent)) {
    RoutedComponent[key] = WrappedComponent[key];
  }

  RoutedComponent.path = path;
  RoutedComponent.pathIsStrict = pathIsStrict;
  RoutedComponent.pathRegExp = pathRegExp;
  RoutedComponent.pathRegExpGroupNames = pathRegExpGroupNames;
  RoutedComponent.documentTitle = documentTitle;
  RoutedComponent.WrappedComponent = WrappedComponent;
  RoutedComponent.wrappedComponentIsWrapper = wrappedComponentIsWrapper;
  RoutedComponent.checkPathRedirection = checkPathRedirection;

  return RoutedComponent;
};

module.exports = createRoutedComponent;
