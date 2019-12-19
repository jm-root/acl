const MS = require('jm-ms-core')
const ms = new MS()
const { modelRouter } = require('../filters')
const { split } = require('utils')

module.exports = function (service) {
  const { role: model } = service
  let router = ms.router()

  /**
   * @api {get} /roles/:id/resources 获取角色下的资源
   * @apiVersion 0.0.1
   * @apiGroup Acl
   * @apiUse Error
   *
   * @apiParam {String} permissions 权限(可选,可数组)
   *
   * @apiParamExample {json} 请求参数例子:
   * {
     * }
   *
   * @apiSuccessExample {json} 成功:
   * 方式一:
   * {
     *  '资源':['权限']
     * }
   * 方式二:
   * {
     *  rows:['具有指定权限的资源']
     * }
   */
  async function roleResources ({ params: { id }, data: { permissions } }) {
    if (permissions) {
      permissions = split(permissions)
      const rows = await service.acl.whatResources(id, permissions)
      return { rows }
    } else {
      return service.acl.whatResources(id)
    }
  }

  router
    .use(modelRouter(model))
    .add('/:id/resources', 'get', roleResources)

  return router
}
