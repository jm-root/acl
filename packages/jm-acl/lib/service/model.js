const _ = require('lodash')
const { EventEmitter } = require('jm-event')
const error = require('jm-err')
const { Err } = error
const { split } = require('../utils')
const { validateAclConfig } = require('./validate')

/**
 * 数据模型redis value，提供CRUD操作
 * @type {module.Model}
 */
module.exports = class Model extends EventEmitter {
  constructor ({ service, name }) {
    super({ async: true })
    Object.assign(this, { service, name })
  }

  get key () {
    const { service, name } = this
    return service.getKey(name)
  }

  /**
   * 加载
   * @param keySuffix 自定义key后缀
   * @returns {Promise<*>}
   */
  async load ({ fields } = {}) {
    fields && (fields = split(fields))
    let { service: { redis, defaultAclConfig }, key, name } = this
    let doc = await redis.get(key)
    if (doc) {
      doc = JSON.parse(doc)
    } else {
      doc = defaultAclConfig[`${name}s`]
    }
    if (fields && fields.length) {
      doc = doc.map(item => {
        return _.pick(item, fields)
      })
    }
    return doc
  }

  /**
   * 保存
   * @param opts
   * @param keySuffix 自定义key后缀
   * @returns {Promise<*>}
   */
  async save (opts, keySuffix) {
    let { service, service: { redis, aclConfig }, key } = this
    keySuffix && (key = `${key}:${keySuffix}`)
    if (!this.validate(opts)) throw error.err(Err.FA_VALIDATION)
    await this.emit('beforeSave', opts, keySuffix)
    const doc = await redis.set(key, JSON.stringify(opts))
    aclConfig[`${this.name}s`] = opts
    validateAclConfig(service)
    try {
      service.emit('acl.update', { name: this.name, key })
    } catch (e) {}
    return doc
  }

  async clear () {
    const { service: { redis }, key } = this
    await redis.del(key)
  }

  // 校验数据完整性
  validate (v) {
    if (!Array.isArray(v)) return false
    const ids = v.map(({ id }) => id)
    const s = new Set(ids)
    if (s.size !== v.length) return false
    for (const { id, children } of v) {
      if (!id) return false
      if (children) if (!this.validate(children)) return false
    }
    return true
  }
}
