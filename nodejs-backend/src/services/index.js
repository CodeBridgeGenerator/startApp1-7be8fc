const highways = require("./highways/highways.service.js");
const inspection = require("./inspection/inspection.service.js");
// ~cb-add-require-service-name~

// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  app.configure(highways);
  app.configure(inspection);
    // ~cb-add-configure-service-name~
};
