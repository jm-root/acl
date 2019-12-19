const MS = require('jm-ms-core')
const ms = new MS()
const { modelRouter } = require('../filters')

module.exports = function (service) {
  const { permission: model } = service
  let router = ms.router()
  router
    .use(modelRouter(model))

  return router
}
