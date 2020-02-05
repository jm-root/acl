const MS = require('jm-ms-core')
const log = require('jm-log4js')
const { makeArray } = require('../utils')

const ms = new MS()
const logger = log.getLogger('acl')

module.exports = function (service) {
  const root = ms.router()

  function createRouter (node, prefix = '') {
    const { id, children, noRecursion = false } = node
    const router = ms.router()
    const resource = prefix + id

    if (children && children.length) {
      for (const childNode of children) {
        const { id } = childNode
        const r = createRouter(childNode, resource)
        if (id) {
          router.use(id, r)
        } else {
          router.use(r)
        }
      }
    }

    logger.debug(`createRouter for resource: ${resource} noRecursion: ${noRecursion}`)
    router.add({
      end: noRecursion || false,
      uri: '/',
      fn: async function (opts) {
        opts.matched || (opts.matched = true)
        const { acl } = service
        const { roles, permissions } = opts
        let ret = await acl.areAnyRolesAllowed(roles, resource, permissions)
        logger.debug(`filter roles: ${roles} resource: ${resource} permissions: ${permissions} result: ${ret}`, opts)
        if (ret) return true
      }
    })
    return router
  }

  function loadRoot () {
    const { superRole, defaultAllow, aclConfig: { resources } } = service

    // 超级用户
    root.use(opts => {
      const { roles } = opts
      logger.debug('filter superRole: ', roles)
      if (roles.indexOf(superRole) === -1) return
      return true
    })

    for (const node of resources) {
      const { id } = node
      logger.debug(`process root node: ${id}`)
      const router = createRouter(node)
      if (id) {
        root.use(id, router)
      } else {
        root.use(router)
      }
    }

    // 默认处理
    root.use(opts => {
      const { matched } = opts
      if (matched) return false
      logger.debug('filter defaultAllow', defaultAllow)
      return defaultAllow
    })
  }

  loadRoot()

  /**
   * 检测是否有权限访问，处理过程如下：
   * 如果请求的角色中具有superRole角色，允许访问
   * 如果没有请求资源或者权限，直接返回 defaultAllow
   * 查询是否有权限
   * 如果没有匹配到资源，返回false
   * 如果匹配到资源，但是未查询到是否有权限，返回 defaultAllow
   * @method acl#isAllowed
   * @param {String} user 用户, 一般为userId
   * @param {String|Array} [roles=[guestRole]] 角色数组
   * @param {String} [resource] 资源
   * @param {String|Array} [permissions=[]] 权限数组
   * @returns {Promise<*>}
   * 成功响应:
   * doc: 结果(true or false)
   */
  service.isAllowed = async function (user, resource, permissions) {
    let roles = null
    user && (roles = await this.userRoles(user))
    return this.areAnyRolesAllowed(roles, resource, permissions)
  }

  /**
   * @param roles {String|Array} [roles=[guestRole]] 角色数组
   * @param resource 资源
   * @param permissions [permissions=[]] 权限数组
   * @returns {Promise<*>}
   */
  service.areAnyRolesAllowed = async function (roles, resource, permissions) {
    const { defaultAllow } = this

    permissions || (permissions = [])
    permissions = makeArray(permissions)

    if (!resource || !permissions.length) return defaultAllow

    roles || (roles = [this.guestRole])
    roles = makeArray(roles)

    return root.request({
      uri: resource,
      roles,
      permissions
    })
  }
}
