const { ms } = require('jm-server')
const makeArray = require('./makearray')

/**
 * 创建指定hmodel的CRUD路由
 * @param model
 * @returns {*}
 */
module.exports = function (model) {
  const router = ms.router()

  async function find ({ data }) {
    const rows = await model.load(data)
    return { rows }
  }

  async function update ({ data }) {
    await model.save(data.rows)
    return { ret: true }
  }

  async function clear () {
    await model.clear()
    return { ret: true }
  }

  async function findOne ({ params: { id } }) {
    id && (id = decodeURIComponent(id))
    return model.findOne(id)
  }

  async function updateOne ({ params: { id }, data }) {
    id && (id = decodeURIComponent(id))
    await model.updateOne(id, data)
    return { ret: true }
  }

  async function deleteOne ({ params: { id } }) {
    id && (id = decodeURIComponent(id))
    await model.deleteOne(id)
    return { ret: true }
  }

  router
    .add('/', 'get', makeArray('fields'), find)
    .add('/', 'post', update)
    .add('/', 'delete', clear)
    .add('/:id', 'get', findOne)
    .add('/:id', 'put', updateOne)
    .add('/:id', 'delete', deleteOne)

  return router
}
