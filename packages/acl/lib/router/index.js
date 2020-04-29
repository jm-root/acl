const { ms } = require('jm-server')
const { makeArray } = require('../middleware')

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
    const ret = service.load()
    return { ret: !!ret }
  }

  /**
   * @api {get} /roleResources 获取角色下的资源, 如果限定了权限，则只返回包含任意一个权限的资源数组
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
  async function whatResources ({ data: { roles = [], role, permissions } }) {
    role && (roles = [role])
    const doc = permissions ? await service.acl.whatResources(roles, permissions) : await service.acl.whatResources(roles)
    return Array.isArray(doc) ? { rows: doc } : doc
  }

  const router = ms.router()
  router
    .add('/areAnyRolesAllowed', 'get', makeArray('roles', 'permissions'), areAnyRolesAllowed)
    .add('/isAllowed', 'get', makeArray('permissions'), isAllowed)
    .add('/clear', 'get', clear)
    .add('/load', 'get', load)
    .add('/roleResources', 'get', makeArray('roles', 'permissions'), whatResources) // Deprecated, pls use /roles/:id/resources
    .add('/roles/:id/resources', 'get', ({ data, params: { id: roles } }) => { data.roles = roles }, makeArray('roles', 'permissions'), whatResources)

  router.prefix = '/'

  return router
}
