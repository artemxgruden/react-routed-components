const { PATH_REDIRECTION_EVENT_NAME } = require("./constants.js");

const listenPopstateEvent = (
  checkPathRedirectionFunctionProps,
  checkPathRedirectionFunctions = []
) => {
  const handlePopstateEvent = async (event) => {
    for (const checkPathRedirectionFunction of checkPathRedirectionFunctions) {
      const checkPathRedirectionResult = await checkPathRedirectionFunction(
        checkPathRedirectionFunctionProps
      );

      if (checkPathRedirectionResult && checkPathRedirectionResult.path) {
        const pathRedirectionEvent = new CustomEvent(
          PATH_REDIRECTION_EVENT_NAME,
          {
            detail: { path: checkPathRedirectionResult.path },
          }
        );

        return window.dispatchEvent(pathRedirectionEvent);
      }
    }

    const pathRedirectionEvent = new CustomEvent(PATH_REDIRECTION_EVENT_NAME, {
      detail: {
        path: window.location.pathname + window.location.search,
      },
    });

    window.dispatchEvent(pathRedirectionEvent);
  };

  window.addEventListener("popstate", handlePopstateEvent);
};

module.exports = listenPopstateEvent;
