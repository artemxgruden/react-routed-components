const listenPopstateEvent = (props, checkPathRedirectionFunctions = []) => {
  const handlePopstateEvent = async (event) => {
    for (const checkPathRedirectionFunction of checkPathRedirectionFunctions) {
      const checkPathRedirectionResult = await checkPathRedirectionFunction(
        props
      );

      if (checkPathRedirectionResult && checkPathRedirectionResult.path) {
        const pathRedirectionEvent = new CustomEvent("pathRedirection", {
          detail: { path: checkPathRedirectionResult.path },
        });
        return window.dispatchEvent(pathRedirectionEvent);
      }
    }

    const pathRedirectionEvent = new CustomEvent("pathRedirection", {
      detail: {
        path: window.location.pathname + window.location.search,
      },
    });

    window.dispatchEvent(pathRedirectionEvent);
  };

  window.addEventListener("popstate", handlePopstateEvent);
};

module.exports = listenPopstateEvent;
