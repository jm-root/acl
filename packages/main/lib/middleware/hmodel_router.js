const MS = require('jm-ms-core')
const ms = new MS()
const makeArray = require('./makearray')

/**
 * 创建指定model的CRUD路由
 * @param model
 * @returns {*}
 */
module.exports = function (model) {
  const router = ms.router()

  async function find ({ data }) {
    const rows = await model.find(data)
    return { rows }
  }

  async function findOne ({ params: { id } }) {
    id && (id = decodeURIComponent(id))
    return model.findOne(id)
  }

  async function create ({ data }) {
    return model.createOrUpdate(data)
  }

  async function updateOne ({ data, params: { id } }) {
    id && (id = decodeURIComponent(id))
    await model.createOrUpdate({ ...data, id })
    return { ret: true }
  }

  async function deleteOne ({ params: { id } }) {
    id && (id = decodeURIComponent(id))
    await model.delete(id)
    return { ret: true }
  }

  router
    .add('/', 'get', makeArray('fields'), find)
    .add('/', 'post', create)
    .add('/:id', 'get', findOne)
    .add('/:id', 'put', updateOne)
    .add('/:id', 'delete', deleteOne)

  return router
}
