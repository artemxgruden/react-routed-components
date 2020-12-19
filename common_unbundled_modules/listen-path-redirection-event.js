const { useEffect } = require("react");

const listenRedirectionEvent = (handlePathRedirectionEvent) => {
  useEffect(() => {
    window.addEventListener("pathRedirection", handlePathRedirectionEvent);

    return () =>
      window.removeEventListener("pathRedirection", handlePathRedirectionEvent);
  });
};

module.exports = listenRedirectionEvent;
