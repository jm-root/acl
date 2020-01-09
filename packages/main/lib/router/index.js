const MS = require('jm-ms-core')
const ms = new MS()

module.exports = function (service) {
  async function areAnyRolesAllowed ({ data: { roles, resource, permissions } }) {
    const ret = await service.areAnyRolesAllowed(roles, resource, permissions)
    return { ret }
  }

  async function isAllowed ({ data: { user, resource, permissions } }) {
    const ret = await service.isAllowed(user, resource, permissions)
    return { ret }
  }

  async function clear () {
    const ret = await service.clear()
    return { ret }
  }

  async function load () {
    return service.load()
  }

  async function getUserResources ({ data: { user, resource } }) {
    return service.userResources(user, resource)
  }

  /**
   * @api {get} /roleResources 获取角色下的资源
   * @apiVersion 0.0.1
   * @apiGroup Acl
   * @apiUse Error
   *
   * @apiParam {String} roles 角色(可选,可数组)
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
  async function getRoleResources ({ data: { roles, role, permissions } }) {
    roles || (roles = role || [])
    roles = Array.isArray(roles) ? roles : roles.toString().split(',')
    permissions && (permissions = Array.isArray(permissions) ? permissions : permissions.toString().split(','))
    const doc = await service.acl.whatResources(roles, permissions)
    return Array.isArray(doc) ? { rows: doc } : doc
  }

  const router = ms.router()
  router
    .add('/areAnyRolesAllowed', 'get', areAnyRolesAllowed)
    .add('/isAllowed', 'get', isAllowed)
    .add('/clear', 'get', clear)
    .add('/load', 'get', load)
    .add('/userResources', 'get', getUserResources)
    .add('/roleResources', 'get', getRoleResources)

  router.prefix = '/'

  return router
}
