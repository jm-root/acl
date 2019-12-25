const _ = require('lodash')
const { EventEmitter } = require('jm-event')
const error = require('jm-err')
const { Err } = error
const { genId, split } = require('../utils')

/**
 * 数据模型redis hash，提供CRUD操作
 * @type {module.Hmodel}
 */
module.exports = class Hmodel extends EventEmitter {
  constructor ({ service, name, autoId = false }) {
    super({ async: true })
    Object.assign(this, { service, name, autoId })
  }

  get key () {
    const { service, name } = this
    return service.getKey(name)
  }

  async exists (id) {
    if (!id) throw error.err(Err.FA_PARAMS)
    const { service: { redis }, key } = this
    return redis.hexists(key, id)
  }

  async findOne (id) {
    if (!id) throw error.err(Err.FA_PARAMS)
    const { service: { redis }, key } = this
    let doc = await redis.hget(key, id)
    if (!doc) return null
    doc = JSON.parse(doc)
    doc._id = doc.id // deprecated 兼容旧版本
    return doc
  }

  async find ({ fields } = {}) {
    fields && (fields = split(fields))
    const { service: { redis }, key } = this
    const doc = await redis.hvals(key)
    const rows = doc.map(item => {
      item = JSON.parse(item)
      item._id = item.id // deprecated 兼容旧版本
      fields && fields.length && (item = _.pick(item, fields))
      return item
    })
    return { rows }
  }

  async create (opts) {
    const { service: { redis }, key } = this
    if (opts._id) {
      opts.id || (opts.id = opts._id) // deprecated 兼容旧版本
      delete opts._id
    }
    if (!opts.id && this.autoId) opts.id = genId()
    const { id } = opts
    if (!id) throw error.err(Err.FA_PARAMS)
    const doc = await this.exists(id)
    if (doc) throw error.err(Err.FA_EXISTS)
    const t = Date.now()
    Object.assign(opts, { crtime: t, moditime: t })
    await this.emit('beforeCreate', opts)
    await redis.hset(key, id, JSON.stringify(opts))
    await this.emit('create', opts)
    return opts
  }

  async update (id, opts) {
    if (!id) throw error.err(Err.FA_PARAMS)
    const { service: { redis }, key } = this
    const doc = await this.findOne(id)
    if (!doc) throw error.err(Err.FA_NOTFOUND)
    const t = Date.now()
    Object.assign(doc, { ...opts, moditime: t })
    await this.emit('beforeUpdate', opts)
    await redis.hset(key, id, JSON.stringify(doc))
    await this.emit('update', doc)
    return doc
  }

  async createOrUpdate (opts) {
    const { id } = opts
    if (id) {
      const doc = await this.exists(id)
      if (doc) return this.update(id, opts)
    }
    return this.create(opts)
  }

  async delete (id) {
    if (!id) throw error.err(Err.FA_PARAMS)
    const { service: { redis }, key } = this
    await this.emit('beforeDelete', id)
    await redis.hdel(key, id)
    return id
  }
}
