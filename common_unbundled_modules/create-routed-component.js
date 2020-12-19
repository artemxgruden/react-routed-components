const { createElement, useContext } = require("react");

const { initialPathContext } = require("./contexts.js");
const useDocumentTitle = require("./use-document-title.js");
const usePath = require("./use-path.js");
const checkIsOnClient = require("./check-is-on-client.js");
const getCurrentPathOnClient = require("./get-current-path-on-client.js");

const createRoutedComponent = (props) => {
  const {
    component = () => "",
    path = "/",
    pathIsStrict = false,
    pathRegExp = null,
    pathRegExpGroupNames = null,
    componentIsWrapper = false,
    documentTitle = null,
    checkPathRedirection = () => false,
  } = props;

  const RoutedComponent = (_props) => {
    const initialPath = useContext(initialPathContext);

    const currentPath = checkIsOnClient()
      ? getCurrentPathOnClient()
      : initialPath;

    const { pathIsMatched } = usePath({
      initialPath,
      path,
      pathIsStrict,

      pathRegExp,
      pathRegExpGroupNames,

      componentIsWrapper,
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
          component,
          {
            path,
            pathIsStrict,
            componentIsWrapper,
            documentTitle,
            pathParameters,
          },
          _props.children
        )
      : null;
  };

  const propertyNames = Object.getOwnPropertyNames(component);

  for (const propertyName of propertyNames) {
    if (
      propertyName !== "length" &&
      propertyName !== "prototype" &&
      propertyName !== "name" &&
      propertyName !== "getDerivedStateFromProps"
    ) {
      RoutedComponent[propertyName] = component[propertyName];
    }
  }

  for (const key of Object.keys(component)) {
    RoutedComponent[key] = component[key];
  }

  RoutedComponent.path = path;
  RoutedComponent.pathIsStrict = pathIsStrict;

  RoutedComponent.pathRegExp = pathRegExp;
  RoutedComponent.pathRegExpGroupNames = pathRegExpGroupNames;

  RoutedComponent.componentIsWrapper = componentIsWrapper;
  RoutedComponent.checkPathRedirection = checkPathRedirection;
  RoutedComponent.documentTitle = documentTitle;

  RoutedComponent.component = component;

  return RoutedComponent;
};

module.exports = createRoutedComponent;
