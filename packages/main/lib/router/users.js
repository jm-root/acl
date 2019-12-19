const MS = require('jm-ms-core')
const ms = new MS()
const { hmodelRouter } = require('../filters')

module.exports = function (service) {
  const { user: model } = service
  const router = ms.router()

  // 获取用户角色的详细信息
  async function getUserRoles ({ params: { id } }) {
    const rows = await service.userRoles(id)
    return { rows }
  }

  router
    .use(hmodelRouter(model))
    .add('/:id/roles', 'get', getUserRoles)

  return router
}
