const { useEffect } = require("react");

const { PATH_REDIRECTION_EVENT_NAME } = require("./constants.js");

const listenRedirectionEvent = (handlePathRedirectionEvent) => {
  useEffect(() => {
    window.addEventListener(
      PATH_REDIRECTION_EVENT_NAME,
      handlePathRedirectionEvent
    );

    return () =>
      window.removeEventListener(
        PATH_REDIRECTION_EVENT_NAME,
        handlePathRedirectionEvent
      );
  });
};

module.exports = listenRedirectionEvent;
