const { useEffect } = require("react");

const useDocumentTitle = (pathIsMatched, documentTitle) => {
  useEffect(() => {
    if (pathIsMatched && documentTitle) {
      window.document.title = documentTitle;
    }
  });
};

module.exports = useDocumentTitle;
