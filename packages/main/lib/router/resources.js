const MS = require('jm-ms-core')
const ms = new MS()
const { modelRouter } = require('../middleware')

module.exports = function (service) {
  const { resource: model } = service
  let router = ms.router()

  router
    .use(modelRouter(model))

  return router
}
