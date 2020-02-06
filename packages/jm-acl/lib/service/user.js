const error = require('jm-err')
const { Err } = error
const Model = require('./hmodel')
const { split } = require('../utils')

class UserRole {
  constructor ({ service }) {
    this.service = service
  }

  getKeyRoles (id) {
    const { service: { aclKey } } = this
    return `${aclKey}users:${id}:roles`
  }

  async clearRoles (id) {
    const { redis } = this.service
    const key = this.getKeyRoles(id)
    return redis.del(key)
  }

  async setRoles (id, roles) {
    const doc = await this.clearRoles(id)
    if (!roles || !roles.length) return doc
    return this.addRoles(id, roles)
  }

  async addRoles (id, roles) {
    const { redis } = this.service
    const key = this.getKeyRoles(id)
    return redis.sadd(key, ...roles)
  }

  async removeRoles (id, roles) {
    if (!roles || !roles.length) return
    const { redis } = this.service
    const key = this.getKeyRoles(id)
    return redis.srem(key, ...roles)
  }

  async roles (id) {
    const { redis } = this.service
    const key = this.getKeyRoles(id)
    return redis.smembers(key)
  }
}

module.exports = class User extends Model {
  constructor ({ service }) {
    super({ service, name: 'user', autoId: true })
    this.userRole = new UserRole({ service })

    const onCU = this.onCU.bind(this)
    const onD = this.onD.bind(this)
    this
      .on('beforeCreate', opts => { opts.status === undefined && (opts.status = 1) })
      .on('beforeCreate', onCU)
      .on('beforeUpdate', onCU)
      .on('beforeDelete', onD)
  }

  async onCU (opts) {
    const { userRole } = this
    let { id, roles = [] } = opts
    if (!Array.isArray(roles)) roles = split(roles)
    await userRole.setRoles(id, roles)
    opts.roles = await userRole.roles(id)
  }

  async onD (id) {
    const { userRole } = this
    await userRole.clearRoles(id)
  }

  /**
   * 清空指定用户角色
   * @param id
   * @returns {Promise<void>}
   */
  async clearRoles (id) {
    if (!id) throw error.err(Err.FA_PARAMS)
    return this.createOrUpdate({ id })
  }

  /**
   * 设置指定用户角色
   * @param id
   * @returns {Promise<void>}
   */
  async setRoles (id, ...roles) {
    if (!id || !roles) throw error.err(Err.FA_PARAMS)
    return this.createOrUpdate({ id, roles })
  }

  /**
   * 为用户添加角色
   * @param id 用户, 一般为userId
   * @param roles 角色或角色数组
   * @returns {Promise<void>}
   */
  async addRoles (id, ...roles) {
    if (!id || !roles) throw error.err(Err.FA_PARAMS)
    const doc = await this.roles(id)
    return this.createOrUpdate({ id, roles: [...doc, ...roles] })
  }

  /**
   * 为用户删除角色
   * @param id 用户, 一般为userId
   * @param roles 角色或角色数组
   * @returns {Promise<void>}
   */
  async removeRoles (id, ...roles) {
    if (!id || !roles) throw error.err(Err.FA_PARAMS)
    await this.userRole.removeRoles(id, roles)
    roles = await this.roles(id)
    return this.createOrUpdate({ id, roles })
  }

  /**
   * 获取用户的角色
   * @param id 用户, 一般为userId
   * @returns {Promise<Array>}
   */
  async roles (id) {
    if (!id) throw error.err(Err.FA_PARAMS)
    return this.userRole.roles(id)
  }
}
