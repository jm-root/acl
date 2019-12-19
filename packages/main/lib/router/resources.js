const MS = require('jm-ms-core')
const ms = new MS()
const { modelRouter } = require('../filters')

module.exports = function (service) {
  const { resource: model } = service
  let router = ms.router()

  router
    .use(modelRouter(model))

  // // 获取资源组织结构图
  // let getTree = function (opts, cb) {
  //   opts || (opts = {})
  //   cb(null, { rows: resource.getTree(opts.params.id) })
  // }
  // let getResource = function (opts, cb) {
  //   cb(null, resource.nodes || {})
  // }
  // router
  //   .add('/init', 'post', init)
  //   .add('/all', 'get', getResource)

  return router
}
