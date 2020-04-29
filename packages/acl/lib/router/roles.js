const { ms } = require('jm-server')
const { modelRouter } = require('../middleware')

module.exports = function (service) {
  const { role: model } = service
  let router = ms.router()

  router
    .use(modelRouter(model))

  return router
}
