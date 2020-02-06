const event = require('jm-event')
const log = require('jm-log4js')
const { validateAclConfig } = require('./validate')
const logger = log.getLogger('acl')
const User = require('./user')
const Role = require('./role')
const Resource = require('./resource')
const Permission = require('./permission')

class Service {
  constructor (opts = {}) {
    const argv = require('yargs')
      .boolean(['default_allow', 'debug'])
      .config(opts)
      .argv
    opts.debug = argv.debug
    opts.default_allow = argv.default_allow

    const {
      debug,
      default_acl_config: defaultAclConfig = {},
      acl_key: aclKey = 'acl:',
      super_role: superRole = 'root',
      guest_role: guestRole = 'guest',
      user_role: userRole = 'user',
      default_allow: defaultAllow = false,
      redis
    } = opts

    Object.assign(this, {
      defaultAclConfig,
      aclKey,
      superRole,
      guestRole,
      userRole,
      defaultAllow,
      ready: false,
      fingerprints: {},
      aclConfig: {}
    })

    debug && (logger.setLevel('debug'))

    event.enableEvent(this, { async: true })
    this.onReady()

    this.redis = require('./redis')({ redis })

    this.user = new User({ service: this, name: 'user', autoId: true })
    this.role = new Role({ service: this, name: 'role' })
    this.resource = new Resource({ service: this, name: 'resource' })
    this.permission = new Permission({ service: this, name: 'permission' })

    this.load()
      .then(() => { this.emit('ready') })
  }

  async onReady () {
    if (this.ready) return
    return new Promise(resolve => {
      this.once('ready', () => {
        this.ready = true
        resolve()
      })
    })
  }

  // 获取 redis key 前缀
  getKey (key) {
    return `${this.aclKey}${key}`
  }

  // 清除配置信息, 恢复至默认配置
  async clear () {
    const keys = await this.redis.keys(this.getKey('*'))
    if (!keys.length) return
    await this.redis.del(keys)
    logger.info('acl config cleaned.')
    await this.load()
    try {
      this.emit('acl.update')
    } catch (e) {}
    return true
  }

  // 加载配置信息
  async load () {
    const { defaultAclConfig, aclConfig, permission, resource, role } = this
    const permissions = await permission.load()
    const resources = await resource.load()
    const roles = await role.load()
    Object.assign(aclConfig, {}, defaultAclConfig)
    permissions && (aclConfig.permissions = permissions)
    resources && (aclConfig.resources = resources)
    roles && (aclConfig.roles = roles)
    await validateAclConfig(this)
    logger.info('acl config loaded.')
    return aclConfig
  }

  // 保存配置信息
  async save () {
    const { aclConfig: { permissions, resources, roles }, permission, resource, role } = this
    permissions && (await permission.save(permissions))
    resources && (await resource.save(resources))
    roles && (await role.save(roles))
    await validateAclConfig(this)
    logger.info('acl config saved.')
  }

  /**
   * 获取用户的角色, 包括继承的父角色
   * @param user 用户, 一般为userId
   * @returns {Promise<Array>}
   */
  async userRoles (user) {
    const roles = await this.user.roles(user)
    return this.acl._allRoles(roles)
  }

  /**
   * 检测用户是否拥有指定角色
   * @param user
   * @param role
   * @returns {Promise<*>}
   */
  async hasRole (user, role) {
    const roles = await this.userRoles(user)
    return roles.indexOf(role) !== -1
  }

  /**
   * 检测用户是否超级用户
   * @param user
   * @returns {Promise<*>}
   */
  hasSuperRole (user) {
    return this.hasRole(user, this.superRole)
  }
}

module.exports = Service
